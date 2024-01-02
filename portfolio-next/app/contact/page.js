"use client";
import { useEffect, useState, useRef } from "react";
import React from "react";
import emailjs from "@emailjs/browser";
import { useClickAway } from "@uidotdev/usehooks";

function isValidEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export default function Contact(props) {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    if (window !== undefined) {
      emailjs
        .sendForm(
          "service_9f5y8yo",
          "template_h1t0bcn",
          form.current,
          "18nGvNStKbg9lvjNH"
        )
        .then(
          () => {
            alert("Message successfully sent!");
            window.location.reload(false);
          },
          () => {
            alert("Failed to send the message, please try again");
          }
        );
    }
  };

  const sendMissedConnection = () => {
    console.log("here");
    console.log(form.current.email.value);
    if (isValidEmail(form.current.email.value)) {
      var templateParams = {
        email: form.current.email.value,
      };
      console.log("sent?");
      emailjs.send(
        "service_9f5y8yo",
        "template_vcfwduz",
        templateParams,
        "18nGvNStKbg9lvjNH"
      );
    }
  };

  return (
    <>
      <div className="container contact-page">
        <div className="text-zone">
          <h1>Contact Me</h1>
          <p>
            I am interested in full time web development or data science
            positions in the Boston area. I am open to remote or contract work.
            Feel free to reach out with any requests, questions, or just to say
            hello.
          </p>
          <div className="contact-form">
            <form ref={form} onSubmit={sendEmail}>
              <ul>
                <li className="half">
                  <input placeholder="Name" type="text" name="name" required />
                </li>
                <li className="half">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    required
                  />
                </li>
                <li>
                  <input
                    placeholder="Subject"
                    type="text"
                    name="subject"
                    required
                  />
                </li>
                <li>
                  <textarea
                    placeholder="Message"
                    name="message"
                    required
                  ></textarea>
                </li>
                <li>
                  <input type="submit" className="flat-button" value="SEND" />
                </li>
              </ul>
            </form>
          </div>
        </div>
        {/* <div className="info-map">
          Harry Gordenstein
          <br />
          Boston MA, 02130
          <br />
          <span>gordenstein30@gmail.com</span>
        </div> */}
      </div>
    </>
  );
}
