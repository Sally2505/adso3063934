import DashboardStats from "@/component/DashboardStats";

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            <div className="rounded-lg border border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="mt-2 text-sm opacity-80">
                    Análisis completo de tu catálogo de videojuegos
                </p>
            </div>
            
            <DashboardStats />
        </div>
    );
}
