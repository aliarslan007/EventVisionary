import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaXmark } from 'react-icons/fa6';
import ArchivedBack from '../ArchivedBack/ArchivedBack';
import "./index.css";
import SellTicketwarp from '../SellTicketwarp/SellTicketwarp';

const SellTicketsCom = ({ title = "", showBackButton , token}) => {


    const [pricing, setPricing] = useState([]);
    const [boxOfficeCategories, setBoxOfficeCategories] = useState([]);
    let base_api_url=`${process.env.REACT_APP_BASE_URL}`;
    const prevElement = useRef();
    const prevLabel = useRef();


    const [mainLevels, setMainLevels] = useState([]);
    const [event, setEvent] = useState([]);
    const [eventImageUrl, setEventImageUrl] = useState('');
    const [venue, setVenue] = useState([]);
    const [org, setOrg] = useState([]);
    const [eventPriceRange, setEventPriceRange] = useState([]);


    const [subTotalCart, setSubTotalCart] = useState(0);
    const [serviceFeeCart, setServiceFeeCart] = useState(0);
    const [P, setP] = useState(0);
    const [G, setG] = useState(0);
    const [taxesCart, setTaxesCart] = useState(0);
    const [totalBillCart, setTotalBillCart] = useState(0);
    const [is_event_free, setIs_event_free] = useState(false);
    const [is_absorb_fee, setIs_absorb_fee] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postal, setPostal] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [creditCardExpiry, setCreditCardExpiry] = useState('');
    const [creditCardCVV, setCreditCardCVV] = useState('');


    const stripHtmlTags = (html) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        return tempElement.innerText; // or tempElement.textContent
      };


    
    const handlePaymentChange = (event) => {
        setPaymentOption(event.target.value);
    };

    const [paymentOption, setPaymentOption] = useState('Card'); // 'Card' or 'Cash'
    const [count, setCount] = useState(0);

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const increment = () => {
        setCount(count + 1);
    };

    

    const handleAddMainLevel = useCallback((label, seat, table, price, full_label ) => {



        setMainLevels(prevMainLevels => {
            const newMainLevel = { label, seat, table, price, full_label  }; // Correctly construct the new object
            console.log("Updated mainLevels:", [...prevMainLevels, newMainLevel]);
            return [...prevMainLevels, newMainLevel];
        });
            setSelectedSeats(prevSelectedSeats => {
                const newSelectedSeats = { label, seat, table, price, full_label };
                console.log("Updated newSelectedSeats:", [...prevSelectedSeats, newSelectedSeats]);
                return [...prevSelectedSeats, newSelectedSeats];
            });
        }, [mainLevels]);
    
        useEffect(() => {
            console.log("MainLevels after update:", mainLevels);
        }, [mainLevels]);
    
        const handleRemoveMainLevelByLabel  = (full_label) => {
            console.log("Removing main level  ::", full_label);
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
                // releaseSeatsObject(full_label);
            } else {
                console.log("Label not found in mainLevels");
            }   
        };
        
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

          
    useEffect(() => {
        const fetchData = async () => {
            try {
                // base_api_url = "${process.env.REACT_APP_BASE_URL}";
                
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

                // const eventResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/eventofuniquetoken/`, {
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
                console.error(error);
            } 
        };
    
        // Call the fetchData function
        if (prevElement.current !== token) {
            fetchData();
            prevElement.current = token;
        }
    }, [token]); // Include eventId in the dependency array to trigger the effect when it changes
    

   


    return (
        <div className="conatiner_warp">
            {showBackButton && <ArchivedBack />}




            <div className="main_sell_ticket_section">

                <div className="event_sell_info">
                    {title && <h1>{title}</h1>}
                    <p>12/31/2099 - 01/02/2100</p>
                    <p>7:50 PM PST</p>
                    <SellTicketwarp/>


                </div>
                <div className="order_summary">
                    <h2>Order Summary</h2>
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
                    <div className="box">
                        <a className="btn main_sell_btn" href="#popup1">Checkout</a>
                    </div>
                    <div id="popup1" className="overlay2">
                        <div className="popup">
                            <div className="info_form_section">
                                <h2>Enter Payment Information and Confirm Purchase</h2>
                                <h3>Event Title</h3>
                                <a className="jclose" href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                        viewBox="0 0 25 25" fill="none">
                                        <g clip-path="url(#clip0_517_27)">
                                            <path
                                                d="M12.5 0.703125C5.97656 0.703125 0.703125 5.97656 0.703125 12.5C0.703125 19.0234 5.97656 24.3359 12.5 24.3359C19.0234 24.3359 24.3359 19.0234 24.3359 12.5C24.3359 5.97656 19.0234 0.703125 12.5 0.703125ZM12.5 22.5781C6.95313 22.5781 2.46094 18.0469 2.46094 12.5C2.46094 6.95313 6.95313 2.46094 12.5 2.46094C18.0469 2.46094 22.5781 6.99219 22.5781 12.5391C22.5781 18.0469 18.0469 22.5781 12.5 22.5781Z"
                                                fill="#FAE100" />
                                            <path
                                                d="M16.0937 8.86719C15.7422 8.51562 15.1953 8.51562 14.8438 8.86719L12.5 11.25L10.1172 8.86719C9.76562 8.51562 9.21875 8.51562 8.86719 8.86719C8.51562 9.21875 8.51562 9.76562 8.86719 10.1172L11.25 12.5L8.86719 14.8828C8.51562 15.2344 8.51562 15.7812 8.86719 16.1328C9.02344 16.2891 9.25781 16.4062 9.49219 16.4062C9.72656 16.4062 9.96094 16.3281 10.1172 16.1328L12.5 13.75L14.8828 16.1328C15.0391 16.2891 15.2734 16.4062 15.5078 16.4062C15.7422 16.4062 15.9766 16.3281 16.1328 16.1328C16.4844 15.7812 16.4844 15.2344 16.1328 14.8828L13.75 12.5L16.1328 10.1172C16.4453 9.76562 16.4453 9.21875 16.0937 8.86719Z"
                                                fill="#FAE100" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_517_27">
                                                <rect width="25" height="25" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </a>
                                <div className="sell_form_section">
                                    <div className="sell_forma">
                                        <div className="row_form">
                                            <label htmlFor="">First Name *</label>
                                            <input type="text" placeholder="First Name " />
                                        </div>
                                        <div className="row_form">
                                            <label htmlFor="">Last Name *</label>
                                            <input type="text" placeholder="Last Name" />
                                        </div>
                                    </div>
                                    <div className="sell_forma">
                                        <div className="row_form">
                                            <label htmlFor="">Email</label>
                                            <input type="text" placeholder="Email" />
                                        </div>
                                        <div className="row_form">
                                            <div className="subrow_form">
                                                <div>

                                                    <label htmlFor="">Cell phone</label>
                                                </div>
                                                <div className="flex">
                                                    <input type="checkbox" />
                                                    <label htmlFor="">Text Tickets</label>
                                                </div>


                                            </div>
                                            <input type="number" placeholder="Number" />
                                        </div>
                                    </div>
                                    <div className="billing_info">
                                        <label htmlFor="">Billing Address</label>
                                        <input type="text" placeholder="Billing Address"
                                            className="billing_info" />

                                    </div>
                                    <div className="sell_forma">
                                        <div className="row_form">
                                            <label htmlFor="">Email</label>
                                            <input type="email" placeholder="Email" />
                                        </div>
                                        <div className="row_form">
                                            <label htmlFor="">Country</label>
                                            <input type="number" placeholder="Country" />
                                        </div>
                                    </div>
                                    <div className="sell_forma">
                                        <div className="row_form">
                                            <label htmlFor="">Billing State</label>
                                            <input type="text" placeholder="Billing State" />
                                        </div>
                                        <div className="row_form">
                                            <label htmlFor="">Postal Code</label>
                                            <input type="text" placeholder="Postal Code" />
                                        </div>
                                    </div>
                                    <div className="sell_formr">
                                        <label htmlFor="">Payment Options</label>
                                        <div>


                                            <input
                                                type="radio"
                                                id="showRadio"
                                                name="form"
                                                value="Card"
                                                checked={paymentOption === 'Card'}
                                                onChange={handlePaymentChange}
                                            />
                                            <label htmlFor="Card">Credit/Debit Card</label>
                                        </div>

                                        <div>
                                            <input
                                                type="radio"
                                                id="hideRadio"
                                                name="form"
                                                value="Cash"
                                                checked={paymentOption === 'Cash'}
                                                onChange={handlePaymentChange}
                                            />
                                            <label htmlFor="Cash">Cash</label>
                                        </div>
                                    </div>
                                    <div className={`sell_forma ${paymentOption === 'Card' ? '' : 'hidden'}`} id="sell_fos2">
                                        <div className="row_form">
                                            <input type="number" placeholder="Card Number" className="cnumber" />
                                        </div>
                                        <div className="row_form">
                                            <input type="text" placeholder="MM/YYYY" className="MMnumber" />
                                        </div>
                                        <div className="row_form">
                                            <input type="text" placeholder="CVV" className="cvvnumber" />
                                        </div>
                                    </div>
                                    <div className="sell_formr">
                                        <label htmlFor="">Order Note</label>
                                        <textarea name="" placeholder="Your order note will appear on your attendee list and order history" id="" ></textarea>
                                    </div>

                                </div>


                            </div>

                            <div className="info_order_section ">
                                <h2>Order Summary</h2>
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
                                        <a className="btn main_sell_btn" href="">Apply Manual Discount</a>
                                    </div>
                                </div>
                                <div className="box box2">
                                    <a className="btn main_sell_btn" href="#popup2">Buy Now</a>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div id="popup2" className="overlay">

                        <div className="popupmain">




                            <div className="order_done">
                                <a href="#" className='order_done_i'>
                                    <FaXmark className="" />

                                </a>

                                <p>Order successful!</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"
                                    viewBox="0 0 64 64" fill="none">
                                    <path
                                        d="M60.5998 13.4C59.6998 12.5 58.2998 12.5 57.3998 13.4L23.3998 46.4L6.59977 29.9C5.69977 29 4.29977 29.1 3.39977 29.9C2.49977 30.8 2.59977 32.2 3.39977 33.1L21.0998 50.3C21.6998 50.9 22.4998 51.2 23.3998 51.2C24.2998 51.2 24.9998 50.9 25.6998 50.3L60.5998 16.4C61.4998 15.7 61.4998 14.3 60.5998 13.4Z"
                                        fill="#52FF00" />
                                </svg>
                                <p>Redirecting to Orders...</p>
                            </div>
                        </div>
                    </div>


                    <div id="popup3" className="overlay">
                        <div className="popupmain">


                            <div className="order_done">
                                <p>Order was not processed.</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58"
                                    viewBox="0 0 58 58" fill="none">
                                    <path
                                        d="M32.1996 29L56.5996 4.59998C57.4996 3.69998 57.4996 2.29998 56.5996 1.39998C55.6996 0.499976 54.2996 0.499976 53.3996 1.39998L28.9996 25.8L4.59961 1.39998C3.69961 0.499976 2.29961 0.499976 1.39961 1.39998C0.499609 2.29998 0.499609 3.69998 1.39961 4.59998L25.7996 29L1.39961 53.4C0.499609 54.3 0.499609 55.7 1.39961 56.6C1.79961 57 2.39961 57.3 2.99961 57.3C3.59961 57.3 4.19961 57.1 4.59961 56.6L28.9996 32.2L53.3996 56.6C53.7996 57 54.3996 57.3 54.9996 57.3C55.5996 57.3 56.1996 57.1 56.5996 56.6C57.4996 55.7 57.4996 54.3 56.5996 53.4L32.1996 29Z"
                                        fill="#FF0000" />
                                </svg>
                                <p>Invalid card details</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SellTicketsCom
