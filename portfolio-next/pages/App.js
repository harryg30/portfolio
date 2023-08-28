import Link from 'next/link'
import dynamic from 'next/dynamic'


function App() {

  const Contact = dynamic(() => import("./Contact"), {
      loading: () => <p>loading...</p>,
      ssr: false
  })
  const BlueBike = dynamic(() => import("./BlueBike"), {
    loading: () => <p>loading...</p>,
    ssr: false
  })


  return (
    <>
        <Link href="/" >
          <Link href="/home" />
          <Link href="/about"/>
          <Link href="/sbc"  />
          <Link href="/bluebike" /> 
          <Link href="/contact" />
        </Link>

    </>
  )
}

export default App
