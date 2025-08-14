import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import DebugPanel from '@/Components/Debug/DebugPanel';
import ProfileDropdown from '@/Components/Profile/ProfileDropdown';
import { useAppStore } from '@/store/useAppStore';

// Import StreamPixel component with no SSR to avoid window is not defined errors
const StreamPixel = dynamic(() => import('../Components/StreamPixel/StreamPixel'), {
  ssr: false,
});

const Dashboard: NextPage = () => {
  const [showDebug, setShowDebug] = useState(true);
  const focusIframe = useAppStore((state) => state.focusIframe);
  const logout = useAppStore((state) => state.logout);
  const router = useRouter();
  const streamLoaded = useAppStore((state) => state.streamLoaded);

  const handlePersonalizeAvatar = () => {
    console.log('Personalizar avatar');
  };

  const handleMyProfile = () => {
    console.log('Mi perfil');
    // Aquí podrías navegar a una página de perfil o abrir un modal
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  console.log("En dashboard")
  return (
    <>
      <Head>
        <title>Dashboard en Kunaverso</title>
      </Head>

      {/* ProfileDropdown - botón de perfil en esquina superior derecha */}
      <ProfileDropdown
        onMyProfile={handleMyProfile}
        onPersonalizeAvatar={handlePersonalizeAvatar}
        onLogout={handleLogout}
      />

      {/* Botón para mostrar/ocultar panel de depuración */}
      {/*<button*/}
      {/*  onClick={() => {*/}
      {/*    setShowDebug(!showDebug);*/}
      {/*    focusIframe();*/}
      {/*  }}*/}
      {/*  className="fixed top-2 left-2 z-50 bg-gray-800 text-white px-2 py-1 rounded text-xs"*/}
      {/*>*/}
      {/*  {showDebug ? "Ocultar Debug" : "Mostrar Debug"}*/}
      {/*</button>*/}

      {/* Panel de depuración con display: none */}
      {/*<div style={{ display: showDebug ? 'block' : 'none' }}>*/}
      {/*  <DebugPanel />*/}
      {/*</div>*/}

      <StreamPixel />
    </>
  );
};

export default Dashboard;