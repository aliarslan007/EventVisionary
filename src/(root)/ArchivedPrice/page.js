'use client'
import MainMenusEx from '../../components/MainMenusEx/MainMenusEx';
import { Silder_icon } from '../../components/SubMenus/SubMenus';
import TicketPrice from '../../components/TicketPrice/TicketPrice';
// import Link from 'next/link';
import React, { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci';
import { FaRegCalendarAlt, FaChevronDown } from 'react-icons/fa';
import { IoSpeedometerOutline } from 'react-icons/io5';
import RootLayout from '../layout';

const ArchivedPrice = () => {
    const [isMainOpen, setIsMainOpen] = useState(true);
    const [isEventOpen, setIsEventOpen] = useState(false);

    const toggleMain = () => {
        setIsMainOpen(!isMainOpen);
    };

    const toggleEvent = () => {
        setIsEventOpen(!isEventOpen);
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
                                                <a href="/archived" className="inner_link_i yellow_m">Archived</a>
                                                <a href="/Draft" className='inner_link_i'>Draft</a>
                                                <div className='Exinner_flex '>

                                                    <a href="/eventdash" className='inner_link_i'>
                                                        <li className=" inner_flex Exinner_flex ">
                                                            Event Title
                                                        </li>

                                                    </a>
                                                    <FaChevronDown className="low_event" onClick={toggleEvent} />
                                                </div>
                                                {isEventOpen && (

                                                    <ul className="inner_nav_items panel2">
                                                        <li className="inner_nav_item "><a href="/sellTickets" >Sell Tickets</a></li>
                                                        <li className="inner_nav_item"><a href="/managetwo">Hold Seats</a></li>
                                                        <li className="inner_nav_item"><a href="/scanTickets">Scan Tickets</a></li>
                                                        <li className="inner_nav_item"><a href="/attendees">Attendees</a></li>
                                                        <li className="inner_nav_item"><a href="/ManageOrder" >Manage Orders</a></li>
                                                        <li className="inner_nav_item"><a href="/eventdetails" >Event Details</a></li>
                                                        <li className="inner_nav_item"><a href="/ticketprices" className=''>Ticket Prices</a></li>
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
                            <div className="tabs_container">
                                
                                <TicketPrice title='Archhived: Event Title Ticket Prices' label='Save Changes' href='#' showBackButton />
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

export default ArchivedPrice
