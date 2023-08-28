import './index.module.scss'
import { useState } from 'react'
import LogoS from '../../assets/images/headshot.jpg'
import LogoSubtitle from '../../assets/images/logo_sub.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLinkedin,
  faGithub,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import {
  faHome,
  faUser,
  faMicrochip,
  faEnvelope,
  faPersonBiking,
  faBars,
  faClose,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default function Sidebar() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="nav-bar">
      <Link 
        className="logo"
        href="/"
        onClick={() => setShowNav(false)}>
        <img src={LogoS} alt="Logo" />
        <img className="sub-logo" src={LogoSubtitle} alt="Harry" />
      </Link>
      <nav className={showNav ? 'mobile-show' : ''}>
        <Link 
          exact="true"
          activeclassname="active"
          href="/"
          onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faHome} color="#4d4d4e" />
        </Link>
        <Link 
          activeclassname="active"
          className="about-link"
          href="/about"
          onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faUser} color="#4d4d4e" />
        </Link>
        <Link 
          activeclassname="active"
          className="sbc-link"
          href="/sbc"
          onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faMicrochip} color="#4d4d4e" />
        </Link>
        <Link 
          activeclassname="active"
          className="gpx-link"
          href="/bluebike"
          onClick={() => setShowNav(false)}>
          <FontAwesomeIcon icon={faPersonBiking} color="#4d4d4e" />
        </Link>
        <Link
          activeclassname="active"
          className="contact-link"
          href="/contact"
          onClick={() => setShowNav(false)}
        >
          <FontAwesomeIcon icon={faEnvelope} color="#4d4d4e" />
        </Link>
        <FontAwesomeIcon 
          onClick={() => setShowNav(false)}
          icon={faClose}
          color="#ff5100"
          size="3x"
          className='close-icon' />
      </nav>
      <ul>
        <li>
          <a
            href="https://www.linkedin.com/in/harry-gordenstein/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/harryg30"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faGithub}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>
        <li>
          <a
            href="https://www.youtube.com/@SharpRocksMTB-mv8ok"
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              color="#4d4d4e"
              className="anchor-icon"
            />
          </a>
        </li>
      </ul>
      <FontAwesomeIcon 
          onClick={() => setShowNav(true)}
          icon={faBars}
          color="#ff5100"
          size="3x"
          className='hamburger-icon' />
    </div>
  )
}


