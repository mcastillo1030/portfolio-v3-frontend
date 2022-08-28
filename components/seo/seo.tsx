import { useContext } from 'react';
import { getStrapiMedia } from '../../lib/media';
import { SiteSeoContext } from '../../pages/_app';
import { usePageSeo } from '../../lib/hooks/usePageSeo';
import Head from 'next/head';

const Seo = () => {
  const { siteName, siteDescription, siteShareImage } = useContext(SiteSeoContext);
  const { metaTitle, metaDescription, shareImage } = usePageSeo();
  const pageTitle = `${metaTitle} | ${siteName}`;
  const pageImage = getStrapiMedia(shareImage) || getStrapiMedia(siteShareImage);
  const pageDescription = metaDescription || siteDescription;

  return (
    <Head>
      {pageTitle.length > 0 && (
        <>
          <title>{pageTitle}</title>
          <meta property="og:title" content={pageTitle} />
          <meta name="twitter:title" content={pageTitle} />
        </>
      )}
      {pageDescription.length > 0 && (
        <>
          <meta name="description" content={pageDescription} />
          <meta property="og:description" content={pageDescription} />
          <meta name="twitter:description" content={pageDescription} />
        </>
      )}
      {pageImage && (
        <>
          <meta name="image" content={pageImage} />
          <meta property="og:image" content={pageImage} />
          <meta name="twitter:image" content={pageImage} />
        </>
      )}
      {/* {fullSeo.article && <meta property="og:type" content="article" />} */}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Seo;