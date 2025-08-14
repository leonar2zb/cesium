import React, { useState, useRef, useEffect } from 'react';

interface ProfileDropdownProps {
  onMyProfile: () => void;
  onPersonalizeAvatar: () => void;
  onLogout: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  onMyProfile,
  onPersonalizeAvatar,
  onLogout
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 500); // 500ms de delay
  };

  // Limpiar el timeout si el componente se desmonta
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handlePersonalizeAvatar = () => {
    setIsOpen(false);
    onPersonalizeAvatar();
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout();
  };

  const handleMyProfile = () => {
    setIsOpen(false);
    onMyProfile();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div
      className="fixed top-4 right-4 z-[10060]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={toggleDropdown}
        className="w-24 h-24 bg-black/60 rounded-lg flex items-center justify-center hover:bg-black/70 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 border border-white/10 backdrop-blur-sm"
        aria-label="Menú de perfil"
        type="button"
      >
        {/* Usamos un SVG en lugar de una imagen para evitar problemas de carga */}
        <svg
          className="w-12 h-12 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>

      {/* Dropdown menu para desktop */}
      {isOpen && (
        <>
          {/* Desktop dropdown */}
          <div
            className="hidden md:block absolute top-full right-0 mt-2 z-[10060] bg-black/70 text-white rounded-lg shadow-lg border border-white/10 min-w-48 overflow-hidden backdrop-blur-sm"
          >
            <div className="py-1">
              <button
                onClick={handleMyProfile}
                className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors duration-150 flex items-center space-x-3"
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Mi perfil</span>
              </button>

              <button
                onClick={handlePersonalizeAvatar}
                className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors duration-150 flex items-center space-x-3"
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>Personalizar avatar</span>
              </button>

              {/* Línea separadora */}
              <div className="border-t border-white/10"></div>

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors duration-150 flex items-center space-x-3"
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>

          {/* Mobile modal (pantalla completa) */}
          <div className="md:hidden fixed inset-0 z-[10060] bg-black/80 text-white backdrop-blur-sm">
            {/* Header con botón cerrar */}
            <div className="flex justify-between items-center p-4 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">Menú de perfil</h2>
              <button
                onClick={closeModal}
                className="text-white/80 hover:text-white transition-colors duration-150"
                type="button"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Opciones del menú móvil */}
            <div className="p-4 space-y-2">
              <button
                onClick={handleMyProfile}
                className="w-full text-left p-4 rounded-lg hover:bg-white/10 transition-colors duration-150 flex items-center space-x-4"
                type="button"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-white">Mi perfil</div>
                  <div className="text-sm text-white/70">Ver y editar tu perfil</div>
                </div>
              </button>

              <button
                onClick={handlePersonalizeAvatar}
                className="w-full text-left p-4 rounded-lg hover:bg-white/10 transition-colors duration-150 flex items-center space-x-4"
                type="button"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-white">Personalizar avatar</div>
                  <div className="text-sm text-white/70">Cambiar tu avatar</div>
                </div>
              </button>

              <div className="border-t border-white/10 my-2"></div>

              <button
                onClick={handleLogout}
                className="w-full text-left p-4 rounded-lg hover:bg-white/10 transition-colors duration-150 flex items-center space-x-4"
                type="button"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium text-white">Cerrar sesión</div>
                  <div className="text-sm text-white/70">Salir de tu cuenta</div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;
