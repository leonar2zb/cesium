import { ReactNode, useState } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '@/Components/Sidebar/Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

// Layout principal de la app (excluye páginas de auth desde _app.tsx)
// - En /dashboard: sidebar flotante superpuesto con botón de abrir/cerrar (por delante del iframe)
// - En el resto: sidebar fijo a la izquierda y contenido a la derecha
const MainLayout = ({ children }: MainLayoutProps) => {
  const router = useRouter();
  const isOverlay = router.pathname === '/dashboard';
  const [open, setOpen] = useState(true);

  if (isOverlay) {
    return (
      <div className="min-h-screen w-full bg-gray-50 text-gray-900">
        {/* Botón flotante para abrir/cerrar el panel */}
        <button
          type="button"
          aria-label={open ? 'Ocultar menú' : 'Mostrar menú'}
          onClick={() => setOpen((v) => !v)}
          className="fixed top-4 left-4 z-[10050] rounded-full bg-white/90 hover:bg-white border border-gray-200 shadow-md px-3 py-2 text-sm font-medium text-gray-700 backdrop-blur"
        >
          {open ? 'Cerrar menú' : 'Menú'}
        </button>

        {/* Panel flotante por delante del iframe */}
        {open && (
          <div className="fixed top-16 left-4 z-[10040] w-72 max-w-[85vw] max-h-[80vh] overflow-y-auto rounded-lg border border-white/20 bg-black/60 text-white shadow-2xl backdrop-blur-sm">
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
  }

  // Layout por defecto con sidebar fijo
  return (
    <div className="min-h-screen w-full flex bg-gray-50 text-gray-900">
      <aside className="w-64 shrink-0 border-r border-white/10 bg-black/70 text-white sticky top-0 h-screen overflow-y-auto backdrop-blur-sm">
        <div className="p-4 text-sm font-semibold text-white">Menú</div>
        <nav className="flex flex-col">
          <Sidebar />
        </nav>
      </aside>
      <main className="flex-1 min-h-screen p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
