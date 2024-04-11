'use client'
import MainMenusEx from '../../components/MainMenusEx/MainMenusEx'
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
import React, { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import {FaChevronDown, FaRegCalendarAlt, } from 'react-icons/fa'
import { IoSpeedometerOutline } from 'react-icons/io5'
import './index.css'
import "./index.css"
import SellTicketsCom from '../../components/SellTickets/SellTickets'
import RootLayout from '../layout';
import { useParams } from 'react-router-dom';


const SellTickets = () => {

    const { token } = useParams(); 
    const [paymentOption, setPaymentOption] = useState('Card'); // 'Card' or 'Cash'

   
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
                            <SellTicketsCom title='Event Title' token={token}/>
                            

                        </div>
                    </section>
                </div>
            </div>
        </div>
        </RootLayout>
        </>
    )
}

export default SellTickets
