import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoH from "../../assets/images/headshot.jpg";
import Three from "./three";

export default function Home() {
    const nameArray = " Harry,".split("");
    const jobArray = "web developer.".split("");

    return (
        <>
            <div className="container home-page">
                <div className="text-zone">
                    <h1>Hi, I'm Harry</h1>
                    <h2>Full Stack Developer / Data Scientist / Cyclist</h2>
                    <Link href="/contact" className="flat-button">
                        CONTACT ME
                    </Link>
                    <Link href="/bluebike" className="flat-button">
                        Example Data Visualization
                    </Link>
                </div>
                <div className="three-zone">
                    <Three />
                </div>
                <div className="citation">
                  <p>This work is based on "Santa Cruz-Hightower-Bike" (https://sketchfab.com/3d-models/santa-cruz-hightower-bike-d54d41ec8ab6445ba9972a21b24a927c) by Lejam009- (https://sketchfab.com/lejam009) licensed under CC-BY-NC-4.0 (http://creativecommons.org/licenses/by-nc/4.0/)</p>
                </div>
            </div>
        </>
    );
}
