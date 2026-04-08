"use client";
import { UserButton } from "@stackframe/stack";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SquaresFourIcon, JoystickIcon, GearIcon, GameControllerIcon, ListIcon, HardDrivesIcon } from "@phosphor-icons/react";

export default function SideBar({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const storageKey = "sidebar-open";
    const [isDrawerOpen, setIsDrawerOpen] = useState(() => {
        if (typeof window === "undefined") {
            return false;
        }

        const saved = window.localStorage.getItem(storageKey);
        if (saved === "true" || saved === "false") {
            return saved === "true";
        }

        return window.innerWidth >= 1024;
    });

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
            <style jsx>{`
                @keyframes ambientFloatA {
                    0% { transform: translate3d(0, 0, 0) scale(1); }
                    50% { transform: translate3d(40px, -30px, 0) scale(1.08); }
                    100% { transform: translate3d(0, 0, 0) scale(1); }
                }

                @keyframes ambientFloatB {
                    0% { transform: translate3d(0, 0, 0) scale(1); }
                    50% { transform: translate3d(-35px, 35px, 0) scale(1.12); }
                    100% { transform: translate3d(0, 0, 0) scale(1); }
                }

                @keyframes ambientPulse {
                    0% { opacity: 0.35; }
                    50% { opacity: 0.55; }
                    100% { opacity: 0.35; }
                }
            `}</style>
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
                <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(17,24,39,0.96),rgba(3,7,18,1)_58%)]">
                    <div className="pointer-events-none absolute inset-0">
                        <div
                            className="absolute left-[-8rem] top-[-6rem] h-72 w-72 rounded-full blur-3xl"
                            style={{
                                background: "radial-gradient(circle, rgba(96,165,250,0.18) 0%, rgba(96,165,250,0.07) 45%, transparent 72%)",
                                animation: "ambientFloatA 16s ease-in-out infinite, ambientPulse 10s ease-in-out infinite",
                            }}
                        />
                        <div
                            className="absolute right-[8%] top-[14%] h-80 w-80 rounded-full blur-3xl"
                            style={{
                                background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.08) 48%, transparent 74%)",
                                animation: "ambientFloatB 18s ease-in-out infinite, ambientPulse 12s ease-in-out infinite",
                            }}
                        />
                        <div
                            className="absolute bottom-[6%] left-[18%] h-72 w-72 rounded-full blur-3xl"
                            style={{
                                background: "radial-gradient(circle, rgba(244,114,182,0.14) 0%, rgba(244,114,182,0.06) 44%, transparent 72%)",
                                animation: "ambientFloatB 22s ease-in-out infinite reverse, ambientPulse 14s ease-in-out infinite",
                            }}
                        />
                        <div
                            className="absolute bottom-[-5rem] right-[-4rem] h-96 w-96 rounded-full blur-3xl"
                            style={{
                                background: "radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(192,132,252,0.07) 40%, transparent 72%)",
                                animation: "ambientFloatA 24s ease-in-out infinite reverse, ambientPulse 16s ease-in-out infinite",
                            }}
                        />
                    </div>

                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.04),transparent_18%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.03),transparent_16%),radial-gradient(circle_at_50%_75%,rgba(255,255,255,0.025),transparent_18%)]" />

                    <div className="relative z-10 p-4">{children}</div>
                </div>
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
