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
// Sidebar flotante superpuesto en TODA la app, con botón para abrir/cerrar
// StreamPixel se renderiza desde el MainLayout como fondo de toda la app (no-auth)
// Import dinámico para evitar SSR y problemas de window undefined
const StreamPixel = dynamic(() => import('@/Components/StreamPixel/StreamPixel'), { ssr: false });

const MainLayout = ({ children }: MainLayoutProps) => {
  const [open, setOpen] = useState(true);
  const router = useRouter();
  const logout = useAppStore((state) => state.logout);

  const handlePersonalizeAvatar = () => {
    console.log('Personalizar avatar');
  };

  const handleMyProfile = () => {
    console.log('Mi perfil');
    // Aquí podrías navegar a una página de perfil o abrir un modal
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="relative min-h-screen w-full bg-gray-50 text-gray-900">
      {/* Botón flotante para abrir/cerrar el panel */}
      <button
        type="button"
        aria-label={open ? 'Ocultar menú' : 'Mostrar menú'}
        onClick={() => setOpen((v) => !v)}
        className="fixed top-4 left-4 z-[10050] w-24 h-24 bg-black/60 rounded-lg flex items-center justify-center hover:bg-black/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
      >
        <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" d="M4 6h16" />
          <path strokeLinecap="round" d="M4 12h16" />
          <path strokeLinecap="round" d="M4 18h16" />
        </svg>
      </button>

      {/* StreamPixel como fondo global (debajo de todo excepto overlays y contenido) */}
      <StreamPixel />

      {/* Botón de perfil fijo en la esquina superior derecha (estándar en toda la app) */}
      <ProfileDropdown
        onMyProfile={handleMyProfile}
        onPersonalizeAvatar={handlePersonalizeAvatar}
        onLogout={handleLogout}
      />

      {/* Panel flotante por delante del contenido (incl. iframes) */}
      {open && (
        <div className="fixed top-32 left-4 z-[10040] w-72 max-w-[85vw] max-h-[80vh] overflow-y-auto rounded-lg border border-white/20 bg-black/60 text-white shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
            <span className="text-sm font-semibold text-white">Menú</span>
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
              className="rounded px-2 py-1 text-white/80 hover:text-white hover:bg-white/10"
            >
              ×
            </button>
          </div>
          <nav className="flex flex-col p-2">
            <Sidebar />
          </nav>
        </div>
      )}

      {/* Contenido de las páginas por encima del StreamPixel */}
      <main className="relative z-[100] min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
