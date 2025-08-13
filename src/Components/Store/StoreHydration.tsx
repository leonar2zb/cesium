import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';

// Este componente se encarga de marcar cuando el estado ha sido hidratado desde localStorage
export const StoreHydration = () => {
  const setHydrated = useAppStore((state) => state.setHydrated);

  useEffect(() => {
    // Marcamos que el store ha sido hidratado
    setHydrated(true);
  }, [setHydrated]);

  return null; // Este componente no renderiza nada
};
