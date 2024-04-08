'use client'
import ArchivedBack from '../../components/ArchivedBack/ArchivedBack'
import AttendeesCom from '../../components/AttendeesCom/AttendeesCom'
import MainMenusEx from '../../components/MainMenusEx/MainMenusEx'
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
import React, {useEffect,  useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaRegCalendarAlt, FaChevronDown, FaCheck, FaSearch } from 'react-icons/fa'
import { FaChevronLeft } from 'react-icons/fa6'
import { IoSpeedometerOutline } from 'react-icons/io5'
import RootLayout from '../layout';
import { useParams } from 'react-router-dom';

const Attendees = () => {

    const { eventId } = useParams();
    const [event, setEvent] = useState(true);
    const [bookings, setBookings] = useState(true);
    const [isMainOpen, setIsMainOpen] = useState(true);
    const [isEventOpen, setIsEventOpen] = useState(true);

    const toggleMain = () => {
        setIsMainOpen(!isMainOpen);
    };

    const toggleEvent = () => {
        setIsEventOpen(!isEventOpen);
    };


    useEffect(() => {
       
        fetchEventData();
        }, [eventId]);


        const fetchEventData= async () => {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                throw new Error('Authentication token not found');
            }
            const authUserId = localStorage.getItem('authUserId');
            console.log("token is ", authToken);
            console.log("authUserId is ", authUserId);
    
            if (!authUserId) {
                throw new Error('Authentication authUserId not found');
            }
            // fetch event with eventId
            // const EventResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/events/${eventId}/`, {
            // method: 'GET',
            // headers: {
            //     'Content-Type': 'application/json',
            // }
            // });
            const eventResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/events/${eventId}/`, {
                // method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`
                }
                // body:requestBody
                });
            
    
            // Check if the request was successful (status code 2xx)
            if (eventResponse.ok) {
                const eventResponseData = await eventResponse.json(); // Parse the response JSON
                setEvent(eventResponseData);
                console.log("chart id is ", (eventResponseData.chart_key));
    
                // Optionally, you can return the response data or perform other actions here
            } else {
                console.log("event retrieving error ", eventResponse.status)
            }   
            
            



            // fetch booking
                const requestBody = JSON.stringify({
                        booking_event : eventId,
                });
            // fetch event with eventId
            const bookingResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/bookingsofevent/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body:requestBody
                });
        
                // Check if the request was successful (status code 2xx)
                if (bookingResponse.ok) {
                    const bookingResponseData = await bookingResponse.json(); // Parse the response JSON
                    setBookings(bookingResponseData.bookings);
                    console.log("booking  is ", (bookingResponseData));
        
                    // Optionally, you can return the response data or perform other actions here
                } else {
                    console.log("bookings retrieving error ", bookingResponse.status)
                }   




        }


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
                            <AttendeesCom title={event.Event_Name} bookings_data={bookings} setBookings={setBookings} fetchEventData={fetchEventData}/>



                        </div>
                    </section>
                </div>
            </div>
        </div>
        </RootLayout>
        </>
    )
}

export default Attendees
