import React, {useEffect, useState } from 'react';
import MainMenusEx from '../../components/MainMenusEx/MainMenusEx';
import SettingChartCom from '../../components/SettingChartCom/SettingChartCom';
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus';
// import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';
import { FaRegCalendarAlt, FaChevronDown, FaChevronLeft } from 'react-icons/fa';
import { IoSpeedometerOutline } from 'react-icons/io5';
import RootLayout from '../layout';
import { SeatsioDesigner } from '@seatsio/seatsio-react';
import { useParams } from 'react-router-dom';

const SettingChart = () => {
    
    const { eventId } = useParams();
    const [isMainOpen, setIsMainOpen] = useState(true);
    const [isEventOpen, setIsEventOpen] = useState(true);
    const [chart_Key, setChart_Key] = useState('');
    const [eventKey, setEventKey] = useState('');
    const secret_Key = process.env.REACT_APP_SEATS_IO_SECRET_KEY

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
            const EventResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/events/${eventId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
            });
    
            // Check if the request was successful (status code 2xx)
            if (EventResponse.ok) {
                const eventResponseData = await EventResponse.json(); // Parse the response JSON
                setEventKey(eventResponseData.event_id);
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
            console.log("body is 1", requestBody);
            console.log("eventId is ", eventId);
            // fetch event with eventId
            const publishChartResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/publishchart/`, {
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
                alert('event PricingResponseData successfully:', publishChartResponseData);
                // navigate(`/ShareEvent/${eventId}`);
                window.location.reload();
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
        // navigate(`/ShareEvent/${eventId}`);
        window.location.reload();
    };

    const toggleMain = () => {
        setIsMainOpen(!isMainOpen);
    };

    const toggleEvent = () => {
        setIsEventOpen(!isEventOpen);
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
                                <SubMenus/>
                            </li>
                            <MainMenusEx />

                        </ul>
                    </div>
                    <div className="home-section">
                        <div className="home-content" style={{ 'height': '700px', 'width':'100%' }}>
                        {/* <div id="chart_designer" style={{ 'height': '700px', 'width':'100%' }}> */}
                                    <SeatsioDesigner 
                                        secretKey= {secret_Key}   
                                        chartKey={chart_Key}
                                        // workspaceKey="d7e614a0-9aab-4e68-b91a-299311ea1a62"
                                        // event={eventKey}
                                        region="eu"
                                        mode='safe'/>
                                    {/* </div> */}
                        </div>
                        <div className="publish_btns">
                            <button className="tablink tab_btnn " onClick={draftNewEvent} >Save Draft</button>
                            <button className="tablink tab_btnn " onClick={publishNewEvent}>Publish</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </RootLayout>
    </>
  )
}

export default SettingChart
