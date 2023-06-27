import type { MenuList } from '~/interface/layout/menu.interface'

import { intercepter, mock } from '../config'

const mockMenuList: MenuList = [
  {
    code: 'home',
    label: 'Home',
    icon: 'home',
    path: '/home'
  },
  {
    code: 'user',
    label: 'Manage User',
    icon: 'user',
    path: '/user',
    children: [
      {
        code: 'userList',
        label: 'User List',
        icon: 'userlist',
        path: '/user/list'
      },
      {
        code: 'userProfile',
        label: 'User Profile',
        icon: 'userprofile',
        path: '/user/profile'
      }
    ]
  },
  {
    code: 'staff',
    label: 'Manage Staff',
    icon: 'staff',
    path: '/staff',
    children: [
      {
        code: 'staffList',
        label: 'Staff List',
        icon: 'stafflist',
        path: '/staff/list'
      },
      {
        code: 'staffProfile',
        label: 'Staff Profile',
        icon: 'staffprofile',
        path: '/staff/profile'
      }
    ]
  }
]

mock.mock('/user/menu', 'get', intercepter(mockMenuList))
