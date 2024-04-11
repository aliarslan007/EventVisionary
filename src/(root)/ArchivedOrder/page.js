'use client'
import EventRegister from '../../components/EventRegister/EventRegister';
import MainMenusEx from '../../components/MainMenusEx/MainMenusEx';
import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus';
// import Link from 'next/link';
import React, { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci';
import { FaRegCalendarAlt, FaChevronDown } from 'react-icons/fa';
import { IoSpeedometerOutline } from 'react-icons/io5';
import RootLayout from '../layout';

const ArchivedOrder = () => {
    const [isMainOpen, setIsMainOpen] = useState(true);
    const [isEventOpen, setIsEventOpen] = useState(false);

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
                        <div className="tabs_container">
                                <EventRegister title="Archived Event Title: Event Details" label='Save Changes' href='#' showBackButton />
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

export default ArchivedOrder
