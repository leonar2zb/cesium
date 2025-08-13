import MenuItem from "./MenuItem";

const Sidebar = () => {
    const routes = [{
        icon: '/icons/tiempo_real.png',
        caption: 'TIEMPO REAL',
        url: ''
    },
    {
        icon: '/icons/clima.png',
        caption: 'CLIMA',
        url: ''
    },
    {
        icon: '/icons/eventos.png',
        caption: 'EVENTOS',
        url: ''
    },
    {
        icon: '/icons/seguridad.png',
        caption: 'SEGURIDAD',
        url: ''
    },
    {
        icon: '/icons/salud.png',
        caption: 'SALUD',
        url: ''
    },
    {
        icon: '/icons/turismo.png',
        caption: 'TURISMO',
        url: ''
    },
    {
        icon: '/icons/demografia.png',
        caption: 'DEMOGRAFIA',
        url: ''
    },
    {
        icon: '/icons/servicios.png',
        caption: 'SERVICIOS',
        url: ''
    },
    {
        icon: '/icons/medio_ambiente.png',
        caption: 'MEDIO AMBIENTE',
        url: ''
    },
    {
        icon: '/icons/transporte.png',
        caption: 'TRANSPORTE',
        url: ''
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