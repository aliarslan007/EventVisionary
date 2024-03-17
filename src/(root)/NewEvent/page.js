'use client'
import React from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { FaArrowLeft, FaChevronDown, FaRegCalendarAlt, FaRegUser } from "react-icons/fa";
import { SlLocationPin } from "react-icons/sl";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { IoSpeedometerOutline } from "react-icons/io5";
import { FaGear, FaRegMessage } from 'react-icons/fa6';
import './index.css'
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus';
import { Ellis_3 } from '../../public';
import EventRegister from '../../components/EventRegister/EventRegister';
import RootLayout from '../layout';


const NewEvent = () => {


    return (
        <>
        <RootLayout>
        
        <div className='main_container'>
            <div className="dashboard_main">
                <div className="dashboard_section">
                    <div className="sidebar ">
                        <ul className="nav-links">
                            <Silder_icon />
                            <li>
                                <a href="/Dashboard">

                                    <IoSpeedometerOutline className=" menu_dash_i" />
                                    <span className="link_name">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <a href="/NewEvent">
                                        <CiCirclePlus className="yellow_m menu_dash_i" />

                                        <span className="link_name yellow_m">CREATE AN EVENT</span>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <SubMenus />
                            </li>
                            <li>
                                <a href="/venues">
                                    <SlLocationPin className=" menu_dash_i" />
                                    <span className="link_name">VENUES</span>
                                </a>
                            </li>
                            <li>
                                <a href="/reports">
                                    <RiMoneyDollarCircleLine className=" menu_dash_i" />
                                    <span className="link_name">REPORTS</span>
                                </a>
                            </li>
                            <li>
                                <a href="/settingdash">
                                    <FaGear className=" menu_dash_i" />
                                    <span className="link_name">SETTINGS</span>
                                </a>
                            </li>
                            {/* <li>
                                <div className="iocn-link">
                                    <Link href="/SmsCampaigns">
                                        <FaRegMessage className=" menu_dash_i" />
                                        <span className="link_name">SMS CAMPAIGNS</span>
                                    </Link>
                                </div>
                            </li> */}
                            <li>
                                <div className="iocn-link">
                                    <a href="/myaccount">
                                        <FaRegUser className=" menu_dash_i" />
                                        <span className="link_name">MY ACCOUNT</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">




                            <div className="tabs_container">
                                <div className="w3-bar w3-black tabs_section">
                                    <a className="   w3-red tab_btn  team-member" href="/NewEvent">

                                        <img src={Ellis_3} alt='' className="team-member-info one_active" />
                                        1. Enter Event Details</a>
                                    <a className="   tab_btn  team-member"
                                        href='/DefineTicket'>2. Define Ticket Prices
                                    </a>
                                    <a className="   tab_btn  team-member team-member-small"
                                        href="/PublishEvent">3. Publish Event

                                    </a>
                                    <a className="   tab_btn  team-member team-member-small"
                                        href="/ShareEvent">4. share Event
                                    </a>
                                </div>
                                <EventRegister label='Next' href='DefineTicket'/>





                            </div>


                        </div>
                    </section>
                </div>
            </div>
        </div>
        </RootLayout>
        </>
    )
}

export default NewEvent
