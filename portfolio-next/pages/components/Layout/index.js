
import Sidebar from '../Sidebar/'
import './index.module.scss'

const Layout = ({children}) => {
  return (
    <div className="App">
      <Sidebar />
      <div className="page">
      <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
