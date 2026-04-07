"use client";
import { UserButton } from "@stackframe/stack";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SquaresFourIcon, JoystickIcon, GearIcon, GameControllerIcon, ListIcon, HardDrivesIcon } from "@phosphor-icons/react";

export default function SideBar({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const storageKey = "sidebar-open";

    useEffect(() => {
        const saved = window.localStorage.getItem(storageKey);
        if (saved === "true" || saved === "false") {
            setIsDrawerOpen(saved === "true");
            return;
        }
        setIsDrawerOpen(window.innerWidth >= 1024);
    }, []);

    useEffect(() => {
        window.localStorage.setItem(storageKey, String(isDrawerOpen));
    }, [isDrawerOpen]);

    const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);
    const closeDrawerOnMobile = () => {
        if (window.innerWidth < 1024) {
            setIsDrawerOpen(false);
        }
    };

    const navigation = [
        { name: "Dashboard", href: "/dashboard", icon: SquaresFourIcon },
        { name: "Games", href: "/games", icon: JoystickIcon },
        { name: "Consoles", href: "/consoles", icon: HardDrivesIcon },
        { name: "Settings", href: "/settings", icon: GearIcon },
    ];
    return (
        <div className={`drawer ${isDrawerOpen ? "lg:drawer-open" : ""}`}>
            <input
                id="my-drawer-4"
                type="checkbox"
                className="drawer-toggle"
                checked={isDrawerOpen}
                onChange={(e) => setIsDrawerOpen(e.target.checked)}
            />
            <div className="drawer-content">
                <nav className="navbar w-full bg-base-300 ">
                    <button
                        type="button"
                        aria-label="toggle sidebar"
                        className="btn btn-square btn-ghost"
                        onClick={toggleDrawer}
                    >
                        <ListIcon size={20} />
                    </button>
                    <div className="px-4 flex gap-2 justify-center items-center">
                        <GameControllerIcon size={20} />
                        GameNextJS
                    </div>
                    <div className="ms-auto">
                        <UserButton showUserInfo={false} />
                    </div>
                </nav>
                {/* Page content here */}
                <div className="p-4">{children}</div>
            </div>

            <div className="drawer-side is-drawer-close:overflow-visible">
                <label
                    htmlFor="my-drawer-4"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                    onClick={() => setIsDrawerOpen(false)}
                ></label>
                <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                    <div className="menu w-full grow space-y-2">
                        {navigation.map((item, key) => {
                            const IconComponent = item.icon;
                            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                            return (
                                <Link
                                    href={item.href}
                                    key={key}
                                    data-tip={item.name}
                                    onClick={closeDrawerOnMobile}
                                    className={`flex gap-x-2 items-center py-2 px-2 rounded-lg is-drawer-close:tooltip is-drawer-close:tooltip-right ${isActive
                                            ? "bg-purple-600 text-purple-200"
                                            : "hover:bg-white/10 text-white"
                                        }`}
                                >
                                    <IconComponent className="size-5" />
                                    <span className="text-sm is-drawer-close:hidden">{item.name}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
