"use client";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

export default function SearchGames() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (term) {
            params.set("search", term);
            params.set("page", "1"); // Al buscar, volvemos a la página 1
        } else {
            params.delete("search");
        }

        startTransition(() => {
            router.push(`/games?${params.toString()}`);
        });
    };

    return (
        <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-500">
                <MagnifyingGlass size={20} weight="bold" className={isPending ? "animate-spin" : ""} />
            </div>
            <input
                type="text"
                placeholder="Search games..."
                className="input input-bordered w-full pl-10 bg-white/5 border-white/10 text-white focus:border-indigo-500 transition-all rounded-2xl"
                defaultValue={searchParams.get("search")?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
    );
}