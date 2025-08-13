import { useState } from "react";
import { useRouter } from "next/router";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}forgot_password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emailAddress: email.trim(), // Mejorar: limpiar espacios
          locale:"es",
          urlFront: window.location.origin + "/reset-password"
        })
      });
      if (!res.ok) {
        let data = {};
        try {
          data = await res.json();
        } catch {
          // Si la respuesta no es JSON, ignorar
        }
        throw new Error((data as any).message || "Error al enviar el correo de recuperación");
      }
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-65 bg-gradient-to-r from-violet-600 to-indigo-600 m-0">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Recuperar contraseña en Kunaverso</h1>
      </div>
      <div className="bg-transparent p-8 rounded-2xl w-96 transition-all duration-300 border border-[#c1a5e84d]">
        {sent ? (
          <div className="text-center text-violet-100">
            <p>Si el email existe, recibirás un enlace para restablecer tu contraseña.</p>
            <button className="mt-6 w-full py-3 px-4 rounded-full text-white font-medium bg-gradient-to-b from-yellow-400 to-orange-500 border-2 border-violet-600 transition-all duration-300" onClick={() => router.push("/login")}>Volver al login</button>
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
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Escriba su email"
                  className="text-white mb-1 bg-transparent border-t-transparent border-x-transparent border-b-4 border-violet-500 focus:bg-[#0000001a] px-4 py-2 mt-1 block w-full border focus:border focus:border-b-4 focus:border-[#2f0070] focus:rounded shadow-sm focus:outline-none transition-colors duration-20"
                  required
                  disabled={isLoading}
                />
                <label htmlFor="email" className="block text-sm font-semibold text-violet-300 mb-2">Email</label>
              </div>
              {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center py-3 px-4 rounded-full text-white font-medium transition-all duration-300 bg-gradient-to-b from-yellow-400 to-orange-500 border-2 border-violet-600 ${isLoading ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700 active:bg-blue-800"}`}
              >
                {isLoading ? "Enviando..." : "Enviar enlace"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
