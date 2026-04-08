"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const STORAGE_KEY = "games-last-query";

export default function GamesPageState() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const queryString = searchParams.toString();

        if (queryString) {
            window.sessionStorage.setItem(STORAGE_KEY, queryString);
            return;
        }

        const navigationEntry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
        const isReload = navigationEntry?.type === "reload";
        const savedQuery = window.sessionStorage.getItem(STORAGE_KEY);

        if (isReload && savedQuery) {
            router.replace(`${pathname}?${savedQuery}`);
        }
    }, [pathname, router, searchParams]);

    return null;
}
