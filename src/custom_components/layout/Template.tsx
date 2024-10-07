import './style.css'

import GridContainer from './GridContainer'

import { useThemeStore } from '@/store/useThemeStore'
import { ExtraInformation } from './information-components/ExtraInformation'
import { useEffect } from 'react'
import { Sidebar } from './dasboard/Sidebar'
import { HeaderDashBoard } from './dasboard/HeaderDashBoard'
import { Card, CardContent } from '@/components/ui/card'

const Template = () => {
  const {
    layout: { content, responsive },
    navigation,
  } = useThemeStore()
  const { changeLayout } = useThemeStore()
  const { layoutStyle } = useThemeStore()
  const contStyle = {
    boxShadow: 'none',
    borderRadius: '0px',
    backgroundColor: '#f8f8f8',
  }
  useEffect(() => {
    changeLayout('Dashboard')
  }, [])
  return (
    <GridContainer responsive={responsive} areas={content}>
      {navigation && (
        <div className="itemnav">
          {/* <Header headerTitle={props.headerTitle} {...props} /> */}
          <HeaderDashBoard />
        </div>
      )}
      {content.includes('Sidebar') && (
        <div className="itemSidebar">
          <Sidebar />
        </div>
      )}
      {content.includes('Content') && (
        <div
          className="itemContent"
          style={!content.includes('Inf') ? contStyle : null}
        >
          {/* <Main /> */}
          <Card>
            <CardContent>
              <h1>Content</h1>
            </CardContent>
          </Card>
        </div>
      )}
      {content.includes('Inf') && (
        <aside
          className={`bg-white w-64 min-h-screen p-4 transition-all duration-300 ${
            layoutStyle == 'DashboardBigContent' ? '' : 'translate-x-64'
          }`}
        >
          <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
          <div className="space-y-4">
            <ExtraInformation />
          </div>
        </aside>
      )}
      {/* <GlobalModal />
        <Snackbar /> */}
    </GridContainer>
  )
}

export default Template

{
  /* <div className="itemInformation">
          Extra inf
          <ExtraInformation />
        </div> */
}
