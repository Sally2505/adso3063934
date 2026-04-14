import { PrismaClient } from '@/src/generated/prisma';
import { PrismaNeon } from '@prisma/adapter-neon';
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import Link from 'next/link';
import GameDetailsCover from "@/component/GameDetailsCover";
import { getImageSrc } from "@/lib/images";

const prisma = new PrismaClient({
    adapter: new PrismaNeon({ connectionString: process.env.DATABASE_URL! })
});

export default async function ConsoleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const consoleId = parseInt(id);

    const consoleItem = await prisma.console.findUnique({
        where: { id: consoleId },
        include: { games: true }
    });

    if (!consoleItem) return <div className="p-10 text-center text-white">Consola no encontrada</div>;

    const isDefaultImage = consoleItem.image === "no-cover.png" || consoleItem.image === "no-cover.jpeg";

    return (
        <div className="mx-auto max-w-4xl p-8">
            <Link href="/consoles" className="btn btn-ghost mb-6 gap-2 text-gray-400">
                <CaretLeft size={20} /> Back to Consoles
            </Link>

            <div className="flex flex-col gap-8 rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-md md:flex-row">
                <GameDetailsCover
                    src={getImageSrc(consoleItem.image)}
                    alt={consoleItem.name}
                />

                <div className="flex-1">
                    <div className="badge badge-primary mb-2">{consoleItem.manufacturer}</div>
                    <h1 className="mb-4 text-4xl font-bold text-white">{consoleItem.name}</h1>
                    <p className="mb-6 text-lg leading-relaxed text-gray-400">{consoleItem.description}</p>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                        <div>
                            <p className="text-sm text-gray-500">Manufacturer</p>
                            <p className="font-medium text-white">{consoleItem.manufacturer}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Release Date</p>
                            <p className="font-medium text-white">{consoleItem.releaseDate.toDateString()}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Games Registered</p>
                            <p className="text-xl font-bold text-emerald-400">{consoleItem.games.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
