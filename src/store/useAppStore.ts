import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ApiError, LoginResponse } from '@/Types/types';
import { userLogin, getUserAvatar } from '@/Services/Sesion';

type AppState = {
  user: LoginResponse | null
  iframeURL: string | null
  errorAPI: string | null
  isHydrated: boolean
  role: string  // Nueva variable global para el rol

  setErrorAPI: (error: string) => void
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  setUserdata: (user: LoginResponse) => void
  setIframeURL: (url: string) => void
  setHydrated: (state: boolean) => void
  setRole: (role: string) => void  // Nueva función para establecer el rol
  focusIframe: () => void  // Función para enfocar el iframe
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      iframeURL: null,
      errorAPI: null,
      isHydrated: false,
      role: '',  // Valor inicial para el rol
      setHydrated: (state) => set({ isHydrated: state }),
      setErrorAPI: (error) => set({ errorAPI: error }),
      setUserdata: (user) => set({ user }),
      setIframeURL: (url) => set({ iframeURL: url }),
      setRole: (role) => set({ role }),  // Implementación de la función para establecer el rol
      focusIframe: () => {
        // Enfoca el iframe y habilita eventos
        const streamIframe = document.getElementById('streamPixelIframe') as HTMLIFrameElement;
        if (streamIframe) {
          streamIframe.style.pointerEvents = 'auto';
          streamIframe.focus();
        }
      },
      login: async (emailAddress: string, password: string) => {
        try {
          // 1. Realizamos el login
          const loginResult = await userLogin(emailAddress, password);
          set({ user: loginResult, errorAPI: null });

          // 2. Después de un login exitoso, consultamos el endpoint de avatar
          if (loginResult?.token) {
            try {
              // Llamamos al endpoint y obtenemos la URL mockeada directamente
              const iframeUrl = await getUserAvatar(loginResult.token);
              console.log("URL del iframe obtenida:", iframeUrl);

              // 3. Actualizamos iframeURL con el valor recibido
              set({ iframeURL: iframeUrl });
            } catch (avatarError) {
              console.error('Error al obtener avatar:', avatarError);
              // En caso de error, usamos un valor por defecto
              set({ iframeURL: "https://share.streampixel.io/embed/kunaverso" });
            }
          }
        } catch (error) {
          console.log((error as ApiError).message);
          set({ errorAPI: (error as ApiError).message ?? "Error desconocido" });
        }
      },
      logout: () => {
        set({ user: null, iframeURL: null, role: '' });  // También reseteamos el rol al cerrar sesión
      }
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        iframeURL: state.iframeURL,
        role: state.role  // Añadimos el rol a los datos que se guardan en localStorage
      }),
    }
  )
)
