import SmsLinks from '@/components/SmsLinks/SmsLinks'
import SubMenus, { Silder_icon } from '@/components/SubMenus/SubMenus'
import Link from 'next/link'
import React from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { FaGear } from 'react-icons/fa6'
import { IoSpeedometerOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'
import '../SmsCampaigns/index.css'

const SendMessage = () => {
    return (
        <div className='main_container'>
            <div className="dashboard_main">
                <div className="dashboard_section">
                    <div className="sidebar ">
                        <ul className="nav-links">
                            <Silder_icon />
                            <li>
                                <SmsLinks highlightedLink="/SendMessage" />
                            </li>
                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">
                            <div className="SMS_Dashboard_warp">
                                <h3>SMS Campaigns: Send Message</h3>
                                <div className="SMS_Dashboard_box">
                                    <div className="sms_area_left">
                                        <div className="sms_Credits_box">
                                            <div className="headings_trail">
                                                <h2>Sned a message (trial)</h2>
                                            </div>
                                            <p style={{textAlign: 'center'}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem atque, voluptates earum quibusdam illum nihil error necessitatibus.</p>
                                            <select name="" id="" className='sms_Credits_input'>
                                                <option value="" disabled selected>Select your contacts group</option>
                                                <option value="" >d</option>
                                                <option value="" >d</option>
                                            </select>
                                        </div>
                                        <div className="sms_Credits_box">
                                            <h3>Create Your Message</h3>
                                            <div className="sms_infos">
                                                <p>Message:</p>
                                                <p>160/160 Characters remaining</p>
                                                <p>Tip: Make sure to add your business name to help recipients identify your business.</p>
                                                <textarea name="" id="" placeholder='Type your message here' ></textarea>
                                                <div className="sms_infos_btns">
                                                    <p>Insert Link</p>
                                                    <p>Apply Template</p>
                                                    <p>Insert Unsubscribe <br /> Instructions</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="send_messages">
                                            <button className='sms_button'>Schedule Message</button>
                                            <button className='sms_button_outline'>Send Message</button>
                                        </div>

                                    </div>
                                    <div className="sms_area_right">
                                        <div className="area_right_btns">
                                            <div>
                                                <button className='sms_button'>Buy Credits</button>
                                            </div>
                                            <div>
                                                <button className='sms_button'>Upgrade Plan</button>
                                            </div>
                                        </div>
                                        <div className="prev_message">
                                            <h3>Message Preview</h3>
                                            <div className="prev_message_box">
                                                <input type="text" placeholder='Type your message here' />
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default SendMessage
