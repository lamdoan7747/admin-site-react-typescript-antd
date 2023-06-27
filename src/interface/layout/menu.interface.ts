interface MenuItem {
  /** menu item code */
  code: string
  /** menu labels */
  label: any
  icon?: string
  path: string
  children?: MenuItem[]
}

export type MenuChild = Omit<MenuItem, 'children'>

export type MenuList = MenuItem[]
