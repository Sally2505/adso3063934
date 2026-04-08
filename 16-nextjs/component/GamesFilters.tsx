"use client";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

type GamesFiltersProps = {
    genres: string[];
    consoles: Array<{
        id: number;
        name: string;
    }>;
};

export default function GamesFilters({ genres, consoles }: GamesFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const updateParams = (key: "search" | "genre" | "console", value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        params.set("page", "1");

        startTransition(() => {
            router.push(`/games?${params.toString()}`);
        });
    };

    return (
        <div className="relative z-10 flex w-full flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative w-full min-w-0 lg:min-w-[19rem]">
                <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-500">
                    <MagnifyingGlass size={20} weight="bold" className={isPending ? "animate-spin" : ""} />
                </div>
                <input
                    type="text"
                    placeholder="Search games..."
                    className="input input-bordered w-full rounded-2xl border-white/20 bg-slate-950/95 pl-10 text-white shadow-[0_12px_30px_rgba(2,6,23,0.4)] transition-all focus:border-indigo-500"
                    defaultValue={searchParams.get("search")?.toString()}
                    onChange={(e) => updateParams("search", e.target.value)}
                />
            </div>

            <select
                className="select w-full rounded-2xl border-white/20 bg-slate-950/95 text-white shadow-[0_12px_30px_rgba(2,6,23,0.4)] focus:border-indigo-500 lg:max-w-52"
                defaultValue={searchParams.get("genre")?.toString() ?? ""}
                onChange={(e) => updateParams("genre", e.target.value)}
            >
                <option value="">All categories</option>
                {genres.map((genre) => (
                    <option key={genre} value={genre}>
                        {genre}
                    </option>
                ))}
            </select>

            <select
                className="select w-full rounded-2xl border-white/20 bg-slate-950/95 text-white shadow-[0_12px_30px_rgba(2,6,23,0.4)] focus:border-indigo-500 lg:max-w-52"
                defaultValue={searchParams.get("console")?.toString() ?? ""}
                onChange={(e) => updateParams("console", e.target.value)}
            >
                <option value="">All consoles</option>
                {consoles.map((consoleItem) => (
                    <option key={consoleItem.id} value={consoleItem.id}>
                        {consoleItem.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
