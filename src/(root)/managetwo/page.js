'use client'
import MainMenusEx from '../../components/MainMenusEx/MainMenusEx'
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
import React, { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaRegCalendarAlt, FaChevronDown } from 'react-icons/fa'
import { IoSpeedometerOutline } from 'react-icons/io5'
import RootLayout from '../layout';
import { SeatsioEventManager } from '@seatsio/seatsio-react';
import { useParams } from 'react-router-dom';


const Hold_Seats = () => {
    // REACT_SEATS_IO_SECRET_KEY
    const { eventId } = useParams();
    const [isMainOpen, setIsMainOpen] = useState(true);
    const [isEventOpen, setIsEventOpen] = useState(true);
    const secretKey = process.env.REACT_APP_SEATS_IO_SECRET_KEY;

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
                            <SubMenus />
                            </li>
                            <MainMenusEx />

                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">
                        <div className="manage_order_area">
                            <div className="manage_two_sec">
                                <div className="manage_two_info">
                                    <h1> Event Title: Hold Seats</h1>
                                    <p>Select seats you’d like to mark on hold. This will prevent both you, your staff, and your customers from purchasing these seats.</p>
                                </div>
                                <div className="manage_iframe">
                                <SeatsioEventManager
                                    secretKey={secretKey}
                                    event={eventId}
                                    mode={'manageForSaleConfig'}
                                    region="eu"
                                />
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

export default Hold_Seats
