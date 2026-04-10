"use server";

import { z } from "zod";
import { Prisma, PrismaClient } from '@/src/generated/prisma';
import { PrismaNeon } from '@prisma/adapter-neon';
import { revalidatePath } from 'next/cache';
import { mkdir, unlink, writeFile } from "fs/promises";
import path from 'path';

const prisma = new PrismaClient({
    adapter: new PrismaNeon({
        connectionString: process.env.DATABASE_URL!
    })
})

const gameSchema = z.object({
    title: z.string().min(3, "Title required"),
    price: z.coerce.number().positive("Invalid price"),
    console_id: z.coerce.number(),
    description: z.string().min(10, "Description too short"),
});

const consoleSchema = z.object({
    name: z.string().min(2, "Name required"),
    manufacturer: z.string().min(2, "Manufacturer required"),
    releaseDate: z.string().min(1, "Release date required"),
    description: z.string().min(10, "Description too short"),
});

const coversDirectory = path.join(process.cwd(), "public", "covers");
const defaultCovers = new Set(["no-cover.png", "no-cover.jpeg"]);

async function saveCoverFile(file: File) {
    await mkdir(coversDirectory, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const extension = path.extname(file.name) || ".jpg";
    const baseName = path.basename(file.name, extension).replace(/[^a-zA-Z0-9-_]/g, "-");
    const fileName = `${Date.now()}-${baseName}${extension}`;
    const filePath = path.join(coversDirectory, fileName);

    await writeFile(filePath, buffer);
    return fileName;
}

async function deleteCoverFile(fileName: string) {
    if (!fileName || defaultCovers.has(fileName)) return;

    try {
        await unlink(path.join(coversDirectory, fileName));
    } catch (error) {
        console.error("No se pudo eliminar la portada anterior:", error);
    }
}

export async function deleteGameAction(id: number) {
    try {
        await prisma.games.delete({
            where: { id: id }
        });

        // Esto limpia la caché de la página de juegos para que el juego desaparezca
        revalidatePath('/games');
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar:", error);
        return { success: false, error: "No se pudo eliminar el juego" };
    }
}

export async function updateGameAction(
    id: number,
    data: { title: string; price: number; cover: string; console_id: number },
    formData?: FormData
) {
    try {
        let coverFileName = data.cover;

        // Si viene una nueva imagen, guardarla
        const newCover = formData?.get("newCover") as File | null;
        if (newCover && newCover.size > 0) {
            const previousCover = data.cover;
            coverFileName = await saveCoverFile(newCover);
            await deleteCoverFile(previousCover);
        }

        await prisma.games.update({
            where: { id },
            data: {
                title: data.title,
                price: data.price,
                cover: coverFileName,
                console_id: data.console_id,
            }
        });

        revalidatePath('/games');
        revalidatePath(`/games/${id}`);
        return { success: true };

    } catch (error) {
        console.error(error);
        return { success: false, error: "Error al actualizar el juego" };
    }
}

export async function getGameByIdAction(id: number) {
    try {
        const game = await prisma.games.findUnique({
            where: { id },
            include: { console: true }
        });
        return { success: true, game };
    } catch {
        return { success: false, error: "No se pudo obtener el juego" };
    }
}

export async function getConsoleByIdAction(id: number) {
    try {
        const console = await prisma.console.findUnique({
            where: { id },
            include: {
                games: {
                    select: { id: true, title: true }
                }
            }
        });
        return { success: true, console };
    } catch {
        return { success: false, error: "No se pudo obtener la consola" };
    }
}

export async function deleteConsoleAction(id: number) {
    try {
        const consoleItem = await prisma.console.findUnique({
            where: { id },
            select: { image: true, _count: { select: { games: true } } }
        });

        if (!consoleItem) {
            return { success: false, error: "La consola no existe" };
        }

        if (consoleItem._count.games > 0) {
            return { success: false, error: "No puedes eliminar una consola con juegos asociados" };
        }

        await prisma.console.delete({
            where: { id }
        });

        await deleteCoverFile(consoleItem.image);
        revalidatePath('/consoles');
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar consola:", error);
        return { success: false, error: "No se pudo eliminar la consola" };
    }
}

export async function createGameAction(formData: FormData) {
    try {
        const data = {
            title: formData.get("title"),
            price: formData.get("price"),
            console_id: formData.get("console_id"),
            description: formData.get("description"),
        };

        const validated = gameSchema.safeParse(data);
        if (!validated.success) {
            return { success: false, errors: validated.error.flatten().fieldErrors };
        }

        const file = formData.get("cover") as File;
        let fileName = "no-cover.png"; // default image in public/imgs

        if (file && file.size > 0) {
            fileName = await saveCoverFile(file);
        }

        await prisma.games.create({
            data: {
                title: validated.data.title,
                price: validated.data.price,
                console_id: validated.data.console_id,
                description: validated.data.description,
                cover: fileName,
                developer: "Pending",
                releaseDate: new Date(),
                genre: "Action"
            }
        });

        revalidatePath("/games");
        return { success: true };

    } catch (error) {
        console.error("❌ FULL ERROR:", error);
        return { success: false, error: "Server error" };
    }
}

export async function getConsolesAction() {
    try {
        const consoles = await prisma.console.findMany({
            orderBy: { name: 'asc' }
        });
        return { success: true, consoles };
    } catch {
        return { success: false, error: "No se pudieron cargar las consolas" };
    }
}

export async function createConsoleAction(formData: FormData) {
    try {
        const data = {
            name: formData.get("name"),
            manufacturer: formData.get("manufacturer"),
            releaseDate: formData.get("releaseDate"),
            description: formData.get("description"),
        };

        const validated = consoleSchema.safeParse(data);
        if (!validated.success) {
            return { success: false, errors: validated.error.flatten().fieldErrors };
        }

        const file = formData.get("image") as File;
        let fileName = "no-cover.png";

        if (file && file.size > 0) {
            fileName = await saveCoverFile(file);
        }

        await prisma.console.create({
            data: {
                name: validated.data.name,
                manufacturer: validated.data.manufacturer,
                releaseDate: new Date(validated.data.releaseDate),
                description: validated.data.description,
                image: fileName
            }
        });

        revalidatePath("/consoles");
        return { success: true };
    } catch (error) {
        console.error("Error creando consola:", error);
        return { success: false, error: "No se pudo crear la consola" };
    }
}

export async function updateConsoleAction(
    id: number,
    data: { name: string; manufacturer: string; releaseDate: string; description: string; image: string },
    formData?: FormData
) {
    try {
        let imageFileName = data.image;

        const newImage = formData?.get("newImage") as File | null;
        if (newImage && newImage.size > 0) {
            const previousImage = data.image;
            imageFileName = await saveCoverFile(newImage);
            await deleteCoverFile(previousImage);
        }

        await prisma.console.update({
            where: { id },
            data: {
                name: data.name,
                manufacturer: data.manufacturer,
                releaseDate: new Date(data.releaseDate),
                description: data.description,
                image: imageFileName
            }
        });

        revalidatePath('/consoles');
        revalidatePath(`/consoles/${id}`);
        return { success: true };
    } catch (error) {
        console.error("Error actualizando consola:", error);
        return { success: false, error: "No se pudo actualizar la consola" };
    }
}

export async function getGameGenresAction() {
    try {
        const genres = await prisma.games.findMany({
            distinct: ['genre'],
            select: { genre: true },
            orderBy: { genre: 'asc' }
        });

        return {
            success: true,
            genres: genres
                .map((item) => item.genre?.trim())
                .filter((genre): genre is string => Boolean(genre))
        };
    } catch {
        return { success: false, error: "No se pudieron cargar las categorías" };
    }
}

export async function getGamesAction(
    page: number = 1,
    pageSize: number = 12,
    query: string = "",
    genre: string = "",
    consoleId?: number
) {
    try {
        const skip = (page - 1) * pageSize;
        const where: Prisma.GamesWhereInput = {
            ...(query ? { title: { contains: query, mode: 'insensitive' } } : {}),
            ...(genre ? { genre } : {}),
            ...(consoleId ? { console_id: consoleId } : {})
        };

        const [games, total] = await Promise.all([
            prisma.games.findMany({
                where,
                skip,
                take: pageSize,
                include: { console: true },
                orderBy: { id: 'desc' }
            }),
            prisma.games.count({ where })
        ]);

        return {
            success: true,
            games,
            totalPages: Math.ceil(total / pageSize),
            currentPage: page
        };
    } catch (error) {
        console.error("Error en getGamesAction:", error);
        return { success: false, error: "No se pudieron cargar los juegos" };
    }
}

export async function getDashboardStatsAction() {
    try {
        const [allGames, consoles] = await Promise.all([
            prisma.games.findMany({
                include: { console: true }
            }),
            prisma.console.findMany({
                include: { _count: { select: { games: true } } }
            })
        ]);

        // Calcular estadísticas
        const totalGames = allGames.length;
        const totalPrice = allGames.reduce((sum, game) => sum + game.price, 0);
        const averagePrice = totalGames > 0 ? totalPrice / totalGames : 0;

        // Juegos por consola
        const gamesByConsole = consoles.map(console => ({
            id: console.id,
            name: console.name,
            count: console._count.games
        }));

        // Precio total por consola
        const priceByConsole = consoles.map(console => {
            const consolGames = allGames.filter(g => g.console_id === console.id);
            const total = consolGames.reduce((sum, game) => sum + game.price, 0);
            return {
                id: console.id,
                name: console.name,
                totalPrice: total,
                avgPrice: consolGames.length > 0 ? total / consolGames.length : 0,
                gameCount: consolGames.length
            };
        });

        return {
            success: true,
            stats: {
                totalGames,
                totalPrice: Math.round(totalPrice * 100) / 100,
                averagePrice: Math.round(averagePrice * 100) / 100,
                gamesByConsole,
                priceByConsole
            }
        };
    } catch (error) {
        console.error("Error en getDashboardStatsAction:", error);
        return { success: false, error: "No se pudieron cargar las estadísticas" };
    }
}
