'use client'
// import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaRegCalendarAlt, FaChevronDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './index.css'

const SubMenus = () => {

  const [isMainOpen, setIsMainOpen] = useState(false);
  const [isEventOpen, setIsEventOpen] = useState(false);

  const toggleMain = () => {
    setIsMainOpen(!isMainOpen);
  };

  const toggleEvent = () => {
    setIsEventOpen(!isEventOpen);
  };
  
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
            <a href="/eventdash" className='inner_link_i'>
              <li className=" inner_flex Exinner_flex">
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