"use client";

import type { MouseEvent } from "react";

type GameDetailsCoverProps = {
    src: string;
    alt: string;
};

export default function GameDetailsCover({ src, alt }: GameDetailsCoverProps) {
    const handleCardMove = (event: MouseEvent<HTMLDivElement>) => {
        const card = event.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -10;
        const rotateY = ((x / rect.width) - 0.5) * 14;
        const moveX = ((x / rect.width) - 0.5) * 16;
        const moveY = ((y / rect.height) - 0.5) * 16;

        card.style.setProperty("--detail-rotate-x", `${rotateX}deg`);
        card.style.setProperty("--detail-rotate-y", `${rotateY}deg`);
        card.style.setProperty("--detail-image-x", `${moveX}px`);
        card.style.setProperty("--detail-image-y", `${moveY}px`);
    };

    const resetCardMove = (event: MouseEvent<HTMLDivElement>) => {
        const card = event.currentTarget;
        card.style.setProperty("--detail-rotate-x", "0deg");
        card.style.setProperty("--detail-rotate-y", "0deg");
        card.style.setProperty("--detail-image-x", "0px");
        card.style.setProperty("--detail-image-y", "0px");
    };

    return (
        <div
            className="group w-full md:w-72 shrink-0 [perspective:1400px]"
            onMouseMove={handleCardMove}
            onMouseLeave={resetCardMove}
        >
            <div
                className="relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-300 [transform-style:preserve-3d]"
                style={{
                    minHeight: "380px",
                    transform: "rotateX(var(--detail-rotate-x, 0deg)) rotateY(var(--detail-rotate-y, 0deg))",
                    backgroundImage: "url(/imgs/no-cover.png)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-br from-white/20 via-transparent to-primary/15 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <img
                    src={src}
                    alt={alt}
                    className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                    style={{
                        minHeight: "380px",
                        transform: "translate3d(var(--detail-image-x, 0px), var(--detail-image-y, 0px), 45px) scale(1.04)",
                    }}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== window.location.origin + "/imgs/no-cover.png") {
                            target.src = "/imgs/no-cover.png";
                        }
                    }}
                />
            </div>
        </div>
    );
}
