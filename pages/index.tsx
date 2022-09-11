/* Import types */
import type { GetStaticProps, NextPage } from 'next'
import type {
  HeadingBlockType,
  ImageBlockType,
  TextBlockType,
  IconListBlockType,
  MarkdownBlockType,
} from '../components/blocks/block-types';
import type { SeoData } from '../components/seo/seo-types';

/* Import utils & hooks */
import { fetchAPI } from '../lib/api'
import { getKebabString } from '../lib/utils';
import { usePageSeo } from '../lib/hooks/usePageSeo';
import { useEffect } from 'react';

/* Import components */
import Layout from '../components/layout/layout';
import Header from '../components/header/header';
import Seo from '../components/seo/seo';
import HpHero from '../components/hp-hero/hp-hero';
import HeadingBlock from '../components/blocks/heading';
import ImageBlock from '../components/blocks/image';
import TextBlock from '../components/blocks/text';
import IconListBlock from '../components/blocks/icon-list';
import MarkdownBlock from '../components/blocks/markdown';

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
type BlocksUnion = HeadingBlockType | ImageBlockType | TextBlockType | IconListBlockType | MarkdownBlockType;

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

const componentsMap: {
  [key: string]: React.FC<any>,
} = {
  'shared.heading': HeadingBlock,
  'shared.image': ImageBlock,
  'shared.text': TextBlock,
  'shared.icon-list': IconListBlock,
  'shared.markdown': MarkdownBlock,
};

/**
 * Render the Home page with Strapi data.
 *
 * @param param0 - The Next.js page props.
 * @returns A Next.js page
 */
const Home: NextPage = ({homepage}: Data) => {
  const { setMetaTitle, setMetaDescription, setShareImage } = usePageSeo();
  const { seo, hero, blocks } = homepage.attributes;
  const sectionBounds: number[] = [];
  const homeHeadings     = blocks.filter((block, idx) => {
    const isHeading = block.__component === 'shared.heading';
    if (isHeading) {
      sectionBounds.push(idx);
    }

    return isHeading;
  }) as HeadingBlockType[];
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
  const sections = homeHeadings.map((heading, idx) => {
    const start = sectionBounds[idx];
    const end   = sectionBounds[idx + 1] || blocks.length;
    const sectionBlocks = blocks.slice(start, end);

    return (
      <section
        key={`${heading.id}-${idx}`}
        id={getKebabString(heading.title)}
        className='hp-section'
      >
        <div className='container'>
          <div className='hp-section__outline'>
            {sectionBlocks.map((block, idx) => {
              const Component = componentsMap[block.__component];

              return (
                <Component key={`${block.id}-${idx}`} {...block} />
              );
            })}
          </div>
        </div>
      </section>
    );
  });

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
      <main className='main'>
        <HpHero content={hero} />
        {sections}
      </main>
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
