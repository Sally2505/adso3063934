import { getConsolesAction, getGameGenresAction, getGamesAction } from "@/app/actions";
import AddGameButton from "./AddGameButton";
import GameCard from "./GameCard";
import GamesFilters from "./GamesFilters";
import GamesPagination from "./GamesPagination";

type GameItem = {
    id: number;
    title: string;
    price: number;
    cover: string;
    console?: {
        name: string;
    } | null;
};

interface GamesInfoPanelProps {
    currentPage: number;
    searchQuery: string;
    genreFilter: string;
    consoleFilter: string;
}

export default async function GamesInfoPanel({
    currentPage,
    searchQuery,
    genreFilter,
    consoleFilter
}: GamesInfoPanelProps) {
    const pageSize = 12;
    const consoleId = consoleFilter ? parseInt(consoleFilter, 10) : undefined;

    const [
        { games, totalPages, success },
        consolesResponse,
        genresResponse
    ] = await Promise.all([
        getGamesAction(currentPage, pageSize, searchQuery, genreFilter, consoleId),
        getConsolesAction(),
        getGameGenresAction()
    ]);

    const consoles = consolesResponse.success ? consolesResponse.consoles : [];
    const genres = genresResponse.success ? genresResponse.genres : [];

    if (!success) {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-black/20 p-20 text-gray-500">
                <p className="text-xl font-bold text-white">Error al conectar con la base de datos</p>
                <p className="text-sm">Verifica tu conexión a Neon o el DATABASE_URL.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 md:p-8">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">My Collection</h1>
                    <div className="mt-1 flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
                        </span>
                        <p className="text-sm text-gray-400">
                            {searchQuery || genreFilter || consoleFilter
                                ? "Resultados filtrados en tu colección"
                                : "Explorando todos los juegos"}
                        </p>
                    </div>
                </div>

                <div className="relative z-40 flex w-full flex-col gap-4 lg:ms-auto lg:w-auto lg:flex-row lg:items-center">
                    <GamesFilters genres={genres} consoles={consoles} />
                    <AddGameButton />
                </div>
            </div>

            {games && games.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                    {games.map((game: GameItem) => (
                        <GameCard key={game.id} game={game} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/5 py-24">
                    <div className="mb-4 rounded-full bg-white/5 p-4">
                        <svg className="h-10 w-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white">No se encontraron juegos</h3>
                    <p className="mt-1 text-gray-500">Intenta con otro filtro o limpia la búsqueda.</p>
                </div>
            )}

            {totalPages && totalPages > 1 && (
                <GamesPagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    searchQuery={searchQuery}
                    genreFilter={genreFilter}
                    consoleFilter={consoleFilter}
                />
            )}
        </div>
    );
}
