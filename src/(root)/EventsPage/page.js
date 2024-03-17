import EventsCard from '../../components/EventsCard/EventsCard.js';
import { EventImg, One_img, Rectangle } from '../../public';
import React,  { useState, useEffect, useContext  } from 'react'
import { IoMdSearch } from "react-icons/io";
import RootLayout from '../layout';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { EventProvider } from '../../context/EventContext';


const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [venueId, setVenueId] = useState([]);
    const [venue, setVenue] = useState([]);
    

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
            const response = await fetch('http://127.0.0.1:8000/api/events', {
              headers: {
                Authorization: `Token ${authToken}`
              }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setEvents(jsonData);

          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
      const fetchVenueData = async (venueId) => {
        try {
            const authToken = localStorage.getItem('authToken');

            if (!authToken) {
              throw new Error('Authentication token not found');
            }
            // const token = 'e0d25a4a3fda989bf969bc5971a9e36878ece9f2';
            
            // Fetch venue data using the provided venueId
            const response = await fetch(`http://127.0.0.1:8000/api/venues/${venueId}/`, {
                headers: {
                    Authorization: `Token ${authToken}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch venue data');
            }
            const venueData = await response.json();
            setVenue(venueData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };
    
    // Call fetchVenueData function for each event outside of JSX
useEffect(() => {
  events.forEach(event => {
      fetchVenueData(event.Venue_name);
  });
}, [events]);

    return (
      <EventProvider>
        <>
        <RootLayout>
        <div className='main_container'>
            <section className="search_form_a">
                <form action="" className="search_form">
                    <input type="search" placeholder="Search for an event, artist, or venue..." />
                    <div className="search_al">

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 0.675781C6.825 0.675781 2.625 4.72578 2.625 9.71328C2.625 13.5008 7.65 19.5008 10.6125 22.7258C10.9875 23.1383 11.475 23.3258 12 23.3258C12.525 23.3258 13.0125 23.1008 13.3875 22.7258C16.35 19.5008 21.375 13.5008 21.375 9.71328C21.375 4.72578 17.175 0.675781 12 0.675781ZM12.15 21.6008C12.075 21.6758 11.9625 21.6758 11.85 21.6008C8.2125 17.6258 4.3125 12.4508 4.3125 9.71328C4.3125 5.66328 7.7625 2.36328 12 2.36328C16.2375 2.36328 19.6875 5.66328 19.6875 9.71328C19.6875 12.4508 15.7875 17.6258 12.15 21.6008Z" fill="#636363" />
                            <path d="M11.9996 5.88867C9.74961 5.88867 7.91211 7.72617 7.91211 9.97617C7.91211 12.2262 9.74961 14.1012 11.9996 14.1012C14.2496 14.1012 16.0871 12.2637 16.0871 10.0137C16.0871 7.76367 14.2496 5.88867 11.9996 5.88867ZM11.9996 12.4137C10.6496 12.4137 9.59961 11.3262 9.59961 10.0137C9.59961 8.70117 10.6871 7.61367 11.9996 7.61367C13.3121 7.61367 14.3996 8.70117 14.3996 10.0137C14.3996 11.3262 13.3496 12.4137 11.9996 12.4137Z" fill="#636363" />
                        </svg>
                        <select name="pets" id="pet-select" >
                            <option value="">Long Beach, CA</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="hamster">Hamster</option>
                            <option value="parrot">Parrot</option>
                            <option value="spider">Spider</option>
                            <option value="gldfish">Goldfish</option>
                            <option value="godish">Goldish</option>
                            <option value="goldfsh">Godfish</option>
                            <option value="goldfih">Gldfish</option>
                            <option value="goldfis">oldfish</option>
                        </select>
                        {/* <i className='bx bx-search' ></i> */}
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="22" viewBox="0 0 24 22" fill="none">
                        <path d="M23.0246 19.8883L16.8371 14.8633C19.3871 11.3758 19.1246 6.38828 15.9371 3.23828C14.2496 1.55078 11.9996 0.613281 9.59961 0.613281C7.19961 0.613281 4.94961 1.55078 3.26211 3.23828C-0.225391 6.72578 -0.225391 12.4258 3.26211 15.9133C4.94961 17.6008 7.19961 18.5383 9.59961 18.5383C11.8871 18.5383 14.0246 17.6758 15.7121 16.1383L21.9746 21.2008C22.1246 21.3133 22.3121 21.3883 22.4996 21.3883C22.7621 21.3883 22.9871 21.2758 23.1371 21.0883C23.4371 20.7133 23.3996 20.1883 23.0246 19.8883ZM9.59961 16.8508C7.64961 16.8508 5.84961 16.1008 4.46211 14.7133C1.61211 11.8633 1.61211 7.25078 4.46211 4.43828C5.84961 3.05078 7.64961 2.30078 9.59961 2.30078C11.5496 2.30078 13.3496 3.05078 14.7371 4.43828C17.5871 7.28828 17.5871 11.9008 14.7371 14.7133C13.3871 16.1008 11.5496 16.8508 9.59961 16.8508Z" fill="#262626" />
                    </svg>
                </form>

                <div className="container_eventpage">

                    <h2>Upcoming Events</h2>
                    <div className="events_row_2">
                    <div className="event_cards" >
                        {events
                            .filter(event =>
                                !event.is_archived &&
                                !event.is_draft &&
                                !event.is_ended &&
                                !event.is_paused &&
                                !event.is_cancelled
                            )
                            .map(event => (
                                <EventsCard
                                    key={event.id}
                                    imge={event.Event_image}
                                    eventTitle={event.Event_Name}
                                    venueName={venue.venue_name}
                                    showMenuButton={false}
                                    eventDateTime={`${event.start_date} • ${event.start_time}`}
                                    TicketType="Get Tickets"
                                    TicketHref={`/SingleEvent/${event.id}`}
                                />
                            ))}
                    </div>
                </div>
                    <section className="pagination">
                        <p>1</p>
                        <p>of</p>
                        <p>365</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M6.46875 17.9062C6.28125 17.9062 6.125 17.8438 5.96875 17.7188C5.6875 17.4375 5.6875 17 5.96875 16.7188L12.5312 10L5.96875 3.3125C5.6875 3.03125 5.6875 2.59375 5.96875 2.3125C6.25 2.03125 6.6875 2.03125 6.96875 2.3125L14.0313 9.5C14.3125 9.78125 14.3125 10.2187 14.0313 10.5L6.96875 17.6875C6.84375 17.8125 6.65625 17.9062 6.46875 17.9062Z" fill="#FAE100" />
                        </svg>
                    </section>
                </div>
            </section>
        </div>
        </RootLayout>
        </>
        </EventProvider>
    )
}

export default EventsPage
