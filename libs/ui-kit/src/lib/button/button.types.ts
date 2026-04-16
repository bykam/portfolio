export interface MenuItem {
  label: string;
  icon?: string;
  visible?: boolean;
  children?: MenuItem[];
  command?: (ev: Event) => void;
}