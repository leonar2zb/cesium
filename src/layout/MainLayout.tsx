import { ReactNode, useState } from 'react';
import Sidebar from '@/Components/Sidebar/Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

// Layout principal de la app (excluye páginas de auth desde _app.tsx)
// Sidebar flotante superpuesto en TODA la app, con botón para abrir/cerrar
const MainLayout = ({ children }: MainLayoutProps) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
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

      <main className="min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
