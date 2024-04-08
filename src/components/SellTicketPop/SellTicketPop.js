import { Render, Render_mobile_only } from '../../public'
// import Image from 'next/image'
import React, {useEffect, useState, useRef} from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { useParams } from 'react-router-dom';
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';
import { SeatsioDesigner } from '@seatsio/seatsio-react';
import { useNavigate } from 'react-router-dom';


const SellTicketPop = ({eventToken="", handleAddMainLevel,handleRemoveMainLevel, holdToken, setHoldToken, mainLevels, setMainLevels, releaseSeatsObject }) => {

    
    const [event, setEvent] = useState([]);
    const [pricing, setPricing] = useState([]);
    const [boxOfficeCategories, setBoxOfficeCategories] = useState([]);
    const [hold_Token, setHold_Token] = useState('');
    const prevElement = useRef();
    
    const [eventImageUrl, setEventImageUrl] = useState('');

    const handleRemoveClick = (label) => {
        // Call the parent function from here
        handleRemoveMainLevel(label);
      };
    const handleAddClick = (label, seatNumber, table, price, seat_label) => {
        // Call the parent function from here
        handleAddMainLevel(label, seatNumber, table, price, seat_label);
      };
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                
                // const token = 'e0d25a4a3fda989bf969bc5971a9e36878ece9f2';
                const authToken = localStorage.getItem('authToken');

                if (!authToken) {
                throw new Error('Authentication token not found');
                }

                const requestBody = JSON.stringify({
                    unique_token : eventToken,
                });
                // Fetch event data
                console.log("in child Before api call");

                const eventResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/eventofuniquetoken/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${authToken}`
                    },
                    body: requestBody
                });
                console.log("after api call");
                if (!eventResponse.ok) {
                    console.log("inside error api call");
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await eventResponse.json();
                console.log("eventData api call", eventData);

                const newEvent = eventData.event;
                // const baseURL = window.location.origin; // Your base URL
                const baseURL = "${process.env.REACT_APP_BASE_URL}/"
                let imageURL = newEvent.Event_image;
                console.log("1 : imageURL: ", imageURL);
                if (imageURL.startsWith('/images')) {
                    
                    console.log("2 ");
                    
                    imageURL = `${baseURL}${imageURL}`;
                    console.log("3 updated imageURL : ", imageURL);
                    setEventImageUrl(imageURL);
                }
                else{
                    console.log("in else");
                    setEventImageUrl(eventData.event.Event_image);
                }
                console.log("newEvent ", newEvent);
                setEvent(eventData.event);

                // fetching pricing 
                const requestBody2 = JSON.stringify({
                    token : (eventToken)
                });
                // fetch event with eventId
                const PricingResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/pricingofevent/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body: requestBody2
                });
        
                // Check if the request was successful (status code 2xx)
                if (PricingResponse.ok) {
                    const PricingResponseData = await PricingResponse.json(); // Parse the response JSON
                    console.log('event PricingResponseData successfully:', PricingResponseData); 
                    setPricing(PricingResponseData.pricing); 
                    setBoxOfficeCategories(PricingResponseData.boxOfficeCategories); 
                    // Optionally, you can return the response data or perform other actions here
                } else {
                    console.error(`Error: ${PricingResponse.status}`);
                    const pricingResponseBody = await PricingResponse.text();
                    // event.target.submit();
                    console.log('authToken', authToken);
                    console.log('Form submitted with data:', requestBody2);
                    console.error(`Response body: ${pricingResponseBody}`);
                    return;
                }
                // pricing api call ends here


            // Extract venueId from event data
                 // Fetch venue data using the extracted venueId
                 const tokenResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/seatioholdtoken/`, {
                     headers: {
                         Authorization: `Token ${authToken}`
                     }
                 });
                 if (!tokenResponse.ok) {
                     throw new Error('Failed to fetch venue data');
                 }
                 const tokenData = await tokenResponse.json();
                 console.log("hold token is   is", tokenData);
                 console.log("hold token is   is", tokenData.token );
                 setHold_Token(tokenData.token);
                 setHoldToken(tokenData.token);



            } catch (error) {
                console.log("error occurred ", error)
            }
        };
    
        // Call the fetchData function
        if (prevElement.current !== eventToken) {
            fetchData();
            prevElement.current = eventToken;
        }
    }, [eventToken]); // Include eventId in the dependency array to trigger the effect when it changes
    

    
    return (
        <div className="get_ticket_over">
            <div className="get_ticket_overi">

                <h1>{event.Event_Name}</h1>
                <p className="res_yellow">{event.start_date} at {event.start_time}</p>
                <p className="res_p">Select your seat(s) or table(s) below to add it to your cart</p>
            </div>
            <div className="res_triangle res_none">
            {/* <img alt='' src={Render} className="res_triangle res_none" />
            <img alt='' src={Render_mobile_only} className="res_triangle pc_none" /> */}
            <SeatsioSeatingChart
                workspaceKey="d7e614a0-9aab-4e68-b91a-299311ea1a62"
                event={event.event_id}
                pricing={pricing}
                unavailableCategories={boxOfficeCategories}
                showFullScreenButton= {true}
                showSectionPricingOverlay = {true}
                holdToken={hold_Token}
                session='manual'
                onObjectSelected=  { async function (object)
                    {
                    let ticketTypes=""
                    if(object.pricing.ticketTypes){
                        ticketTypes = object.pricing.ticketTypes;
                    }
                    console.log("object is ",object );
                    let seat_sub_category = ''
                    let seat_category = ''
                    let seat_label=''
                    let seat_type=''
                    let price=0
                    seat_type = object.objectType;
                    console.log("seat type is ", seat_type);
                    
                    seat_label=object.label;
                    const [table, seatNumber] = seat_label ? seat_label.split('-') : ["", ""];
                    seat_category=object.category.label;

                        if (seat_type.includes("Seat"))
                        {
                            if (ticketTypes) {
                                seat_sub_category=object.selectedTicketType;

                                for (const ticketVar of ticketTypes) {
                                    if (seat_sub_category.includes(ticketVar.ticketType)) {
                                        price= ticketVar.price
                                    }
                                }
                                console.log("seat_category is ",seat_category );
                                console.log("seat_sub_category is ",seat_sub_category );
                                console.log("seat_label is ",seat_label );
                                console.log("price is ",price );
                            }
                            else {
                                price = object.pricing.price;
                                
                                console.log("seat_category is ",seat_category );
                                console.log("seat_sub_category is ",seat_sub_category );
                                console.log("seat_label is ",seat_label );
                                console.log("price is ",price );
                            }
                        }
                        else{
                            price = object.pricing.price;
                            
                            console.log("seat_category is ",seat_category );
                            console.log("seat_sub_category is ",seat_sub_category );
                            console.log("seat_label is ",seat_label );
                            console.log("price is ",price ); 
                        }
                    const label = seat_sub_category ? seat_sub_category : seat_category;

                    handleAddClick(label, seatNumber, table, price, seat_label);

                    }
                }

                onObjectDeselected={ async function (object)
                    {
                        alert("it is in deselect")
                        handleRemoveClick(object.label) ;
                    }
                }
                region="eu"
            />
            </div>
            <div className="promo_ticket">
                <form action="" className="promo_cl res_none">
                    <label htmlFor="promo">Promo Code</label>
                    <div className="promo_ticket_input">
                        <input type="text" />
                        <button type="button">Apply</button>
                    </div>
                </form>
                <div className="box">
                    <a className="btn res_none" href="#popup15">Get Tickets</a>
                </div>

            </div>

        </div>
    )
}

export default SellTicketPop
