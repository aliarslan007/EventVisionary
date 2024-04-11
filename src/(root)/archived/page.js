'use client'
import ArchivedCom from '../../components/ArchivedCom/ArchivedCom'
import MainMenusEx from '../../components/MainMenusEx/MainMenusEx'
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
import React, { useState, useEffect } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaAngleDoubleDown, FaChevronDown, FaRegCalendarAlt, FaRegUser, FaSearch } from 'react-icons/fa'
import { IoSpeedometerOutline } from 'react-icons/io5'
import './index.css'
import RootLayout from '../layout';

const Archived = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isMainOpen, setIsMainOpen] = useState(true);
    const [isEventOpen, setIsEventOpen] = useState(false);

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
                const archiveEventsResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/totalarchived/`, {
                    method: 'POST',  // Assuming you are making a POST request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${authToken}`
                    },
                    body: JSON.stringify({ user_id: authUserId })
                 });
                if (!archiveEventsResponse.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const archiveEventData = await archiveEventsResponse.json();
                setEvents(archiveEventData.archived_events);

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
                                <SubMenus/>
                            </li>
                            <MainMenusEx />

                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">

                            <div className="manage_order_area">

                                <div className="manage_order_section">
                                    <h1>Archived</h1>
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
                                    </div>
                                    <div className="ct_body">
                                    {events && Array.isArray(events) && events.map(event => (
                                        <ArchivedCom eventTitle={event.Event_Name} eventStartTime={event.start_time} eventEndTime={event.end_time} eventCreated={event.created} eventId={event.id} />
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

export default Archived
