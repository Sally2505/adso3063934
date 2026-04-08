import GamesInfoPanel from "@/component/GamesInfoPanel";

interface PageProps {
    searchParams: Promise<{ page?: string; search?: string; genre?: string; console?: string }>;
}

export default async function GamesPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const currentPage = parseInt(params.page || "1");
    const searchQuery = params.search || "";
    const genreFilter = params.genre || "";
    const consoleFilter = params.console || "";

    return (
        <GamesInfoPanel
            currentPage={currentPage}
            searchQuery={searchQuery}
            genreFilter={genreFilter}
            consoleFilter={consoleFilter}
        />
    );
}
