import { Link } from "zhead";

export {};

declare global {
  interface Icon {
    value: string;
    label: string;
    key: string;
  }

  interface Resource {
    id: string;
    url: string;
    permalink: string;
  }

  interface Structure {
    title: string;
    handle: string;
  }

  interface Asset extends Resource {
    api_url: string;
  }

  type NavItem = {
    page: Resource & {
      entry_id: number | null;
      icon: Icon;
      title: string;
      uri: string;
      attachment?: Asset;
    };
    depth: number;
    children: Array<NavItem>;
  };

  type ContactLink = {
    title: string;
    icon: Icon;
    is_asset: boolean;
    url: string|null;
    file: Asset|null;
    id: string;
  }

  type SkillIcon = {
    icon: Icon,
    id: string
  };

  type EducationCredential = {
    kind: Icon;
    title: string;
    specialty: string;
    organization: string;
    id: string;
  }

  type SEOData = {
    meta_description: string|null;
    meta_title: string|null;
    share_image: Asset|null;
    share_meta: string|null;
    share_image_alt: string|null;
  };

  type Entry = SEOData & {
    api_url: string;
    blueprint: Structure;
    collection: Structure;
    date: string;
    id: string;
    is_entry: boolean;
    last_modified: string;
    locale: string;
    order: number;
    permalink: string;
    published: boolean;
    slug: string;
    title: string;
    updated_at: string;
    uri: string;
  };

  type HomePage = Entry & {
    hero_heading: string;
    hero_subhead: string;
    hero_skill_icons: Array<SkillIcon>;
    intro_heading: string;
    intro_image: Asset;
    intro_contact_links: Array<ContactLink>;
    intro_text: string;
    projects_heading: string;
    projects_featured_projects: Array<Entry>;
    projects_cta_text: string;
    education_heading: string;
    education_credentials: Array<EducationCredential>;
  };

  type PaginationLink = {
    url: string|null;
    label: string;
    active: boolean;
  };

  type PaginationMeta = {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<PaginationLink>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };

  type NavResponse = {
    data: Array<NavItem>;
  };

  type PaginatedResponse = {
    data: Array<Entry|HomePage>;
    links: Array<PaginationLink>;
    meta: PaginationMeta;
  };

  type EntryResponse = {
    data: Entry;
  };
}