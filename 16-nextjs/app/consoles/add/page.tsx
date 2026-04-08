"use client";

import { createConsoleAction } from "@/app/actions";
import { CaretLeft, Plus } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { z } from "zod";

const consoleFormSchema = z.object({
    name: z.string().min(2, "Name is required"),
    manufacturer: z.string().min(2, "Manufacturer is required"),
    releaseDate: z.string().min(1, "Release date is required"),
    description: z.string().min(10, "Description too short"),
});

export default function AddConsolePage() {
    const router = useRouter();
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [formData, setFormData] = useState({
        name: "",
        manufacturer: "",
        releaseDate: "",
        description: ""
    });
    const [preview, setPreview] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = consoleFormSchema.safeParse(formData);
        if (!validation.success) {
            setErrors(validation.error.flatten().fieldErrors);
            return;
        }

        setErrors({});

        const data = new FormData();
        data.append("name", formData.name);
        data.append("manufacturer", formData.manufacturer);
        data.append("releaseDate", formData.releaseDate);
        data.append("description", formData.description);

        const imageInput = document.getElementById("console-image") as HTMLInputElement | null;
        const file = imageInput?.files?.[0];
        if (file) {
            data.append("image", file);
        }

        const result = await createConsoleAction(data);

        if (result.success) {
            await Swal.fire({
                title: "Consola creada",
                text: `"${formData.name}" fue agregada a tu colección.`,
                icon: "success",
                timer: 1800,
                showConfirmButton: false,
                background: "#111827",
                color: "#ffffff"
            });
            router.push("/consoles");
            router.refresh();
        } else {
            Swal.fire({
                title: "Error",
                text: result.error || "No se pudo crear la consola.",
                icon: "error",
                background: "#111827",
                color: "#ffffff"
            });
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="mx-auto mb-6 max-w-2xl">
                <Link href="/consoles" className="btn btn-ghost btn-sm gap-2 text-gray-400 hover:text-white">
                    <CaretLeft size={18} /> Back
                </Link>
            </div>

            <div className="mx-auto max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-black/40 shadow-2xl">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
                    <div className="flex items-center gap-3">
                        <Plus size={24} className="text-white" />
                        <h1 className="text-2xl font-bold text-white">Add Console</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-8">
                    <input
                        type="text"
                        placeholder="Console name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input input-bordered w-full"
                    />
                    {errors.name && <p className="text-red-500">{errors.name[0]}</p>}

                    <input
                        type="text"
                        placeholder="Manufacturer"
                        value={formData.manufacturer}
                        onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                        className="input input-bordered w-full"
                    />
                    {errors.manufacturer && <p className="text-red-500">{errors.manufacturer[0]}</p>}

                    <input
                        type="date"
                        value={formData.releaseDate}
                        onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                        className="input input-bordered w-full"
                    />
                    {errors.releaseDate && <p className="text-red-500">{errors.releaseDate[0]}</p>}

                    <input
                        id="console-image"
                        type="file"
                        accept="image/*"
                        className="file-input w-full"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setPreview(file ? URL.createObjectURL(file) : null);
                        }}
                    />

                    {preview && (
                        <div className="relative h-52 w-full overflow-hidden rounded-xl border border-white/10">
                            <img src={preview} alt="Preview" className="h-full w-full object-contain bg-black/40" />
                        </div>
                    )}

                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="textarea textarea-bordered w-full"
                    />
                    {errors.description && <p className="text-red-500">{errors.description[0]}</p>}

                    <button className="btn btn-primary w-full">Create Console</button>
                </form>
            </div>
        </div>
    );
}
