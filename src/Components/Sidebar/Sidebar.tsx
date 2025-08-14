import MenuItem from "./MenuItem";

// Distinct inline SVG icons (outline, currentColor) for each route
const HomeIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5L12 3l9 7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10v10h5v-6h4v6h5V10" />
  </svg>
);

const PulseIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l2-4 4 8 2-4h6" />
  </svg>
);

const SunCloudIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 18H7a4 4 0 1 1 1.1-7.87A5 5 0 0 1 17 9a4 4 0 0 1 0 8z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2M4.22 4.22l1.42 1.42M2 12h2M18 4l-1.41 1.41M20 12h2" />
  </svg>
);

const CalendarIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 2v4M8 2v4M3 10h18" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z" />
    <circle cx="12" cy="11" r="2" />
  </svg>
);

const UsersIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CogIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.65 1.65 0 0 0 15 19.4a1.65 1.65 0 0 0-1 .6 1.65 1.65 0 0 0-.33 1.82 2 2 0 1 1-3.32 0 1.65 1.65 0 0 0-.33-1.82 1.65 1.65 0 0 0-1-.6 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15 1.65 1.65 0 0 0 4 14a1.65 1.65 0 0 0-.6-1 1.65 1.65 0 0 0-1.82-.33 2 2 0 1 1 0-3.32 1.65 1.65 0 0 0 1.82-.33 1.65 1.65 0 0 0 .6-1 1.65 1.65 0 0 0 .6-1.82 2 2 0 1 1 3.32 0 1.65 1.65 0 0 0 1 .6c.35.07.69.2 1 .4.31-.2.65-.33 1-.4a1.65 1.65 0 0 0 1-.6 2 2 0 1 1 3.32 0 1.65 1.65 0 0 0 .6 1c.2.31.33.65.4 1 .35.07.69.2 1 .4.31-.2.65-.33 1-.4a1.65 1.65 0 0 0 1-.6 2 2 0 1 1 2.83 2.83 1.65 1.65 0 0 0-.6 1c0 .35.13.69.4 1 .31.2.65.33 1 .4z" />
  </svg>
);

const LeafIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 21c8 0 14-6 14-14 0-1 0-2-1-2-8 0-14 6-14 14 0 1 1 2 1 2z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 21c0-4 4-8 8-8" />
  </svg>
);

const BusIcon = () => (
  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="3" width="14" height="13" rx="2" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 16l-1 3h3M19 16l1 3h-3" />
    <circle cx="7.5" cy="19.5" r="1.5" />
    <circle cx="16.5" cy="19.5" r="1.5" />
  </svg>
);

type SidebarProps = {
  collapsed?: boolean;
};

const Sidebar = ({ collapsed = false }: SidebarProps) => {
    const routes = [{
        icon: <HomeIcon />,
        caption: 'DASHBOARD',
        url: '/dashboard'
    },
    {
        icon: <PulseIcon />,
        caption: 'TIEMPO REAL',
        url: '/tiempo-real'
    },
    {
        icon: <SunCloudIcon />,
        caption: 'CLIMA',
        url: '/clima'
    },
    {
        icon: <CalendarIcon />,
        caption: 'EVENTOS',
        url: '/eventos'
    },
    {
        icon: <ShieldIcon />,
        caption: 'SEGURIDAD',
        url: '/seguridad'
    },
    {
        icon: <HeartIcon />,
        caption: 'SALUD',
        url: '/salud'
    },
    {
        icon: <MapPinIcon />,
        caption: 'TURISMO',
        url: '/turismo'
    },
    {
        icon: <UsersIcon />,
        caption: 'DEMOGRAFIA',
        url: '/demografia'
    },
    {
        icon: <CogIcon />,
        caption: 'SERVICIOS',
        url: '/servicios'
    },
    {
        icon: <LeafIcon />,
        caption: 'MEDIO AMBIENTE',
        url: '/medio-ambiente'
    },
    {
        icon: <BusIcon />,
        caption: 'TRANSPORTE',
        url: '/transporte'
    }
    ]
    return (<>
        {routes.map((route, index) => {
            return (
                <MenuItem
                    key={index}
                    icon={route.icon}
                    caption={route.caption}
                    url={route.url}
                    collapsed={collapsed}
                />
            )
        })}
    </>)
}
export default Sidebar;