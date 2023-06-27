import { ConfigProvider, Spin, theme as a } from 'antd'
import { Suspense, useEffect } from 'react'
import { useSelector } from 'react-redux'
import enUS from 'antd/es/locale/en_US'
import dayjs from 'dayjs'
import { RootState } from './stores/rootReducer'
import { IntlProvider } from 'react-intl'
import { localeConfig, LocaleFormatter } from './locales'
import RenderRouter from './routes'
import { HistoryRouter, history } from './routes/history'

const App: React.FC = () => {
  const { locale } = useSelector((state: RootState) => state.user)
  const { loading } = useSelector((state: RootState) => state.global)

  // set the locale for the user
  // more languages options can be added here
  useEffect(() => {
    if (locale === 'en_US') {
      dayjs.locale('en')
    }
  }, [locale])

  /**
   * handler function that passes locale
   * information to ConfigProvider for
   * setting language across text components
   */
  const getAntdLocale = () => {
    if (locale === 'en_US') {
      return enUS
    }
  }

  return (
    <ConfigProvider
      locale={getAntdLocale()}
      componentSize='middle'
      theme={{ token: { colorPrimary: '#1677ff' }, algorithm: a.defaultAlgorithm }}
    >
      <IntlProvider locale={locale.split('_')[0]} messages={localeConfig[locale]}>
        <HistoryRouter history={history}>
          <Suspense fallback={null}>
            <Spin
              spinning={loading}
              className='app-loading-wrapper'
              tip={<LocaleFormatter id='global.tips.loading' />}
            ></Spin>
            <RenderRouter />
          </Suspense>
        </HistoryRouter>
      </IntlProvider>
    </ConfigProvider>
  )
}

export default App
