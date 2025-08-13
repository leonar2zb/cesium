import { useState } from "react";
import { useAppStore } from "../../store/useAppStore";
import { useRouter } from "next/router";
import Link from "next/link";

export default function LoginBox() {
    const router = useRouter();
    const login = useAppStore((state) => state.login); // estas maneras de usar el store son más adecuadas que la destructuración porque no crean una nueva referencia cada vez y
    const errorAPI = useAppStore((state) => state.errorAPI); // evitan problemas de re-renderizados innecesarios y permiten un mejor control del estado global

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) return;

        setIsLoading(true);
        try {
            await login(email, password);
            // Redirect to dashboard after successful login
            router.push("/dashboard");
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-65 bg-gradient-to-r from-violet-600 to-indigo-600 m-0">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Iniciar sesión en Kunaverso</h1>
            </div>
            <div className="bg-transparent p-8 rounded-2xl  w-96 transition-all duration-300  border border-[#c1a5e84d]">
                {/* Letrero profesional para registro */}
                <div className="mb-6 text-center">
                    <span className="text-violet-200 text-sm">¿Aún no tienes cuenta?</span>
                    <button
                        className="ml-2 text-yellow-300 underline hover:text-yellow-400 transition-colors duration-200"
                        type="button"
                        onClick={() => router.push("/register")}
                    >
                        Regístrate aquí
                    </button>
                </div>
                <div className="mb-6">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Escriba su email"
                        className="text-white mb-1 bg-transparent border-t-transparent border-x-transparent border-b-4 border-violet-500 focus:bg-[#0000001a] px-4 py-2 mt-1 block w-full border focus:border focus:border-b-4 focus:border-[#2f0070] focus:rounded shadow-sm focus:outline-none transition-colors duration-20"
                        required
                        disabled={isLoading}
                    />
                    <label htmlFor="email" className="block text-sm font-semibold text-violet-300 mb-2">Email</label>
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Escriba su contraseña"
                        className="text-white mb-1 bg-transparent border-t-transparent border-x-transparent border-b-4 border-violet-500 focus:bg-[#0000001a] px-4 py-2 mt-1 block w-full border focus:border focus:border-b-4 focus:border-[#2f0070] focus:rounded shadow-sm focus:outline-none transition-colors duration-20"
                        required
                        disabled={isLoading}
                    />
                    <label htmlFor="password" className="block text-sm font-semibold text-violet-300 mb-2">Password</label>
                </div>
                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-full text-white font-medium transition-all duration-300 bg-gradient-to-b from-yellow-400 to-orange-500 border-2 border-violet-600 ${
                        isLoading 
                            ? "bg-blue-400 cursor-not-allowed" 
                            : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                    }`}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Iniciando sesión...
                        </>
                    ) : (
                        "Iniciar sesión"
                    )}
                </button>
                {errorAPI && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                        <p className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                            </svg>
                            {errorAPI}
                        </p>
                    </div>
                )}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                    <Link href="/forgot-password" className="text-violet-200 text-sm hover:underline mb-2 sm:mb-0">¿Olvidaste tu contraseña?</Link>
                </div>
            </div>
        </div>
    );
}
