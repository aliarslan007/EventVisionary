// import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import ArchivedBack from '../ArchivedBack/ArchivedBack.js';
// import Image from 'next/image';
import { Upload_img } from '../../public';
import { useNavigate } from 'react-router-dom';

// var AgeValue;
// (function (AgeValue) {
//     AgeValue["P"] = "P";
//     AgeValue["A"] = "A";
//     AgeValue["H"] = "H";
// })(AgeValue || (AgeValue = {}));

const AgeValue = {
    P: 'P',
    A: 'A',
    H: 'H',
};

const EventRegister = ({ title = '', label = '', href = '', showBackButton }) => {

    const navigate = useNavigate();

    const [eventTitle, setEventTitle] = useState('');
    const [eventType, setEventType] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventVenue, setEventVenue] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventNote, setEventNote] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventStartTime, setEventStartTime] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventEndTime, setEventEndTime] = useState('');
    const [eventImage, setEventImage] = useState('');
    const [isEventForAllAges, setIsEventForAllAges] = useState(false);
    const [isEventFor18Plus, setIsEventFor18Plus] = useState(false);
    const [isEventFor21Plus, setIsEventFor21Plus] = useState(false);
    const [isEventFree, setIsEventFree] = useState(false);
    const [isReservedEvent, setIsReservedEvent] = useState(false);
    const [reserveEventNote, setReserveEventNote] = useState('');
    const [useExistingChart, setUseExistingChart] = useState(false); // Assuming it's true by default
    const [cloneChart, setCloneChart] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [venueNames, setVenueNames] = useState([]); 
    const [eventTypes, setEventTypes] = useState([]); 
    const [eventCategories, setEventCategories] = useState([]); 
    const [venueNamesMap, setVenueNamesMap] = useState({}); 
    const [eventTypesMap, setEventTypesMap] = useState({}); 
    const [eventCategoriesMap, setEventCategoriesMap] = useState({}); 

    // add new venue states
    const [venueName, setVenueName] = useState('');
    const [venueNickName, setVenueNickName] = useState('');
    const [venueAddress, setVenueAddress] = useState('');
    const [venueCity, setVenueCity] = useState('');
    const [venuePostalCode, setVenuePostalCode] = useState('');
    const [venueCountry, setVenueCountry] = useState('united states');
    const [venueState, setVenueState] = useState('Delaware');

    const handleVenueNameChange = (e) => {
        setVenueName(e.target.value);
    };

    const handleVenueNickNameChange = (e) => {
        setVenueNickName(e.target.value);
    };

    const handleVenueAddressChange = (e) => {
        setVenueAddress(e.target.value);
    };

    const handleVenueCityChange = (e) => {
        setVenueCity(e.target.value);
    };

    const handleVenuePostalCodeChange = (e) => {
        setVenuePostalCode(e.target.value);
    };

    const handleVenueCountryChange = (e) => {
        setVenueCountry(e.target.value);
    };

    const handleVenueStateChange = (e) => {
        setVenueState(e.target.value);
    };


    const [selectedAge, setSelectedAge] = useState(AgeValue.P);
    const handleCheckboxChange = (value) => {
        console.log('1st selected age is ');
        console.log(selectedAge);
        setSelectedAge(value);
    };
    const [isChecked, setIsChecked] = useState(true);
    const toggleOptions = () => {
        setIsChecked(!isChecked);
        setIsEventFree(isChecked);
    };
    const [selectedRadio, setSelectedRadio] = useState("dewey");
    const handleRadioChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedRadio(selectedValue);
    };

    // handling image uploading
    const handleImageUpload = (e) => {
        const file = e.target.files[0]; 
        // Do something with the uploaded image file
        setUploadedImage(file);
      };
      
      const handleDragOver = (e) => {
        e.preventDefault();
        const file = e.target.files[0]; 
        // Do something with the uploaded image file
        setUploadedImage(file);
      };
      
      const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        // Do something with the dropped image file
        setUploadedImage(file);
      };

    //   image uploading handling ends here

    // onChange handlers for form inputs
    const handleEventTitleChange = (e) => {
        setEventTitle(e.target.value);
    };

    const handleEventTypeChange = (e) => {
        const selectedValue = e.target.value;
        setEventType(selectedValue);
    };

    const handleEventCategoryChange = (e) => {
        setEventCategory(e.target.value);
    };

    const handleEventVenueChange = (e) => {
        setEventVenue(e.target.value);
    };

    const handleEventDescriptionChange = (e) => {
        setEventDescription(e.target.value);
    };

    const handleEventNoteChange = (e) => {
        setEventNote(e.target.value);
    };

    // const handleEventStartDateChange = (e) => {
    //     setEventStartDate(e.target.value);
    // };

    const handleEventStartTimeChange = (e) => {
        setEventStartTime(e.target.value);
    };

    // const handleEventEndDateChange = (e) => {
    //     setEventEndDate(e.target.value);
    // };

    const handleEventEndTimeChange = (e) => {
        setEventEndTime(e.target.value);
    };

    // const handleEventImageChange = (e) => {
    //     setEventImage(e.target.value);
    // };
    const handleEventImageChange = (e) => {
        const file = e.target.files[0];
        setEventImage({ ...eventImage, image: file || null });
      };

    const handleIsEventForAllAgesChange = (e) => {
        setIsEventForAllAges(e.target.checked);
    };

    const handleIsEventFor18PlusChange = (e) => {
        setIsEventFor18Plus(e.target.checked);
    };

    const handleIsEventFor21PlusChange = (e) => {
        setIsEventFor21Plus(e.target.checked);
    };

    const handleIsEventFreeChange = (e) => {
        toggleOptions();
        setIsEventFree(e.target.checked);
    };

    const handleIsReservedEventChange = (e) => {
        setIsReservedEvent(e.target.checked);
    };

    const handleReserveEventNoteChange = (e) => {
        setReserveEventNote(e.target.value);
    };

    const handleUseExistingChartChange = (e) => {
        setUseExistingChart(e.target.value === 'useExisting');
    };

    const handleCloneChartChange = (e) => {
        setCloneChart(e.target.value);
    };


    useEffect(() => {
        // Set the initial value of eventStartDate to today's date
        const today = new Date();
        const formattedToday = today.toISOString().split('T')[0];
        setEventStartDate(formattedToday);
        setEventEndDate(eventStartDate);

        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    throw new Error('Authentication token not found');
                }

                // fetcb venue data
                const response = await fetch(`http://127.0.0.1:8000/api/venues/`, {
                    headers: {
                        Authorization: `Token ${authToken}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch venue data');
                }

                
                const venueData = await response.json();

                if (venueData.length > 0) {
                    // Extract the first venue
                    const firstVenue = venueData[0];
                    
                    // Set the first venue to setEventVenue
                    setEventVenue(firstVenue.venue_name);
                }

                const venueMap = {};
                venueData.forEach(eventVenue => {
                    venueMap[eventVenue.venue_name] = eventVenue.id;
                });
                // Update venueNames state with the fetched venue name
                setVenueNamesMap(venueMap);
                setVenueNames(venueData);



                //  fetch eventTypes data
                const eventTypesResponse = await fetch(`http://127.0.0.1:8000/api/eventType/`, {
                    headers: {
                        Authorization: `Token ${authToken}`
                    }
                });

                if (!eventTypesResponse.ok) {
                    throw new Error('Failed to fetch venue data');
                }

                const eventTypesData = await eventTypesResponse.json();
                // Construct a map of event type names to IDs
                if (eventTypesData.length > 0) {
                    // Extract the first venue
                    const firstEventType = eventTypesData[0];
                    
                    // Set the first venue to setEventVenue
                    setEventType(firstEventType.name);
                }

                const typeMap = {};
                eventTypesData.forEach(eventType => {
                    typeMap[eventType.name] = eventType.id;
                });

                // Update EventTypes state with the fetched venue name
                setEventTypes(eventTypesData);
                setEventTypesMap(typeMap);


                //  fetch eventCategories data
                const eventCategoriesResponse = await fetch(`http://127.0.0.1:8000/api/eventCategories/`, {
                    headers: {
                        Authorization: `Token ${authToken}`
                    }
                });

                if (!eventCategoriesResponse.ok) {
                    throw new Error('Failed to fetch venue data');
                }

                const eventCategoriesData = await eventCategoriesResponse.json();

                if (eventCategoriesData.length > 0) {
                    // Extract the first venue
                    const firstEventCategory = eventCategoriesData[0];
                    
                    // Set the first venue to setEventVenue
                    setEventCategory(firstEventCategory.name);
                }

                const categoriesMap = {};
                eventCategoriesData.forEach(eventCatgory => {
                    categoriesMap[eventCatgory.name] = eventCatgory.id;
                });
                // Update EventTypes state with the fetched venue name
                setEventCategoriesMap(categoriesMap);
                setEventCategories(eventCategoriesData);


                
            } catch (error) {
                console.error('Error fetching venue data:', error);
            }
        };

        fetchData();

    }, []); // Empty dependency array ensures this runs only once when component mounts

    const getEventTypeId = (eventName) => {
        return eventTypesMap[eventName];
    };

    const getEventVenueId = (venueName) => {
        return venueNamesMap[venueName];
    };

    const getEventCategoryId = (categoryName) => {
        return eventCategoriesMap[categoryName];
    };

    const handleStartDateChange = (e) => {
        // Get the entered date value
        const enteredDate = e.target.value;

        // Validate the entered date format
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(enteredDate);

        if (isValidDate) {
            // Check if the entered date is not before today's date
            const today = new Date();
            const selectedDate = new Date(enteredDate);
            // console.log(today);
            // console.log(selectedDate);
            // console.log(enteredDate);
            if (selectedDate < today) {
                // alert("Please select a date from today onwards.");
                return;
            }

            // Set the eventStartDate state variable
            setEventStartDate(enteredDate);
        } else {
            console.log(enteredDate);
            // If the entered date format is invalid, display an error message or handle it accordingly
            alert("Please enter a valid date in MM-DD-YYY-format.");
        }
    };

    const handleEndDateChange = (e) => {
        // Get the entered date value
        const enteredDate = e.target.value;

        // Validate the entered date format
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(enteredDate);

        if (isValidDate) {
            // Check if the entered date is not before today's date
            const mini_dat = new Date(eventStartDate);
            const selectedDate = new Date(enteredDate);
            console.log(mini_dat);
            console.log(selectedDate);
            console.log(enteredDate);
            if (selectedDate < mini_dat) {
                alert("Please select a date from today onwards.");
                return;
            }

            // Set the eventStartDate state variable
            setEventEndDate(enteredDate);
        } else {
            console.log(enteredDate);
            // If the entered date format is invalid, display an error message or handle it accordingly
            alert("Please enter a valid date in MM-DD-YYY-format.");
        }
    };

          // Function to handle save button click
    const handleSaveButtonClick = async (event) => {
        event.preventDefault();
        const isValidStartDate = /^\d{4}-\d{2}-\d{2}$/.test(eventStartDate);
        const isValidEndDate = /^\d{4}-\d{2}-\d{2}$/.test(eventEndDate);
        if (!eventTitle || !eventDescription || !eventStartDate || !eventStartTime || !eventEndDate || !eventEndTime || !uploadedImage || !isValidStartDate || !isValidEndDate) {
            // If any required field is null, generate an alert
            console.log("values are ");
            console.log(eventTitle);
            console.log(eventDescription);
            console.log(eventStartDate);
            console.log(eventStartTime);
            console.log(eventEndDate);
            console.log(eventEndTime);
            console.log(uploadedImage);
            console.log(isValidStartDate);
            console.log(isValidEndDate);
            
            alert('Please fill in all required fields and enter valid dates');
            return; // Exit the function without calling the API
        }

        let useExistingChartVar, cloneChartVar, eventForAllAgesVar, 
            eventForAll18PlusVar, eventForAll21PlusVar;

        if (selectedRadio === "huey") {
            useExistingChartVar = true;
            cloneChartVar = false;
        }
        else {
            useExistingChartVar = false;
            cloneChartVar = true;
        }
        
        if (selectedAge === AgeValue.P) {
            eventForAllAgesVar = true;
            eventForAll18PlusVar = false;
            eventForAll21PlusVar = false;
        } else if (selectedAge === AgeValue.A) {
            eventForAllAgesVar = false;
            eventForAll18PlusVar = true;
            eventForAll21PlusVar = false;
        } else {
            eventForAllAgesVar = false;
            eventForAll18PlusVar = false;
            eventForAll21PlusVar = true;
        }
        const type = getEventTypeId(eventType);
        const cat = getEventCategoryId(eventCategory);
        const ven = getEventVenueId(eventVenue);

        const body = {
            // Gather information from variables and construct the body
            Event_Name: eventTitle,
            event_type: type,
            event_category: cat,
            Venue_name: ven,
            Event_description: eventDescription,
            Event_ticketing_note: eventNote,
            start_date: eventStartDate,
            start_time: eventStartTime,
            end_date: eventEndDate,
            end_time: eventEndTime,
            Event_image: uploadedImage,
            is_event_for_all: eventForAllAgesVar,
            is_event_18: eventForAll18PlusVar,
            is_event_21: eventForAll21PlusVar,
            is_event_free: isEventFree,
            is_seating_reserved: !isEventFree,
            clone_chart_name: cloneChart,
            use_existing_chart: useExistingChartVar
        };
        console.log("body is ");
        console.log(body);
        const formData = new FormData();

        // Iterate over the properties of the object and append each key-value pair to the FormData
        for (const key in body) {
            if (Object.hasOwnProperty.call(body, key)) {
                const value = body[key];
                formData.append(key, value);
            }
        }
    // Call your API with the constructed request body
    try {

        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Authentication token not found');
        }
        const response = await fetch('http://127.0.0.1:8000/api/events/', {
            method: 'POST',
            // headers: {
            //     'Content-Type': 'multipart/form-data',
            //     // Add any additional headers if needed
            // },
            body: formData
        });
        if (!response.ok) {
            console.error(`Error: ${response.status}`);
            const responseBody = await response.text();
            console.error(`Response body: ${responseBody}`);
            throw new Error('Failed to save data');
        }
        // Handle successful response
        const newEvent = await response.json();
        
        const locationHeader = response.headers.get('Location');
        const eventId = locationHeader ? locationHeader.split('/').pop() : null;

        console.log('Newly created event ID:', eventId);
        console.log("ne event is ");
        console.log(newEvent);
        console.log(newEvent.id);
        console.log(response);

        navigate(`/DefineTicket/${newEvent.id}`);
        // event.target.submit();
        // window.location.reload(true);

    } catch (error) {
        console.error('Error saving data:', error);
        // Handle error
    }

    };

    const handleNewVenueFormSubmit = async () => {
        // event.preventDefault();
        const parsedPostalCode = parseInt(venuePostalCode, 10); // Convert the string to an integer

        // Check if all required fields are filled
        if (!venueName || !venueAddress || !venueCity || !venuePostalCode || !venueCountry || !venueState) {
            alert('Please fill in all required fields.');
            return;
        }

        // Construct the request body
        

        try {

            const authToken = localStorage.getItem('authToken');
            if (!authToken) {
                throw new Error('Authentication token not found');
            }

            const requestBody = JSON.stringify({
                venue_name: venueName,
                venue_nickName: venueNickName,
                venue_address: venueAddress,
                venue_city: venueCity,
                venue_postal_code: parsedPostalCode,
                venue_country: venueCountry,
                venue_state: venueState
            });
            const response = await fetch('http://127.0.0.1:8000/api/venues/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body:requestBody
            });
            if (!response.ok) {
                console.error(`Error: ${response.status}`);
                const responseBody = await response.text();
                
                // event.target.submit();
                console.log('authToken', authToken);
                console.log('Form submitted with data:', requestBody);
                alert("Failed to save data, Response body: ", responseBody);
                console.error(`Response body: ${responseBody}`);
                throw new Error('Failed to save data');

            }
            // Handle successful response
            alert("New Venue Form Submitted Successfully  ");
            
            
    
        } catch (error) {
            console.error('Error saving data:', error);
            // Handle error
        }
        // closePopup();
        window.location.reload(true);
    };
    
        
    return (
        <div className="Details">
            {showBackButton && <ArchivedBack />}
            <form className="event_from" encType='multipart/form-data' onSubmit={handleSaveButtonClick}>
                
                <div className="area_form_left">
                    {title && <h2>{title}</h2>}
                    <div className="inputs_left">

                        <label >Event Title</label>
                        <input name="eventTitle" id="eventTitle" type="text" value={eventTitle} onChange={handleEventTitleChange} />

                    </div>
                    <div className='events_inputs'>
                        <div className="event_in">
                            <label htmlFor="">Event Type</label>
                            <div className="menus_wapper"> 
                                <select name="eventType" id="eventType" className="new_menu" onChange={handleEventTypeChange} value={eventType}>
                                    <option value="f" selected disabled>Event Type</option>
                                    {Array.from(eventTypes).map((eventType, index) => (
                                    <option key={index} defaultValue={eventType.value} value={eventType.value} >
                                            {eventType.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="event_in">
                            <label htmlFor="">Category</label>
                            <div className="menus_wapper">  
                                <select name="" id="" className="new_menu" value={eventCategory} onChange={handleEventCategoryChange}>
                                    {Array.from(eventCategories).map((eventCat, index) => (
                                    <option key={index} defaultValue={eventCat.value} value={eventCat.value}>
                                            {eventCat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="events_inputs">
                        <div className="event_in">
                            <label htmlFor="">Venue</label>
                            <div className="menus_wapper"> 
                                <select name="" id="" className="new_menu" value={eventVenue} onChange={handleEventVenueChange}>
                                {Array.from(venueNames).map((venueN, index) => (
                                <option key={index} defaultValue={venueN.value} value={venueN.value}>
                                        {venueN.venue_name}
                                    </option>
                                ))}
                                </select>
                            </div>
                        </div>
                        <div className="event_in">
                            <a className="" href="#popup20">

                                <div className="flexd_div">
                                    <CiCirclePlus className="venu_btn" />

                                    {/* <i className='bx bx-plus-circle' style={{color: "#fff"}}></i> */}
                                    Add New Venue
                                </div>
                            </a>
                            <div id="popup20" className="overlay">
                                <div className="add_venue">
                                    <a className="jclose" href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25"
                                            height="25" viewBox="0 0 25 25" fill="none">
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
                                    <h2>Add a New Venue</h2>
                                    <div className='venueForm' >
                                        <label htmlFor="">Venue Name</label>
                                        <input type="text" className="full_in" onChange={handleVenueNameChange }/>
                                        <label htmlFor="">Venue Alias</label>
                                        <input type="text" className="full_in" onChange={handleVenueNickNameChange  } />
                                        <h3>Venue Location</h3>
                                        <label htmlFor="">Address </label>
                                        <input type="text" className="full_in" onChange={handleVenueAddressChange  } />
                                        <div className="sub_venue">
                                            <div className="sub_vi">

                                                <label htmlFor="">City</label>
                                                <input type="text" onChange={handleVenueCityChange  } />
                                            </div>
                                            <div className="sub_vi">

                                            <label htmlFor="venueState">State</label>
                                            <select name="venueState" id="venueState" value={venueState} onChange={handleVenueStateChange}>
                                                <option value="delaware" selected>Delaware</option>
                                                <option value="LA">LA</option>
                                                <option value="Utha">Utah</option>
                                                <option value="NYC">NYC</option>
                                            </select>
                                            </div>

                                        </div>
                                        <div className="sub_venue">
                                            <div className="sub_vi">

                                                <label htmlFor=""> Postal Code</label>
                                                <input type="text" onChange={handleVenuePostalCodeChange  } />
                                            </div>
                                            <div className="sub_vi">

                                                <label htmlFor=""> Country</label>
                                                <select name="venueCountry" id="venueCountry" value={venueCountry} onChange={handleVenueCountryChange }>
                                                    <option value="" selected>united states</option>
                                                    <option value="">united Kingdom</option>
                                                    <option value="">Saudi Arabia</option>
                                                </select>
                                            </div>

                                        </div>
                                        <button type="button" onClick={handleNewVenueFormSubmit} className="btn" style={{ color: "#fff" }}>Create Venue</button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                    <label htmlFor="">Tell your customers a little bit about this event</label> 
                    <textarea name="eventDesc" id="eventDesc" className="desc_event" value={eventDescription} onChange={handleEventDescriptionChange}></textarea>
                    <label htmlFor=""   >Add a special note to your tickets</label>
                    <textarea name="" id=""
                        placeholder="This note will appear on your customer’s tickets under their order information"
                        value={eventNote} onChange={handleEventNoteChange }
                        ></textarea>
                    <div className="date_inputs">
                        <div className="date_in">
                            <label htmlFor="">Start Date/Start Time</label>
                            <div className="event_inputs1">
                                <input type="date" className="cursor_pointer" defaultValue={eventStartDate} onBlur={handleStartDateChange} min={eventStartDate} />
                                <input type="time" className="cursor_pointer" defaultValue={eventStartTime} onBlur={handleEventStartTimeChange } />
                                {/* <Calendar onChange={onChange} value={value} /> */}

                            </div>
                        </div>
                        <div className="date_in">
                            <label htmlFor="">End Date/End Time</label>
                            <div className="event_inputs1">
                                <input type="date" className="cursor_pointer" defaultValue={eventStartDate} onBlur={handleEndDateChange} min={eventStartDate} />
                                <input type="time" className="cursor_pointer" defaultValue={eventEndTime} onBlur={handleEventEndTimeChange } />

                            </div>

                        </div>
                    </div>



                </div>
                {/* <div className="area_form_right"></div> */}
                <div className="right_area_form">
                    <div className="age">
                        <p>Age Restrictions</p>
                        <div action="">
                            <div className="age_row">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        className="age-checkbox"
                                        value={AgeValue.P}
                                        checked={selectedAge === AgeValue.P}
                                        onChange={() => handleCheckboxChange(AgeValue.P)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                                <p>This event is an All Ages event</p>
                            </div>
                            <div className="age_row">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        className="age-checkbox"
                                        checked={selectedAge === 'A'}
                                        onChange={() => handleCheckboxChange(AgeValue.A)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                                <p>This event is for persons 18+</p>
                            </div>
                            <div className="age_row">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        className="age-checkbox"
                                        checked={selectedAge === 'H'}
                                        onChange={() => handleCheckboxChange(AgeValue.H)}
                                    />
                                    <span className="slider round"></span>
                                </label>
                                <p>This event is for persons 21+</p>
                            </div>
                        </div>
                        {/* uper, this was form tag */}
                    </div>

                    <div className="option">
                        <p>More Options</p>
                        <div className="age_row">
                            <label className="switch">
                                <input type="checkbox" className="Present 2" name="attedence[]"
                                    id="watch-mainn" defaultChecked={isEventFree} checked={isEventFree} onChange={handleIsEventFreeChange}  />
                                <span className="slider round"></span>
                            </label>
                            <p>Make this event FREE</p>
                        </div>
                        <div className="age_row">
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    className="Present 2"
                                    name="attedence[]"
                                    id="watch-main"
                                    value="A"
                                    checked={isChecked}
                                    onChange={toggleOptions}
                                />
                                <span className="slider round"></span>
                            </label>
                            <p>Let customers select their own seats</p>
                        </div>
                        <div className="main_optionsa" style={{ display: isChecked ? 'block' : 'none' }} id="show-main">

                            <div className="age_row">
                                <input
                                    type="radio"
                                    id="huey"
                                    name="drone"
                                    value="huey"
                                    className="cursor_pointer"
                                    onChange={handleRadioChange}
                                    checked={selectedRadio === 'huey'}
                                />
                                <label htmlFor="huey">Use the existing chart</label>

                            </div>
                            <div className="age_row">
                                <input
                                    type="radio"
                                    name="drone"
                                    value="dewey"
                                    className="cursor_pointer"
                                    id='watch-me'
                                    onChange={handleRadioChange}
                                    checked={selectedRadio === 'dewey'}
                                />
                                <label htmlFor="dewey">Clone the existing Chart</label>
                            </div>
                            <div className="name_yourc" style={{ display: selectedRadio === 'dewey' ? 'block' : 'none' }} id='show-me'>

                                <input type="text" placeholder="Name Your Chart"  value={cloneChart} onChange={handleCloneChartChange}/>
                            </div>
                        </div>

                        <div>
                        </div>

                    </div>
                    <div className="file_form cursor_pointer" onDragOver={handleDragOver} onDrop={handleDrop}>
                        <input type="file" id="fileInput" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                        <label htmlFor="fileInput" className='cursor_pointer img_inside_div'>
                        <img src={Upload_img} alt="Upload Icon"  /> 
                        {uploadedImage ? (
                            <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded icon" className='img_inside_div' />
                        ) : (
                            <p>Drag and drop image here or click to upload</p>
                        )}
                        </label>
                    </div>
                    <div className="next_btn">

                        <button className="w3-bar-item w3-button tablink tab_btnn cursor_pointer  "
                             type='submit'>{label}</button>

                    </div>

                </div>


            </form>
        </div>

    )
}

export default EventRegister
