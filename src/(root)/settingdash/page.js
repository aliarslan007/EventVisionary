import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
import { Settingdasg_img, Square, Strip } from '../../public'
// import Image from 'next/image'
// import Link from 'next/link'
import React from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { FaGear, FaRegMessage } from 'react-icons/fa6'
import { IoSpeedometerOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'
import RootLayout from '../layout';

import "./index.css"

const Settingdash = () => {
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
                                    <FaGear className="yellow_m menu_dash_i" />
                                    <span className="yellow_m link_name">SETTINGS</span>
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
                            <div className="main_setting">
                                <h1>Settings</h1>
                                <div className="main_set">
                                    <div className="setting_contact">
                                        <div className="setting_contact_warp">

                                            <p>Display Contact Information</p>
                                            <div className="setting_contact_inp">
                                                <label className="switch">
                                                    <input type="checkbox" className="age-checkbox" checked />
                                                    <span className="slider round"></span>
                                                </label>
                                                <label htmlFor="">Email:</label>
                                                <input type="email" className='setting_contact_input' />

                                            </div>
                                            <div className="setting_contact_inp">
                                                <label className="switch">
                                                    <input type="checkbox" className="age-checkbox" checked />
                                                    <span className="slider round"></span>
                                                </label>
                                                <label htmlFor="">Phone:</label>
                                                <input type="number" className='setting_contact_input' />

                                            </div>
                                        </div>
                                        <div className="setting_logos">
                                            <p>Logo:</p>
                                            <div className="setting_logo"></div>

                                        </div>
                                    </div>
                                    <div className="setting_pay">
                                        <p className='yellow_cr'>Payout Method</p>
                                        <p>Choose an option below to connect your account to a payout method. This is how you will receive payouts for customers’ ticket purchases.</p>
                                        <div className="pay_logos">

                                            <img src={Strip} alt='' />
                                            <img src={Square} alt='' />
                                        </div>

                                    </div>
                                    <div className="method">
                                        <p className='yellow_cr'>Payout Method</p>
                                        <p>Billing Information</p>
                                        <p>You will only be charged in the event you elect to absorb service fees or use our SMS campaigns service.</p>
                                        <form action="" className='setting_method'>
                                            <div className="setting_method_row">
                                            <div className="method_inputs">

                                                <div className="method_input">
                                                    <label htmlFor="">First Name</label>
                                                    <input type="text" />
                                                </div>
                                                <div className="method_input">
                                                    <label htmlFor="">Last Name</label>
                                                    <input type="text" />
                                                </div>
                                            </div>
                                            <div className="method_inputs">

                                                <div className="method_input">
                                                    <label htmlFor="">Billing Address</label>
                                                    <input type="text" />
                                                </div>
                                                <div className="method_input">
                                                    <label htmlFor="">City</label>
                                                    <input type="text" />
                                                </div>
                                                <div className="method_input">
                                                    <label htmlFor="">State</label>
                                                    <input type="text" />
                                                </div>
                                                <div className="method_input">
                                                    <label htmlFor="">Postal Code</label>
                                                    <input type="number" />
                                                </div>
                                            </div>
                                            <div className="method_inputs">

                                                <div className="method_input">
                                                    <label htmlFor="">Credit/Debit Card</label>
                                                    <input type="number" />
                                                </div>
                                            </div>
                                            <div className="method_inputs">

                                                <div className="method_input">
                                                    <label htmlFor="">Security Code</label>
                                                    <input type="number" />
                                                </div>
                                                <div className="method_input">
                                                    <label htmlFor="">Exp Date</label>
                                                    <input type="number" />
                                                </div>
                                            </div>
                                            </div>
                                            <div className='save_btn_method'>

                                            <button type='submit'>Save</button>
                                            </div>
                                        </form>


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

export default Settingdash
