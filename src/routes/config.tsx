import type { FC, ReactElement } from 'react'
import type { RouteProps } from 'react-router-dom'

import { useIntl } from 'react-intl'

import PrivateRoute from './privateRoute'

export interface WrapperRouteProps extends RouteProps {
  titleId: string
  auth?: boolean
  element?: React.ReactNode | null
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ titleId, auth, ...props }) => {
  const { formatMessage } = useIntl()

  if (titleId) {
    document.title = formatMessage({
      id: titleId
    })
  }

  return auth ? <PrivateRoute {...props} /> : (props.element as ReactElement)
}

export default WrapperRouteComponent
