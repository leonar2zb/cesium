import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Extraer el token de la URL cuando el componente se monta
    if (router.query.token) {
      setToken(router.query.token as string);
    }
  }, [router.query.token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Token de recuperación no válido o expirado.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (password !== confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);
    try {
      // Petición al backend con los parámetros correctos según la documentación
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}reset_password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenPassword: token,
          password: password
        })
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.message || "Error al restablecer la contraseña.");
      }
    } catch (err: any) {
      setError("Error de conexión. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  // Si no hay token, mostrar mensaje de error
  if (!token && router.isReady) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-linear-65 bg-gradient-to-r from-violet-600 to-indigo-600 m-0">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Restablecer contraseña en Kunaverso</h1>
        </div>
        <div className="bg-transparent p-8 rounded-2xl w-96 transition-all duration-300 border border-[#c1a5e84d]">
          <div className="text-center text-violet-100">
            <p className="mb-4">Enlace de recuperación no válido o expirado.</p>
            <button className="w-full py-3 px-4 rounded-full text-white font-medium bg-gradient-to-b from-yellow-400 to-orange-500 border-2 border-violet-600 transition-all duration-300" onClick={() => router.push("/forgot-password")}>
              Solicitar nuevo enlace
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-65 bg-gradient-to-r from-violet-600 to-indigo-600 m-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Restablecer contraseña en Kunaverso</h1>
      </div>
      <div className="bg-transparent p-8 rounded-2xl w-96 transition-all duration-300 border border-[#c1a5e84d]">
        {success ? (
          <div className="text-center text-violet-100">
            <p>¡Contraseña restablecida correctamente!</p>
            <button className="mt-6 w-full py-3 px-4 rounded-full text-white font-medium bg-gradient-to-b from-yellow-400 to-orange-500 border-2 border-violet-600 transition-all duration-300" onClick={() => router.push("/login")}>Ir al login</button>
          </div>
        ) : (
          <>
            <div className="mb-6 text-center">
              <span className="text-violet-200 text-sm">¿Recordaste tu contraseña?</span>
              <button
                className="ml-2 text-yellow-300 underline hover:text-yellow-400 transition-colors duration-200"
                type="button"
                onClick={() => router.push("/login")}
              >
                Iniciar sesión
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Nueva contraseña"
                  className="text-white mb-1 bg-transparent border-t-transparent border-x-transparent border-b-4 border-violet-500 focus:bg-[#0000001a] px-4 py-2 mt-1 block w-full border focus:border focus:border-b-4 focus:border-[#2f0070] focus:rounded shadow-sm focus:outline-none transition-colors duration-20"
                  required
                  disabled={isLoading}
                />
                <label htmlFor="password" className="block text-sm font-semibold text-violet-300 mb-2">Nueva contraseña</label>
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  id="confirm"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Confirmar contraseña"
                  className="text-white mb-1 bg-transparent border-t-transparent border-x-transparent border-b-4 border-violet-500 focus:bg-[#0000001a] px-4 py-2 mt-1 block w-full border focus:border focus:border-b-4 focus:border-[#2f0070] focus:rounded shadow-sm focus:outline-none transition-colors duration-20"
                  required
                  disabled={isLoading}
                />
                <label htmlFor="confirm" className="block text-sm font-semibold text-violet-300 mb-2">Confirmar contraseña</label>
              </div>
              {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-full text-white font-medium transition-all duration-300 bg-gradient-to-b from-yellow-400 to-orange-500 border-2 border-violet-600 ${isLoading ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700 active:bg-blue-800"}`}
              >
                {isLoading ? "Restableciendo..." : "Restablecer contraseña"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
