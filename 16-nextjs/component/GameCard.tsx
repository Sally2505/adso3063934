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
    const coverSrc = isDefaultCover ? defaultCover : `/covers/${game.cover}`;

    const handleCardMove = (event: MouseEvent<HTMLDivElement>) => {
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -10;
        const rotateY = ((x / rect.width) - 0.5) * 14;
        const glowX = (x / rect.width) * 100;
        const glowY = (y / rect.height) * 100;

        card.style.setProperty("--card-rotate-x", `${rotateX}deg`);
        card.style.setProperty("--card-rotate-y", `${rotateY}deg`);
        card.style.setProperty("--card-glow-x", `${glowX}%`);
        card.style.setProperty("--card-glow-y", `${glowY}%`);
    };

    const resetCardMove = (event: MouseEvent<HTMLDivElement>) => {
        const card = event.currentTarget;
        card.style.setProperty("--card-rotate-x", "0deg");
        card.style.setProperty("--card-rotate-y", "0deg");
        card.style.setProperty("--card-glow-x", "50%");
        card.style.setProperty("--card-glow-y", "50%");
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
                className="card h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,12,24,0.92),rgba(27,13,42,0.92))] shadow-xl backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:shadow-primary/20 [transform-style:preserve-3d]"
                style={{
                    transform: "rotateX(var(--card-rotate-x, 0deg)) rotateY(var(--card-rotate-y, 0deg))",
                }}
            >
                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[1.75rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "radial-gradient(circle at var(--card-glow-x, 50%) var(--card-glow-y, 50%), rgba(255,255,255,0.26) 0%, rgba(255,0,153,0.18) 16%, rgba(0,229,255,0.18) 34%, rgba(255,208,0,0.14) 48%, rgba(255,255,255,0.05) 62%, transparent 74%)",
                            mixBlendMode: "screen",
                        }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0)_28%,rgba(255,0,153,0.08)_48%,rgba(0,229,255,0.1)_68%,rgba(255,255,255,0.12))] mix-blend-screen" />
                </div>
                <figure className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(237,83,234,0.18),transparent_58%),linear-gradient(180deg,rgba(9,11,24,0.98),rgba(25,15,41,0.92))] p-3">
                    <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/15 via-transparent to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute inset-x-5 bottom-3 h-10 rounded-full bg-black/50 blur-2xl" />
                    <img
                        src={coverSrc}
                        alt={game.title}
                        className="relative z-20 h-full w-full rounded-[1.1rem] object-contain transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                        style={{ transform: "translate3d(0, 0, 40px)" }}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src !== window.location.origin + defaultCover) {
                                target.src = defaultCover;
                            }
                        }}
                    />
                    <div className="absolute top-3 right-3 z-30 rounded-full border border-primary/40 bg-black/80 px-3 py-1 text-xs font-semibold text-primary shadow-[0_12px_28px_rgba(0,0,0,0.45)] backdrop-blur-md [transform:translateZ(72px)]">
                        ${game.price}
                    </div>
                </figure>

                <div className="card-body gap-3 p-3.5">
                    <div className="space-y-1 [transform:translateZ(38px)]">
                        <h2 className="card-title line-clamp-2 min-h-[3rem] text-sm font-bold leading-snug text-white sm:text-base">
                            {game.title}
                        </h2>
                        <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-primary/80 sm:text-xs">
                            {consoleName}
                        </p>
                    </div>

                    <div className="card-actions mt-auto grid grid-cols-3 gap-2 border-t border-white/5 pt-4 [transform:translateZ(32px)]">
                        <button
                            onClick={() => router.push(`/games/${game.id}`)}
                            className="btn btn-sm h-10 min-h-10 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-2 text-cyan-100 shadow-[0_10px_24px_rgba(34,211,238,0.12)] transition hover:border-cyan-300/40 hover:bg-cyan-400/20 hover:text-white"
                        >
                            <Eye size={16} />
                            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase">Details</span>
                        </button>

                        <button
                            onClick={() => router.push(`/games/edit/${game.id}`)}
                            className="btn btn-sm h-10 min-h-10 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-2 text-amber-100 shadow-[0_10px_24px_rgba(251,191,36,0.12)] transition hover:border-amber-300/40 hover:bg-amber-400/20 hover:text-white"
                        >
                            <PencilLine size={16} />
                            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase">Edit</span>
                        </button>

                        <button
                            onClick={() => handleDelete(game.id)}
                            className="btn btn-sm h-10 min-h-10 rounded-2xl border border-rose-400/20 bg-rose-400/10 px-2 text-rose-100 shadow-[0_10px_24px_rgba(251,113,133,0.12)] transition hover:border-rose-300/40 hover:bg-rose-400/20 hover:text-white"
                        >
                            <Trash size={16} />
                            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase">Delete</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
