import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
// import Link from 'next/link'
import React from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { GoGear } from "react-icons/go";

import "./index.css"
import EventsCard from '../../components/EventsCard/EventsCard';
import { EventImg, One_img } from '../../public';
import RootLayout from '../layout';

const CustomerAccount = () => {
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

                                    <AiOutlineUser className=" menu_dash_i yellow_cr" />
                                    <span className="link_name yellow_cr">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <a href="/MyPurchases">
                                        <RiMoneyDollarCircleLine className=" menu_dash_i" />

                                        <span className="link_name ">My Purchases</span>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <a href="/Setting">
                                    <GoGear className=" menu_dash_i" />
                                    <span className="link_name">Setting    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">
                            <div className="my_acc_section">
                                <h1>My Account</h1>
                                <div className="upcoming_box">

                                    <div className="upcoming_warp">
                                        <div className="upcoming_cust">
                                            <h3>Hi "User First Name "</h3>
                                            <div className="upcoming_cust_box">
                                                <h2>Upcoming Events</h2>
                                                <p>You have no upcoming events.</p>
                                                <ol>
                                                    <li>Event Title</li>
                                                </ol>
                                            </div>
                                        </div>
                                        <div className="upcoming_action">
                                            <h3>Quick Actions</h3>
                                            <a href="">Add Payment Method</a>
                                            <a href="">Browse Events</a>
                                            <a href="">View Past Purchases</a>
                                        </div>

                                    </div>
                                    <div className="event_like_box">
                                        <div className="event_like">
                                            <h3>Events You Might Like</h3>
                                            <div className="evet_rows">
                                                <EventsCard imge={One_img}eventDateTime="Sat, July 15, 2025 • 7:30 PM" TicketType="Sell Tickets" TicketHref='/sellTickets' showMenuButton={false}  />
                                                <EventsCard imge={One_img} eventDateTime="Sat, July 15, 2025 • 7:30 PM" TicketType="Sell Tickets" TicketHref='/sellTickets' showMenuButton={false} />
                                                <EventsCard imge={EventImg} eventDateTime="Sat, July 15, 2025 • 7:30 PM" TicketType="Sell Tickets" TicketHref='/sellTickets' showMenuButton={false} />
                                            </div>
                                        </div>
                                        <div className="event_Organizer">
                                            <h3>More Events By " Event Organizer "</h3>
                                            <div className="evet_rows">
                                                <EventsCard imge={One_img} eventDateTime="Sat, July 15, 2025 • 7:30 PM" TicketType="Sell Tickets" TicketHref='/sellTickets' showMenuButton={false} />
                                                <EventsCard imge={EventImg}eventDateTime="Sat, July 15, 2025 • 7:30 PM" TicketType="Sell Tickets" TicketHref='/sellTickets' showMenuButton={false} />
                                                <EventsCard imge={One_img} eventDateTime="Sat, July 15, 2025 • 7:30 PM" TicketType="Sell Tickets" TicketHref='/sellTickets' showMenuButton={false} />
                                            </div>
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

export default CustomerAccount
