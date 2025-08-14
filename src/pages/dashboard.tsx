import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProfileDropdown from '@/Components/Profile/ProfileDropdown';
import { useAppStore } from '@/store/useAppStore';


const Dashboard: NextPage = () => {
  const logout = useAppStore((state) => state.logout);
  const router = useRouter();

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
        

    </>
  );
};

export default Dashboard;