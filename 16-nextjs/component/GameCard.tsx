"use client";

import type { MouseEvent } from "react";

import { useRouter } from "next/navigation";
import { Trash, PencilLine, Eye } from "@phosphor-icons/react";
import { deleteGameAction } from "@/app/actions";
import Swal from "sweetalert2";

type GameCardProps = {
    game: {
        id: number;
        title: string;
        price: number;
        cover: string;
        console?: {
            name: string;
        } | null;
    };
};

export default function GameCard({ game }: GameCardProps) {
    const router = useRouter();
    const defaultCover = "/imgs/no-cover.png";
    const isDefaultCover = game.cover === "no-cover.png" || game.cover === "no-cover.jpeg";
    const consoleName = game.console?.name ?? "Sin consola";

    const handleCardMove = (event: MouseEvent<HTMLDivElement>) => {
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -10;
        const rotateY = ((x / rect.width) - 0.5) * 14;
        const moveX = ((x / rect.width) - 0.5) * 18;
        const moveY = ((y / rect.height) - 0.5) * 18;

        card.style.setProperty("--card-rotate-x", `${rotateX}deg`);
        card.style.setProperty("--card-rotate-y", `${rotateY}deg`);
        card.style.setProperty("--card-image-x", `${moveX}px`);
        card.style.setProperty("--card-image-y", `${moveY}px`);
    };

    const resetCardMove = (event: MouseEvent<HTMLDivElement>) => {
        const card = event.currentTarget;
        card.style.setProperty("--card-rotate-x", "0deg");
        card.style.setProperty("--card-rotate-y", "0deg");
        card.style.setProperty("--card-image-x", "0px");
        card.style.setProperty("--card-image-y", "0px");
    };

    // Función para manejar la eliminación
    const handleDelete = async (id: number) => {
        // 2. Configurar la alerta de SweetAlert2
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: `Vas a eliminar "${game.title}". ¡Esta acción no se puede deshacer!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ED53EA', // Color Indigo (tu color primario)
            cancelButtonColor: '##812A9B', // Color oscuro
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            background: '#812A9B', // Fondo oscuro para combinar con tu dashboard
            color: '#ffffff',      // Texto blanco
            backdrop: `rgba(0,0,0,0.6)`
        });

        // 3. Si el usuario confirma
        if (result.isConfirmed) {
            const response = await deleteGameAction(id);

            if (response.success) {
                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'El juego ha sido borrado de tu colección.',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    background: '#812A9B',
                    color: '#ffffff'
                });
                router.refresh(); // Refresca la lista
            } else {
                Swal.fire({
                    title: 'Error',
                    text: response.error,
                    icon: 'error',
                    background: '#812A9B',
                    color: '#ffffff'
                });
            }
        }
    };

    return (
        <div
            className="group [perspective:1400px]"
            onMouseMove={handleCardMove}
            onMouseLeave={resetCardMove}
        >
            <div
                className="card overflow-hidden border border-white/10 bg-black/40 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:shadow-primary/20 [transform-style:preserve-3d]"
                style={{
                    transform: "rotateX(var(--card-rotate-x, 0deg)) rotateY(var(--card-rotate-y, 0deg))",
                }}
            >
                <figure className="relative h-64 w-full overflow-hidden bg-gray-900">
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/15 via-transparent to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <img
                        src={isDefaultCover
                            ? "/imgs/no-cover.png"
                            : `/covers/${game.cover}`}
                        alt={game.title}
                        className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                        style={{
                            transform: "translate3d(var(--card-image-x, 0px), var(--card-image-y, 0px), 40px) scale(1.06)",
                        }}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src !== window.location.origin + defaultCover) {
                                target.src = defaultCover;
                            }
                        }}
                    />
                    <div className="absolute top-3 right-3 badge badge-primary font-bold shadow-lg [transform:translateZ(48px)]">
                        ${game.price}
                    </div>
                </figure>

                <div className="card-body p-5">
                    <div className="space-y-1 [transform:translateZ(38px)]">
                        <h2 className="card-title truncate text-lg font-bold text-white">{game.title}</h2>
                        <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary/80">
                            {consoleName}
                        </p>
                    </div>

                    <div className="card-actions mt-4 justify-end gap-1 border-t border-white/5 pt-4 [transform:translateZ(32px)]">
                        <button
                            onClick={() => router.push(`/games/${game.id}`)}
                            className="btn btn-sm btn-ghost text-info hover:bg-info/10 gap-1"
                        >
                            <Eye size={16} />
                            <span className="hidden lg:inline">Details</span>
                        </button>

                        <button
                            onClick={() => router.push(`/games/edit/${game.id}`)}
                            className="btn btn-sm btn-ghost text-warning hover:bg-warning/10 gap-1"
                        >
                            <PencilLine size={16} />
                            <span className="hidden lg:inline">Edit</span>
                        </button>

                        <button
                            onClick={() => handleDelete(game.id)}
                            className="btn btn-sm btn-ghost text-error hover:bg-error/10 gap-1"
                        >
                            <Trash size={16} />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
