/* Import types */
import type { GetStaticProps, NextPage } from 'next'
import type {
  HeadingBlock,
  ImageBlock,
  TextBlock,
  IconListBlock,
  MarkdownBlock,
} from '../components/blocks/block-types';
import type { SeoData } from '../components/seo/seo-types';

/* Import utils & hooks */
import { fetchAPI } from '../lib/api'
import { getKebabString } from '../lib/utils';
import { usePageSeo } from '../lib/hooks/usePageSeo';
import { useEffect } from 'react';

/* Import components */
import Header from '../components/header/header';
import Seo from '../components/seo/seo';
import Layout from '../components/layout/layout';

/* Import styles */
import headerStyles from '../components/header/Header.module.scss';

/**
 * Declare HeroBlock type
 */
type Hero = {
  titleHeading: string,
  titleSubheading: string,
  subtitleHeading: string,
  subtitleSubheading: string,
}

/**
 * Declare HP Blocks union type
 */
type BlocksUnion = HeadingBlock | ImageBlock | TextBlock | IconListBlock | MarkdownBlock;

/**
 * Declare API response type
 */
type Data = {
  [key: string]: {
    attributes: {
      seo: SeoData,
      hero: Hero,
      blocks: BlocksUnion[],
    }
  }
}

/**
 * Render the Home page with Strapi data.
 *
 * @param param0 - The Next.js page props.
 * @returns A Next.js page
 */
const Home: NextPage = ({homepage}: Data) => {
  const { setMetaTitle, setMetaDescription, setShareImage } = usePageSeo();
  const { seo, hero, blocks } = homepage.attributes;
  const homeHeadings     = blocks.filter(block => block.__component === 'shared.heading') as HeadingBlock[];
  const homeNavLinks     = homeHeadings.map((heading, idx) => (
    <li key={`${heading.id}-${idx}`} className={`${headerStyles['header__nav-item']} epsilon`}>
      <a href={`#${getKebabString(heading.title)}`} className={headerStyles['header__nav-link']}>
        <span className={headerStyles['header__link-bar']}>/</span>
        <span className={headerStyles['header__link-text']}>
          {heading.title}
        </span>
      </a>
    </li>
  ));

  useEffect(() => {
    setMetaTitle(seo.metaTitle);
    setMetaDescription(seo.metaDescription);
    setShareImage(seo.shareImage);
  } , [setMetaTitle, setMetaDescription, setShareImage, seo]);


  return (
    <Layout>
      <Seo />
      <Header>
        <>
          {homeNavLinks}
        </>
      </Header>
      <div>
        {/* <h2>{hero.titleHeading}</h2> */}
      </div>
    </Layout>
  );
};

/**
 * Get initial data from the Strapi API.
 *
 * @returns The page props.
 */
export const getStaticProps: GetStaticProps = async () => {
  const homepageRes = await fetchAPI('/homepage', {
    populate: {
      hero: {
        populate: '*',
      },
      seo: {
        populate: '*',
      },
      blocks: {
        populate: '*',
      },
    }
  });

  return {
    props: {
      homepage: homepageRes.data,
    },
  }
};

export default Home
