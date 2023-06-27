import type { FC } from 'react'
import type { RouteObject } from 'react-router'

import { lazy } from 'react'
import { Navigate } from 'react-router'
import { useRoutes } from 'react-router-dom'

import LayoutPage from '~/pages/layout'

import WrapperRouteComponent from './config'
import Home from '~/pages/home'
import UserListPage from '~/pages/manage/user'
import LoginPage from '~/pages/login'

const NotFound = lazy(() => import(/* webpackChunkName: "404'"*/ '~/pages/404'))

const routeList: RouteObject[] = [
  {
    path: '/login',
    element: <WrapperRouteComponent element={<LoginPage />} titleId='title.login' />
  },
  {
    path: '/',
    element: <WrapperRouteComponent element={<LayoutPage />} titleId='' />,
    children: [
      {
        path: '',
        element: <Navigate to='home' />
      },
      {
        path: 'home',
        element: <WrapperRouteComponent element={<Home />} titleId='menu.title.home' />
      },
      {
        path: 'user/list',
        element: <WrapperRouteComponent element={<UserListPage />} titleId='menu.title.userList' />
      },
      {
        path: 'user/profile',
        element: <WrapperRouteComponent element={<NotFound />} titleId='menu.title.userProfile' />
      },
      {
        path: 'staff/list',
        element: <WrapperRouteComponent element={<UserListPage />} titleId='menu.title.staffList' />
      },
      {
        path: 'staff/profile',
        element: <WrapperRouteComponent element={<NotFound />} titleId='menu.title.staffProfile' />
      },
      {
        path: '*',
        element: <WrapperRouteComponent element={<NotFound />} titleId='menu.title.notfound' />
      }
    ]
  }
]

const RenderRouter: FC = () => {
  const element = useRoutes(routeList)

  return element
}

export default RenderRouter
