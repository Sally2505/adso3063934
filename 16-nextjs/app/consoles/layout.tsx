import { redirect } from "next/navigation";
import SideBar from "@/component/SideBar";
import { stackServerApp } from "@/stack/server";

export default async function ConsolesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await stackServerApp.getUser();

    if (!user) {
        redirect("/");
    }

    return <SideBar>{children}</SideBar>;
}
