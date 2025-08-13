import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ResetPasswordLogin() {
  const router = useRouter();

  useEffect(() => {
    // Extraer el token de la URL
    const { token, urlreturn } = router.query;

    if (token) {
      // Redirigir a la página de reset-password con el token como parámetro
      router.push(`/reset-password?token=${token}`);
    } else {
      // Si no hay token, redirigir al login
      router.push('/login');
    }
  }, [router.query, router]);

  // Mostrar un mensaje de carga mientras se procesa la redirección
  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-65 bg-gradient-to-r from-violet-600 to-indigo-600">
      <div className="text-white text-center">
        <div className="mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
        <p>Procesando enlace de recuperación...</p>
      </div>
    </div>
  );
}
