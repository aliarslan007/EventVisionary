'use client'
import ArchivedBack from '../../components/ArchivedBack/ArchivedBack'
import MainMenusEx from '../../components/MainMenusEx/MainMenusEx'
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
import React, { useRef, useCallback, useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci'
import { FaRegCalendarAlt, FaChevronDown } from 'react-icons/fa'
import { FaChevronLeft } from 'react-icons/fa6'
import { IoSpeedometerOutline } from 'react-icons/io5'
import Webcam, { WebcamProps } from 'react-webcam';
import RootLayout from '../layout';
import { QrReader } from 'react-qr-reader';
import QRScanner from 'react-qr-scanner';

const ScanTickets = () => {
    
    const [qrCodeValue, setQrCodeValue] = useState('');
    const [isMainOpen, setIsMainOpen] = useState(true);
    const [isEventOpen, setIsEventOpen] = useState(true);

    const toggleMain = () => {
        setIsMainOpen(!isMainOpen);
    };

    const toggleEvent = () => {
        setIsEventOpen(!isEventOpen);
    };








    const webcamRef = useRef(null);
    const [isCameraOn, setIsCameraOn] = useState(false);

    const toggleCamera = () => {
        setIsCameraOn((prevIsCameraOn) => !prevIsCameraOn);
    };

    const capture = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            // Use the captured image source as needed
            console.log('Captured Image:', imageSrc);
        }
    };


     
    const handleScan = async (data) => {
        if (data) {

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
                    qr_code : parseInt(data.text),
                });
                // fetch event with eventId
                const scanResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/scantickets/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body: requestBody
                });
        
                // Check if the request was successful (status code 2xx)
                if (scanResponse.ok) {
                    const scanResponseData = await scanResponse.json(); // Parse the response JSON
                    alert('QR Code Scanned successfully: \n ', scanResponseData);
                    // navigate(`/ShareEvent/${eventId}`);
                    // Optionally, you can return the response data or perform other actions here
                } else {
                    const scanResponseDataBody = await scanResponse.text();
                    console.log(" error occured : ",({scanResponseDataBody}) );
                    return;
                }
    
            } // try ends here
            catch(error){
                console.log("error scanning Qr Code ", error);
            }

          setQrCodeValue(data);
          // Call your REST API here with the extracted QR code value
        }
      };
    
      const handleError = (err) => {
        console.error(err);
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
                            <section className="home-section">
                                <div className="home-content">
                                    <div className="manage_order_area">
                                        <div className="manage_two_sec">
                                            <div className="manage_two_info">
                                                <h1> Event Title: Scan Tickets</h1>
                                                <p>Use your mobile device to scan your customers’ tickets. You must enable
                                                    permissions on your device in order to use this feature. </p>
                                            </div>
                                        </div>
                                        <div className="tiktct_mbtn">
                                            <button onClick={toggleCamera}>
                                                {isCameraOn ? 'Close Camera' : 'Open Camera'}
                                            </button>
                                            {isCameraOn && (
                                                
                                                <QRScanner
                                                    delay={300}
                                                    onError={handleError}
                                                    onScan={handleScan}
                                                    style={{ width: '640' , height: '480'}}
                                                    />
                                                )}
                                            {isCameraOn && <button onClick={capture}>Capture Image</button>}
                                        </div>
                                        <video id="preview"></video>

                                        <div id="popup24" className="overlay">
                                            <div className="popup_main">
                                                <div className="popup_main_a">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
                                                        <path d="M22.5 20.5L37.75 5.25C38.3125 4.6875 38.3125 3.8125 37.75 3.25C37.1875 2.6875 36.3125 2.6875 35.75 3.25L20.5 18.5L5.25 3.25C4.6875 2.6875 3.8125 2.6875 3.25 3.25C2.6875 3.8125 2.6875 4.6875 3.25 5.25L18.5 20.5L3.25 35.75C2.6875 36.3125 2.6875 37.1875 3.25 37.75C3.5 38 3.875 38.1875 4.25 38.1875C4.625 38.1875 5 38.0625 5.25 37.75L20.5 22.5L35.75 37.75C36 38 36.375 38.1875 36.75 38.1875C37.125 38.1875 37.5 38.0625 37.75 37.75C38.3125 37.1875 38.3125 36.3125 37.75 35.75L22.5 20.5Z" fill="#FF0000" />
                                                    </svg>
                                                    <p>Already checked in Customer Name</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="popup25" className="overlay">
                                            <div className="popup_main">
                                                <div className="popup_main_a">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                        <path d="M22 20L37.25 4.75C37.8125 4.1875 37.8125 3.3125 37.25 2.75C36.6875 2.1875 35.8125 2.1875 35.25 2.75L20 18L4.75 2.75C4.1875 2.1875 3.3125 2.1875 2.75 2.75C2.1875 3.3125 2.1875 4.1875 2.75 4.75L18 20L2.75 35.25C2.1875 35.8125 2.1875 36.6875 2.75 37.25C3 37.5 3.375 37.6875 3.75 37.6875C4.125 37.6875 4.5 37.5625 4.75 37.25L20 22L35.25 37.25C35.5 37.5 35.875 37.6875 36.25 37.6875C36.625 37.6875 37 37.5625 37.25 37.25C37.8125 36.6875 37.8125 35.8125 37.25 35.25L22 20Z" fill="#FF0000" />
                                                    </svg>
                                                    <p>Invalid QR Code</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="popup26" className="overlay">
                                            <div className="popup_main">
                                                <div className="popup_main_a">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="25" viewBox="0 0 37 25" fill="none">
                                                        <path d="M36.3753 1.375C35.8128 0.8125 34.9378 0.8125 34.3753 1.375L13.1253 22L2.62534 11.6875C2.06284 11.125 1.18784 11.1875 0.625344 11.6875C0.0628441 12.25 0.125344 13.125 0.625344 13.6875L11.6878 24.4375C12.0628 24.8125 12.5628 25 13.1253 25C13.6878 25 14.1253 24.8125 14.5628 24.4375L36.3753 3.25C36.9378 2.8125 36.9378 1.9375 36.3753 1.375Z" fill="#52FF00" />
                                                    </svg>
                                                    <p>Customer Name Section/Table <br /> Ticket Type</p>
                                                </div>
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

export default ScanTickets
