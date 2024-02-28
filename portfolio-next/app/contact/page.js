'use client'
import { useEffect, useState, useRef } from 'react'
import React from 'react'
import emailjs from '@emailjs/browser'
import dynamic from 'next/dynamic'
import { Button } from 'antd'
import Link from 'next/link'
// import MapWithLocation from '../../app/MapWithLocation';

const MapWithLocation = dynamic(() => import('../components/MapWithLocation'), {
    ssr: false,
    loading: () => <div>loading...</div>
})

export default function Contact(props) {
    const [letterClass, setLetterClass] = useState('text-animate')
    const form = useRef()

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
    }, [])

    const sendEmail = (e) => {
        e.preventDefault()
        if (window !== undefined) {
            emailjs
                .sendForm(
                    'service_9f5y8yo',
                    'template_h1t0bcn',
                    form.current,
                    '18nGvNStKbg9lvjNH'
                )
                .then(
                    () => {
                        alert('Message successfully sent!')
                        window.location.reload(false)
                    },
                    () => {
                        alert('Failed to send the message, please try again')
                    }
                )
        }
    }

    return (
        <>
            <div className="container contact-page">
                <div className="text-zone">
                    <h1>Contact Me</h1>
                    <p>
                        Feel free to reach out through this temporary Discord
                        invite or send me a message on LinkedIn
                    </p>
                    <Link
                        href="https://discord.gg/uqfASaVkVD"
                        className="flat-button"
                    >
                        Discord Invite
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/harry-gordenstein/"
                        className="flat-button"
                    >
                        LinkedIn Profile
                    </Link>
                </div>
            </div>
        </>
    )
}
