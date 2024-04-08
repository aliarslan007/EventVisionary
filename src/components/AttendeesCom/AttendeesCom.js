import React from 'react';
import { FaSearch, FaCheck } from 'react-icons/fa';
import ArchivedBack from '../ArchivedBack/ArchivedBack';

const AttendeesCom = ({ title = "", showBackButton, bookings_data="", setBookings="", fetchEventData }) => {

    const markBookingAsAdmitted = async (bookingId, status) => {

        console.log("booking id for admit is ", bookingId)
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Authentication token not found');
        }
        // Define the PATCH request options
        const requestBody = JSON.stringify({
            is_admitted : !status,
    });
        const bookingResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/bookings/${bookingId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body:requestBody
            });
    
            // Check if the request was successful (status code 2xx)
            if (bookingResponse.ok) {
                const bookingResponseData = await bookingResponse.json(); // Parse the response JSON
                // setBookings(bookingResponseData.bookings);
                console.log("afte changing admitting   is ", (bookingResponseData));
                // const updatedBooking = await bookingResponseData.json();

                fetchEventData();
    
                // Optionally, you can return the response data or perform other actions here
            } else {
                console.log("bookings retrieving error ", bookingResponse.status)
            }   

      };
      
    return (
        <div className="manage_order_area">
            {showBackButton && <ArchivedBack />}

            <div className="manage_order_section">
                {title && <h1>{title} : Attendees</h1>}
                <form action="" className="manage_order_form">
                    <div className="manage_filter_row">
                        <div className="manage_filter_in">
                            <input type="search" placeholder="Search by name, order #, or amount..." />
                            <FaSearch style={{ color: '#000' }} />
                        </div>
                    </div>
                    <button className="manage_filter_btn">Export CSV</button>
                </form>
            </div>

            <div className="manage_filter_table">
                <table className="manage_filter_tables">
                    <thead>
                        <tr>
                            <th>Mark Admitted</th>
                            <th>Name</th>
                            <th>Section</th>
                            <th>Seat ID</th>
                            <th>Table ID</th>
                            <th>Order #</th>
                            <th>Order Note</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Array.isArray(bookings_data) && bookings_data.map((booking, index) => (
                            <tr key={index}>
                            <td><FaCheck     style={{ color: booking.is_admitted ? 'green' : 'white' }} 
                             onClick={() => {
                                console.log('is_admitted:', booking.is_admitted);
                                markBookingAsAdmitted(booking.id, booking.is_admitted);
                              }}
                                /></td>
                            <td>{booking.billinginfo_ID.first_name} {booking.billinginfo_ID.last_name}</td>
                            <td>{booking.seat_section}</td>
                            <td>{booking.seat_number}</td>
                            <td>{booking.seat_table}</td>
                            <td># {booking.id}</td>
                            <td>{booking.billinginfo_ID.billinginfo_order_note}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendeesCom;
