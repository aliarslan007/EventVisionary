'use client'
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
import { Ellis_3, Publish_img } from '../../public'
// import Image from 'next/image'
// import Link from 'next/link'
import React,{useState, useEffect, useRef} from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaFacebookF, FaLinkedin, FaRegUser, FaTwitter } from 'react-icons/fa'
import { FaGear, FaRegMessage } from 'react-icons/fa6'
import { IoCopyOutline, IoSpeedometerOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'
import { MdExitToApp } from "react-icons/md";
import RootLayout from '../layout';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import "./index.css"

const ShareEvent = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const inputRef = useRef(null);
    const [uniqureUrl, setUniqureUrl] = useState([]);

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
                const eventResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/events/${eventId}`, {
                    headers: {
                        Authorization: `Token ${authToken}`
                    }
                });
                if (!eventResponse.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await eventResponse.json();
                const unique_token = eventData.unique_token;
                const baseUrl = window.location.origin; // Get the base URL of the current page
                const newUrl = `${baseUrl}/SingleEvent/${unique_token}`;
                setUniqureUrl(newUrl);

                


            } catch (error) {
                throw new Error('Failed to fetch event data', error);
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
                                    </a>
                                    <a className="   tab_btn  team-member team-member-small"
                                        href="/PublishEvent">3. Publish Event

                                    </a>
                                    <a className="   tab_btn  team-member team-member-small"
                                        href="/ShareEvent">4. share Event
                                        <img src={Ellis_3} alt='' className="team-member-info one_active" />
                                    </a>
                                </div>
                                <div id="share" className="w3-container w3-border city" >
                                    <div className="share_event">
                                        <p className="share_event_title">Your event has been published successfully</p>
                                        <div className="share_portion">


                                            <div className="exit_event">
                                                <p>You can view your event here</p>
                                                {/* <img src="../imgs/enter 1.png" alt=""/> */}
                                                <MdExitToApp className="share_link_i" />

                                            </div>
                                            <h3>Share Options</h3>
                                            <div className="share_link">
                                                <p>Shareable Link:</p>
                                                <input type="text" className='white_txt' value={uniqureUrl} disabled ref={inputRef} />
                                                {/* <img src="../imgs/copy 1.png" alt=""/>/ */}
                                                <IoCopyOutline className="share_link_i" onClick={handleCopyToClipboard} />

                                            </div>
                                            <div className="directly">
                                                <p>Share Directly:</p>
                                                <div className="share_icon">
                                                    <FaFacebookF className="share_icon_i" />
                                                    <FaLinkedin className="share_icon_i" />
                                                    <FaTwitter className="share_icon_i" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="share_btns">
                                        <a className="w3-bar-item w3-button tablink w3-red tab_btn new_envet_btn" href="/NewEvent">Create a New Event</a>
                                        <a href="/Event" className="tab_btnn">Done</a>

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

export default ShareEvent
