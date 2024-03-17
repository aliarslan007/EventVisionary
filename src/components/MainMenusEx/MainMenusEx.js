// import Link from 'next/link'
import React from 'react'
import { FaGear, FaRegMessage, FaRegUser } from 'react-icons/fa6'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'

const MainMenusEx = () => {
    return (
        <><li>
            <a href="/venues">
                <SlLocationPin className=" menu_dash_i" />
                <span className="link_name">VENUES</span>
            </a>
        </li><li>
                <a href="/reports">
                    <RiMoneyDollarCircleLine className=" menu_dash_i" />
                    <span className="link_name">REPORTS</span>
                </a>
            </li><li>
                <a href="/settingdash">
                    <FaGear className=" menu_dash_i" />
                    <span className=" link_name">SETTINGS</span>
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
                        <span className="link_name ">MY ACCOUNT</span>
                    </a>
                </div>
            </li>

        </>
    )
}

export default MainMenusEx
