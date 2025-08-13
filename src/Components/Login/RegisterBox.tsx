import { useState } from "react";
import { useRouter } from "next/router";
import { registerUser } from "@/Services/Sesion";
import type { RegisterData } from "@/Types/types";

export default function RegisterBox() {
    const router = useRouter();
    const [formData, setFormData] = useState<RegisterData>({
        emailAddress: "",
        password: "",
        firstName: "",
        lastName: "",
        telefono: "",
        // Campos requeridos por el backend con valores por defecto
        sexo: "m",
        direccion: "Sin especificar",
        moneda: 840,
        idioma: "es",
        skype: "",
        fechaNacimiento: "2000-01-01"
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Para el campo moneda, convertir a número
        if (name === "moneda") {
            setFormData({
                ...formData,
                [name]: parseInt(value, 10)
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validateForm = () => {
        if (!formData.emailAddress || !formData.password || !confirmPassword ||
            !formData.firstName || !formData.lastName || !formData.telefono) {
            setError("Todos los campos son obligatorios.");
            return false;
        }
        if (formData.password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return false;
        }
        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.emailAddress)) {
            setError("Por favor, introduce un email válido.");
            return false;
        }
        return true;
    };

    const handleRegister = async () => {
        setError("");

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            const result = await registerUser(formData);
            if (result.status === 200) {
                setSuccess(true);
                // Redirección automática después de 2 segundos
                // setTimeout(() => {
                //     router.push("/login");
                // }, 2000);
            } else {
                setError( "Error al registrar usuario");
            }
        } catch (err: any) {
            setError(err.message || "Error inesperado durante el registro");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-linear-65 bg-gradient-to-r from-violet-600 to-indigo-600 m-0">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Registro de usuario en Kunaverso</h1>
            </div>
            <div className="bg-transparent p-8 rounded-2xl w-full max-w-xl transition-all duration-300 border border-[#c1a5e84d]">
                {success ? (
                    <div className="text-center text-violet-100">
                        <p>¡Registro exitoso! Ahora puedes iniciar sesión.</p>
                        <button className="mt-6 w-full py-3 px-4 rounded-full text-white font-medium bg-gradient-to-b from-yellow-400 to-orange-500 border-2 border-violet-600 transition-all duration-300" onClick={() => router.push("/login")}>Ir al login</button>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 text-center">
                            <span className="text-violet-200 text-sm">¿Ya tienes cuenta?</span>
                            <button
                                className="ml-2 text-yellow-300 underline hover:text-yellow-400 transition-colors duration-200"
                                type="button"
                                onClick={() => router.push("/login")}
                            >
                                Inicia sesión aquí
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Nombre */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="Nombre *"
                                    className="text-white mb-1 bg-transparent border-t-transparent border-x-transparent border-b-4 border-violet-500 focus:bg-[#0000001a] px-4 py-2 mt-1 block w-full border focus:border focus:border-b-4 focus:border-[#2f0070] focus:rounded shadow-sm focus:outline-none transition-colors duration-20"
                                    required
                                    disabled={isLoading}
                                />
                                <label htmlFor="firstName" className="block text-sm font-semibold text-violet-300 mb-2">Nombre *</label>
                            </div>

                            {/* Apellidos */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Apellidos *"
                                    className="text-white mb-1 bg-transparent border-t-transparent border-x-transparent border-b-4 border-violet-500 focus:bg-[#0000001a] px-4 py-2 mt-1 block w-full border focus:border focus:border-b-4 focus:border-[#2f0070] focus:rounded shadow-sm focus:outline-none transition-colors duration-20"
                                    required
                                    disabled={isLoading}
                                />
                                <label htmlFor="lastName" className="block text-sm font-semibold text-violet-300 mb-2">Apellidos *</label>
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <input
                                    type="email"
                                    id="emailAddress"
                                    name="emailAddress"
                                    value={formData.emailAddress}
                                    onChange={handleInputChange}
                                    placeholder="Escriba su email *"
                                    className="text-white mb-1 bg-transparent border-t-transparent border-x-transparent border-b-4 border-violet-500 focus:bg-[#0000001a] px-4 py-2 mt-1 block w-full border focus:border focus:border-b-4 focus:border-[#2f0070] focus:rounded shadow-sm focus:outline-none transition-colors duration-20"
                                    required
                                    disabled={isLoading}
                                />
                                <label htmlFor="emailAddress" className="block text-sm font-semibold text-violet-300 mb-2">Email *</label>
                            </div>

                            {/* Teléfono */}
                            <div className="mb-4">
                                <input
                                    type="tel"
                                    id="telefono"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    placeholder="Teléfono *"
                                    className="text-white mb-1 bg-transparent border-t-transparent border-x-transparent border-b-4 border-violet-500 focus:bg-[#0000001a] px-4 py-2 mt-1 block w-full border focus:border focus:border-b-4 focus:border-[#2f0070] focus:rounded shadow-sm focus:outline-none transition-colors duration-20"
                                    required
                                    disabled={isLoading}
                                />
                                <label htmlFor="telefono" className="block text-sm font-semibold text-violet-300 mb-2">Teléfono *</label>
                            </div>

                            {/* Contraseña */}
                            <div className="mb-4">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Contraseña *"
                                    className="text-white mb-1 bg-transparent border-t-transparent border-x-transparent border-b-4 border-violet-500 focus:bg-[#0000001a] px-4 py-2 mt-1 block w-full border focus:border focus:border-b-4 focus:border-[#2f0070] focus:rounded shadow-sm focus:outline-none transition-colors duration-20"
                                    required
                                    disabled={isLoading}
                                />
                                <label htmlFor="password" className="block text-sm font-semibold text-violet-300 mb-2">Contraseña *</label>
                            </div>

                            {/* Confirmar Contraseña */}
                            <div className="mb-4">
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Repetir contraseña *"
                                    className="text-white mb-1 bg-transparent border-t-transparent border-x-transparent border-b-4 border-violet-500 focus:bg-[#0000001a] px-4 py-2 mt-1 block w-full border focus:border focus:border-b-4 focus:border-[#2f0070] focus:rounded shadow-sm focus:outline-none transition-colors duration-20"
                                    required
                                    disabled={isLoading}
                                />
                                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-violet-300 mb-2">Repetir contraseña *</label>
                            </div>
                        </div>

                        {error && <div className="mb-4 text-red-400 text-sm">{error}</div>}

                        <div className="text-xs text-violet-200 mb-4">
                            Todos los campos son obligatorios
                        </div>

                        <button
                            onClick={handleRegister}
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center py-3 px-4 rounded-full text-white font-medium transition-all duration-300 bg-gradient-to-b from-yellow-400 to-orange-500 border-2 border-violet-600 ${isLoading ? "bg-blue-400 cursor-not-allowed" : "hover:bg-blue-700 active:bg-blue-800"}`}
                        >
                            {isLoading ? "Registrando..." : "Registrarse"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
