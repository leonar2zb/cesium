import { AppProps } from 'next/app';
import Head from 'next/head';
import '../../src/index.css';
import AuthGuard from '../Components/Auth/AuthGuard';
import { StoreHydration } from '@/Components/Store/StoreHydration';
import { useRouter } from 'next/router';
import MainLayout from '@/Components/Layout/MainLayout';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/login';
  const isForgotPassword = router.pathname === '/forgot-password';
  const isResetPassword = router.pathname === '/reset-password';
  const isRegister = router.pathname === '/register';

  const isAuthPage = isLoginPage || isForgotPassword || isResetPassword || isRegister;

  return (
    <>
      <Head>
        <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1.0" />
        <title key="title">Personalización del avatar Kunaverso</title>
      </Head>
      {/* Este componente se asegura de que el estado se hidrante correctamente */}
      <StoreHydration />
      {isAuthPage ? (
        <Component {...pageProps} />
      ) : (
        <AuthGuard>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AuthGuard>
      )}
    </>
  );
}

export default MyApp;
