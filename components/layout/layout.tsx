import { ReactNode } from 'react';
import Head from 'next/head';

type Props = {
  children: ReactNode | null,
};

const Layout = ({children}: Props) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      {children}
    </>
  );
};

export default Layout;