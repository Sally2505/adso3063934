"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

type GamesPaginationProps = {
    totalPages: number;
    currentPage: number;
    searchQuery?: string;
    genreFilter?: string;
    consoleFilter?: string;
};

const buildVisiblePages = (totalPages: number, currentPage: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) {
        return [1, 2, 3, 4, "ellipsis-end", totalPages];
    }

    if (currentPage >= totalPages - 2) {
        return [1, "ellipsis-start", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "ellipsis-start", currentPage - 1, currentPage, currentPage + 1, "ellipsis-end", totalPages];
};

export default function GamesPagination({
    totalPages,
    currentPage,
    searchQuery,
    genreFilter,
    consoleFilter
}: GamesPaginationProps) {
    const router = useRouter();
    const visiblePages = buildVisiblePages(totalPages, currentPage);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams();

        params.set("page", String(newPage));

        if (searchQuery) {
            params.set("search", searchQuery);
        }

        if (genreFilter) {
            params.set("genre", genreFilter);
        }

        if (consoleFilter) {
            params.set("console", consoleFilter);
        }

        router.push(`/games?${params.toString()}`);
    };

    return (
        <div className="mt-12 flex items-center justify-center gap-4 pb-10">
            <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-black/40 p-2 shadow-2xl backdrop-blur-md">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="btn btn-md btn-ghost rounded-xl text-white disabled:text-gray-600"
                >
                    <CaretLeft size={20} weight="bold" />
                </button>

                {visiblePages.map((page, index) =>
                    typeof page === "number" ? (
                        <button
                            key={`${page}-${index}`}
                            onClick={() => handlePageChange(page)}
                            className={`btn btn-md min-w-11 rounded-xl border px-4 ${
                                page === currentPage
                                    ? "border-primary/40 bg-primary/20 font-bold text-primary"
                                    : "border-white/10 bg-white/5 text-white hover:bg-white/10"
                            }`}
                        >
                            {page}
                        </button>
                    ) : (
                        <span
                            key={`${page}-${index}`}
                            className="px-2 text-sm font-semibold tracking-[0.2em] text-white/40"
                        >
                            ...
                        </span>
                    )
                )}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="btn btn-md btn-ghost rounded-xl text-white disabled:text-gray-600"
                >
                    <CaretRight size={20} weight="bold" />
                </button>
            </div>
        </div>
    );
}
