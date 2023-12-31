import React from 'react';
import Image from 'next/image'
import sbc from '../../assets/images/sbc.jpg'

export default function Sbc() {
    return (
        <>
            <div className="container sbc-page">
                <div className="text-zone">
                    <h1>
                    Single Board Computer Projects
                    </h1>
                        <b>E-Ink discord bot</b>
                        <Image src={sbc} alt="eink" width="280" height="280" align="right" />
                        <p>I wanted to add a fun and interactive object to my desk decorations.
                            When I heard about the 7 color e-ink display made by pimoroni my mind immediately jumped to hooking it up to discord.
                            I already had a discord bot running on my raspberry pi so getting this working was as simple as adding an asynchronous
                            on_message listener from the discord api to my bot. This listener scans the channels I defined for messages with an image and sending it to the
                            draw function of the pimoroni display. </p>
                        <b>Smart Bulb light switch</b>
                        <p>After installing TP-link smart bulbs in my room I started to get annoyed at the need to pull out my phone to control my lights. 
                            With a little research I found the tp-link python api and the unicorn hat mini. This combo allowed me to map the four buttons on the unicorn hat
                            to my favorite lighting settings. I no longer need to rely on my phone to change my lights. </p>
                </div>
            </div>
        </>
    )
}
