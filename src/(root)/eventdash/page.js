'use client'
import MainMenusEx from '../../components/MainMenusEx/MainMenusEx'
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
import { Events_imgs } from '../../public'
import React, { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaChevronDown, FaRegCalendarAlt, FaRegUser } from 'react-icons/fa'
import { IoSpeedometerOutline } from 'react-icons/io5'
import RootLayout from '../layout';

const EventDash = () => {
    const [isMainOpen, setIsMainOpen] = useState(true);
    const [isEventOpen, setIsEventOpen] = useState(true);
    const toggleMain = () => {
        setIsMainOpen(!isMainOpen);
    };

    const toggleEvent = () => {
        setIsEventOpen(!isEventOpen);
    };
    const [isPaused, setIsPaused] = useState(true);

    const toggleTicketSales = () => {
        setIsPaused(prevState => !prevState);
    };

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
                                    <span className="link_name ">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <a href="/NewEvent">
                                        <CiCirclePlus className=" menu_dash_i" />

                                        <span className="link_name ">CREATE AN EVENT</span>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <div className="inner_nav_links " id="">
                                        <div className="flex_option_row accordion">

                                            <FaRegCalendarAlt className="menu_dash_i yellow_m" />
                                            <div className="Event_Title  ">
                                                <div className=" inner_flex">
                                                    <a href="/Event" className='yellow_m'>

                                                        EVENTS
                                                    </a>
                                                </div>
                                                {/* <i className='bx bxs-chevron-down' id="myElement" onClick={toggleAccordion}></i> */}
                                                <FaChevronDown className="icon_sub_menu" onClick={toggleMain} />

                                            </div>
                                        </div>
                                        {isMainOpen && (
                                            <ul className="upper_nav_i panel inner_nav_items2">
                                                <a href="/archived" className="inner_link_i">Archived</a>
                                                <a href="/Draft" className='inner_link_i'>Draft</a>
                                                <a href="/eventdash" className='inner_link_i'>
                                                    <li className=" inner_flex Exinner_flex yellow_m">
                                                        Event Title
                                                        <FaChevronDown className="low_event" onClick={toggleEvent} />
                                                    </li>

                                                </a>
                                                {isEventOpen && (

                                                    <ul className="inner_nav_items panel2">
                                                        <li className="inner_nav_item"><a href="/sellTickets" className="">Sell Tickets</a></li>
                                                        <li className="inner_nav_item"><a href="/managetwo">Hold Seats</a></li>
                                                        <li className="inner_nav_item"><a href="/scanTickets">Scan Tickets</a></li>
                                                        <li className="inner_nav_item"><a href="/attendees">Attendees</a></li>
                                                        <li className="inner_nav_item"><a href="/ManageOrder">Manage Orders</a></li>
                                                        <li className="inner_nav_item"><a href="/eventdetails" >Event Details</a></li>
                                                        <li className="inner_nav_item"><a href="/ticketprices">Ticket Prices</a></li>
                                                        <li className="inner_nav_item"><a href="/settingChart">Seating Chart</a></li>
                                                    </ul>
                                                )}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </li>
                            <MainMenusEx />

                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">
                            <div className="event_dash">
                                <h1>Event Title Show Here</h1>
                                <div className="event_dash_content">
                                    <div className="event_dash_link">
                                        <div className="event_dash_bt">
                                            <h2>What do you want to do?</h2>
                                            <div className="event_warp_btns">
                                                <div className="event_dash_btns">
                                                    <a href="/sellTickets">Sell Tickets</a>
                                                    <a href="/managetwo">Hold Seats</a>
                                                    <a href="/scanTickets">Scan Tickets</a>
                                                    <a href="/ManageOrder">Manage Orders</a>
                                                </div>
                                                <div className="event_dash_btns">
                                                    <a href="/attendees">Manage Attendees</a>
                                                    <a href="/eventdetails">Edit Event Details</a>
                                                    <a href="/ticketprices">Manage Ticket Prices</a>
                                                    <a href="/settingChart">Edit Seating</a>
                                                </div>
                                            </div>
                                        </div>
                                        <img src={Events_imgs} alt='' className='event_imgs'/>
                                    </div>
                                    <div className="event_dash_action">
                                        <h2>Quick Actions</h2>
                                        <div className="event_dash_info">
                                            <div className="event_dash_ctr">
                                                <a href="">Pause Ticket Sales</a>
                                                <a href="">End Ticket Sales</a>
                                                <a href="">Cancel Event</a>
                                            </div>
                                            <div className="event_dash_text">
                                                <p>Pausing ticket sales will temporarily prevent customers and you from being able to sell tickets online through Event Visionary. You may resume ticket sales by clicking “Resume Sales” at any time before the scheduled end of sales date defined in the event details section.</p>
                                                <p>Ending Ticket sales will prevent you and your customers from being able to purchase tickets for this event. This cannot be undone.</p>
                                                <p>Note: It is your responsibility to let your clients and customers know that this event has been canceled.</p>
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
        </RootLayout>
        </>
    )
}

export default EventDash
