// import 'normalize.css/normalize.css';
import '../styles/globals.scss'
import type { AppContext, AppProps } from 'next/app'
import { StrapiMedia } from '../lib/media';
import { createContext } from 'react';
import { fetchAPI } from '../lib/api';
import { PageSeoProvider } from '../lib/hooks/usePageSeo';
import App from 'next/app';

/**
 * Declare site SEO type.
 */
type SiteSeo = {
  siteName: string,
  siteDescription: string,
  siteShareImage: StrapiMedia | string,
}

/**
 * Initial site SEO data.
 */
const initSeoData: SiteSeo = {
  siteName: '',
  siteDescription: '',
  siteShareImage: '',
};

/**
 * Next.js app component.
 *
 * @param param0 Next.js app props.
 * @returns Next.js app
 */
const MyApp = ({ Component, pageProps }: AppProps) => {
  const { global } = pageProps;

  return (
    <SiteSeoContext.Provider value={global.attributes}>
      <PageSeoProvider>
        <Component {...pageProps} />
      </PageSeoProvider>
    </SiteSeoContext.Provider>
  );
};

/**
 * Get global site data from the Strapi API.
 *
 * @param appContext The Next.js app context.
 * @returns The modified app context.
 */
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps  = await App.getInitialProps(appContext);
  const globalRes = await fetchAPI('/global', {
    populate: '*',
  });
  return { ...appProps, pageProps: { global: globalRes.data } };
};

export const SiteSeoContext = createContext<SiteSeo>(initSeoData);

export default MyApp;