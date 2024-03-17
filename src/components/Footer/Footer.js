import React from 'react'
import './index.css'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

import { Mine_logo } from '../../public/index'
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer>
        <div className="footer_container">
            <div className="footer_mail">
                <h2 className="footer_mail_heading">Join our mailing list</h2>
                <form action="" className="footer_form">
                    <div className="footer_form_input">
                        <input type="email" required  />
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="footer_info">
                <div className="footer_info_imgs">
                    <img src={Mine_logo} alt='mine logo' className='Logo_mine'/>
                    <p>support@eventvisionary.com</p>
                    <p>Event Visionary, LLC</p>
                    <p>30 N Gould St, Ste R,<br/>
                        Sheridan, WY 82801</p>
                </div>
                <div className="footer_info_links">
                    <b>Quick Links</b>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/About">About</a></li>
                        <li><a href="/NewEvent">Create an Event</a></li>
                        <li><a href="/Dashboard">Organizer Dashboard</a></li>
                        <li><a href="/Pricing">Pricing</a></li>
                        <li><a href="/smsTrial">Privacy Policy</a></li>
                        <li><a href="/Terms_and_Conditions">Terms and Conditions</a></li>
                    </ul>
                </div>
                <div className="footer_info_follow">
                    <b>Follow Us.</b>
                    <div className="footer_info_follow_img">
                        <a href="https://www.facebook.com/profile.php?id=61554004420226" target='_blank'>
                            <FaFacebookF className="Footer_img"/>

                        </a>
                        <a href="https://www.instagram.com/eventvisionary/?igshid=MzMyNGUyNmU2YQ%3D%3D" target='_blank'>
                            <FaInstagram className="Footer_img"/>

                        </a>
                        <a href="https://twitter.com/EventVisionary" target='_blank'>

                            <FaXTwitter className="Footer_img"/>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div className="footer_copy">
            Copyright 2023, Event Visionary LLC
        </div>
    </footer>
  )
}

export default Footer
