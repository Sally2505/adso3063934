'use client';

import { useEffect, useState } from 'react';
import { getDashboardStatsAction } from '@/app/actions';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: string;
    color: string;
}

function StatCard({ title, value, icon, color }: StatCardProps) {
    const colorClasses: { [key: string]: string } = {
        blue: 'border-blue-500/20 bg-blue-500/5',
        green: 'border-green-500/20 bg-green-500/5',
        yellow: 'border-yellow-500/20 bg-yellow-500/5',
        purple: 'border-purple-500/20 bg-purple-500/5',
    };

    return (
        <div className={`rounded-lg border p-6 ${colorClasses[color] || colorClasses.blue}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm opacity-70">{title}</p>
                    <p className="mt-2 text-2xl font-bold">{value}</p>
                </div>
                <div className={`text-4xl opacity-20`}>{icon}</div>
            </div>
        </div>
    );
}

export default function DashboardStats() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadStats() {
            try {
                setLoading(true);
                const result = await getDashboardStatsAction();
                if (result.success) {
                    setStats(result.stats);
                } else {
                    setError(result.error);
                }
            } catch (err) {
                setError('Error cargando estadísticas');
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        loadStats();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-24 rounded-lg bg-base-300"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (error || !stats) {
        return (
            <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
                <p className="text-red-400">{error || 'Error cargando estadísticas'}</p>
            </div>
        );
    }

    const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

    return (
        <div className="space-y-8">
            {/* Tarjetas de estadísticas principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total de Juegos"
                    value={stats.totalGames}
                    icon="🎮"
                    color="blue"
                />
                <StatCard
                    title="Precio Total"
                    value={`$${stats.totalPrice.toFixed(2)}`}
                    icon="💵"
                    color="green"
                />
                <StatCard
                    title="Precio Promedio"
                    value={`$${stats.averagePrice.toFixed(2)}`}
                    icon="📊"
                    color="yellow"
                />
                <StatCard
                    title="Total Consolas"
                    value={stats.gamesByConsole.length}
                    icon="🖥️"
                    color="purple"
                />
            </div>

            {/* Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Gráfico de barras - Juegos por consola */}
                {stats.gamesByConsole.length > 0 && (
                    <div className="rounded-lg border border-white/10 bg-base-200 p-6">
                        <h3 className="mb-4 text-lg font-semibold">Juegos por Consola</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={stats.gamesByConsole}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                                <YAxis stroke="rgba(255,255,255,0.5)" />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                    }}
                                />
                                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}

                {/* Gráfico de pastel - Distribución de juegos */}
                {stats.gamesByConsole.filter((c: any) => c.count > 0).length > 0 && (
                    <div className="rounded-lg border border-white/10 bg-base-200 p-6">
                        <h3 className="mb-4 text-lg font-semibold">Distribución de Juegos</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={stats.gamesByConsole.filter((c: any) => c.count > 0)}
                                    dataKey="count"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                >
                                    {stats.gamesByConsole.map((_: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>

            {/* Tabla de precios por consola */}
            {stats.priceByConsole.length > 0 && (
                <div className="rounded-lg border border-white/10 bg-base-200 p-6">
                    <h3 className="mb-4 text-lg font-semibold">Análisis de Precios por Consola</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="px-4 py-3 text-left">Consola</th>
                                    <th className="px-4 py-3 text-right">Juegos</th>
                                    <th className="px-4 py-3 text-right">Precio Total</th>
                                    <th className="px-4 py-3 text-right">Precio Promedio</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.priceByConsole.map((row: any) => (
                                    <tr key={row.id} className="border-b border-white/5 hover:bg-white/5 transition">
                                        <td className="px-4 py-3">{row.name}</td>
                                        <td className="px-4 py-3 text-right">{row.gameCount}</td>
                                        <td className="px-4 py-3 text-right font-semibold">${row.totalPrice.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-right">${row.avgPrice.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
