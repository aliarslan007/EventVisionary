// 'use client'
import GoogleChart from '../../components/GoogleChart/GoogleChart'
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
import { Dashboard_img } from '../../public'
import React, {useEffect, useState} from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { FaGear, FaRegMessage } from 'react-icons/fa6'
import { IoSpeedometerOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'
import './index.css'
import RootLayout from '../layout';

const Dashboard = () => {
    const [revenue, setRevenue] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                const revenueResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/totalrevenue/`, {
                    method: 'POST',  // Assuming you are making a POST request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${authToken}`
                    },
                    body: JSON.stringify({ user_id: authUserId })
                 });
                if (!revenueResponse.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const revenueData = await revenueResponse.json();
                setRevenue(revenueData.total_revenue);

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

                                    <IoSpeedometerOutline className="menu_dash_i" style={{color: "#cbb26a"}} />
                                    <span className="link_name yellow_m">Dashboard</span>
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
                        <div className="dash_container">
                            <div className="dash_data">
                                <div className="upcoming_events" style={{overflowX: "auto"}} >
                                    <table>
                                        <caption>Upcoming Events</caption>
                                        <thead>
                                            <tr>
                                                <th>No.</th>
                                                <th>Event Title</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1.</td>
                                                <td>Drake | Sublime | Bob Marley</td>
                                                <td>10/31/2025</td>
                                            </tr>
                                            <tr>
                                                <td>2.</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>3.</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="line_chat_section" >
                                    <h3>Revenue to Date by Event </h3>
                                    <div id="chart_wrap">
                                        <GoogleChart/>
                                    </div>
                                </div>

                            </div>
                            <div className="dash_options">
                                <div className="sms" >
                                    <h4>SMS Campaigns</h4>
                                    <p>Credits</p>
                                    <p>450 Remaining of 1400 Total</p>
                                    <div className="range_divs">
                                        <div className="green_range"></div>
                                    </div>
                                    <div className="sms_btns">
                                        <a href="" className="btn sm">Get More Credits</a>
                                        <a href="" className="btn sm">New Campaign</a>

                                    </div>
                                </div>
                                <div className="req_show">
                                    <h4>Get Help Creating Your Seating Chart</h4>
                                    {/* <img src="./imgs/Designer - 4th floor 1.png" alt=""/> */}
                                    <img src={Dashboard_img} alt=''/>
                                    <a href="" className="btn sm">Submit Request</a>
                                </div>
                                <div className="new_event_list">

                                    <h4>List a New Event</h4>
                                    <a href="/NewEvent">
                                        <CiCirclePlus className="Add_event_i" />

                                    </a>
                                </div>
                                <div className="total">
                                    <h4>Total Accumulated Revenue</h4>
                                    <p>${revenue}</p>
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

export default Dashboard
