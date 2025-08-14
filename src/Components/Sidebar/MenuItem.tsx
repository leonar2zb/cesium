import Link from "next/link";
import { ReactNode } from "react";

type MenuItemProps = {
    icon: ReactNode; // supports inline SVG or any React element
    caption: string;
    url: string;
    collapsed?: boolean;
};

const MenuItem = ({ icon, caption, url, collapsed = false }: MenuItemProps) => (
    <div className="relative group">
        <Link href={url} className={`flex items-center gap-2 p-2 rounded-md hover:bg-white/10 text-white ${collapsed ? 'justify-center' : ''}`}>
            <span className="w-6 h-6 flex items-center justify-center" aria-hidden>
                {icon}
            </span>
            {!collapsed && (
                <span className="truncate">{caption}</span>
            )}
        </Link>
        {/* Tooltip cuando está colapsado */}
        {collapsed && (
            <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block z-[10050] whitespace-nowrap rounded px-2 py-1 text-xs bg-black/70 text-white border border-white/10 shadow-lg">
                {caption}
            </div>
        )}
    </div>
);

export default MenuItem;
