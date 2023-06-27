import type { FC } from 'react'

import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons'
import { Dropdown, Layout, theme as antTheme } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ReactSvg from '~/assets/react.svg'
import { LocaleFormatter, useLocale } from '~/locales'
// import { setGlobalState } from '@/stores/global.store'
// import { setUserItem } from '@/stores/user.store'

import { RootState } from '~/stores/rootReducer'
import { logoutAsync } from '~/stores/user.action'
import { AppDispatch } from '~/stores'

const { Header } = Layout

interface HeaderProps {
  collapsed: boolean
  toggle: () => void
}

type Action = 'userInfo' | 'userSetting' | 'logout'

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { logged, locale, device } = useSelector((state: RootState) => state.user)
  const { theme } = useSelector((state: RootState) => state.global)
  const navigate = useNavigate()
  const token = antTheme.useToken()
  const dispatch = useDispatch<AppDispatch>()
  const { formatMessage } = useLocale()

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return
      case 'userSetting':
        return
      case 'logout':
        try {
          const res = await dispatch(logoutAsync())
          if (res) {
            navigate('/login')
          }
        } catch (error) {
          // Xử lý lỗi nếu cần
        }
        return
    }
  }

  const toLogin = () => {
    navigate('/login')
  }

  // const selectLocale = ({ key }: { key: any }) => {
  //   dispatch(setUserItem({ locale: key }))
  //   localStorage.setItem('locale', key)
  // }

  // const onChangeTheme = () => {
  //   const newTheme = theme === 'dark' ? 'light' : 'dark'

  //   localStorage.setItem('theme', newTheme)
  //   dispatch(
  //     setGlobalState({
  //       theme: newTheme
  //     })
  //   )
  // }

  return (
    <Header className='layout-page-header bg-2' style={{ backgroundColor: token.token.colorBgContainer }}>
      {device !== 'MOBILE' && (
        <div className='logo' style={{ width: collapsed ? 80 : 200 }}>
          <img src={ReactSvg} alt='' style={{ marginRight: collapsed ? '2px' : '20px' }} />
        </div>
      )}
      <div className='layout-page-header-main'>
        <div onClick={toggle}>
          <span id='sidebar-trigger'>{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
        </div>
        <div className='actions'>
          {/* <Tooltip
            title={formatMessage({
              id: theme === 'dark' ? 'gloabal.tips.theme.lightTooltip' : 'gloabal.tips.theme.darkTooltip'
            })}
          >
            <span>
              {createElement(theme === 'dark' ? SunSvg : MoonSvg, {
                onClick: onChangeTheme
              })}
            </span>
          </Tooltip> */}
          {/* <Dropdown
            menu={{
              onClick: (info) => selectLocale(info),
              items: [
                {
                  key: 'en_US',
                  icon: <EnUsSvg />,
                  disabled: locale === 'en_US',
                  label: 'English'
                }
              ]
            }}
          >
            <span>
              <LanguageSvg id='language-change' />
            </span>
          </Dropdown> */}

          {logged ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: (
                      <span onClick={() => navigate('/dashboard')}>
                        <LocaleFormatter id='header.avator.account' />
                      </span>
                    )
                  },
                  {
                    key: '2',
                    icon: <LogoutOutlined />,
                    label: (
                      <span onClick={() => onActionClick('logout')}>
                        <LocaleFormatter id='header.avator.logout' />
                      </span>
                    )
                  }
                ]
              }}
            >
              <span className='user-action'>
                <UserOutlined className='user-avator' />
              </span>
            </Dropdown>
          ) : (
            <span style={{ cursor: 'pointer' }} onClick={toLogin}>
              {formatMessage({ id: 'global.tips.login' })}
            </span>
          )}
        </div>
      </div>
    </Header>
  )
}

export default HeaderComponent
