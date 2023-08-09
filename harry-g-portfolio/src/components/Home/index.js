import { useEffect, useState,  } from 'react'
import { Link } from 'react-router-dom'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import LogoH from '../../assets/images/headshot.jpg'
import './index.scss'

const Home = () => {
  const [letterClass, setLetterClass] = useState('text-animate')

  const nameArray = " Harry,".split("")
  const jobArray = "web developer.".split("")

  useEffect(() => {
    setTimeout(() => {
      setLetterClass('text-animate-hover')
    }, 4000)
  }, [])

  return (
    <>
      <div className="container home-page">
        <div className="text-zone">
          <h1>
            <span className={letterClass}>H</span>
            <span className={`${letterClass} _12`}>i,</span>
            <br />
            <span className={`${letterClass} _13`}>I</span>
            <span className={`${letterClass} _14`}>'m</span>
            <AnimatedLetters
              letterClass={letterClass}
              strArray={nameArray}
              idx={15}
            />
            <br />
            <AnimatedLetters
              letterClass={letterClass}
              strArray={jobArray}
              idx={22}
            />
          </h1>
          <h2>Full Stack Developer / Data Scientist / Cyclist</h2>
          <Link to="/contact" className="flat-button">
            CONTACT ME
          </Link>
          </div>
          <div>
            <img src={LogoH} alt="headshot" width="460" height="460" align="right" margin-right="10%"/>
          </div>
          
         


      </div>

      <Loader type="ball-pulse-rise" />
    </>
  )
}

export default Home
