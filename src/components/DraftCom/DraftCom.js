
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

const DraftCom = ({eventTitle="", eventStartTime="", eventEndTime="", eventCreated="", eventId=""}) => {

    
   
    const navigate = useNavigate();


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Format the date as desired
        const formattedDate = date.toLocaleDateString(); // Format: MM/DD/YYYY
        return formattedDate;
    };

    const handleEdit =() =>{
        navigate(`/eventdetails/${eventId}`);
    }

    const handleDelete = async () =>{
        try {
            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                throw new Error('Authentication token not found');
            }

            const body = JSON.stringify({
                is_ended: true // Toggle the status value
            });

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/events/${eventId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body: body
            });

            if (!response.ok) {
                throw new Error('Failed to update event information');
            }
            else{
                alert("event deleted successfully ");
                window.location.reload();

            }

        } catch (error) {
            console.error('Error updating event information:', error);
        }

        // navigate(`/eventdetails/${eventId}`);
    }

    

    

    return (
        <div className="ct_tr_container">

            <div className="ct_tr ">
                <div className="ct_main_data">
                    <p>{eventTitle}</p>
                    <p className="c_grey">{eventStartTime} - {eventEndTime}</p>
                </div>
                <p className="mar_l">{formatDate(eventCreated)}</p>
                <p className=" cursor_pointer">
                <button onClick={handleEdit} className="yellow_m_bg cursor_pointer">
                    Edit
                </button>

                </p>



                <svg xmlns="http://www.w3.org/2000/svg" onClick={handleDelete} width="15" height="16" viewBox="0 0 15 16" fill="none" className="cursor_pointer">
                    <g clip-path="url(#clip0_799_205)">
                        <path d="M3.04688 15.5H11.9531V2.84375H12.6562V2.375H9.375V0.5H5.625V2.375H2.34375V2.84375H3.04688V15.5ZM6.09375 0.96875H8.90625V2.375H6.09375V0.96875ZM11.4844 2.84375V15.0312H3.51562V2.84375H11.4844Z" fill="#FF0000" />
                        <path d="M6.32812 5.1875H5.85938V13.1562H6.32812V5.1875Z" fill="#FF0000" />
                        <path d="M9.14062 5.1875H8.67188V13.1562H9.14062V5.1875Z" fill="#FF0000" />
                    </g>
                    <defs>
                        <clipPath id="clip0_799_205">
                            <rect width="15" height="15" fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                    </defs>
                </svg>

            </div>
        </div>
    )
}

export default DraftCom
