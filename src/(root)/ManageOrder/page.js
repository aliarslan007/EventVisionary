'use client'
import MainMenusEx from '../../components/MainMenusEx/MainMenusEx'
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus';
import React, { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci';
import { FaRegCalendarAlt, FaChevronDown, FaSearch } from 'react-icons/fa';
import { FaChevronLeft } from 'react-icons/fa6';
import { IoSpeedometerOutline } from 'react-icons/io5';
import ManageOrdersCom from '../../components/ManageOrdersCom/ManageOrdersCom';
import RootLayout from '../layout';
import { useParams } from 'react-router-dom';


const ManageOrder = () => {
    const { eventId } = useParams(); 

    const [isMainOpen, setIsMainOpen] = useState(true);
    const [isEventOpen, setIsEventOpen] = useState(true);

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
                    <section className="home-section">
                        <div className="home-content">
                           <ManageOrdersCom title='Event Title: Manage Orders' eventId={eventId}/>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        </RootLayout>
        </>
    )
}

export default ManageOrder
