import { ReactNode } from 'react';
import Head from 'next/head';

const Layout = ({children}: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;