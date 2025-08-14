import MenuItem from "./MenuItem";

const Sidebar = () => {
    const routes = [{
        icon: '/icons/servicios.png',
        caption: 'DASHBOARD',
        url: '/dashboard'
    },
    {
        icon: '/icons/tiempo_real.png',
        caption: 'TIEMPO REAL',
        url: '/tiempo-real'
    },
    {
        icon: '/icons/clima.png',
        caption: 'CLIMA',
        url: '/clima'
    },
    {
        icon: '/icons/eventos.png',
        caption: 'EVENTOS',
        url: '/eventos'
    },
    {
        icon: '/icons/seguridad.png',
        caption: 'SEGURIDAD',
        url: '/seguridad'
    },
    {
        icon: '/icons/salud.png',
        caption: 'SALUD',
        url: '/salud'
    },
    {
        icon: '/icons/turismo.png',
        caption: 'TURISMO',
        url: '/turismo'
    },
    {
        icon: '/icons/demografia.png',
        caption: 'DEMOGRAFIA',
        url: '/demografia'
    },
    {
        icon: '/icons/servicios.png',
        caption: 'SERVICIOS',
        url: '/servicios'
    },
    {
        icon: '/icons/medio_ambiente.png',
        caption: 'MEDIO AMBIENTE',
        url: '/medio-ambiente'
    },
    {
        icon: '/icons/transporte.png',
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
                />
            )
        })}
    </>)
}
export default Sidebar;