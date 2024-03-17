'use client'
import SmsLinks from '@/components/SmsLinks/SmsLinks'
import SubMenus, { Silder_icon } from '@/components/SubMenus/SubMenus'
import Link from 'next/link'
import React, { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { FaGear, FaRegMessage } from 'react-icons/fa6'
import { IoSpeedometerOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'
import "./index.css"

const SmsCampaigns = () => {
    const [showPopup, setShowPopup] = useState(false); // Initialize to true
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopup3, setShowPopup3] = useState(true);
    const [showPopup4, setShowPopup4] = useState(false);
    const [showPopup5, setShowPopup5] = useState(false);
    const [showPopup6, setShowPopup6] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    }
    const togglePopup2 = () => {
        setShowPopup2(!showPopup2);
        setShowPopup(false);
    }
    const togglePopup3 = () => {
        setShowPopup3(!showPopup3);
        setShowPopup2(false);
    }
    const togglePopup4 = () => {
        setShowPopup4(!showPopup4);
        setShowPopup3(false);
    }
    const togglePopup6 = () => {
        setShowPopup6(!showPopup6);
    }
    const togglePopup5 = () => {
        setShowPopup5(!showPopup5);
        setShowPopup4(false);
    }

    return (
        <div className='main_container'>
            <div className="dashboard_main">
                <div className="dashboard_section">
                    <div className="sidebar ">
                        <ul className="nav-links">
                            <Silder_icon />
                            <li>
                                <Link href="/Dashboard">

                                    <IoSpeedometerOutline className=" menu_dash_i" />
                                    <span className="link_name ">Dashboard</span>
                                </Link>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <Link href="/NewEvent">
                                        <CiCirclePlus className=" menu_dash_i" />

                                        <span className="link_name ">CREATE AN EVENT</span>
                                    </Link>
                                </div>
                            </li>
                            <li>
                                <SubMenus />
                            </li>
                            <li>
                                <Link href="/venues">
                                    <SlLocationPin className=" menu_dash_i" />
                                    <span className="link_name">VENUES</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/reports">
                                    <RiMoneyDollarCircleLine className=" menu_dash_i" />
                                    <span className="link_name">REPORTS</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/settingdash">
                                    <FaGear className=" menu_dash_i" />
                                    <span className=" link_name">SETTINGS</span>
                                </Link>
                            </li>
                            <li>
                                <SmsLinks />
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <Link href="/myaccount ">
                                        <FaRegUser className=" menu_dash_i" />
                                        <span className="link_name">MY ACCOUNT</span>
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">
                            <div className="SMS_Dashboard_warp">
                                <h3>SMS Campaigns Dashboard</h3>
                                <div className="SMS_Dashboard_box">

                                    <div className="sms_area_left">
                                        <div className="sms_Credits_box">

                                            <p className='sms_bold'>Credits </p>
                                            <p>" " credits remaining of "total credits in plan"</p>
                                            <div className="progressBar_warp">
                                                <div className="progressOutline"></div>
                                                <div className="progress"></div>
                                            </div>
                                            <p>Rollover Credits: 351</p>
                                            <p>Refill Date: 01/23/2025</p>
                                        </div>
                                        <div className="Sms_btns">

                                            <button type='button' className='sms_button'>Buy Credits</button>
                                            <button type='button' className='sms_button'>Upgrade Plan</button>
                                            <button type='button' className='sms_button_outline'>Send Message</button>
                                        </div>
                                    </div>
                                    <div className="sms_area_right">
                                        <div className="Subscriber_Stats">
                                            <div className="stats_time">
                                                <p className='sms_bold'>Subscriber Stats </p>
                                                <p>Last 7 Days</p>
                                            </div>
                                            <p>Opt-ins: 8</p>
                                            <span><span className='purple_bg'>Opt-ins: 8</span></span>

                                            <span><span className="yellowBg">Total Subscribers: 102</span></span>

                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>
                    </section>
                </div>
            </div>
            {showPopup && (
                <div className="popup_overlay">
                    <div className="popup_content">
                        <h2>SMS Campaign Service Application</h2>
                        <p>To use this service, please fill out this short form with some details..</p>
                        <form action="" className='sms_form'>
                            <ol className='sms_ol'>
                                <li>
                                    <label htmlFor="">To your best estimation, please provide us with the approximate number of messages you intend to send each week.</label></li>
                                <div className='sms_input_box'>
                                    <select name="" id="" className='sms_select' >
                                        <option value="" selected disabled></option>
                                        <option value="">100</option>
                                        <option value="">200</option>
                                        <option value="">500</option>
                                        <option value="">1000</option>
                                        <option value="">2000</option>
                                        <option value="">3000</option>
                                        <option value="">5000</option>
                                        <option value="">10000</option>
                                        <option value="">more than 10,000</option>
                                    </select>
                                </div>
                                <li>
                                    <label htmlFor="" >Do you currently have a set of contacts you wish to move from a different service provider or business database?</label></li>
                            </ol>
                            <div className='sms_input_box'>
                                <select name="" id="" className='sms_select' >
                                    <option value="" selected disabled></option>
                                    <option value="">Yes</option>
                                    <option value="">No</option>
                                </select>
                            </div>
                            <div className='sms_input_box'>

                                <label htmlFor="" className=''>a) If you answered ‘Yes’ to the previous question, do you, under penalty of perjury, claim to have acquired those contacts ethically, legally, and lawfully with the full consent of the recipients?</label> <br />
                                <button type='button' className='sms_input_btn'>Yes</button>
                            </div>
                            <div className='sms_input_box'>

                                <input type="checkbox" />
                                <label htmlFor="">I agree to the Terms of Service</label>
                            </div>
                            <div className='sms_input_box'>
                                <label htmlFor="">By agreeing to the terms of use, you agree to not abuse this service in any way that would result in cancellation of the service or your account.</label>
                            </div>
                            <div className='sms_p'>
                                <p>Once your application is submitted, we will assign your account a unique Toll Free Number (TFN) so that you can begin sending messages. </p>
                                <p>Note: There is a one-time setup fee of $10 in order to assign your account a unique TFN. There is also a monthly fee of $5 in order for you to keep this number active on your account.</p>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label htmlFor="">Use my current payment method to pay the set-up fee and pay any recurring fees. You can change this later.</label>
                            </div>
                            <div className='submit_text'>
                                <button onClick={togglePopup} type='submit'>submit</button>

                            </div>

                        </form>
                    </div>
                </div>
            )}
            {showPopup2 && (
                <div className="popup_overlay">
                    <div className="popup_content">
                        <h2>SMS Campaigns Setup Wizard</h2>
                        <p>Congratulations! Your account was approved to run SMS Campaigns and your Toll Free Number has been assigned below.</p>
                        <p>Your Toll Free Number: (888) 888 - 8888</p>
                        <form action="" className='sms_form'>
                          
                            <div className='sms_input_box_mt'>

                                <button type='button' className='sms_input_btn'>Yes</button><br />
                                <label htmlFor="" className=''>a) If you answered ‘Yes’ to the previous question, do you, under penalty of perjury, claim to have acquired those contacts ethically, legally, and lawfully with the full consent of the recipients?</label> <br />
                                <button type='button' className='sms_input_btn'>Yes</button>
                            </div>
                            <div className='sms_input_box'>

                                <input type="checkbox" />
                                <label htmlFor="">I agree to the Terms of Service</label>
                            </div>
                            <div className='sms_input_box'>
                                <label htmlFor="">By agreeing to the terms of use, you agree to not abuse this service in any way that would result in cancellation of the service or your account.</label>
                            </div>
                            <div className='sms_p'>
                                <p>Once your application is submitted, we will assign your account a unique Toll Free Number (TFN) so that you can begin sending messages. </p>
                                <p>Note: There is a one-time setup fee of $10 in order to assign your account a unique TFN. There is also a monthly fee of $5 in order for you to keep this number active on your account.</p>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <label htmlFor="">Use my current payment method to pay the set-up fee and pay any recurring fees. You can change this later.</label>
                            </div>
                            <div className='submit_text'>
                                <button onClick={togglePopup} type='submit'>submit</button>

                            </div>

                        </form>
                    </div>
                </div>
            )}
            {showPopup3 && (
                <div className='popup_overlay'>
                    <div className='popup_content2'>
                        <h2 className='yellow_cr'>SMS Campaigns Setup Wizard</h2>
                        <p>Congratulations! </p>
                        <p>Your account was approved to run SMS Campaigns and your Toll Free Number has been assigned below.</p>
                        <h3>Your Toll Free Number: (888) 888 - 8888</h3>
                        <p>Step 1: </p>

                        <p>Please select a plan below to get started.</p>
                        
                        <input type="text" placeholder='No Subscription - Pay for bundled credits as needed' />
                        <div>

                        <button type='button' onClick={togglePopup4}>Next</button>
                        </div>


                    </div>

                </div>
            )}
            {showPopup4 && (
                <div className='popup_overlay'>
                    <div className='popup_content2'>
                        <h2 className='yellow_cr'>SMS Campaigns Setup Wizard</h2>
                        <p>Step 2: </p>

                        <p>Create your first Keyword. Keywords are used in order to capture contacts and to create an ongoing contact list.</p>
                        
                        <input type="text" placeholder='Type your Keyword here' />
                        <div>

                        <button type='button'  onClick={togglePopup5}>Next</button>
                        </div>


                    </div>

                </div>
            )}
            {showPopup5 && (
                <div className='popup_overlay'>
                    <div className='popup_content2'>
                        <h2 className='yellow_cr'>SMS Campaigns Setup Wizard</h2>
                        <p>Step 3: </p>

                        <p>Share your keyword with one of the options below:.</p>
                        <div className='popup-text'>
                            <div className="pop-ps">
                                <p>Use an Embed Code</p>
                                <p>Use an Embed Code</p>
                            </div>
                            <textarea name="" id=""></textarea>
                        </div>
                        <div>

                        <button type='button' onClick={togglePopup5}>Next</button>
                        </div>


                    </div>

                </div>
            )}
        </div>
    )
}

export default SmsCampaigns
