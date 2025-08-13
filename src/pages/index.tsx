import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppStore } from '../store/useAppStore';
import Head from 'next/head';

const Home: NextPage = () => {
  const router = useRouter();
  const user = useAppStore((state) => state.user);

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  return (
    <>
      <Head>
        <title>Personalización del avatar Kunaverso</title>
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Bienvenido a Kunaverso</h1>
        <p className="text-lg text-gray-600">Cargando...</p>
      </div>
    </>
  );
};

export default Home;
