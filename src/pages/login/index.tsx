import type { LoginParams } from '~/interface/user/login'
import type { FC } from 'react'

import './index.less'

import { Button, Checkbox, Form, Input } from 'antd'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { LocaleFormatter, useLocale } from '~/locales'
import { formatSearch } from '~/utils/formatSearch'

import { loginAsync } from '~/stores/user.action'
import { AppDispatch } from '~/stores'

const initialValues: LoginParams = {
  username: 'guest',
  password: 'guest'
  // remember: true
}

const LoginForm: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch<AppDispatch>()
  const { formatMessage } = useLocale()

  const onFinished = async (form: LoginParams) => {
    const res = dispatch(loginAsync(form))

    if (await res) {
      const search = formatSearch(location.search)
      const from = search.from || { pathname: '/' }

      navigate(from)
    }
  }

  return (
    <div className='login-page'>
      <Form<LoginParams> onFinish={onFinished} className='login-page-form' initialValues={initialValues}>
        <h2>HEALTHCARE REGISTRATION</h2>
        <Form.Item
          name='username'
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'global.tips.enterUsernameMessage'
              })
            }
          ]}
        >
          <Input
            placeholder={formatMessage({
              id: 'global.tips.username'
            })}
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[
            {
              required: true,
              message: formatMessage({
                id: 'global.tips.enterPasswordMessage'
              })
            }
          ]}
        >
          <Input
            type='password'
            placeholder={formatMessage({
              id: 'global.tips.password'
            })}
          />
        </Form.Item>
        <Form.Item name='remember' valuePropName='checked'>
          <Checkbox>
            <LocaleFormatter id='global.tips.rememberUser' />
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary' className='login-page-form_button'>
            <LocaleFormatter id='global.tips.login' />
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginForm
