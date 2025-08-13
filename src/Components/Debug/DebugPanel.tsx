/**
 * @file DebugPanel.tsx
 * @description Componente para mostrar un panel de depuración con el estado global de la aplicación.
 * Este panel es útil durante el desarrollo para visualizar en tiempo real los valores
 * de estados clave como la información del usuario, la URL del iframe, errores de API, etc.
 */

import { useAppStore } from '@/store/useAppStore';

/**
 * Componente funcional DebugPanel.
 * Muestra un panel fijo en la esquina inferior derecha de la pantalla
 * con información relevante del estado global de Zustand.
 * @returns {JSX.Element} El panel de depuración renderizado.
 */
const DebugPanel = () => {
  // --- Obtención de estados desde el store global (Zustand) ---

  // Información del usuario autenticado. Contiene token, ID, nombre, etc.
  const user = useAppStore((state) => state.user);
  // URL del iframe que se carga en el componente StreamPixel.
  const iframeURL = useAppStore((state) => state.iframeURL);
  // Almacena el último mensaje de error proveniente de la API.
  const errorAPI = useAppStore((state) => state.errorAPI);
  // Indica si el estado de Zustand ha sido rehidratado desde el localStorage.
  const isHydrated = useAppStore((state) => state.isHydrated);
  // Rol actual del usuario (ej. 'Server', 'Pasajero').
  const role = useAppStore((state) => state.role);

  return (
    // Contenedor principal del panel de depuración.
    // Es un panel fijo, semitransparente, con scroll si el contenido excede el tamaño.
    <div className="fixed bottom-0 right-0 bg-black bg-opacity-80 text-white p-4 max-w-md max-h-80 overflow-auto text-xs rounded-tl-md z-50">
      <h3 className="text-sm font-bold mb-2">Estado de la Aplicación:</h3>

      {/* Sección para mostrar el estado de hidratación */}
      <div className="mb-2">
        <p className="font-semibold">🟢 isHydrated: <span className={isHydrated ? "text-green-400" : "text-red-400"}>{String(isHydrated)}</span></p>
      </div>

      {/* Sección para mostrar la información del usuario */}
      <div className="mb-2">
        <p className="font-semibold">👤 Usuario:</p>
        {user ? (
          <ul className="pl-4">
            {/* Se muestra solo una parte del token para no saturar la UI */}
            <li>Token: {user.token?.substring(0, 20)}...</li>
            <li>userID: {user.userID}</li>
            <li>Nombre: {user.first_name} {user.last_name}</li>
            <li>Email: {user.email_address}</li>
          </ul>
        ) : (
          <p className="text-red-400 pl-4">No hay usuario autenticado</p>
        )}
      </div>

      {/* Sección para mostrar la URL del iframe */}
      <div className="mb-2">
        <p className="font-semibold">🔗 iframeURL:</p>
        <p className="pl-4 break-all">{iframeURL || "No hay URL de iframe"}</p>
      </div>

      {/* Sección para mostrar el rol del usuario */}
      <div className="mb-2">
        <p className="font-semibold">👑 Rol:</p>
        <p className="pl-4">{role || "No hay rol asignado"}</p>
      </div>

      {/* Sección para mostrar errores de API (solo si existen) */}
      {errorAPI && (
        <div className="mb-2">
          <p className="font-semibold">❌ Error API:</p>
          <p className="pl-4 text-red-400">{errorAPI}</p>
        </div>
      )}

      {/* Botón para imprimir el estado completo en la consola del navegador */}
      <button
        className="mt-2 px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
        onClick={() => console.log('Estado completo:', {
          user,
          iframeURL,
          errorAPI,
          isHydrated,
          role // Incluimos el rol en el log
        })}
      >
        Log Estado Completo
      </button>
    </div>
  );
};

export default DebugPanel;
