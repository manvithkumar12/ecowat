export interface DocCard {
  title: string;
  description: string;
}

export interface DocSection {
  id: string;
  title: string;
  description?: string;
  nav?: string | { label?: string; link?: string };
  button?: {
    label: string;
    href: string;
  };
  list?: string[];
  cards?: DocCard[];
}

export interface DocPage {
  title: string;
  navUrl: string;
  description: string;
  breadcrumbs: string[];
  alert?: {
    text: string;
    linkText?: string;
    linkHref?: string;
  };
  sections: DocSection[];
}
