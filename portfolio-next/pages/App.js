
import Link from 'next/link'
// import Home from './components/Home'
// import About from './components/About'
//import Contact from './components/Contact'
import Sbc from './components/Sbc'
import Layout from './components/Layout'
// import BlueBike from './components/BlueBike'
import dynamic from 'next/dynamic'


function App() {

  const Contact = dynamic(() => import("./components/Contact"), {
      loading: () => <p>loading...</p>,
      ssr: false
  })
  const BlueBike = dynamic(() => import("./components/BlueBike"), {
    loading: () => <p>loading...</p>,
    ssr: false
  })


  return (
    <>
        <Link href="/" element={<Layout />}>
          <Link href="/home" />
          <Link href="/about"/>
          {/* <Link href="/sbc" element={<Sbc/>} />
          <Link href="/bluebike" element={<BlueBike/>}/> 
          <Link href="/contact" element={<Contact />} /> */}
        </Link>

    </>
  )
}

export default App
