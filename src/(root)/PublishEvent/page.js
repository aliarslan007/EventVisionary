'use client'
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
import { Ellis_3, Publish_img } from '../../public'
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
import { useParams } from 'react-router-dom';
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';
import { SeatsioDesigner } from '@seatsio/seatsio-react';
import { useNavigate } from 'react-router-dom';



const PublishEvent = () => {
    const navigate = useNavigate();
    const { eventId } = useParams();
    const [isReserveEvent, setIsReserveEvent] = useState(false);
    const [isUseExistingChart, setIsUseExistingChart] = useState(false);
    const [cloneChartName, setCloneChartName] = useState('');
    const [chart_Key, setChart_Key] = useState('');
    const [eventKey, setEventKey] = useState('');


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
            // fetch event with eventId
            const EventResponse = await fetch(`http://127.0.0.1:8000/api/events/${eventId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
    
            // Check if the request was successful (status code 2xx)
            if (EventResponse.ok) {
                const eventResponseData = await EventResponse.json(); // Parse the response JSON
                setEventKey(eventResponseData.event_id);
                setIsReserveEvent(eventResponseData.is_seating_reserved);
                setIsUseExistingChart(eventResponseData.use_existing_chart);
                setCloneChartName(eventResponseData.clone_chart_name);
                setChart_Key(eventResponseData.chart_key);
                console.log("chart id is ", (eventResponseData.chart_key));
    
                // Optionally, you can return the response data or perform other actions here
            } else {
                console.log("event retrieving error ", EventResponse.status)
            }    
        }
        fetchEventData();
        }, [eventId]);
    

    const publishNewEvent= async () => {
        try{
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
                chart_key : chart_Key,
            });
            console.log("body is ", requestBody);
            console.log("eventId is ", eventId);
            // fetch event with eventId
            const publishChartResponse = await fetch(`http://127.0.0.1:8000/api/publishchart/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body: requestBody
            });
    
            // Check if the request was successful (status code 2xx)
            if (publishChartResponse.ok) {
                const publishChartResponseData = await publishChartResponse.json(); // Parse the response JSON
                console.log('event PricingResponseData successfully:', publishChartResponseData);
                navigate(`/ShareEvent/${eventId}`);
                // Optionally, you can return the response data or perform other actions here
            } else {
                const publishChartResponseBody = await publishChartResponse.text();
                if (publishChartResponseBody.error === 'draft') {
                    console.log("The chart does not have a draft version.");
                    // Handle the case where the chart doesn't have a draft version
                } else {
                    // Handle other errors
                    console.error(`Response body: ${publishChartResponseBody}`);
                    alert(" error occured : ",({publishChartResponseBody}) );
                }
                return;
            }

        } // try ends here
        catch(error){
            console.log("error publishing chart", error);
        }
    };

    const draftNewEvent= async () => {
        navigate(`/ShareEvent/${eventId}`);
    };

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
                                        <img src={Ellis_3} alt='' className="team-member-info one_active" />

                                    </a>
                                    <a className="   tab_btn  team-member team-member-small"
                                        href="/ShareEvent">4. share Event
                                    </a>
                                </div>
                                <div id="Publish" className=" publish_class w3-container w3-border city">
                                    <div id="publish_section" name="publish_section" className="publish_section ">

                                    <div id="chart_designer" style={{ 'height': '700px' }}>
                                    <SeatsioDesigner 
                                        secretKey="37f07996-9e88-462e-a49e-680bcfec9f17"   
                                        chartKey={chart_Key}
                                        // workspaceKey="d7e614a0-9aab-4e68-b91a-299311ea1a62"
                                        // event={eventKey}
                                        region="eu"
                                        mode='safe'
                                    />
                                    </div>

                                        {/* <img src={Publish_img} alt="" /> */}

                                        <div className="publish_btns">
                                            <button className="tablink tab_btnn " onClick={draftNewEvent} >Save Draft</button>
                                            <button className="tablink tab_btnn " onClick={publishNewEvent}>Publish</button>
                                        </div>
                                    {/* <h1>{chart_Key}</h1> */}
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

export default PublishEvent
