import { getConsolesAction } from "@/app/actions";
import AddConsoleButton from "./AddConsoleButton";
import ConsoleCard from "./ConsoleCard";

type ConsoleItem = {
    id: number;
    name: string;
    image: string;
    manufacturer: string;
};

export default async function ConsolesPanel() {
    const result = await getConsolesAction();
    const consoles = result.success ? result.consoles ?? [] : [];

    if (!result.success) {
        return (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-black/20 p-20 text-gray-500">
                <p className="text-xl font-bold text-white">Error al conectar con la base de datos</p>
                <p className="text-sm">No se pudieron cargar las consolas.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 md:p-8">
            <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Consoles</h1>
                    <p className="mt-1 text-sm text-gray-400">Explora tu colección de plataformas.</p>
                </div>

                <div className="flex w-full justify-start lg:w-auto lg:justify-end">
                    <AddConsoleButton />
                </div>
            </div>

            {consoles.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                    {consoles.map((consoleItem: ConsoleItem) => (
                        <ConsoleCard key={consoleItem.id} consoleItem={consoleItem} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/5 py-24">
                    <h3 className="text-xl font-semibold text-white">No hay consolas registradas</h3>
                    <p className="mt-1 text-gray-500">Agrega tu primera consola para empezar.</p>
                </div>
            )}
        </div>
    );
}
