import { useEffect, useState, useRef } from 'react'
import AnimatedLetters from '../components/AnimatedLetters'
import sbc from '../../assets/images/sbc.jpg'

export default function Sbc() {
    const [letterClass, setLetterClass] = useState('text-animate')
    return (
        <>
            <div className="container sbc-page">
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={"Single Board Computer Projects".split("")}
                        />
                    </h1>
                    <div>
                        <b>E-Ink discord bot</b>
                        <img src={sbc} alt="eink" width="280" height="280" align="right" />
                        <p>I wanted to add a fun and interactive object to my desk decorations.
                            When I heard about the 7 color e-ink display made by pimoroni my mind imeadiatly jumped to hooking it up to discord.
                            I already had a discord bot running on my raspberry pi so getting this working was as simple as adding an asyncronous
                            on_message listener from the discord api to my bot. This listener scans the channels I defined for messages with an image and sending it to the
                            draw function of the pimoroni display. </p>
                    </div>
                    <div>
                        <b>Smart Bulb light switch</b>
                        <p>After installing TP-link smart bulbs in my room I started to get annoyed at the need to pull out my phone to control my lights. 
                            With a little research I found the tp-link python api and the unicorn hat mini. This combo allowed me to map the four buttons on the unicorn hat
                            to my favorite lighting settings. I no longer need to rely on my phone to change my lights. </p>
                    </div>

                </div>
            </div>
        </>
    )
}