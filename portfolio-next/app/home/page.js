import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import LogoH from '../../assets/images/headshot.jpg'

export default function Home() {
    const nameArray = ' Harry,'.split('')
    const jobArray = 'web developer.'.split('')

    return (
        <>
            <div className="container home-page">
                <div className="text-zone">
                    <h1>Hi, I'm Harry</h1>
                    <h2>Full Stack Developer / Data Scientist / Cyclist</h2>
                    <Link href="/contact" className="flat-button">
                        Contact Me
                    </Link>
                    <Link href="/bluebike" className="flat-button">
                        Example Data Visualization
                    </Link>
                </div>
                <div className="pic-zone">
                    <Image
                        src={LogoH}
                        alt="headshot"
                        width="460"
                        height="460"
                    />
                </div>
            </div>
        </>
    )
}
