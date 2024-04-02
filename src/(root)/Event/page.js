'use client'
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
import React, { useState, useEffect, useRef} from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaChevronDown, FaFacebookF, FaLinkedin, FaRegCalendarAlt, FaRegUser, FaTwitter } from 'react-icons/fa'
import { FaGear, FaRegMessage } from 'react-icons/fa6'
import { IoSpeedometerOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'
import './index.css'
import EventsCard from '../../components/EventsCard/EventsCard'
import { EventImg, One_img } from '../../public'
import RootLayout from '../layout';

const Event = () => {

    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [uniqureUrl, setUniqureUrl] = useState([]);
    const inputRef = useRef(null);

    const [isMainOpen, setIsMainOpen] = useState(false);
    const [isEventOpen, setIsEventOpen] = useState(false);

    const toggleMain = () => {
        setIsMainOpen(!isMainOpen);
    };

    const toggleEvent = () => {
        setIsEventOpen(!isEventOpen);
    };

    // handle copy to clipboard
    const handleCopyToClipboard = () => {
        const inputValue = inputRef.current.value;
        navigator.clipboard.writeText(inputValue)
          .then(() => {
            console.log('Text copied to clipboard:', inputValue);
            // Optionally, you can show a success message to the user
          })
          .catch(error => {
            console.error('Failed to copy text to clipboard:', error);
            // Optionally, you can show an error message to the user
          });
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
                
                // Fetch user data
                const userResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${authUserId}`, {
                    headers: {
                        Authorization: `Token ${authToken}`
                    }
                });
                if (!userResponse.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const userData = await userResponse.json();
                const unique_token = userData.unique_token;
                const baseUrl = window.location.href;
                const newUrl = `${baseUrl}s/token=${unique_token}`;
                setUniqureUrl(newUrl);

                // fetching events details
                const eventResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/events/`, {
                    headers: {
                        Authorization: `Token ${authToken}`
                    }
                });
                if (!eventResponse.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await eventResponse.json();
                setEvents(eventData);


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
                                                <FaChevronDown className="icon_sub_menu " onClick={toggleMain} />

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
                            </li>
                            <li>
                                <a href="/venues">
                                    <SlLocationPin className=" menu_dash_i" />
                                    <span className="link_name">VENUES</span>
                                </a>
                            </li>
                            <li>
                                <a href="/reports">
                                    <RiMoneyDollarCircleLine className=" menu_dash_i" />
                                    <span className="link_name">REPORTS</span>
                                </a>
                            </li>
                            <li>
                                <a href="/settingdash">
                                    <FaGear className=" menu_dash_i" />
                                    <span className="link_name">SETTINGS</span>
                                </a>
                            </li>
                            {/* <li>
                                <div className="iocn-link">
                                    <Link href="/SmsCampaigns">
                                        <FaRegMessage className=" menu_dash_i" />
                                        <span className="link_name">SMS CAMPAIGNS</span>
                                    </Link>
                                </div>
                            </li> */}
                            <li>
                                <div className="iocn-link">
                                    <a href="/myaccount">
                                        <FaRegUser className=" menu_dash_i" />
                                        <span className="link_name">MY ACCOUNT</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">
                            <div className="events_section " data-aos="fade" data-aos-delay="100">
                                <div className="events_row_1">
                                    <div className="para">
                                        <p className="para_title">Share a public version of this page. </p>
                                        <p className="para_p">For example, you can add this to your bio link section on your social media, or share on your website to lead customers to your events.</p>
                                        <div className="copy_links">
                                            <input type="text" value={uniqureUrl} disabled ref={inputRef} className="cursor_pointer white_txt" />
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={handleCopyToClipboard} width="21" height="20" viewBox="0 0 21 20" fill="none">
                                                <path d="M17.1667 7.5H9.66667C8.74619 7.5 8 8.24619 8 9.16667V16.6667C8 17.5871 8.74619 18.3333 9.66667 18.3333H17.1667C18.0871 18.3333 18.8333 17.5871 18.8333 16.6667V9.16667C18.8333 8.24619 18.0871 7.5 17.1667 7.5Z" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M4.66699 12.5001H3.83366C3.39163 12.5001 2.96771 12.3245 2.65515 12.0119C2.34259 11.6994 2.16699 11.2754 2.16699 10.8334V3.33341C2.16699 2.89139 2.34259 2.46746 2.65515 2.1549C2.96771 1.84234 3.39163 1.66675 3.83366 1.66675H11.3337C11.7757 1.66675 12.1996 1.84234 12.5122 2.1549C12.8247 2.46746 13.0003 2.89139 13.0003 3.33341V4.16675" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                        </div>
                                        <div className="icons">
                                            <a href="https://www.facebook.com/profile.php?id=61554004420226">

                                            <FaFacebookF className="share_icon_i" target='_blank'/>
                                            </a>
                                            <a href="https://www.instagram.com/eventvisionary/?igshid=MzMyNGUyNmU2YQ%3D%3D">

                                            <FaLinkedin className="share_icon_i" target='_blank'/>
                                            </a>
                                            <a href="https://twitter.com/EventVisionary" target='_blank'>

                                            <FaTwitter className="share_icon_i" />
                                            </a>
                                        </div>
                                    </div>
                                    <div className='new_event_list_wap'>

                                        <div className="new_event_list">

                                            <h4>List a New Event</h4>
                                            <a href="./NewEvent">
                                                {/* <i className='bx bx-plus-circle'  ></i> */}
                                                <CiCirclePlus className="new_event_list_i" />

                                            </a>
                                        </div>
                                    </div>

                                </div>
                                <div className="events_row_2">
                                    <div className="event_cards" >
                                    {events.map(event => (
                                        <EventsCard imge={event.Event_image} eventDateTime={`${event.start_date} • ${event.start_time}`} TicketType="Sell Tickets" TicketHref='/sellTickets' eventId={event.id}/>
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

export default Event
