// import Link from 'next/link';
import React, { useState } from 'react'
import { FaAngleDoubleDown, FaAngleDoubleUp } from 'react-icons/fa';

const ArchivedCom = ({eventTitle="", eventStartTime="", eventEndTime="", eventCreated="", eventId=""}) => {
    const [isPanelVisible, setPanelVisibility] = useState(false);

    const togglePanel = () => {
        setPanelVisibility(prev => !prev);
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Format the date as desired
        const formattedDate = date.toLocaleDateString(); // Format: MM/DD/YYYY
        return formattedDate;
    };
    return (
        <div className="ct_tr_container">

            <div className="ct_tr accordion5">
                <div className="ct_main_data">
                    <p>{eventTitle}</p>
                    <p className="c_grey">{eventStartTime} - {eventEndTime}</p>
                </div>
                <p className="mar_l">{formatDate(eventCreated)}</p>
                {isPanelVisible ? (
                <FaAngleDoubleUp 
                    style={{color: '#FFE100', marginRight: '10px'}} 
                    onClick={togglePanel}
                />
            ) : (
                <FaAngleDoubleDown 
                    style={{color: '#FFE100', marginRight: '10px'}} 
                    onClick={togglePanel}
                />
            )}
            </div>
            <div className={`panel5 ${isPanelVisible ? 'show' : ''}`}>

                <div className="ct_inner_btn">
                    <a href="/ArchivedEvent">Event Details</a>
                    <a href="/ArchivedAttendess">Attendees</a>
                    <a href="/ArchivedOrder">Orders</a>
                    <a href="/ArchivedPrice">Ticket Prices</a>
                    <a href="/ArchivedChart">Seating Chart</a>
                </div>
            </div>
        </div>
    )
}

export default ArchivedCom
