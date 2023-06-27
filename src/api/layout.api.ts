import type { MenuList } from '../interface/layout/menu.interface'
import type { AxiosRequestConfig } from 'axios'

import { request } from './request'

/** Provides the mock menu list to be shown in the navigation sidebar */
export const getMenuList = (config: AxiosRequestConfig = {}) => request<MenuList>('get', '/user/menu', {}, config)
