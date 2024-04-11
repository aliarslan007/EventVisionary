'use client'
import ArchivedCom from '../../components/ArchivedCom/ArchivedCom';
import DraftCom from '../../components/DraftCom/DraftCom';
import MainMenusEx from '../../components/MainMenusEx/MainMenusEx';
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus';
import React, { useState, useEffect } from 'react'
import { CiCirclePlus } from 'react-icons/ci';
import { FaRegCalendarAlt, FaChevronDown } from 'react-icons/fa';
import { IoSpeedometerOutline } from 'react-icons/io5';
import RootLayout from '../layout';

const Draft = () => {
    const [searchquery, setSearchquery] = useState('');
    const [searchInput, setSearchInput] = useState(''); 

    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isMainOpen, setIsMainOpen] = useState(true);
    const [isEventOpen, setIsEventOpen] = useState(true);

    // Function to handle input change
    const handleInputChange = (e) => {
        // Update the search input value state
        setSearchInput(e.target.value);
        // Call the function to update the search query state in the parent component
        setSearchquery(e.target.value);
    };

    const toggleMain = () => {
        setIsMainOpen(!isMainOpen);
    };

    const toggleEvent = () => {
        setIsEventOpen(!isEventOpen);
    };
    useEffect(() => {
            // Function to filter venues based on search query
            const filterEvents = (query) => {
                const filteredEvents = events.filter((event) => {
                    // Perform case-insensitive search on venue name
                    const lowerCaseQuery = query.toLowerCase();

                    return (
                        event.Event_Name.toLowerCase().includes(lowerCaseQuery)
                    ); });
                // Update the filteredVenuesList state with the filtered venues
                setFilteredEvents(filteredEvents);
            };
        
            filterEvents(searchquery);
        }, [searchquery, events]);

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
                const drafEventsResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/totaldrafts/`, {
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
                                <SubMenus/>
                            </li>
                            <MainMenusEx />

                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">

                            <div className="manage_order_area">

                                <div className="manage_order_section">
                                    <h1>Draft({events.length})</h1>
                                    <form action="" className="manage_order_form">

                                        <div className="manage_filter_row">
                                            <div className="manage_filter_in">
                                                <input type="search" value={searchInput}
                                                onChange={handleInputChange} placeholder="Search by name" />
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
                                    {filteredEvents && Array.isArray(filteredEvents) && filteredEvents.map(event => (
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
