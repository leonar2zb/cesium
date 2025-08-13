import { NextPage } from 'next';
import LoginBox from '../Components/Login/LoginBox';
import Head from 'next/head';

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login - Personalización del avatar Kunaverso</title>
      </Head>
      <LoginBox />
    </>
  );
};

export default LoginPage;