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
  const [open, setOpen] = useState(true);

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
