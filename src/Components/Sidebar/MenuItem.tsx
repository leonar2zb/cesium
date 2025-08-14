import Link from "next/link";
import { ReactNode } from "react";

type MenuItemProps = {
    icon: ReactNode; // supports inline SVG or any React element
    caption: string;
    url: string;
};

const MenuItem = ({ icon, caption, url }: MenuItemProps) => (
    <Link href={url} className="flex items-center gap-2 p-2 hover:bg-white/10 text-white">
        <span className="w-6 h-6 flex items-center justify-center" aria-hidden>
            {icon}
        </span>
        <span className="hidden md:inline">{caption}</span> {/* Oculto en móvil */}
    </Link>
);

export default MenuItem;
