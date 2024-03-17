'use client'
import ArchivedCom from '../../components/ArchivedCom/ArchivedCom';
import DraftCom from '../../components/DraftCom/DraftCom';
import MainMenusEx from '../../components/MainMenusEx/MainMenusEx';
import { Silder_icon } from '../../components/SubMenus/SubMenus';
import React, { useState, useEffect } from 'react'
import { CiCirclePlus } from 'react-icons/ci';
import { FaRegCalendarAlt, FaChevronDown } from 'react-icons/fa';
import { IoSpeedometerOutline } from 'react-icons/io5';
import RootLayout from '../layout';

const Draft = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isMainOpen, setIsMainOpen] = useState(true);
    const [isEventOpen, setIsEventOpen] = useState(true);

    const toggleMain = () => {
        setIsMainOpen(!isMainOpen);
    };

    const toggleEvent = () => {
        setIsEventOpen(!isEventOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');

                if (!authToken) {
                  throw new Error('Authentication token not found');
                }
                const authUserId = localStorage.getItem('authUserId');

                if (!authUserId) {
                  throw new Error('Authentication user id   found');
                }
                // const token = 'e0d25a4a3fda989bf969bc5971a9e36878ece9f2';
                
                // Fetch event data
                const drafEventsResponse = await fetch(`http://127.0.0.1:8000/api/totaldrafts/`, {
                    method: 'POST',  // Assuming you are making a POST request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${authToken}`
                    },
                    body: JSON.stringify({ user_id: authUserId })
                 });
                if (!drafEventsResponse.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const draftEventData = await drafEventsResponse.json();
                setEvents(draftEventData.drafted_events);

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
    
        // Call the fetchData function
        fetchData();
    }, []); // Include eventId in the dependency array to trigger the effect when it changes
    
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
                                                <a href="/archived" className="inner_link_i ">Archived</a>
                                                <a href="/Draft" className='inner_link_i yellow_m'>Draft</a>
                                                <a href="/eventdash" className='inner_link_i'>
                                                    <li className=" inner_flex Exinner_flex ">
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

                            <div className="manage_order_area">

                                <div className="manage_order_section">
                                    <h1>Draft(3)</h1>
                                    <form action="" className="manage_order_form">

                                        <div className="manage_filter_row">
                                            <div className="manage_filter_in">
                                                <input type="search" placeholder="Search by name" />
                                                <i className='bx bx-search'></i>
                                            </div>
                                        </div>

                                    </form>

                                </div>
                                <div className="custom_table">
                                    <div className="ct_head">
                                        <p className="ct_main_data">Event Title</p>
                                        <p className="mar_l">Date Created</p>
                                        <p className="none">.</p>
                                        <p className="none">.</p>
                                    </div>
                                    <div className="ct_body">
                                    {events && Array.isArray(events) && events.map(event => (
                                        <DraftCom  eventTitle={event.Event_Name} eventStartTime={event.start_time} eventEndTime={event.end_time} eventCreated={event.created} eventId={event.id} />
                                    ))}
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

export default Draft
