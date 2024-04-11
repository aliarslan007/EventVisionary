'use client'
// import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaRegCalendarAlt, FaChevronDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './index.css'

const SubMenus = () => {

  const [isMainOpen, setIsMainOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [openEvent, setOpenEvent] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);


  // Function to toggle the event's expansion state
  const toggleEvent = (eventId) => {
    if (expandedEvent === eventId) {
      // If the clicked event is already expanded, collapse it
      setExpandedEvent(null);
    } else {
      // If a different event is clicked, expand it and collapse others
      setExpandedEvent(eventId);
    }
  };


  const toggleMain = () => {
    setIsMainOpen(!isMainOpen);
  };

    useEffect(() => {
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
          const requestBody = JSON.stringify({
            user_id: authUserId
        });
          // fetch event with eventId
          // const EventResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/eventsoforg/${eventId}/`, {
          const EventResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/eventsofuser/`, {

          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: requestBody
          });
  
          // Check if the request was successful (status code 2xx)
          if (EventResponse.ok) {
              const eventResponseData = await EventResponse.json(); // Parse the response JSON
              setEvents(eventResponseData.events);
  
              // Optionally, you can return the response data or perform other actions here
          } else {
              console.log("event retrieving error ", EventResponse.status)
          }    
      }
      fetchEventData();
      }, []);

      
  return (

    <div className="iocn-link">
      <div className="inner_nav_links " id="">
        <div className="flex_option_row accordion">
        <a href="/Event">
                  <FaRegCalendarAlt className="menu_dash_i" />
                  </a>
          <div className="Event_Title  ">
            <div className=" inner_flex">
              <a href="/Event">


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
            {events.map(event => (
                <li key={event.id} className="inner_flex Exinner_flex">
                  <div className='side_bar_all_events'>
                    <a href="/eventdash" >
                        <span>{event.Event_Name}</span>
                    </a>
                    <span><FaChevronDown
                      className="low_event"
                      onClick={() => toggleEvent(event.id)}
                    /></span>
                  </div>
                    
                    {expandedEvent === event.id && (
                        <ul className="inner_nav_items panel2">
                            <li className="inner_nav_item"><a href={`/sellTickets/${event.unique_token}`}>Sell Tickets</a></li>
                            {event.is_seating_reserved === true && (
                                <li className="inner_nav_item"><a href={`/managetwo/${event.event_id}`}>Hold Seats</a></li>
                            )}                            
                            <li className="inner_nav_item"><a href={`/scanTickets/${event.id}`}>Scan Tickets</a></li>
                            <li className="inner_nav_item"><a href={`/attendees/${event.id}`}>Attendees</a></li>
                            <li className="inner_nav_item"><a href={`/ManageOrder/${event.id}`}>Manage Orders</a></li>
                            <li className="inner_nav_item"><a href={`/eventdetails/${event.id}`}>Event Details</a></li>
                            <li className="inner_nav_item"><a href={`/ticketprices/${event.id}`}>Ticket Prices</a></li>
                            {event.is_seating_reserved === true && (
                                <li className="inner_nav_item"><a href={`/settingChart/${event.id}`}>Seating Chart</a></li>
                            )}                  
                            </ul>
                    )}
                </li>
            ))}

          </ul>
        )}
      </div>
    </div>
  )
}



export const Silder_icon = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    // Check the screen width and set the initial sidebar state
    const screenWidth = window.innerWidth;
    if (screenWidth <= 768) { // Adjust this value based on your desired breakpoint
      setSidebarOpen(false);
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        sidebar.classList.add('close');
      }
    }
  }, []);
  const toggleSidebar = () => {
    // Toggle the sidebar state
    setSidebarOpen(prevState => !prevState);

    // Toggle the 'close' class on the sidebar
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('close');
    }
  };

  return (
    <div className="icon-wrapper-arrow" onClick={toggleSidebar}>
      <svg
        width="9"
        height="17"
        viewBox="0 0 9 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.41667 1L1.24748 8.16919C0.841541 8.57513 0.859961 9.23874 1.28779 9.62153L8.41667 16"
          stroke="#FAE100"
          stroke-linecap="round"
        />
      </svg>
    </div>
  );
};
export default SubMenus 