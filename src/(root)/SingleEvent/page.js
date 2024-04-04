'use client'
// import { EventImg, Logo, Mine_logo,  } from '../../public'
import {  Mine_logo, Logo,EventImg, Render } from '../../public'
// import Image from 'next/image'
import React, { useState, useEffect, useMemo  , useRef, useCallback   } from 'react'
import { EventContext } from '../../context/EventContext';
import './index.css'
// import Link from 'next/link'
import { FaChevronLeft, FaFacebook, FaFacebookF, FaLinkedin, FaTwitter } from "react-icons/fa";
import { SeatsioSeatingChart, SeatsioEventManager  } from '@seatsio/seatsio-react';
import { RiCloseFill } from "react-icons/ri";


// import '../../../public/Renderer Desktop - Stadium 2.png'
import { IoIosArrowBack } from 'react-icons/io'
import SellTicketPop from '../../components/SellTicketPop/SellTicketPop'
import TicketCounter from '../../components/TicketCounter/TicketCounter'
import RootLayout from '../layout';
import { useParams } from 'react-router-dom';


    const SingleEvent = () => {
    
    const [pricing, setPricing] = useState([]);
    const [boxOfficeCategories, setBoxOfficeCategories] = useState([]);
    let base_api_url="http://127.0.0.1:8000";
    const prevElement = useRef();
    const prevLabel = useRef();


    const [paymentOption, setPaymentOption] = useState('Card'); // 'Card' or 'Cash'
    const [count, setCount] = useState(0);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const { token } = useParams(); 
    const [holdToken, setHoldToken] = useState('');
    const [mainLevels, setMainLevels] = useState([]);
    const memoizedMainLevels = useMemo(() => mainLevels, [mainLevels]);
    const [event, setEvent] = useState([]);
    const [eventImageUrl, setEventImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [venueId, setVenueId] = useState([]);
    const [venue, setVenue] = useState([]);
    const [org, setOrg] = useState([]);
    const [eventPriceRange, setEventPriceRange] = useState([]);
    const [popup14Class, setPopup14Classe] = useState('hide_popup');
    const [popup15Class, setPopup15Classe] = useState('hide_popup');
    // const [popup14Class, setPopup14Classe] = useState('hide_popup');

    const [subTotalCart, setSubTotalCart] = useState(0);
    const [serviceFeeCart, setServiceFeeCart] = useState(0);
    const [P, setP] = useState(0);
    const [G, setG] = useState(0);
    const [taxesCart, setTaxesCart] = useState(0);
    const [totalBillCart, setTotalBillCart] = useState(0);
    const [is_event_free, setIs_event_free] = useState(false);
    const [is_absorb_fee, setIs_absorb_fee] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const handleHoldTokenChange = (newToken) => {
        console.log('token is : ', newToken )
        setHoldToken(newToken);
    };

    const openPopup14 = () =>{
        console.log("in popup opening funcitons ");
        getHoldToken();
        setPopup14Classe('show_popup');
    } 
    const closePopup14 = () =>{
        console.log("in popup opening funcitons ")
        setPopup14Classe('hide_popup');
    };
    const openPopup15 = () =>{
        console.log("in popup opening funcitons ");
        getHoldTokenExtended();
        setPopup15Classe('show_popup');
    } 
    const closePopup15 = () =>{
        console.log("in popup opening funcitons ")
        setPopup15Classe('hide_popup');
    };

    

    const handleAddMainLevel = useCallback((label, seat, table, price, full_label) => {
        
        setMainLevels(prevMainLevels => {
            const newMainLevel = { label, seat, table, price, full_label };
            console.log("Updated mainLevels:", [...prevMainLevels, newMainLevel]);
            return [...prevMainLevels, newMainLevel];
        });
        setSelectedSeats(prevSelectedSeats => {
            const newSelectedSeats = { label, seat, table, price, full_label };
            console.log("Updated newSelectedSeats:", [...prevSelectedSeats, newSelectedSeats]);
            return [...prevSelectedSeats, newSelectedSeats];
        });
    }, [mainLevels]);


    const handleRemoveMainLevelByLabel  =useCallback( (full_label) => {
        console.log("Removing main level  ::", full_label);
        console.log("typeof Removing main level  ::", typeof(full_label));
        console.log("mainLevels:", mainLevels);
    
        const isLabelFound = mainLevels.some(level => level.full_label === full_label);
    
        if (isLabelFound) {
            console.log("inside if statement ");
    
            setMainLevels(prevMainLevels => {
                const updatedMainLevels = prevMainLevels.filter(level => level.full_label !== full_label);
                console.log("Updated mainLevels:", updatedMainLevels);
                return updatedMainLevels;
            });
            setSelectedSeats(prevSelectedSeats => {
                const updatedSelectedSeats = prevSelectedSeats.filter(level => level.full_label !== full_label);
                console.log("Updated updatedSelectedSeats:", updatedSelectedSeats);
                return updatedSelectedSeats;
            });
    
            console.log("After updating mainLevels:", mainLevels);
            console.log("Before calling releaseSeatsObject mainLevels :", mainLevels);
            releaseSeatsObject(full_label);
        } else {
            console.log("Label not found in mainLevels");
        }   
    }, [mainLevels]);
    
    const calculateSubtotal = (selectedSeats) => {
        // Logic to calculate subtotal
        if(event.is_event_free){
            // setSubTotalCart(0);
            return 0;
        }
        else{
        let subtotal = 0;
        selectedSeats.forEach(seat => {
          subtotal += seat.price;
        });
        
        // setSubTotalCart(subtotal);
        return parseFloat(subtotal.toFixed(2));

       }
      };
    
      // Function to calculate taxes based on subtotal
      const calculateTaxes = (subtotal) => {
        // Logic to calculate taxes
        console.log("check free event status ", (event.is_event_free));
        if(event.is_event_free){
            // setTaxesCart(0);
            return 0;
        }
        else{
            if (event.is_event_tax_enable){

                console.log("in free event else side tax enable: ", (event.event_tax));
                const taxRate = event.event_tax; // Example tax rate (10%)
                // setTaxesCart(taxRate);
                return parseFloat(((subtotal * taxRate)/100).toFixed(2));
            }
            else{
                console.log("in free event else side tax not  enable: ");

                return 0;
            }
        }
      };
    
      // Function to calculate service fee based on subtotal
      const calculateServiceFee = (subtotal) => {
        // Logic to calculate service fee
        if(event.is_event_free){
            return 0;
        }
        else{
            console.log("in else service fee subtotal \n", (subtotal));
            console.log("in else service fee subTotalCart \n", (subTotalCart));
            console.log("taxesCart \n", (taxesCart));
            
            const temp_P = ((subtotal + taxesCart)*0.0429)+(1.0).toFixed(2);
            const temp_G = ((subtotal + taxesCart)*0.029)+(0.3).toFixed(2);
            const P = parseFloat(temp_P);
            const G = parseFloat(temp_G);
            
            console.log("P \n", (P));
            console.log("G \n", (G));
            setP(P);
            setG(G);
            if (event.absorb_fee){
                console.log("if is_absorb_fee serviceFeeRate \n", (P+G));
                return  0;

            }
            else{
                console.log(" else is_absorb_feeP \n", P);
                console.log("else is_absorb_feeG \n", G);
                const serviceFeeRate = parseFloat((P+G).toFixed(2));
                // Example service fee rate (5%)
                // setTotalBillCart((subTotalCart+P+G));
                return serviceFeeRate;
            }
        }
      };
    
      useEffect(() => {
        if(selectedSeats.length>0){

        
        // Calculate subtotal based on selected seats
        const subtotal = calculateSubtotal(selectedSeats);
        setSubTotalCart(subtotal);
    
        // Calculate taxes based on subtotal
        const calculatedTaxes = calculateTaxes(subtotal);
        setTaxesCart(calculatedTaxes);
    
        // Calculate service fee based on subtotal
        const calculatedServiceFee = calculateServiceFee(subtotal);
        setServiceFeeCart(calculatedServiceFee);
    
        // Calculate total
        const calculatedTotal = subtotal + calculatedTaxes + calculatedServiceFee;
        setTotalBillCart(calculatedTotal);
       }
       else{
        setSubTotalCart(0);
        setTaxesCart(0);
        setServiceFeeCart(0);
        setTotalBillCart(0);
       }

      }, [selectedSeats]);

    const handlePaymentChange = (event) => {
        setPaymentOption(event.target.value);
    };

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const increment = () => {
        setCount(count + 1);
    };

    const openOverlay = () => {
        setIsOverlayOpen(true);
    };

    const closeOverlay = () => {
        setIsOverlayOpen(false);
    };

    // 


    useEffect(() => {
        const fetchData = async () => {
            try {
                // base_api_url = "http://127.0.0.1:8000";
                
                // const token = 'e0d25a4a3fda989bf969bc5971a9e36878ece9f2';
                const authToken = localStorage.getItem('authToken');

                if (!authToken) {
                throw new Error('Authentication token not found');
                }

                const requestBody = JSON.stringify({
                    unique_token : token,
                });
                // Fetch event data
                console.log("Before event api call and token :", token);
                console.log("url is : ", (`${process.env.REACT_APP_BASE_URL}/api/eventofuniquetoken/`));
                console.log("static url is : ", (`${base_api_url}/api/eventofuniquetoken/`));

                // const eventResponse = await fetch(`http://127.0.0.1:8000/api/eventofuniquetoken/`, {
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
                    console.log("inside error api call: ", eventResponse);
                    throw new Error('Failed to fetch event data');
                }
                const eventData = await eventResponse.json();
                console.log("eventData api call", eventData);

                const newEvent = eventData.event;


                // const baseURL = window.location.origin; // Your base URL
                const baseURL = `${base_api_url}`
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
    
                // Extract venueId from event data
                const venueId = newEvent.Venue_name;
    
                // Fetch venue data using the extracted venueId
                const venueResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/venues/${venueId}/`, {
                    headers: {
                        Authorization: `Token ${authToken}`
                    }
                });
                if (!venueResponse.ok) {
                    throw new Error('Failed to fetch venue data');
                }
                const venueData = await venueResponse.json();
                setVenue(venueData);


                 // Extract venueId from event data
                //  const orgId = eventData.user;
    
                 // Fetch venue data using the extracted venueId
                const eventPriceResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/eventpricerange/`, {
                    method: 'POST',  // Assuming you are making a POST request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${authToken}`
                    },
                    body: JSON.stringify({ event_id: (newEvent.id) })
                 });
                 if (!eventPriceResponse.ok) {
                     throw new Error('Failed to fetch venue data');
                 }
                 const eventPrice_data = await eventPriceResponse.json();
                 setEventPriceRange(eventPrice_data);


                 // Extract venueId from event data
                 const orgId = newEvent.user;
                 console.log("org id is", orgId);
    
                 // Fetch venue data using the extracted venueId
                 const orgResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${orgId}/`, {
                     headers: {
                         Authorization: `Token ${authToken}`
                     }
                 });
                 if (!orgResponse.ok) {

                     throw new Error('Failed to fetch venue data');
                 }
                 const orgData = await orgResponse.json();
                 console.log("orgData  is", orgData);
                 setOrg(orgData);

                //  *************** child component work
                ///////////////////////////////////////

                
                // fetching pricing 
                const requestBody2 = JSON.stringify({
                    token : (token)
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

                /////////////////
                // //////////////////
                //////////////////


            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
    
        // Call the fetchData function
        if (prevElement.current !== token) {
            fetchData();
            prevElement.current = token;
        }
    }, [token]); // Include eventId in the dependency array to trigger the effect when it changes
    

    const releaseSeatsObject= async (label) => {
        console.log("this is release event full label is ");
        try{
            const authToken = localStorage.getItem('authToken');

                if (!authToken) {
                throw new Error('Authentication token not found');
                }

                const requestBody = JSON.stringify({
                    seat_label : label,
                    event_key : event.event_id,
                    hold_token: holdToken
                });
                // Fetch event data
                console.log("check releaseeventseat Before api call : ", holdToken);
                console.log("body is ",requestBody);
                let eventResponse=""
                if (prevElement.current !== label) {
                    prevElement.current = label;
                
                    console.log("this is label ", label);

                eventResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/releaseeventseat/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${authToken}`
                    },
                    body: requestBody
                });
                }// if for prevElement check ends here
                else{
                    console.log("this is the issue ");
                }
                console.log("after api call");
                if (!eventResponse.ok) {
                    console.log("eventResponse : ",eventResponse );
                    throw new Error('Failed to fetch event data');
                }
                else{

                    const eventData = await  eventResponse.json();
                    console.log("eventData api call", eventData);
                    return true;
                }
                
        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error:', error.message);
        }
    }

    const getHoldToken= async () => {
        console.log("this is release event full label is ");
        try{
            const authToken = localStorage.getItem('authToken');

                if (!authToken) {
                throw new Error('Authentication token not found');
                }

                
                // Fetch event data
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
                 setHoldToken(tokenData.token);

        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error:', error.message);
        }
    }

    const getHoldTokenExtended= async () => {
        try{
            const authToken = localStorage.getItem('authToken');

                if (!authToken) {
                throw new Error('Authentication token not found');
                }

                
                // Fetch event data
                // Extract venueId from event data
                 // Fetch venue data using the extracted venueId
                 const requestBody = JSON.stringify({
                    token : holdToken,
                });
                 const tokenResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/extendholdtoken/`, {
                    method: 'POST',
                    headers: {
                         Authorization: `Token ${authToken}`
                     },
                     body:requestBody
                 });
                 if (!tokenResponse.ok) {
                     throw new Error('Failed to fetch venue data');
                 }
                 const tokenData = await tokenResponse.json();
                 console.log("hold token is extended  is", tokenData);
                 console.log("hold token is   is", tokenData.token );
                 setHoldToken(tokenData.token);

        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error:', error.message);
        }
    }

    return (
        <>
        <RootLayout>
            <div className='main_container'>
                <div className='single_event_sec'>
                    <div className="single_event_upper">
                        <img src={eventImageUrl} alt='EventImg' className="single_event_img" />

                    </div>
                    <div className="single_event_lower">
                        <div className="single_event_info">
                            <div className="single_event_infoo">

                                <div className="single_eventt">
                                    <h2>{event.Event_Name}</h2>
                                    <p>{event.start_date} • {event.start_time}</p>

                                </div>
                                <div className="venue_n">
                                    <h3>{venue.venue_name}</h3>
                                    <p>{venue.venue_address} {venue.venue_city}, {venue.venue_state}, {venue.venue_country}.</p>
                                </div>
                                <div className="Description_event">
                                    <h3>Description</h3>
                                    <p>{event.Event_description}</p>
                                </div>
                            </div>

                            <div className="organized_by">
                                <h2>Organized by</h2>
                                <p>{org.first_name} {org.last_name}</p>
                                {org.is_phone_display ? (
                                <p>{org.phone}</p>
                                ):(
                                    <p></p> 
                                )
                                }
                                {org.is_email_display ? (
                                    <p>{org.email}</p>
                                ): (
                                    <p></p>
                                )
                                }   
                                <img src={org.logo_image} alt='' className="img_fake" />
                            </div>
                        </div>
                        <div className="single_event_CTR">
                            <div className="single_event_age">
                                <p>Age Restriction</p>
                                {event.is_event_18 ? (
                                <p className="plus">18+</p>
                                ) : event.is_event_21 ? (
                                <p className="plus">21+</p>
                                ) : (
                                <p className="plus">All Ages</p>
                                )}
                                {/* <p className="plus">18+</p> */}
                                <p className="after_none">${eventPriceRange.minimum_price} - ${eventPriceRange.maximum_price}</p>
                                <div className="box after_none">
                                    {/* <button className="btn" onClick={handlePopup14}>Get Tickets</button> */}
                                    <button className="btn" onClick={openPopup14}>Get Tickets</button>
                                </div>
                                <div id="popup14"  className={`overlay_14 ${popup14Class}`}>

                                    <div className="get_ticketp">
                                        <button className="jclose" onClick={closePopup14}>
                                            <RiCloseFill color="#FAE100" className="Xmarks" />
                                        </button>


                                        
                                         {/* ///////////////////////// */}
                                         {/* //////////////////////// */}
                                        
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
                                                session='manual'
                                                holdToken={holdToken}
                                                // mainLevels={memoizedMainLevels}   // Pass mainLevels as a prop
                                                handleRemoveMainLevelByLabel={handleRemoveMainLevelByLabel}  // Pass the function reference
                                                handleAddMainLevel={handleAddMainLevel} 
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

                                                    handleAddMainLevel(label, seatNumber, table, price, seat_label);

                                                    }
                                                }

                                                onObjectDeselected={ async function (object)
                                                    {
                                                        // alert("it is in deselect")
                                                        handleRemoveMainLevelByLabel(object.label) ;
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
                                                    <button className="btn res_none" type='button' onClick={openPopup15}>Get Tickets</button>
                                                </div>

                                            </div>

                                        </div>
                                         {/* //////////////////////// */}
                                         {/* //////////////////////// */}

                                        <div className="get_ticket_cart ">

                                            {/* <div className="get_ticket_carti"></div> */}
                                            <img src={eventImageUrl} alt='' className='get_ticket_carti' />
                                            <div className="cart_ticker">
                                                <h2>Cart</h2>
                                                
                                                <div className="order_sum_text">
                                                {mainLevels.map( (mainLev, index) => {
                                                            return (
                                                                <div key={index} className="order_summary_data">
                                                                    <p className="no">x1</p>
                                                                    <div className="order_tinfo">
                                                                        <p className="type_name">Ticket Type Name: {mainLev.label} </p>
                                                                        <p className="type_id">Seat ID: {mainLev.seat} and  Table ID: {mainLev.table}</p>
                                                                    </div>
                                                                    <div className="order_pinfo">${mainLev.price}</div>
                                                                    <div className="order_trash" onClick={() => handleRemoveMainLevelByLabel(mainLev.full_label)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                                                            <path d="M3.04688 15H11.9531V2.34375H12.6562V1.875H9.375V0H5.625V1.875H2.34375V2.34375H3.04688V15ZM6.09375 0.46875H8.90625V1.875H6.09375V0.46875ZM11.4844 2.34375V14.5312H3.51562V2.34375H11.4844Z" fill="#FF0000" />
                                                                            <path d="M6.32812 4.6875H5.85938V12.6562H6.32812V4.6875Z" fill="#FF0000" />
                                                                            <path d="M9.14062 4.6875H8.67188V12.6562H9.14062V4.6875Z" fill="#FF0000" />
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}

                                                </div>
                                               
                                                <div className="order_main_list">
                                                    <div className="order_list_items">
                                                        <div className="order_list_item">
                                                            <p>Subtotal</p>
                                                            <p>${subTotalCart}</p>
                                                        </div>
                                                        <div className="order_list_item">
                                                            <p>Taxes</p>
                                                            <p>${taxesCart}</p>
                                                        </div>
                                                        <div className="order_list_item">
                                                            <p>Service Fees</p>
                                                            <p>${serviceFeeCart}</p>
                                                        </div>
                                                        <div className="order_list_item">
                                                            <p>Total</p>
                                                            <p>${totalBillCart}</p>
                                                        </div>
                                                    </div>




                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="single_sticky_bar2 pc_none2">
                                        <div className="sticky_inner2">
                                            <a href="#popup19">

                                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                    <path d="M19.9266 25.4131C17.8146 25.4131 16.125 27.1027 16.125 29.2147C16.125 31.3267 17.8146 33.0164 19.9266 33.0164C22.0387 33.0164 23.7283 31.3267 23.7283 29.2147C23.7283 27.1555 21.9858 25.4131 19.9266 25.4131ZM19.9266 30.6931C19.1346 30.6931 18.501 30.0595 18.501 29.2675C18.501 28.4755 19.1346 27.8419 19.9266 27.8419C20.7186 27.8419 21.3522 28.4755 21.3522 29.2675C21.3522 30.0067 20.6658 30.6931 19.9266 30.6931Z" fill="#FAE100" />
                                                    <path d="M9.89441 25.4131C7.78239 25.4131 6.09277 27.1027 6.09277 29.2147C6.09277 31.3267 7.78239 33.0164 9.89441 33.0164C12.0064 33.0164 13.696 31.3267 13.696 29.2147C13.696 27.1555 11.9536 25.4131 9.89441 25.4131ZM9.89441 30.6931C9.1024 30.6931 8.46879 30.0595 8.46879 29.2675C8.46879 28.4755 9.1024 27.8419 9.89441 27.8419C10.6864 27.8419 11.32 28.4755 11.32 29.2675C11.32 30.0067 10.6864 30.6931 9.89441 30.6931Z" fill="#FAE100" />
                                                    <path d="M31.0679 1.125H28.2167C26.9495 1.125 25.8407 2.07541 25.6823 3.34262L24.8375 9.41467H22.6199V5.56024C22.5671 4.60983 21.8279 3.87062 20.9303 3.87062H17.023C16.8646 3.07862 16.1782 2.49781 15.3862 2.49781H10.7926C9.89496 2.49781 9.10296 3.28982 9.10296 4.29303V5.29624H5.24853C4.35092 5.29624 3.55891 6.03544 3.55891 6.88025V9.46747C3.13651 9.57307 2.8197 9.78427 2.5557 10.1011C2.2389 10.5235 2.0805 11.1043 2.2389 11.6323C2.2389 11.6851 2.2389 11.6851 2.2389 11.7379L5.51253 21.6116C5.72373 22.3508 6.41014 22.8788 7.20214 22.8788H21.7751C23.7287 22.8788 25.4183 21.4004 25.6823 19.4468L27.8999 3.65942C27.8999 3.55382 28.0055 3.50102 28.1111 3.50102H30.9623C31.596 3.50102 32.1768 2.97302 32.1768 2.28661C32.1768 1.6002 31.7016 1.125 31.0679 1.125ZM20.1911 9.41467H17.023V6.24664H20.1911V9.41467ZM11.5318 4.87383H14.6998V5.56024V9.41467H11.5318V6.93305V4.87383ZM5.98773 7.61946H9.15576V9.41467H5.98773V7.61946ZM23.4119 19.0772C23.3063 19.8692 22.6199 20.45 21.8279 20.45H7.67735L4.82612 11.7907H24.4679L23.4119 19.0772Z" fill="#FAE100" />
                                                </svg>
                                            </a>
                                            <div className="price_lable">
                                                <label htmlFor="">Total:</label>
                                                <p>$25.00</p>
                                            </div>
                                            <div className="box">
                                                <a className="btn sm" href="#popup15">Checkout</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div id="popup15" className={`overlay_14 ${popup15Class}`}>
                                    <div className="get_ticketp2">


                                        <div className="get_ticket_over">
                                            <div className="get_ticket_overi res_none">

                                                <h1>{event.Event_Name}</h1>
                                                <p className="res_yellow">{event.start_date} at {event.end_date}</p>
                                                <p>Time left: 13:19</p>
                                            </div>

                                            <div className="main_buy_form">
                                                <div className="promo_ticket pc_none">
                                                    <form action="">
                                                        <label htmlFor="promo">Promo Code</label>
                                                        <div className="promo_ticket_input">
                                                            <input type="text" />
                                                            <button type="submit">Apply</button>
                                                        </div>
                                                    </form>

                                                </div>
                                                <form action="" className="buy_ticket">
                                                    <label htmlFor="" className='yellow_cr'>Billing Information</label>
                                                    <div className="buy_ticket_row">
                                                        <input type="text" placeholder="First Name *" />
                                                        <input type="text" placeholder="Last Name *" />
                                                        <input type="email" className='long_inp' placeholder="Email *" />
                                                    </div>

                                                    <div className="buy_ticket_row">
                                                        <input type="text" placeholder="Address Line 1 *" />
                                                        <input type="text" placeholder="Address Line 2" />
                                                        <input type="text" placeholder="City *" className='long_inp' />
                                                    </div>
                                                    <div className="buy_ticket_row">
                                                        <input type="text" placeholder="State *" />
                                                        <input type="text" placeholder="Postal *" />
                                                    </div>
                                                    <div className="pay_opt">
                                                        <p className='yellow_cr'>Payment Options</p>
                                                        <div>
                                                            <input type="radio" id="hue" name="pay_2" value="hue" checked />
                                                            <label htmlFor="hue">Apple Pay</label>
                                                        </div>

                                                        <div>
                                                            <input type="radio" id="dewe" name="pay_2" value="dewe" />
                                                            <label htmlFor="dewe">Credit/Debit Card</label>
                                                        </div>
                                                        <div className="card_info2">
                                                            <input type="text" className="card_no" placeholder="Credit/Debit Card Number" />
                                                            <input type="text" className="mm" placeholder="Exp" />
                                                            <input type="text" className="mm" placeholder="CVV" />
                                                        </div>
                                                        <p className="card_infoend">By selecting “Buy Now” I agree to Event Visionary’s Terms and Conditions</p>

                                                    </div>
                                                </form>
                                            </div>
                                            <div className="promo_ticket res_none">
                                                <form action="">
                                                    <label htmlFor="promo">Promo Code</label>
                                                    <div className="promo_ticket_input">
                                                        <input type="text" />
                                                        <button type="submit">Apply</button>
                                                    </div>
                                                </form>
                                                <div className="box">
                                                    <div className="back_form">
                                                        <div className="back_btns">
                                                            <a href="#popup14"><FaChevronLeft className="back_icon" /></a>
                                                            <a className="" href="#popup14">Back</a>

                                                        </div>
                                                        <a className="btn" href="#popup16">Get Tickets</a>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        <button className="jclose" onClick={closePopup15}>
                                            <RiCloseFill color="#FAE100" className="Xmarks" />

                                        </button>
                                        <a className="fclose pc_none" href="#popup14">
                                            <IoIosArrowBack  className="fclose_i"/>
                                        </a>
                                        <div className="get_ticket_cart">
                                            <div className="get_ticket_overi pc_none">

                                                <h1>Event Title</h1>
                                                <p className="res_yellow">Saturday, July 5, 2025 at 7:30 pm PST</p>
                                                <h1>Order Summary</h1>
                                                <p className="res_m">Ticket Type Name</p>
                                            </div>
                                            {/* <div className="get_ticket_carti res_none"></div> */}
                                            <img src={EventImg} alt='' className='get_ticket_carti' />

                                            <div className="cart_ticker">
                                                <h2 className="res_none">Cart</h2>
                                                <div className="order_sum_text">

                                                    <div className="order_summary_data">
                                                        <p className="no">x1</p>
                                                        <div className="order_tinfo">
                                                            <p className="type_name">Ticket Type Name </p>
                                                            <p className="type_id">Seat ID or Table ID or Both</p>
                                                        </div>
                                                        <div className="order_pinfo">$25.00</div>
                                                        <div className="order_trash">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                                                viewBox="0 0 15 15" fill="none">
                                                                <path
                                                                    d="M3.04688 15H11.9531V2.34375H12.6562V1.875H9.375V0H5.625V1.875H2.34375V2.34375H3.04688V15ZM6.09375 0.46875H8.90625V1.875H6.09375V0.46875ZM11.4844 2.34375V14.5312H3.51562V2.34375H11.4844Z"
                                                                    fill="#FF0000" />
                                                                <path d="M6.32812 4.6875H5.85938V12.6562H6.32812V4.6875Z"
                                                                    fill="#FF0000" />
                                                                <path d="M9.14062 4.6875H8.67188V12.6562H9.14062V4.6875Z"
                                                                    fill="#FF0000" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="order_summary_data">
                                                        <p className="no">x1</p>
                                                        <div className="order_tinfo">
                                                            <p className="type_name">Ticket Type Name </p>
                                                            <p className="type_id">Seat ID or Table ID or Both</p>
                                                        </div>
                                                        <div className="order_pinfo">$25.00</div>
                                                        <div className="order_trash">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                                                viewBox="0 0 15 15" fill="none">
                                                                <path
                                                                    d="M3.04688 15H11.9531V2.34375H12.6562V1.875H9.375V0H5.625V1.875H2.34375V2.34375H3.04688V15ZM6.09375 0.46875H8.90625V1.875H6.09375V0.46875ZM11.4844 2.34375V14.5312H3.51562V2.34375H11.4844Z"
                                                                    fill="#FF0000" />
                                                                <path d="M6.32812 4.6875H5.85938V12.6562H6.32812V4.6875Z"
                                                                    fill="#FF0000" />
                                                                <path d="M9.14062 4.6875H8.67188V12.6562H9.14062V4.6875Z"
                                                                    fill="#FF0000" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="order_main_list">
                                                    <div className="order_list_items">
                                                        <div className="order_list_item">
                                                            <p>Subtotal</p>
                                                            <p>$50.00</p>
                                                        </div>
                                                        <div className="order_list_item">
                                                            <p>Taxes</p>
                                                            <p>$50.00</p>
                                                        </div>
                                                        <div className="order_list_item">
                                                            <p>Service Fees</p>
                                                            <p>$50.00</p>
                                                        </div>
                                                        <div className="order_list_item">
                                                            <p>Total</p>
                                                            <p>$50.00</p>
                                                        </div>
                                                    </div>




                                                </div>

                                            </div>

                                        </div>
                                        <div className="single_sticky_bar2 pc_none2">
                                            <div className="sticky_inner2">
                                                <a href="./about.html">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                        <path d="M19.9266 25.4131C17.8146 25.4131 16.125 27.1027 16.125 29.2147C16.125 31.3267 17.8146 33.0164 19.9266 33.0164C22.0387 33.0164 23.7283 31.3267 23.7283 29.2147C23.7283 27.1555 21.9858 25.4131 19.9266 25.4131ZM19.9266 30.6931C19.1346 30.6931 18.501 30.0595 18.501 29.2675C18.501 28.4755 19.1346 27.8419 19.9266 27.8419C20.7186 27.8419 21.3522 28.4755 21.3522 29.2675C21.3522 30.0067 20.6658 30.6931 19.9266 30.6931Z" fill="#FAE100" />
                                                        <path d="M9.89441 25.4131C7.78239 25.4131 6.09277 27.1027 6.09277 29.2147C6.09277 31.3267 7.78239 33.0164 9.89441 33.0164C12.0064 33.0164 13.696 31.3267 13.696 29.2147C13.696 27.1555 11.9536 25.4131 9.89441 25.4131ZM9.89441 30.6931C9.1024 30.6931 8.46879 30.0595 8.46879 29.2675C8.46879 28.4755 9.1024 27.8419 9.89441 27.8419C10.6864 27.8419 11.32 28.4755 11.32 29.2675C11.32 30.0067 10.6864 30.6931 9.89441 30.6931Z" fill="#FAE100" />
                                                        <path d="M31.0679 1.125H28.2167C26.9495 1.125 25.8407 2.07541 25.6823 3.34262L24.8375 9.41467H22.6199V5.56024C22.5671 4.60983 21.8279 3.87062 20.9303 3.87062H17.023C16.8646 3.07862 16.1782 2.49781 15.3862 2.49781H10.7926C9.89496 2.49781 9.10296 3.28982 9.10296 4.29303V5.29624H5.24853C4.35092 5.29624 3.55891 6.03544 3.55891 6.88025V9.46747C3.13651 9.57307 2.8197 9.78427 2.5557 10.1011C2.2389 10.5235 2.0805 11.1043 2.2389 11.6323C2.2389 11.6851 2.2389 11.6851 2.2389 11.7379L5.51253 21.6116C5.72373 22.3508 6.41014 22.8788 7.20214 22.8788H21.7751C23.7287 22.8788 25.4183 21.4004 25.6823 19.4468L27.8999 3.65942C27.8999 3.55382 28.0055 3.50102 28.1111 3.50102H30.9623C31.596 3.50102 32.1768 2.97302 32.1768 2.28661C32.1768 1.6002 31.7016 1.125 31.0679 1.125ZM20.1911 9.41467H17.023V6.24664H20.1911V9.41467ZM11.5318 4.87383H14.6998V5.56024V9.41467H11.5318V6.93305V4.87383ZM5.98773 7.61946H9.15576V9.41467H5.98773V7.61946ZM23.4119 19.0772C23.3063 19.8692 22.6199 20.45 21.8279 20.45H7.67735L4.82612 11.7907H24.4679L23.4119 19.0772Z" fill="#FAE100" />
                                                    </svg>
                                                </a>
                                                <div className="price_lable">
                                                    <label htmlFor="">Total:</label>
                                                    <p>$25.00</p>
                                                </div>
                                                <div className="box">
                                                    <a className="btn sm" href="#popup16">Buy Now</a>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div id="popup16" className="overlay">

                                    <div className="get_ticketp">


                                        <div className="get_ticket_over">
                                            <a className="jclose" href="#">
                                                <RiCloseFill color="#FAE100" className="Xmarks" />

                                            </a>
                                            <a className="fclose pc_none" href="#popup15">
                                                <IoIosArrowBack  className="fclose_i"/>
                                            </a>

                                            <div className="get_ticket_overi res_m">





                                                <h1>Event Title</h1>
                                                <p className="res_yellow">Saturday, July 5, 2025 at 7:30 pm PST</p>
                                                <h1 >Order Confirmation</h1>
                                            </div>

                                            <div className="main_buy_form">

                                                <form action="" className="main_heading_Confirma">
                                                    <div className="buy_ticket_row">
                                                        <p>Your order has been placed successfully.</p>
                                                    </div>

                                                    <div className="buy_ticket_row">
                                                        <p>Order # 001230034</p>
                                                    </div>
                                                    <div className="buy_ticket_row">
                                                        <p>Total Paid: $62.50</p>
                                                    </div>
                                                    <div className="buy_ticket_row res_none">
                                                        <p>Don’t forget to add this event to your calendar!</p>
                                                    </div>
                                                    <div className="order_con_flex pc_none">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="46" viewBox="0 0 45 46" fill="none">
                                                            <path d="M41.9062 19.0625C42.9609 18.9922 43.8047 18.1484 43.8047 17.0234V13.1563C43.8047 10.7656 41.9062 8.86719 39.5156 8.86719H5.55469C3.16406 8.86719 1.26562 10.7656 1.26562 13.1563V17.0938C1.26562 18.1484 2.10938 19.0625 3.16406 19.1328C5.13281 19.3438 6.60937 21.0312 6.60937 23.0703C6.60937 25.1094 5.13281 26.7969 3.16406 26.9375C2.10938 27.0078 1.26562 27.9219 1.26562 28.9766V32.8437C1.26562 35.2344 3.16406 37.1328 5.55469 37.1328H39.5156C41.9062 37.1328 43.8047 35.2344 43.8047 32.8437V28.9766C43.8047 27.9219 42.9609 27.0078 41.9062 26.9375C39.9375 26.7266 38.4609 25.0391 38.4609 23C38.4609 20.8906 39.9375 19.2031 41.9062 19.0625ZM40.6406 29.8906V32.8437C40.6406 33.4766 40.1484 33.9687 39.5156 33.9687H22.2891V30.1719C22.2891 29.3281 21.5859 28.5547 20.6719 28.5547C19.7578 28.5547 19.0547 29.2578 19.0547 30.1719V33.9687H5.55469C4.92188 33.9687 4.42969 33.4766 4.42969 32.8437V30.0312C7.52344 29.3281 9.77344 26.5156 9.77344 23.1406C9.77344 19.8359 7.52344 16.9531 4.42969 16.1797V13.1563C4.42969 12.5234 4.92188 12.0312 5.55469 12.0312H19.125V15.8281C19.125 16.6719 19.8281 17.4453 20.7422 17.4453C21.6562 17.4453 22.3594 16.7422 22.3594 15.8281V12.0312H39.5156C40.1484 12.0312 40.6406 12.5234 40.6406 13.1563V16.0391C37.5469 16.8125 35.2969 19.625 35.2969 23C35.2969 26.3047 37.5469 29.1172 40.6406 29.8906Z" fill="#FAE100" />
                                                            <path d="M20.7422 19.625C19.8984 19.625 19.125 20.3281 19.125 21.2422V24.8281C19.125 25.6719 19.8281 26.4453 20.7422 26.4453C21.6562 26.4453 22.3594 25.7422 22.3594 24.8281V21.2422C22.2891 20.3281 21.5859 19.625 20.7422 19.625Z" fill="#FAE100" />
                                                        </svg>
                                                        <p>Your e-tickets have been emailed to you but can also be viewed and printed here:
                                                            [ insert link to generated pdf ]</p>
                                                    </div>
                                                </form>
                                            </div>
                                            <div className="share_g res_none">
                                                <p>Share this event</p>
                                                <a className="share_btn" href="#popup17" >
                                                    {/* <BsShare className="share_btn" /> */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                        <path d="M18.5 8C20.1569 8 21.5 6.65685 21.5 5C21.5 3.34315 20.1569 2 18.5 2C16.8431 2 15.5 3.34315 15.5 5C15.5 6.65685 16.8431 8 18.5 8Z" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M6.5 15C8.15685 15 9.5 13.6569 9.5 12C9.5 10.3431 8.15685 9 6.5 9C4.84315 9 3.5 10.3431 3.5 12C3.5 13.6569 4.84315 15 6.5 15Z" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M18.5 22C20.1569 22 21.5 20.6569 21.5 19C21.5 17.3431 20.1569 16 18.5 16C16.8431 16 15.5 17.3431 15.5 19C15.5 20.6569 16.8431 22 18.5 22Z" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M9.08984 13.5098L15.9198 17.4898" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                        <path d="M15.9098 6.50977L9.08984 10.4898" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    </svg>

                                                </a>
                                            </div>
                                            <div className="logo_form res_none">
                                                {/* <p>Powered by Event Visionary. </p> */}
                                                {/* <img src="./imgs/4736150369408c50504a5b1df6f6db67.png" alt=""/> */}
                                                <p>Powered by</p>
                                                <img src={Logo} alt='' className='popup_logo' />
                                            </div>

                                        </div>

                                        <div className="get_ticket_cart res_none">

                                            {/* <div className="get_ticket_carti"></div> */}
                                            <img src={EventImg} alt='' className='get_ticket_carti' />

                                            <div className="cart_btns">
                                                <a href="" className="btn">Browse More Events</a>
                                            </div>

                                        </div>

                                    </div>
                                    <div className="single_sticky_bar2 res_tm pc_none">
                                        <div className="sticky_inner2">
                                            <a href="/EventsPage">

                                                <p className="res_yellow">Browse More Events <br />
                                                    by this Organizer</p>
                                            </a>
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
                                            <path d="M16.7347 43.8046C15.891 43.8046 15.1175 43.453 14.555 42.8202C13.5004 41.6249 13.8519 40.2186 13.9925 39.5858L17.7191 23.6249H10.4769C9.98473 23.6249 9.00036 23.6249 8.15661 22.9921C6.75036 21.8671 7.17223 19.9686 7.24254 19.3358L10.1957 4.92175C10.3363 4.14831 10.6175 2.953 11.6722 2.10925C12.8675 1.19519 14.0629 1.19519 14.766 1.2655H24.3988C25.2425 1.2655 27.0004 1.2655 28.055 2.60144C29.1097 3.93738 28.7582 5.69519 28.6175 6.53894L27.7738 10.5468L33.9613 10.6171C36.4222 10.6171 37.3363 11.7421 37.6175 12.6561C38.1097 14.0624 37.266 15.328 36.9144 15.8202L19.6879 41.7655C19.3363 42.2577 18.8441 43.0311 17.93 43.5233C17.5785 43.6639 17.2269 43.8046 16.8754 43.8046C16.8754 43.7342 16.805 43.8046 16.7347 43.8046ZM10.4066 20.3905C10.4769 20.3905 10.5472 20.3905 10.5472 20.3905H19.7582C20.2504 20.3905 20.6722 20.6014 21.0238 21.0233C21.305 21.3749 21.4457 21.8671 21.305 22.3593L17.2269 39.7967L34.2425 14.0624C34.3129 13.9921 34.3832 13.8514 34.3832 13.7811C34.2425 13.7811 34.1019 13.7811 33.8207 13.7811L25.7347 13.7108C25.2425 13.7108 24.8207 13.4999 24.5394 13.1483C24.2582 12.7968 24.1175 12.3046 24.2582 11.8124L25.5238 5.83581C25.7347 4.85144 25.6644 4.6405 25.5941 4.57019C25.5238 4.49988 25.3129 4.42956 24.3285 4.42956H14.766C14.2035 4.42956 13.8519 4.42956 13.7816 4.49988C13.7113 4.57019 13.5707 4.92175 13.43 5.48425L10.4769 19.8983C10.4769 20.1093 10.4066 20.2499 10.4066 20.3905Z" fill="#FAE100" />
                                        </svg> */}
                                        </div>
                                    </div>
                                </div>
                                <div id="popup29" className="overlay">
                                    <div className="get_ticketp2">


                                        <div className="get_ticket_over">
                                            <div className="get_ticket_overi res_none">

                                                <h1>Event Title</h1>
                                                <p className="res_yellow">Saturday, July 5, 2025 at 7:30 pm PST</p>
                                                <p>Select your ticket(s) below.</p>
                                            </div>
                                            <div className="sell_tickets_warp2">
                                                <TicketCounter Addclass='sell_tickets_box' />
                                                <TicketCounter Addclass='sell_tickets_box' />
                                                <p className='Ticket_p'>Ticket Type Name (Multi-Level)</p>
                                                <TicketCounter Addclass='sell_tickets_box_in' />
                                                <TicketCounter Addclass='sell_tickets_box_in' />


                                            </div>

                                            <div className="promo_ticket res_none">
                                                <form action="">
                                                    <label htmlFor="promo">Promo Code</label>
                                                    <div className="promo_ticket_input">
                                                        <input type="text" />
                                                        <button type="submit">Apply</button>
                                                    </div>
                                                </form>
                                                <div className="box">
                                                    <div className="back_form"> 
                                                        <div className="back_btns">
                                                            <a href="#popup14"><FaChevronLeft className="back_icon" /></a>
                                                            <button className="" onClick={closePopup15}>Back</button>

                                                        </div>
                                                        <a className="btn" href="#popup16">Get Tickets</a>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                        <a className="jclose" href="#">
                                            <RiCloseFill color="#FAE100" className="Xmarks" />

                                        </a>
                                        <a className="fclose pc_none" href="#popup14">
                                            <IoIosArrowBack />
                                        </a>
                                        <div className="get_ticket_cart">
                                            <div className="get_ticket_overi pc_none">

                                                <h1>Event Title</h1>
                                                <p className="res_yellow">Saturday, July 5, 2025 at 7:30 pm PST</p>
                                                <h1>Order Summary</h1>
                                                <p className="res_m">Ticket Type Name</p>
                                            </div>
                                            {/* <div className="get_ticket_carti res_none"></div> */}
                                            <img src={EventImg} alt='' className='get_ticket_carti' />

                                            <div className="cart_ticker">
                                                <h2 className="res_none">Cart</h2>
                                                <div className="order_sum_text">

                                                    <div className="order_summary_data">
                                                        <p className="no">x1</p>
                                                        <div className="order_tinfo">
                                                            <p className="type_name">Ticket Type Name </p>
                                                            <p className="type_id">Seat ID or Table ID or Both</p>
                                                        </div>
                                                        <div className="order_pinfo">$25.00</div>
                                                        <div className="order_trash">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                                                viewBox="0 0 15 15" fill="none">
                                                                <path
                                                                    d="M3.04688 15H11.9531V2.34375H12.6562V1.875H9.375V0H5.625V1.875H2.34375V2.34375H3.04688V15ZM6.09375 0.46875H8.90625V1.875H6.09375V0.46875ZM11.4844 2.34375V14.5312H3.51562V2.34375H11.4844Z"
                                                                    fill="#FF0000" />
                                                                <path d="M6.32812 4.6875H5.85938V12.6562H6.32812V4.6875Z"
                                                                    fill="#FF0000" />
                                                                <path d="M9.14062 4.6875H8.67188V12.6562H9.14062V4.6875Z"
                                                                    fill="#FF0000" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="order_summary_data">
                                                        <p className="no">x1</p>
                                                        <div className="order_tinfo">
                                                            <p className="type_name">Ticket Type Name </p>
                                                            <p className="type_id">Seat ID or Table ID or Both</p>
                                                        </div>
                                                        <div className="order_pinfo">$25.00</div>
                                                        <div className="order_trash">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15"
                                                                viewBox="0 0 15 15" fill="none">
                                                                <path
                                                                    d="M3.04688 15H11.9531V2.34375H12.6562V1.875H9.375V0H5.625V1.875H2.34375V2.34375H3.04688V15ZM6.09375 0.46875H8.90625V1.875H6.09375V0.46875ZM11.4844 2.34375V14.5312H3.51562V2.34375H11.4844Z"
                                                                    fill="#FF0000" />
                                                                <path d="M6.32812 4.6875H5.85938V12.6562H6.32812V4.6875Z"
                                                                    fill="#FF0000" />
                                                                <path d="M9.14062 4.6875H8.67188V12.6562H9.14062V4.6875Z"
                                                                    fill="#FF0000" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="order_main_list">
                                                    <div className="order_list_items">
                                                        <div className="order_list_item">
                                                            <p>Subtotal</p>
                                                            <p>$50.00</p>
                                                        </div>
                                                        <div className="order_list_item">
                                                            <p>Taxes</p>
                                                            <p>$50.00</p>
                                                        </div>
                                                        <div className="order_list_item">
                                                            <p>Service Fees</p>
                                                            <p>$50.00</p>
                                                        </div>
                                                        <div className="order_list_item">
                                                            <p>Total</p>
                                                            <p>$50.00</p>
                                                        </div>
                                                    </div>




                                                </div>

                                            </div>

                                        </div>
                                        <div className="single_sticky_bar2 pc_none2">
                                            <div className="sticky_inner2">
                                                <a href="./about.html">

                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                                                        <path d="M19.9266 25.4131C17.8146 25.4131 16.125 27.1027 16.125 29.2147C16.125 31.3267 17.8146 33.0164 19.9266 33.0164C22.0387 33.0164 23.7283 31.3267 23.7283 29.2147C23.7283 27.1555 21.9858 25.4131 19.9266 25.4131ZM19.9266 30.6931C19.1346 30.6931 18.501 30.0595 18.501 29.2675C18.501 28.4755 19.1346 27.8419 19.9266 27.8419C20.7186 27.8419 21.3522 28.4755 21.3522 29.2675C21.3522 30.0067 20.6658 30.6931 19.9266 30.6931Z" fill="#FAE100" />
                                                        <path d="M9.89441 25.4131C7.78239 25.4131 6.09277 27.1027 6.09277 29.2147C6.09277 31.3267 7.78239 33.0164 9.89441 33.0164C12.0064 33.0164 13.696 31.3267 13.696 29.2147C13.696 27.1555 11.9536 25.4131 9.89441 25.4131ZM9.89441 30.6931C9.1024 30.6931 8.46879 30.0595 8.46879 29.2675C8.46879 28.4755 9.1024 27.8419 9.89441 27.8419C10.6864 27.8419 11.32 28.4755 11.32 29.2675C11.32 30.0067 10.6864 30.6931 9.89441 30.6931Z" fill="#FAE100" />
                                                        <path d="M31.0679 1.125H28.2167C26.9495 1.125 25.8407 2.07541 25.6823 3.34262L24.8375 9.41467H22.6199V5.56024C22.5671 4.60983 21.8279 3.87062 20.9303 3.87062H17.023C16.8646 3.07862 16.1782 2.49781 15.3862 2.49781H10.7926C9.89496 2.49781 9.10296 3.28982 9.10296 4.29303V5.29624H5.24853C4.35092 5.29624 3.55891 6.03544 3.55891 6.88025V9.46747C3.13651 9.57307 2.8197 9.78427 2.5557 10.1011C2.2389 10.5235 2.0805 11.1043 2.2389 11.6323C2.2389 11.6851 2.2389 11.6851 2.2389 11.7379L5.51253 21.6116C5.72373 22.3508 6.41014 22.8788 7.20214 22.8788H21.7751C23.7287 22.8788 25.4183 21.4004 25.6823 19.4468L27.8999 3.65942C27.8999 3.55382 28.0055 3.50102 28.1111 3.50102H30.9623C31.596 3.50102 32.1768 2.97302 32.1768 2.28661C32.1768 1.6002 31.7016 1.125 31.0679 1.125ZM20.1911 9.41467H17.023V6.24664H20.1911V9.41467ZM11.5318 4.87383H14.6998V5.56024V9.41467H11.5318V6.93305V4.87383ZM5.98773 7.61946H9.15576V9.41467H5.98773V7.61946ZM23.4119 19.0772C23.3063 19.8692 22.6199 20.45 21.8279 20.45H7.67735L4.82612 11.7907H24.4679L23.4119 19.0772Z" fill="#FAE100" />
                                                    </svg>
                                                </a>
                                                <div className="price_lable">
                                                    <label htmlFor="">Total:</label>
                                                    <p>$25.00</p>
                                                </div>
                                                <div className="box">
                                                    <a className="btn sm" href="#popup16">Buy Now</a>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                                <div id="popup17" className="overlay">
                                    <div className="popupmain">
                                        <div className="order_done">
                                            <a className="jclose" href="#">
                                                <RiCloseFill />

                                            </a>
                                            <p>Share this event with friends</p>
                                            <div className="copy_links">
                                                <input type="text" disabled placeholder='sefwfnwefbwuiub' />
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                    <path d="M20.5 9H11.5C10.3954 9 9.5 9.89543 9.5 11V20C9.5 21.1046 10.3954 22 11.5 22H20.5C21.6046 22 22.5 21.1046 22.5 20V11C22.5 9.89543 21.6046 9 20.5 9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M5.5 15H4.5C3.96957 15 3.46086 14.7893 3.08579 14.4142C2.71071 14.0391 2.5 13.5304 2.5 13V4C2.5 3.46957 2.71071 2.96086 3.08579 2.58579C3.46086 2.21071 3.96957 2 4.5 2H13.5C14.0304 2 14.5391 2.21071 14.9142 2.58579C15.2893 2.96086 15.5 3.46957 15.5 4V5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </div>
                                            <div className="sharep_icons">
                                                <a href="https://www.facebook.com/" target="_blank">

                                                    <FaFacebookF className="share_i" />
                                                </a>
                                                <a href="https://twitter.com/home" target="_blank">
                                                    <i className='bx bxl-twitter' ></i>
                                                    <FaTwitter className="share_i" />

                                                </a>
                                                <a href="https://www.linkedin.com/" target="_blank">

                                                    <i className='bx bxl-linkedin' ></i>
                                                    <FaLinkedin className="share_i" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="samll_container">

                                    </div>
                                </div>

                            </div>
                            <div className="single_event_share">
                                <p>Share this event</p>
                                <a className="" href="#popup18">

                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                        <path d="M18.5 8C20.1569 8 21.5 6.65685 21.5 5C21.5 3.34315 20.1569 2 18.5 2C16.8431 2 15.5 3.34315 15.5 5C15.5 6.65685 16.8431 8 18.5 8Z" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6.5 15C8.15685 15 9.5 13.6569 9.5 12C9.5 10.3431 8.15685 9 6.5 9C4.84315 9 3.5 10.3431 3.5 12C3.5 13.6569 4.84315 15 6.5 15Z" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M18.5 22C20.1569 22 21.5 20.6569 21.5 19C21.5 17.3431 20.1569 16 18.5 16C16.8431 16 15.5 17.3431 15.5 19C15.5 20.6569 16.8431 22 18.5 22Z" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9.08984 13.5098L15.9198 17.4898" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15.9098 6.50977L9.08984 10.4898" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </a>
                            </div>
                            <div id="popup18" className="overlay">
                                <div className="popupmain">

                                    <div className="order_done">
                                        <a className="jclose" href="#">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M15 9L9 15" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M9 9L15 15" stroke="#FAE100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>

                                        </a>
                                        <p>Share this event with friends</p>
                                        <div className="copy_links">
                                            <input type="text" disabled placeholder="https://www.domain.com/878ysdf" />
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                <path d="M20.5 9H11.5C10.3954 9 9.5 9.89543 9.5 11V20C9.5 21.1046 10.3954 22 11.5 22H20.5C21.6046 22 22.5 21.1046 22.5 20V11C22.5 9.89543 21.6046 9 20.5 9Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M5.5 15H4.5C3.96957 15 3.46086 14.7893 3.08579 14.4142C2.71071 14.0391 2.5 13.5304 2.5 13V4C2.5 3.46957 2.71071 2.96086 3.08579 2.58579C3.46086 2.21071 3.96957 2 4.5 2H13.5C14.0304 2 14.5391 2.21071 14.9142 2.58579C15.2893 2.96086 15.5 3.46957 15.5 4V5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <div className="sharep_icons">
                                            <a href="https://www.facebook.com/" target="_blank">

                                                <FaFacebookF className="share_i" />
                                            </a>
                                            <a href="https://twitter.com/home" target="_blank">
                                                <i className='bx bxl-twitter' ></i>
                                                <FaTwitter className="share_i" />

                                            </a>
                                            <a href="https://www.linkedin.com/" target="_blank">

                                                <i className='bx bxl-linkedin' ></i>
                                                <FaLinkedin className="share_i" />
                                            </a>
                                        </div>

                                    </div>
                                </div>
                                <div className="samll_container">

                                </div>
                            </div>
                        </div>

                        {/* <PopupBox/> */}

                    </div>
                </div>
            </div>
            <div className="single_sticky_bar pc_none2">
                <div className="sticky_inner">
                    <p><span>$70</span> - <span></span>$90</p>
                    <div className="box">
                        <a className="btn sm" href="#popup14">Get Tickets</a>
                    </div>
                </div>
            </div>
            </RootLayout>

        </>

    )
}

export default SingleEvent
