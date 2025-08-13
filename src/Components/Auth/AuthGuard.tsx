import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppStore } from '../../store/useAppStore';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const user = useAppStore((state) => state.user);
  const isHydrated = useAppStore((state) => state.isHydrated);

  useEffect(() => {
    // Esperamos a que el estado se haya hidratado antes de tomar decisiones de redirección
    if (!isHydrated) return;

    // Páginas que no requieren autenticación
    const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
    const isPublicRoute = publicRoutes.some(route => router.pathname.startsWith(route));

    // Si no hay usuario (no autenticado) y no estamos en una ruta pública, redirigir a login
    if (!user && !isPublicRoute) {
      router.push('/login');
    }

    // Si el usuario está autenticado y está en la página de login, redirigir al dashboard
    if (user && router.pathname === '/login') {
      router.push('/dashboard');
    }
  }, [user, router, isHydrated]);

  // Si el estado aún no se ha hidratado, mostramos nada o un spinner para evitar redirecciones incorrectas
  if (!isHydrated) {
    return null; // O puedes mostrar un spinner/loader aquí
  }

  // Páginas que no requieren autenticación
  const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  const isPublicRoute = publicRoutes.some(route => router.pathname.startsWith(route));

  // Si estamos en una ruta pública o el usuario existe, renderizar children
  if (isPublicRoute || user) {
    return <>{children}</>;
  }

  // Devolver null durante la redirección para evitar flash de contenido
  return null;
};

export default AuthGuard;
