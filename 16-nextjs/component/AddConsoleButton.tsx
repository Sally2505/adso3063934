"use client";

import { PlusIcon } from "@phosphor-icons/react";
import Link from "next/link";

export default function AddConsoleButton() {
    return (
        <Link href="/consoles/add" className="btn btn-primary rounded-2xl px-4 py-2">
            <PlusIcon size={18} />
            <span className="hidden sm:inline">Add Console</span>
        </Link>
    );
}
