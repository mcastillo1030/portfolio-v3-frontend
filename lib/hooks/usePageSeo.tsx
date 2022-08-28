import { ReactNode, createContext, useContext, useState } from 'react';
import type { SeoData } from '../../components/seo/seo-types';
import { StrapiMedia } from '../media';

interface PageSeoContextType extends SeoData {
  setMetaTitle: (metaTitle: string) => void,
  setMetaDescription: (metaDescription: string) => void,
  setShareImage: (shareImage: StrapiMedia | string) => void,
};

const initPageSeoContext: PageSeoContextType = {
  metaTitle: '',
  metaDescription: '',
  shareImage: '',
  setMetaTitle: (metaTitle: string) => {},
  setMetaDescription: (metaDescription: string) => {},
  setShareImage: (shareImage: StrapiMedia | string) => {},
};

const PageSeoContext = createContext<PageSeoContextType>(initPageSeoContext);

export const usePageSeo = () => useContext(PageSeoContext);

export const PageSeoProvider = ({children}: { children: ReactNode }) => {
  // const [pageSeo, setPageSeo] = useState(initPageSeoData);
  const [metaTitle, setMetaTitle] = useState<string>('');
  const [metaDescription, setMetaDescription] = useState<string>('');
  const [shareImage, setShareImage] = useState<StrapiMedia | string>('');

  return (
    <>
      <PageSeoContext.Provider value={{
        metaTitle,
        metaDescription,
        shareImage,
        setMetaTitle,
        setMetaDescription,
        setShareImage,
      }}>
        {children}
      </PageSeoContext.Provider>
    </>
  );
};