import React from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { FaGear, FaRegMessage } from 'react-icons/fa6'
import { IoSpeedometerOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'
import SubMenus, { Silder_icon } from '../SubMenus/SubMenus'
import Link from 'next/link'
import router from 'next/router'

const NavLinks = () => {

    return (
        <ul className="nav-links">
            <Silder_icon />
            <li>
                <Link href="/Dashboard">

                    <IoSpeedometerOutline className=" menu_dash_i" />
                    <span className="link_name">Dashboard</span>
                </Link>
            </li>
            <li>
                <div className="iocn-link">
                    <Link href="/NewEvent">
                        <CiCirclePlus className="yellow_m menu_dash_i" />

                        <span className="link_name yellow_m">CREATE AN EVENT</span>
                    </Link>
                </div>
            </li>
            <li>
                <SubMenus />
            </li>
            <li>
                <Link href="/venues">
                    <SlLocationPin className=" menu_dash_i" />
                    <span className="link_name">VENUES</span>
                </Link>
            </li>
            <li>
                <Link href="/reports">
                    <RiMoneyDollarCircleLine className=" menu_dash_i" />
                    <span className="link_name">REPORTS</span>
                </Link>
            </li>
            <li>
                <Link href="/settingdash">
                    <FaGear className=" menu_dash_i" />
                    <span className="link_name">SETTINGS</span>
                </Link>
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
                    <Link href="/myaccount">
                        <FaRegUser className=" menu_dash_i" />
                        <span className="link_name">MY ACCOUNT</span>
                    </Link>
                </div>
            </li>
        </ul>
    )
}

export default NavLinks
