import { getConsoleByIdAction } from "@/app/actions";
import EditConsoleForm from "@/component/EditConsoleForm";

export default async function EditConsolePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const consoleId = parseInt(id);
    const result = await getConsoleByIdAction(consoleId);

    if (!result.success || !result.console) {
        return <div className="p-10 text-center text-white">Consola no encontrada</div>;
    }

    return (
        <EditConsoleForm
            consoleId={consoleId}
            initialData={{
                name: result.console.name,
                manufacturer: result.console.manufacturer,
                releaseDate: new Date(result.console.releaseDate).toISOString().split("T")[0],
                description: result.console.description,
                image: result.console.image || ""
            }}
        />
    );
}
