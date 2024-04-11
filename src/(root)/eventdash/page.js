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
                                <SubMenus/>
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
