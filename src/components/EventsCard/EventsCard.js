import { One_img, Rectangle } from '../../public';
// import Image from 'next/image'; // Uncomment this line if you want to use next/image
import { NavLink } from 'react-router-dom';
import React, { useState, useContext} from 'react';
import "./index.css";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';



const EventsCard = ({ showMenuButton = true, eventTitle="", eventDateTime="", venueName="", TicketType="", TicketHref="", imge }) => {
    const [isMenuOpen, setMenuOpen] = useState(false);


    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };
    return (
        <div className="event_card">
            <img src={imge}alt='' className='event_card_img' width={270} height={270}/>
            <div className="card_info">
                <p>{eventTitle}</p>
                <p>{eventDateTime}</p>
                <p>{venueName}</p>
                <div className='card_menu'>

                    <a href={TicketHref} className="btn sm" >{TicketType}</a>
                    {showMenuButton && (
                        <div className="menu_container">
                            <HiOutlineDotsHorizontal className="card_btn" onClick={toggleMenu} />
                            {isMenuOpen && (
                                <div className="sub_card_menu">
                                    {/* Add your menu items here */}
                                    <a href="/ticketprices">Pause Ticket Sales</a>
                                    <a href="/ticketprices">End Ticket Sales</a>
                                    <a href="/eventdetails">Cancel Event</a>
                                    <a href="/eventdetails">Un-publish Event</a>
                                    <a href="/eventdetails">Archive Event</a>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default EventsCard
