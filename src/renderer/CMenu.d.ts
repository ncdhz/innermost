import { Menu, MenuItem } from 'electron'
export interface CMenu extends Menu {
  push: (menuItem: MenuItem | undefined) => CMenu;
}
