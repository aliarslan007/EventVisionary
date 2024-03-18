import { One_img, Rectangle } from '../../public';
// import Image from 'next/image'; // Uncomment this line if you want to use next/image
import { NavLink } from 'react-router-dom';
import React, { useState, useContext, useEffect, useRef } from 'react';
import "./index.css";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';



const EventsCard = ({ showMenuButton = true, eventTitle="", eventDateTime="", venueName="", TicketType="", TicketHref="", imge, eventId=0 }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null); // Reference to the menu container

    const [selectedEvent, setSelectedEvent] = useState(eventId);

    const [pauseStatus, setPauseStatus] = useState(false);
    const [publishStatus, setPublishStatus] = useState(false);
    const [archiveStatus, setArchiveStatus] = useState(false);
    const [cancelStatus, setCancelStatus] = useState(false);
    const [endStatus, setEndStatus] = useState(false);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    throw new Error('Authentication token not found');
                }

                const response = await fetch(`http://127.0.0.1:8000/api/events/${eventId}`, {
                    headers: {
                        Authorization: `Token ${authToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch event data');
                }

                const eventData = await response.json();
                setSelectedEvent(eventData);

                // Set all status values based on eventData
                setPauseStatus(eventData.is_paused);
                setPublishStatus(eventData.is_published);
                setArchiveStatus(eventData.is_archived);
                setCancelStatus(eventData.is_cancelled);
                setEndStatus(eventData.is_ended);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [eventId]);

    // Handle status updates in a reusable function
    const handleStatusUpdate = async (statusValue, setStatusFunction) => {
        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                throw new Error('Authentication token not found');
            }

            const body = JSON.stringify({
                [statusValue]: !selectedEvent[statusValue] // Toggle the status value
            });

            const response = await fetch(`http://127.0.0.1:8000/api/events/${selectedEvent.id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body: body
            });

            if (!response.ok) {
                throw new Error('Failed to update event information');
            }

            setStatusFunction(prevStatus => !prevStatus); // Toggle the local status value
        } catch (error) {
            console.error('Error updating event information:', error);
        }
    };

    
    
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    // Add click event listener to handle clicks outside the menu
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <div className="event_card">
            <img src={imge} alt='' className='event_card_img' width={270} height={270}/>
            <div className="card_info">
                <p>{eventTitle}</p>
                <p>{eventDateTime}</p>
                <p>{venueName}</p>
                <div className='card_menu'>

                    <a href={TicketHref} className="btn sm" >{TicketType}</a>
                    {showMenuButton && (
                        <div className="menu_container">
                            <HiOutlineDotsHorizontal className="card_btn" onClick={toggleMenu} />
                            {isMenuOpen && (
                                <div  className="sub_card_menu">
                                    {/* Add your menu items here */}
                                    <button className='btn_black_bg' onClick={() => handleStatusUpdate("is_paused", setPauseStatus)}>
                                    {pauseStatus ? "Resume Ticket Sales" : "Pause Ticket Sales"}
                                    </button> 
                                    <button className='btn_black_bg' onClick={() => handleStatusUpdate("is_ended", setEndStatus)}>
                                    {endStatus ? "Start Ticket Sales" : "End Ticket Sales"}
                                    </button>   
                                    <button className='btn_black_bg' onClick={() => handleStatusUpdate("is_cancelled", setCancelStatus)}>
                                    {cancelStatus ? "Allow Event" : "Cancel Event"}
                                    </button> 
                                    <button className='btn_black_bg' onClick={() => handleStatusUpdate("is_published", setPublishStatus)}>
                                    {publishStatus ? "Publish Event" : "Un-publish Event"}
                                    </button> 
                                    <button className='btn_black_bg' onClick={() => handleStatusUpdate("is_archived", setArchiveStatus)}>
                                    {archiveStatus ? "Un-Archive Event" : "Archive Event"}
                                    </button>                                 
                                    {/* <a href="/ticketprices">End Ticket Sales</a> */}
                                    {/* <a href="/eventdetails">Cancel Event</a> */}
                                    {/* <a href="/eventdetails">Un-publish Event</a>
                                    <a href="/eventdetails">Archive Event</a> */}
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default EventsCard
