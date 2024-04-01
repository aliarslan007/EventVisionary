import React, {useState, useEffect} from 'react'
import './index.css'
// import Image from 'next/image'
import { Rectangle } from '../../public'
// import Link from 'next/link'
import RootLayout from '../layout';
import { useParam } from 'react-router-dom';

const Events = () => {

    const baseUrl = window.location.href;
    const token = baseUrl.match(/token=([^&]+)/)[1];
    // const tokenParam = useParam('token'); // Get the value of the 'token' parameter from the URL
    // const token = tokenParam.split('=')[1];
    const [events, setEvents] = useState([]);
    const [venueNames, setVenueNames] = useState({});
    const [user, setUser] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    // function buildCompleteImageUrl(relativeUrl) {
    const buildCompleteImageUrl = (relativeUrl) => {
        try {
            // Get base URL from window location
            // const baseUrl = window.location.href.replace(/\/[^\/]+$/, '/');
            const baseUrl = "http://127.0.0.1:8000/"
            
            // Construct complete image URL
            const completeUrl = new URL(relativeUrl, baseUrl).href;
            console.log("url is ", completeUrl);
            
            return completeUrl;
        } catch (error) {
            console.error('Error building complete image URL:', error);
            throw new Error('Failed to build complete image URL');
        }
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Format the date as desired
        const formattedDate = date.toLocaleDateString(); // Format: MM/DD/YYYY
        return formattedDate;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');

                if (!authToken) {
                  throw new Error('Authentication token not found');
                }
                const body = JSON.stringify({
                    unique_token: token // Toggle the status value
                });
                // Fetch event data
                const eventResponse = await fetch(`http://127.0.0.1:8000/api/eventsoforg/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: body
                });
                if (!eventResponse.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await eventResponse.json();
                setEvents(eventData.events);
                setUser(eventData.user);

    
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
    
        // Call the fetchData function
        fetchData();
    }, [token]); // Include eventId in the dependency array to trigger the effect when it changes
    

    useEffect(() => {
        const fetchData = async (venueId, eventId) => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    throw new Error('Authentication token not found');
                }

                const response = await fetch(`http://127.0.0.1:8000/api/venues/${venueId}/`, {
                    headers: {
                        Authorization: `Token ${authToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch venue data');
                }

                const venueData = await response.json();

                // Update venueNames state with the fetched venue name
                setVenueNames(prevVenueNames => ({
                    ...prevVenueNames,
                    [eventId]: venueData.venue_name
                }));
            } catch (error) {
                console.error('Error fetching venue data:', error);
            }
        };

        // Fetch venue data for each event
        events.forEach(event => {
            fetchData(event.Venue_name, event.id);
        });
    }, [events]); // Empty dependency array to ensure useEffect runs only once when the component mounts


  return (
    <>
        <RootLayout>
    <div className='main_container'>
      <div className="event_container">
                <div className="orgainer_card">
                    <div className="orgainer_card_info">
                        <p>{user.first_name} {user.last_name}</p>
                        {user.is_phone_display ? (
                        <p>{user.phone}</p>
                        ):(
                            <p></p> 
                        )
                        }
                        {user.is_email_display ? (
                            <p>{user.email}</p>
                        ): (
                            <p></p>
                        )
                        }   
                    </div>
                    <div className="organiner_img">
                    <img className="organiner_img event_card_img" src={buildCompleteImageUrl(user.logo_image)} alt='Rectangle'/>

                    </div>

                </div>
                <h2>Upcoming Events</h2>
                <div className="main_events">

                    <div className="events_row_2">
                        <div className="event_cards" >

                        {events && Array.isArray(events) && events.map((event) => (
                            <div className="event_card">
                                <img src={buildCompleteImageUrl(event.Event_image)} alt='Rectangle' className='event_card_img'/>
                                <div className="card_info">
                                    <p>{event.Event_Name}</p>
                                    <p>{formatDate(event.start_date)} • {event.start_time}</p>
                                    <p>{venueNames[event.id]}</p>
                                    <a href={`/SingleEvent/${event.unique_token}`} className="btn sm">Sell tickets</a>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </RootLayout>
    </>
  )
}

export default Events
