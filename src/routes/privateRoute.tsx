import type { FC } from 'react'
import type { RouteProps } from 'react-router'

import { Button, Result } from 'antd'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom'

import { RootState } from '~/stores/rootReducer'
import { useLocale } from '~/locales'

const PrivateRoute: FC<RouteProps> = (props) => {
  const { logged } = useSelector((state: RootState) => state.user)
  const navigate = useNavigate()
  const { formatMessage } = useLocale()
  const location = useLocation()

  return logged ? (
    (props.element as React.ReactElement)
  ) : (
    <Result
      status='403'
      title='403'
      subTitle={formatMessage({ id: 'global.tips.unauthorized' })}
      extra={
        <Button
          type='primary'
          onClick={() => navigate(`/login${'?from=' + encodeURIComponent(location.pathname)}`, { replace: true })}
        >
          {formatMessage({ id: 'global.tips.goToLogin' })}
        </Button>
      }
    />
  )
}

export default PrivateRoute
