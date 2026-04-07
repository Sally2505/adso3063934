import GamesInfo from "@/component/GamesInfo";

interface PageProps {
    searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function GamesPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const currentPage = parseInt(params.page || "1");
    const searchQuery = params.search || "";

    return <GamesInfo currentPage={currentPage} searchQuery={searchQuery} />;
}
