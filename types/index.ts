import { PortableTextBlock } from "@portabletext/types";

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
    introText?: string;
    introContact: Array<ContactLink>;
    projectsHeading?: string;
    projectsFeatured?: Array<ProjectLineItem>;
    contactHeading?: string;
    contactSubhead?: string;
    contactItems?: Array<ContactLink>;
    miscHeading?: string;
    miscText?: string;
    educationHeading?: string;
    educationItems?: Array<EducationItem>;
  };

  type SanityNav = SanityDocument & {
    title: string;
    slug: Slug;
    links: Array<NavLink>;
  };
}