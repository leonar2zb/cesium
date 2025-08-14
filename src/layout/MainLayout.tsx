import { ReactNode, useState } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '@/Components/Sidebar/Sidebar';
import ProfileDropdown from '@/Components/Profile/ProfileDropdown';
import { useRouter } from 'next/router';
import { useAppStore } from '@/store/useAppStore';

interface MainLayoutProps {
  children: ReactNode;
}

// Layout principal de la app (excluye páginas de auth desde _app.tsx)
// Sidebar fijo a la izquierda ocupando todo el alto, con dos modos: expandido (icono+texto) y colapsado (solo iconos con tooltip)
// StreamPixel se renderiza desde el MainLayout como fondo de toda la app (no-auth)
// Import dinámico para evitar SSR y problemas de window undefined
const StreamPixel = dynamic(() => import('@/Components/StreamPixel/StreamPixel'), { ssr: false });

const MainLayout = ({ children }: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false); // false = expandido, true = colapsado
  const router = useRouter();
  const logout = useAppStore((state) => state.logout);

  const handlePersonalizeAvatar = () => {
    console.log('Personalizar avatar');
  };

  const handleMyProfile = () => {
    console.log('Mi perfil');
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const sidebarWidthExpanded = 'w-64';
  const sidebarWidthCollapsed = 'w-20';

  return (
    <div className="relative min-h-screen w-full bg-gray-50 text-gray-900">
      {/* StreamPixel como fondo global (debajo de todo excepto overlays y contenido) */}
      <StreamPixel />

      {/* Sidebar fijo a la izquierda a lo largo de toda la app */}
      <aside
        className={`fixed left-0 top-0 h-screen z-[10040] border-r border-white/10 bg-black/60 text-white backdrop-blur-sm ${collapsed ? sidebarWidthCollapsed : sidebarWidthExpanded}`}
      >
        <div className="flex items-center justify-between px-3 py-3 border-b border-white/10">
          <span className={`text-sm font-semibold text-white transition-opacity ${collapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>Menú</span>
          <button
            type="button"
            aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
            onClick={() => setCollapsed((v) => !v)}
            className="ml-auto rounded-md p-2 text-white/90 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            {/* Icono de colapsar/expandir */}
            {collapsed ? (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            )}
          </button>
        </div>
        <nav className="flex flex-col p-2">
          <Sidebar collapsed={collapsed} />
        </nav>
      </aside>

      {/* Botón de perfil fijo en la esquina superior derecha (estándar en toda la app) */}
      <ProfileDropdown
        onMyProfile={handleMyProfile}
        onPersonalizeAvatar={handlePersonalizeAvatar}
        onLogout={handleLogout}
      />

      {/* Contenido de las páginas por encima del StreamPixel y desplazado a la derecha del sidebar */}
      <main
        className={`relative z-[100] min-h-screen transition-[margin] duration-200 ease-out ${collapsed ? 'ml-20' : 'ml-64'} p-4 md:p-6 lg:p-8`}
      >
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
