import type { PortableTextBlock } from "@portabletext/types";
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';
export {};

declare global {
  interface SanityField {
    _ref?: string;
    _type?: string;
  }

  interface Slug extends SanityField {
    current: string;
  }

  interface SanityDocument extends SanityField {
    _rev?: string;
    _key?: string;
    _id: string;
    _updatedAt: string;
  }

  type ProjectTechnology = SanityField & {
    icon: string;
    title: string;
  };

  type SanityAsset = SanityField & {
    asset: SanityField;
  }

  type CustomSanityImage = SanityField & {
    alt: string|null;
    caption: string|null;
    assetId: string;
  }

  type ProjectLineItem = SanityDocument & {
    mainImage: CustomSanityImage;
    title: string;
    slug: Slug;
    excerpt: string|null;
    link?: string;
    publishedAt: string;
  }

  type PostCategory = {_id: string, title: string};

  type PostLineItem = SanityDocument & {
    title: string;
    slug: Slug;
    publishedAt: string;
    categories: Array<PostCategory>;
    excerpt: string|null;
  }

  type ContactLink = {
    title: string;
    linkType: string;
    icon: string;
    inFooter: boolean;
    url: string|undefined;
    attachment: SanityAsset|null;
  }

  type NavLink = {
    _key: string;
    icon: string;
    link: {
      title: string;
      slug: Slug;
    };
    title: string;
    type: string;
    attachment: SanityAsset | null;
  };

  type EducationItem = {
    _key: string;
    institution: string;
    specialization: string;
    title: string;
    type: string;
  };

  type PageSEO = {
    seoTitle: string;
    seoDescription: string;
    seoImage: SanityAsset;
  };

  type SanityProject = PageSEO & SanityDocument & {
    title: string;
    link: string;
    mainImage: CustomSanityImage;
    technologies: Array<ProjectTechnology>;
    body: Array<PortableTextBlock>;
    excerpt: string|null;
  };

  type SanityPost = SanityDocument & {
    title: string;
    publishedAt: string;
    mainImage: CustomSanityImage;
    categories: Array<{_id: string, title: string}>;
    body: Array<PortableTextBlock>;
    author: {
      name: string;
      image: CustomSanityImage;
    };
    excerpt: string|null;
  };

  type SanityPage = PageSEO & SanityDocument & {
    title: string;
    template: string;
    slug: Slug;
    heroHeading?: string;
    heroSubhead?: string;
    heroSkills?: Array<string>;
    introHeading?: string;
    introImage?: CustomSanityImage;
    introText?: Array<PortableTextBlock>;
    introContact: Array<ContactLink>;
    projectsHeading?: string;
    projectsFeatured?: Array<ProjectLineItem>;
    projectsFeaturedDefault?: Array<ProjectLineItem>;
    contactHeading?: string;
    contactSubhead?: string;
    contactItems?: Array<ContactLink>;
    miscHeading?: string;
    miscText?: Array<PortableTextBlock>;
    educationHeading?: string;
    educationItems?: Array<EducationItem>;
  };

  type SanityNav = SanityDocument & {
    title: string;
    slug: Slug;
    links: Array<NavLink>;
  };

  type ProjectsPageResponse = {
    page: {
      title: string;
      seoTitle: string;
      seoDescription: string;
      seoImage: SanityAsset;
    };
    currentProjects: Array<ProjectLineItem>;
    totalProjects: number;
  };

  type PostsPageResponse = {
    page: {
      title: string;
      seoTitle: string;
      seoDescription: string;
      seoImage: SanityAsset;
    };
    currentPosts: Array<PostLineItem>;
    totalPosts: number;
  };

  type ImgHelper = (id: string|undefined) => ImageUrlBuilder;

  type ImgHelperPlugin = { $urlFor: ImgHelper };

  type BaseUrl = { baseUrl: string };
}