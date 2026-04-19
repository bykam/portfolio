export interface MenuItem {
  label: string;
  icon?: string;
  visible?: boolean;
  children?: MenuItem[];
  isLeaf?: boolean;
  command?: (ev: Event) => void;
}