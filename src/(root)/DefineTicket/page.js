'use client'
import EventRegister from '../../components/EventRegister/EventRegister'
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
import TicketPrice from '../../components/TicketPrice/TicketPrice'
import { Ellis_3 } from '../../public'
// import Image from 'next/image'
// import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { FaGear, FaRegMessage } from 'react-icons/fa6'
import { IoSpeedometerOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'
import RootLayout from '../layout';
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const DefineTicket = () => {
    // const location = useLocation();
    // const eventId = new URLSearchParams(location.search).get('eventId');
    const { eventId } = useParams();

    console.log("event id is ",eventId )
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');

    useEffect(() => {

        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    throw new Error('Authentication token not found');
                }

                // fetcb venue data
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/events/${eventId}/`, {
                    headers: {
                        Authorization: `Token ${authToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch venue data');
                }

                
                const eventData = await response.json();
                setEventStartDate(eventData.start_date);
                setEventEndDate(eventData.end_date);


                
            } catch (error) {
                console.error('Error fetching venue data:', error);
            }
        };

        fetchData();

    }, []);


    useEffect(() => {
        console.log("event start date is ", eventStartDate);
        console.log("event end date is ", eventEndDate);

    }, [eventStartDate]);
    

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
                                    <span className="link_name">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <a href="/NewEvent">
                                        <CiCirclePlus className="yellow_m menu_dash_i" />

                                        <span className="link_name yellow_m">CREATE AN EVENT</span>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <SubMenus />
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




                            <div className="tabs_container">
                                <div className="w3-bar w3-black tabs_section">
                                    <a className="   w3-red tab_btn  team-member" href="/NewEvent">1. Enter Event Details</a>
                                    <a className="   tab_btn  team-member"
                                        href='/DefineTicket'>2. Define Ticket Prices
                                        <img src={Ellis_3} alt='' className="team-member-info one_active" />
                                    </a>
                                    <a className="   tab_btn  team-member team-member-small"
                                        href="/PublishEvent">3. Publish Event

                                    </a>
                                    <a className="   tab_btn  team-member team-member-small"
                                        href="/ShareEvent">4. share Event
                                    </a>
                                </div>
                                <TicketPrice label='Next' href='/PublishEvent' eventId={eventId} eventStartDate={eventStartDate} eventEndDate={eventEndDate} />

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

export default DefineTicket
