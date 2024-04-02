import React, { useState, useEffect } from 'react'


const RevenueRow = ({ revenue , searchQuery }) => {
    const [eventData, setEventData] = useState(null);
    // const [filteredEventData, setFilteredEventData] = useState(null);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Format the date as desired
        const formattedDate = date.toLocaleDateString(); // Format: MM/DD/YYYY
        return formattedDate;
    };

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    throw new Error('Authentication token not found');
                }

                const eventResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/events/${revenue.revenue_event}/`, {
                    headers: {
                        Authorization: `Token ${authToken}`
                    }
                });
                if (!eventResponse.ok) {
                    throw new Error('Failed to fetch event details');
                }
                const eventData = await eventResponse.json();
                setEventData(eventData);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventData();
    }, [revenue.revenue_event]);

    // useEffect(() => {
    //     // Filter event data based on search query
    //     if (eventData) {
    //         const filteredData = eventData.filter(event => event.Event_Name.toLowerCase().includes(searchQuery.toLowerCase()));
    //         setFilteredEventData(filteredData);
    //     }
    // }, [eventData, searchQuery]);

    // if (!filteredEventData) {
    //     return null; // Or you can return a loading indicator
    // }

    if (!eventData) {
        return null; // Or you can return a loading indicator
    }
    


    return (
        <tr>
            <td>{eventData.Event_Name}</td>
            <td>{formatDate(eventData.created)}</td>
            <td>{revenue.revenue_total_tickets}</td>
            <td>${revenue.revenue_amount}</td>
            <td>${revenue.revenue_total_service_fees}</td>
            <td>${revenue.revenue_total_tax}</td>
        </tr>
    );
};

export default RevenueRow;