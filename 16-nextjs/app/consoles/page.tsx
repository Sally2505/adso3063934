import { getConsolesAction } from "@/app/actions";

export default async function ConsolesPage() {
    const result = await getConsolesAction();
    const consoles = result.success ? result.consoles ?? [] : [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-white">Consoles</h1>
                <p className="text-sm text-white/70">Lista de consolas registradas.</p>
            </div>

            {!result.success ? (
                <div className="alert alert-error">No se pudieron cargar las consolas.</div>
            ) : consoles.length === 0 ? (
                <div className="alert alert-info">No hay consolas registradas.</div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-base-200">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Manufacturer</th>
                                <th>Release Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {consoles.map((console) => (
                                <tr key={console.id}>
                                    <td>{console.id}</td>
                                    <td>{console.name}</td>
                                    <td>{console.manufacturer}</td>
                                    <td>{new Date(console.releaseDate).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
