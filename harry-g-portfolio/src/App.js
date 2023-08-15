import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Sbc from './components/Sbc'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import Map from './components/Gpx'
import './App.scss'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/sbc" element={<Sbc/>} />
          <Route path="/gpx" element={<Map/>}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
