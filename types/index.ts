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

  type NavResponse = {
    data: Array<NavItem>;
  };
}