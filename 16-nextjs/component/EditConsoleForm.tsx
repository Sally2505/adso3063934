"use client";

import { updateConsoleAction } from "@/app/actions";
import { CaretLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { z } from "zod";
import { getImageSrc } from "@/lib/images";

const editConsoleSchema = z.object({
    name: z.string().min(2, "El nombre es obligatorio"),
    manufacturer: z.string().min(2, "El fabricante es obligatorio"),
    releaseDate: z.string().min(1, "La fecha es obligatoria"),
    description: z.string().min(10, "La descripción es muy corta"),
});

type EditConsoleFormProps = {
    consoleId: number;
    initialData: {
        name: string;
        manufacturer: string;
        releaseDate: string;
        description: string;
        image: string;
    };
};

export default function EditConsoleForm({ consoleId, initialData }: EditConsoleFormProps) {
    const router = useRouter();
    const defaultImage = "/imgs/no-cover.png";
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const [preview, setPreview] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validation = editConsoleSchema.safeParse(formData);
        if (!validation.success) {
            setErrors(validation.error.flatten().fieldErrors);
            return;
        }

        setErrors({});

        const data = new FormData();
        const imageInput = document.getElementById("edit-console-image") as HTMLInputElement | null;
        const file = imageInput?.files?.[0];
        if (file) {
            data.append("newImage", file);
        }

        const result = await updateConsoleAction(consoleId, formData, data);

        if (result.success) {
            await Swal.fire({
                title: "Cambios guardados",
                text: `"${formData.name}" fue actualizada.`,
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
                text: result.error || "No se pudo actualizar.",
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
                    <h1 className="text-2xl font-bold text-white">
                        Editando: <span className="opacity-80">{formData.name}</span>
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 p-8">
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name[0]}</p>}

                    <input
                        type="text"
                        className="input input-bordered w-full"
                        value={formData.manufacturer}
                        onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    />
                    {errors.manufacturer && <p className="text-sm text-red-500">{errors.manufacturer[0]}</p>}

                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={formData.releaseDate}
                        onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                    />
                    {errors.releaseDate && <p className="text-sm text-red-500">{errors.releaseDate[0]}</p>}

                    <textarea
                        className="textarea textarea-bordered w-full"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description[0]}</p>}

                    <input
                        id="edit-console-image"
                        type="file"
                        accept="image/*"
                        className="file-input w-full"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            setPreview(file ? URL.createObjectURL(file) : null);
                        }}
                    />

                    <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/5 p-4">
                        <img
                            src={preview ?? getImageSrc(formData.image, defaultImage)}
                            alt="Preview"
                            className="h-28 w-20 rounded-lg object-cover shadow-md"
                            onError={(e) => { (e.target as HTMLImageElement).src = defaultImage; }}
                        />
                        <p className="text-xs text-gray-500">
                            {preview ? "Nueva imagen seleccionada" : "Imagen actual de la consola"}
                        </p>
                    </div>

                    <div className="flex gap-4 pt-2">
                        <button type="submit" className="btn btn-primary flex-1">Guardar Cambios</button>
                        <button type="button" onClick={() => router.back()} className="btn btn-ghost">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
