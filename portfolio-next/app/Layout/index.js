
import Sidebar from '../../components/Sidebar'

export default function Layout({ children }) {
  return (
    <div className="App">
      <Sidebar />
      <div className="page">
      <main>{children}</main>
      </div>
    </div>
  )
}

