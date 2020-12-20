export interface IMenuItem {
  selected?: boolean;
  checked?: boolean;
  items?: IMenuItem[];
  label: string;
  name: string;
  to?: string;
}

interface IMenu {
  description: string;
  menu: IMenuItem[];
  seo: string;
  title: string;
}
