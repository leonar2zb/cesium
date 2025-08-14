import Link from "next/link";

type MenuItemProps = {
    icon: string;
    caption: string;
    url: string;
};

const MenuItem = ({ icon, caption, url }: MenuItemProps) => (
    <Link href={url} className="flex items-center gap-2 p-2 hover:bg-white/10 text-white">
        <img src={icon} alt={caption} className="w-6 h-6 invert brightness-0" />
        <span className="hidden md:inline">{caption}</span> {/* Oculto en móvil */}
    </Link>
);

export default MenuItem;
