import React, { useState, useEffect } from 'react';
import { FaBalanceScaleRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import "./index.css";
import { CiCirclePlus } from 'react-icons/ci';
// import Link from 'next/link';
import ArchivedBack from '../ArchivedBack/ArchivedBack';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const TicketPrice = ({ status="", title = '', label = '', href = '', showBackButton, eventId=null, eventStartDate="", eventEndDate="" }) => {
    
    
    const navigate = useNavigate();
    const [dsVisible, setDsVisible] = useState(true);
    const [formSecVisible, setFormSecVisible] = useState(false);
    const [iconDirection, setIconDirection] = useState('down');
    const [instantHideSwitch, setInstantHideSwitch] = useState(false);
    const [absorbsServiceFees, setAbsorbsServiceFees] = useState(false);
    const [enableSalesTax, setEnableSalesTax] = useState(false);
    const [salesTax, setSalesTax] = useState(0);
    const [eventSaleStartDate, setEventSaleStartDate] = useState('');
    const [eventSaleStartTime, setEventSaleStartTime] = useState('');
    const [eventSaleEndDate, setEventSaleEndDate] = useState('');
    const [eventSaleEndTime, setEventSaleEndTime] = useState('');
    const [mainLevelsVisibility, setMainLevelsVisibility] = useState({});
    const [isTicketGenerate, setIsTicketGenerate] = useState(false);
    const [startImmediately, setStartImmediately] = useState(false);
    const [endImmediately, setEndImmediately] = useState(false);
    
    const [mainLevelData, setMainLevelData] = useState({
        1: {
        box_office: false,
      },
    });
    const [subLevelData, setSubLevelData] = useState({
        1: {
            1: {
                box_office: false,
            },
        },
    });
    const [ticketTypes, setTicketTypes] = useState([]);
    const [tableOfValue, setTableOfValue] = useState(6);
    const [tableOfCategory, setTableOfCategory] = useState('default');
    const [isFreeEvent, setIsFreeEvent] = useState(false);
    const [isEnableTax, setIsEnableTax] = useState(false);
    const [isReserveEvent, setIsReserveEvent] = useState(false);
    const [isUseExistingChart, setIsUseExistingChart] = useState(false);
    const [cloneChartName, setCloneChartName] = useState('');
    const [chartKeyVenue, setChartKeyVenue] = useState('');
    const [envUrl, setEnvUrl] = useState(`${process.env.REACT_APP_BASE_URL}`);


    const handleTableOfCategory = (e) => {
        setTableOfCategory(e.target.value);
    }
    const handleTableOfValue = (e) => {
        setTableOfValue(e.target.value);
    }

    const handleGenerateButtonClick = () => {
        console.log("tableOfCategory ", tableOfCategory);
        if (tableOfCategory === 'default') {
            alert('Please select a ticket type');
        } else {
            let price =0;
            Object.values(mainLevelData).forEach(mainLevelDa => {
                if (mainLevelDa.ticket_type.includes(tableOfCategory)){
                    price = mainLevelDa.price;
                    return true;
                }
            });
            console.log('Ticket Type:', tableOfCategory);
            console.log('Price:', price);
            console.log('Table of Value:', tableOfValue);
            const nameNew = tableOfCategory+" tabale of "+tableOfValue;
            console.log('nameNew :', nameNew);
            
            // generate new mainLevel
            const lastMainLevelId = mainLevels.length > 0 ? mainLevels[mainLevels.length - 1].id : 0;
            const newMainLevel = { id: lastMainLevelId + 1, subLevels: [{ id: 1 }], isSubLevelsVisible: false };
            setMainLevels([...mainLevels, newMainLevel]);
            // generate new mainLevelData
            const updatedMainLevelData = { ...mainLevelData };
            updatedMainLevelData[newMainLevel.id] = {};

            updatedMainLevelData[newMainLevel.id] = {
                ...updatedMainLevelData[newMainLevel.id],
                ticket_type: tableOfCategory+" table of "+String(tableOfValue),
                price : price*tableOfValue,
                quantity : "unlimited",
                box_office: false
                };
            setMainLevelData(updatedMainLevelData);
        }
    };

    const handleEventSaleStartTimeChange = (e) => {
        setEventSaleStartTime(e.target.value);
    };

    const handleEventSaleEndTimeChange = (e) => {
        setEventSaleEndTime(e.target.value);
    };

    const handleEventSaleStartDateChange = (e) => {
        // Get the entered date value
        const enteredDate = e.target.value;

        // Validate the entered date format
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(enteredDate);

        if (isValidDate) {
            // Check if the entered date is not before today's date
            // const today = new Date();
            const selectedDate = new Date(enteredDate);
            const miniDate = new Date(eventStartDate);
            // console.log(today);
            // console.log(selectedDate);
            // console.log(enteredDate);
            if (selectedDate < miniDate) {
                // alert("Please select a date from today onwards.");
                return;
            }

            // Set the eventStartDate state variable
            setEventSaleStartDate(enteredDate);
        } else {
            console.log(enteredDate);
            // If the entered date format is invalid, display an error message or handle it accordingly
            alert("Please enter a valid date in MM-DD-YYY-format.");
        }
    };

    const handleEventSaleEndDateChange = (e) => {
        // Get the entered date value
        const enteredDate = e.target.value;

        // Validate the entered date format
        const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(enteredDate);

        if (isValidDate) {
            // Check if the entered date is not before today's date
            const mini_dat = new Date(eventStartDate);
            const max_dat = new Date(eventEndDate);
            const selectedDate = new Date(enteredDate);
            console.log(mini_dat);
            console.log(selectedDate);
            console.log(enteredDate);
            if (selectedDate < mini_dat) {
                alert("Please select a date from today onwards.");
                return;
            }
            else if (selectedDate > max_dat) {
                alert("Please select a date less than event ends date.");
                return;
            }

            // Set the eventStartDate state variable
            setEventSaleEndDate(enteredDate);
        } else {
            console.log(enteredDate);
            // If the entered date format is invalid, display an error message or handle it accordingly
            alert("Please enter a valid date in MM-DD-YYY-format.");
        }
    };

    const [mainLevels, setMainLevels] = useState([
        { id: 1, subLevels: [{id: 1}], isSubLevelsVisible: false },
      ]);

    const handleAbsorbsServiceFeesChange = () => {
        setAbsorbsServiceFees(!absorbsServiceFees);
    };

    const handleEnableSalesTaxChange = () => {
    setEnableSalesTax(!enableSalesTax);
    };

    const handleSalesTaxChange = (e) => {
        setSalesTax(e.target.value);
    };

    const toggleVisibility = (mainLevelId) => {
        setMainLevelsVisibility((prevVisibility) => ({
          ...prevVisibility,
          [mainLevelId]: !prevVisibility[mainLevelId],
        }));

        setMainLevels(prevMainLevels => {
            return prevMainLevels.map(mainLevel => {
              if (mainLevel.id === mainLevelId) {
                return { ...mainLevel, isSubLevelsVisible:  !mainLevel.isSubLevelsVisible  };
              }
              return mainLevel;
            });
          });
      };


    const formSecDisplayStyle = formSecVisible ? { display: 'block' } : {};

    const [showTaxInputs, setShowTaxInputs] = useState(false);

    const handleCheckboxChange = () => {
        setShowTaxInputs(!showTaxInputs);
        setEnableSalesTax(!enableSalesTax);
    };
    

    const handleStartToggle = () => {
        setStartImmediately(!startImmediately);
        if(!startImmediately){
            const now = new Date();
            const date = now.toISOString().slice(0, 10); // Extract date (YYYY-MM-DD)
            const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit' };
            const time = now.toLocaleTimeString([], timeOptions);
            setEventSaleStartDate(date);
            setEventSaleStartTime(time);
        }
        setEndImmediately(false); // Deactivate the other button
    };

    const [showForm, setShowForm] = useState(false);

    const handleCheckboxChange3 = (e) => {
        
        // Check if any input fields are empty
        const emptyFields = areInputFieldsEmpty();
        console.log("empty fields are ", emptyFields)
        if (emptyFields) {
            alert('Please fill in all input fields before proceeding.');
        }
        else{
            setIsTicketGenerate(!isTicketGenerate);
            setShowForm(e.target.checked);
        }
    };

    const handleMainLevelInputChange = (mainLevelId, fieldName, value) => {
        console.log(" fieldName is ", fieldName);
        console.log(" value of field is ", value);
        console.log(" mainLevelId ", mainLevelId);
        const updatedMainLevelData = { ...mainLevelData };
        console.log("updatedMainLevelData ", updatedMainLevelData);

        console.log("inside if ");
        // if (!updatedMainLevelData.hasOwnProperty(mainLevelId)) {
        //     updatedMainLevelData[mainLevelId] = {};
        // }
        
        updatedMainLevelData[mainLevelId] = {
            ...updatedMainLevelData[mainLevelId],
            [fieldName]: value,
            };
        console.log("new updatedMainLevelData ", updatedMainLevelData);
        if (!updatedMainLevelData[mainLevelId].hasOwnProperty('box_office')) {
            updatedMainLevelData[mainLevelId] = {
                ...updatedMainLevelData[mainLevelId],
                box_office: false
                };
        }
        setMainLevelData(updatedMainLevelData);
        
      };

      
      const handleSubLevelInputChange = (mainLevelId, subLevelId, fieldName, value) => {
        const updatedSubLevelData = { ...subLevelData };        
        updatedSubLevelData[mainLevelId] = updatedSubLevelData[mainLevelId] || {};
        
        updatedSubLevelData[mainLevelId][subLevelId] = {
          ...updatedSubLevelData[mainLevelId][subLevelId],
          [fieldName]: value,
        };
        console.log(" updatedSubLevelData[mainLevelId] ", updatedSubLevelData[mainLevelId]);
        console.log(" updatedSubLevelData[mainLevelId][subLevelId] ", updatedSubLevelData[mainLevelId]?.[subLevelId]);
        console.log(" updatedSubLevelData[mainLevelId][subLevelId] ", updatedSubLevelData[mainLevelId][subLevelId].price);
        console.log(" updatedSubLevelData[mainLevelId][subLevelId] ", updatedSubLevelData[mainLevelId][subLevelId].box_office);
        if (!updatedSubLevelData[mainLevelId][subLevelId].hasOwnProperty('box_office')) {
            // Add the box_office field with a default value of false
            updatedSubLevelData[mainLevelId][subLevelId] = {
                ...updatedSubLevelData[mainLevelId][subLevelId],
                box_office: false,
            };        
        }
        setSubLevelData(updatedSubLevelData);
      };
    
    const areInputFieldsEmpty = () => {
        console.log("inside validation ");
        let isEmpty = false; // Flag variable to track if empty fields are found

        // Check main levels
        mainLevels.forEach(mainLevel => {
            const mainLevelD = mainLevelData[mainLevel.id];
            if (mainLevel.isSubLevelsVisible)
            {   // Check sub levels
                mainLevel.subLevels.forEach(subLevel => {
                    const subLevelD = subLevelData[mainLevel.id]?.[subLevel.id];
                    for (const field in subLevelD) {
                        if ((!isFreeEvent && !subLevelD.hasOwnProperty('price'))|| !subLevelD.hasOwnProperty('quantity') || !subLevelD.hasOwnProperty('name')) {
                            // alert("Please fill all fields for main level");
                            isEmpty = true; 
                            return;
                        }

                        if (subLevelD[field] === "" || subLevelD[field] === " " || subLevelD[field] === null) {
                            // alert("Please fill all fields");
                            isEmpty = true; // Set flag to true
                            return; // Exit the loop
                        }
                    }
                });

            }
            else{
                        // Check if mainLevelData has all required fields
                if ((!isFreeEvent && !mainLevelD.hasOwnProperty('price')) || !mainLevelD.hasOwnProperty('quantity') || !mainLevelD.hasOwnProperty('name')) {
                    // alert("Please fill all fields for main level");
                    isEmpty = true; 
                    return;
                }
                for (const field in mainLevelD) {
                    if (mainLevelD[field] === "" || mainLevelD[field] === " ") {
                        // alert("Please fill all fields");
                        isEmpty = true; // Set flag to true
                        return; // Exit the loop
                    }
                    if (field.includes("quantity")){
                        const quantityValue = (mainLevelD[field]);
                        
                        if (quantityValue > 0 || quantityValue === "unlimited") {
                            // Handle negative values
                            // continue
                        } 
                        else{
                            alert(`${field} must be a number. ${quantityValue}`);
                            isEmpty = true;
                            return;
                        }
                    }
                }  
            }
        });
        
        console.log(" after mainLevels inside validation : ", isEmpty);
        if (!isFreeEvent){
            if (enableSalesTax && (!salesTax || isNaN(salesTax) || salesTax < 1 || salesTax===null)) {
                isEmpty = true;
            }
        }   
        console.log(" enableSalesTax : ", enableSalesTax);
        console.log(" after enableSalesTax inside validation : ", isEmpty);
        return isEmpty; // Return flag value
    };
    

    const handleNextButtonClick  = async () => {
    // Display or log mainLevel data
    const emptyFields = areInputFieldsEmpty();
    console.log("empty fields are ", emptyFields)
    if (emptyFields) {
        alert('Please fill in all input fields before proceeding.');
    }
    else{
        
    console.log("Main Level Data:");
    
    await sendDataToAPI();
    }};   

    const handleAddMainLevel = () => {
        console.log("inside add main ");
        // setMainLevels((prevMainLevels) => prevMainLevels + 1);
        const lastMainLevelId = mainLevels.length > 0 ? mainLevels[mainLevels.length - 1].id : 0;
        const newMainLevel = { id: lastMainLevelId + 1, subLevels: [{ id: 1 }], isSubLevelsVisible: false };
        
        setMainLevels([...mainLevels, newMainLevel]);
        const updatedMainLevelData = { ...mainLevelData };
        updatedMainLevelData[newMainLevel.id] = {};
        setMainLevelData(updatedMainLevelData);

      };

    
    const handleRemoveMainLevel  = (mainId) => {
        console.log("Removing main level at mainId:", mainId);
        if (mainLevels.length > 1) {
            removeMainLevelData(mainId);
        //   setMainLevels((prevMainLevels) => prevMainLevels - 1);
        const updatedMainLevels = mainLevels.filter(level => level.id !== mainId);
        setMainLevels(updatedMainLevels);
        
        }
      };


    const removeMainLevelData = (mainLevelIdToRemove) => {
        // Filter out the main level data with the given ID
        console.log("Removing mainLevelData at mainId:", mainLevelIdToRemove);

        const updatedMainLevelData = { ...mainLevelData };
        
        console.log("before mainLevelData", updatedMainLevelData);
        // Check if the main level with the given ID exists
        if (updatedMainLevelData.hasOwnProperty(mainLevelIdToRemove)) {
            // Delete the main level with the given ID
            delete updatedMainLevelData[mainLevelIdToRemove];

            console.log("filteredMainLevelData", updatedMainLevelData);
            // Update the state with the modified mainLevelData
            setMainLevelData(updatedMainLevelData);
        } else {
            console.log(`Main level with ID ${mainLevelIdToRemove} does not exist.`);
        }
    };


    const handleAddSubLevel = (mainId) => {

        
        console.log("inside add sublevel  ", mainId);
        setMainLevels(prevMainLevels => {
            return prevMainLevels.map(mainLevel => {
                if (mainLevel.id === mainId) {
                    // const newSubLevel = { id: mainLevel.subLevels.length + 1 };
                    // return { ...mainLevel, subLevels: [...mainLevel.subLevels, newSubLevel] };
                    const lastSubLevelId = mainLevel.subLevels.length > 0 ? mainLevel.subLevels[mainLevel.subLevels.length - 1].id : 0;
                    const newSubLevel = { id: lastSubLevelId + 1 };
                    return { ...mainLevel, subLevels: [...mainLevel.subLevels, newSubLevel] };
                }
                return mainLevel;
            });
        })
    };

    const handleRemoveSubLevel = (mainId, subId) => {
        setMainLevels(prevMainLevels => {
            return prevMainLevels.map(mainLevel => {
                if (mainLevel.id === mainId) {
                    if (mainLevel.subLevels.length > 1) {
                        removesubLevelData(mainId, subId);
                    const updatedSubLevels = mainLevel.subLevels.filter(subLevel => subLevel.id !== subId);
                    return { ...mainLevel, subLevels: updatedSubLevels };
                    }
                    
                }
                return mainLevel;
            });
        });
    };

    const removesubLevelData = (mainLevelIdToRemove, subId) => {
        // Filter out the main level data with the given ID
        console.log("Removing subLevelData at mainId:", subId);

        const updatedsubLevelData = { ...subLevelData };
        
        console.log("before updatedsubLevelData", updatedsubLevelData);
        // Check if the main level with the given ID exists
        if (updatedsubLevelData[mainLevelIdToRemove].hasOwnProperty(subId)) {
            // Delete the main level with the given ID
            delete updatedsubLevelData[mainLevelIdToRemove][subId];

            console.log("filteredSubLevelData", updatedsubLevelData[mainLevelIdToRemove]);
            // Update the state with the modified mainLevelData
            setMainLevelData(updatedsubLevelData);
        } else {
            console.log(`Main level with ID ${mainLevelIdToRemove} does not exist.`);
        }
    };

    // Extracting unique ticket types from mainLevels
    useEffect(() => {
        const types = [];
        Object.values(mainLevelData).forEach(mainLevelDa => {
            types.push(mainLevelDa.ticket_type);
        });

        setTicketTypes(types);
        console.log("mainLevel data ", mainLevelData);
    }, [mainLevelData]);

    useEffect(() => {
        console.log("mainLevels ", mainLevels);
    }, [mainLevels]);

    useEffect(() => {
        console.log("subLevelData ", subLevelData);
    }, [subLevelData]);


    useEffect(() => {


    const fetchEventData= async () => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Authentication token not found');
        }
        const authUserId = localStorage.getItem('authUserId');
        console.log("token is ", authToken);
        console.log("authUserId is ", authUserId);

        if (!authUserId) {
            throw new Error('Authentication authUserId not found');
        }
        // fetch event with eventId
        // setEnvUrl(`${process.env.REACT_APP_BASE_URL}`);
        const EventResponse = await fetch(`${envUrl}/api/events/${eventId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        });

        // Check if the request was successful (status code 2xx)
        if (EventResponse.ok) {
            const eventResponseData = await EventResponse.json(); // Parse the response JSON
            setIsFreeEvent(eventResponseData.is_event_free);
            setIsReserveEvent(eventResponseData.is_seating_reserved);
            setIsUseExistingChart(eventResponseData.use_existing_chart);
            setCloneChartName(eventResponseData.clone_chart_name);
            setIsEnableTax(eventResponseData.is_event_tax_enable);
            setShowTaxInputs(eventResponseData.is_event_tax_enable);
            setEnableSalesTax(eventResponseData.is_event_tax_enable);
            const venueId = eventResponseData.Venue_name;

            try{
                // fetch event with eventId
            const venueResponse = await fetch(`${envUrl}/api/venues/${venueId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (venueResponse.ok) {
                const venueResponseData = await venueResponse.json();
                setChartKeyVenue(venueResponseData.chat_id);
            }
            else{
                throw new Error('venue Response unsuccessful ');
            }
        
            }
            catch(error){
                console.log("error occured : ", error)
            }
            console.log("free event status is", setIsFreeEvent);
            console.log("eventResponseData.is_event_free is", eventResponseData.is_event_free);
            console.log('event retrieving successfully:', eventResponseData);
            // Optionally, you can return the response data or perform other actions here
        } else {
            console.log("event retrieving error ", EventResponse.status)
        }    
    }

    if (status.includes('Edit')){
    const fetchEditData= async () => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Authentication token not found');
        }
        const authUserId = localStorage.getItem('authUserId');
        console.log("token is ", authToken);
        console.log("authUserId is ", authUserId);

        if (!authUserId) {
            throw new Error('Authentication authUserId not found');
        }
        // fetch event with eventId
        // setEnvUrl(`${process.env.REACT_APP_BASE_URL}`);
        const EventResponse = await fetch(`${envUrl}/api/events/${eventId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
        });

        // Check if the request was successful (status code 2xx)
        if (EventResponse.ok) {
            const eventResponseData = await EventResponse.json(); // Parse the response JSON
            setIsReserveEvent(eventResponseData.is_seating_reserved);
            setAbsorbsServiceFees(eventResponseData.absorb_fee);
            setEnableSalesTax(eventResponseData.is_event_tax_enable);
            setSalesTax(eventResponseData.event_tax);
            
            setEventSaleStartDate(eventResponseData.event_sale_start_date);
            setStartImmediately(eventResponseData.is_event_start_immediately);
            setEventSaleStartTime(eventResponseData.event_sale_start_time);
            setEventSaleEndDate(eventResponseData.event_sale_end_date);
            setEventSaleEndTime(eventResponseData.event_sale_end_time);

            const venueId = eventResponseData.Venue_name;

            try{
                // fetch event with eventId
            const venueResponse = await fetch(`${envUrl}/api/venues/${venueId}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (venueResponse.ok) {
                const venueResponseData = await venueResponse.json();
                setChartKeyVenue(venueResponseData.chat_id);
            }
            else{
                throw new Error('venue Response unsuccessful ');
            }
        
            }
            catch(error){
                console.log("error occured : ", error)
            }
            const requestBody = JSON.stringify({
                event_id : eventId
            });
            // fetch categories and sub categories of this event
            try{
                // fetch event with eventId
                const categoriesResponse = await fetch(`${envUrl}/api/categoriesandsubcategoriesofevent/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: requestBody
                });
                if (categoriesResponse.ok) {
                    const categoriesResponseData = await categoriesResponse.json();
                    const categories_list = categoriesResponseData.categories;
                    console.log("categoriesResponseData is : ", categoriesResponseData);
                    console.log("categories_list is : ", categories_list);

                    // PGD
                    await Promise.resolve(setMainLevelData({}));
                    await Promise.resolve(setMainLevels([]));
                    await Promise.resolve(setMainLevelsVisibility({}));
                    await Promise.resolve(setSubLevelData({}));
                    setTimeout(() => {
                        console.log("MainLevels after update:", mainLevels);
                        // Perform any other actions with the updated state
                      }, 0);
                    console.log("setMainLevelData length is . is : ", (mainLevelData.length));
                    console.log("setMainLevels length is . is : ", (mainLevels.length));
                    console.log("setMainLevelsVisibility length is . is : ", (mainLevelsVisibility.length));
                    console.log("setSubLevelData length is . is : ", (subLevelData.length));
                    let lastMainLevelId = mainLevels.length > 0 ? mainLevels[mainLevels.length - 1].id : 0;
                    let count =1
                    for (const category_item in categories_list) {
                        console.log("categories_list[category_item] ", categories_list[category_item])
                        const { has_subcategories, category_data, subcategories_data } = categories_list[category_item];
                        const { id: mainId } = category_data;
                    
                        // Add main level
                        setMainLevels(prevMainLevels => [
                            ...prevMainLevels,
                            { id: mainId + 1, subLevels: [], isSubLevelsVisible: has_subcategories }
                        ]);
                    
                        // Add main level data
                        setMainLevelData(prevMainLevelData => ({
                            ...prevMainLevelData,
                            [mainId + 1]: category_data
                        }));
                    
                        // If has subcategories, add them
                        if (has_subcategories) {
                            setMainLevelsVisibility(prevVisibility => ({
                                ...prevVisibility,
                                [mainId + 1]: true
                            }));
                    
                            subcategories_data.forEach((subcategory_item, index) => {
                                const { id: subcategoryId, ...subcategoryData } = subcategory_item;
                                const subLevelId = index + 1; // Assuming the index is used as sublevel ID
                    
                                // Update main levels with new sublevel
                                setMainLevels(prevMainLevels => prevMainLevels.map(mainLevel => {
                                    if (mainLevel.id === mainId + 1) {
                                        return {
                                            ...mainLevel,
                                            subLevels: mainLevel.subLevels.length === 0 ? 
                                                [{ id: subLevelId }] : // Add sublevel only if sublevels array is empty
                                                [
                                                    ...mainLevel.subLevels,
                                                    { id: subLevelId }
                                                ]
                                        };
                                    }
                                    return mainLevel;
                                }));
                    
                                // Update sublevel data
                                setSubLevelData(prevSubLevelData => ({
                                    ...prevSubLevelData,
                                    [mainId + 1]: {
                                        ...(prevSubLevelData[mainId + 1] || {}),
                                        [subLevelId]: subcategoryData
                                    }
                                }));
                            });
                        }
                    }
                    


                }
                else{
                    throw new Error('venue Response unsuccessful ');
                }
            }
            catch(error){
                console.log("error occured : ", error)
            }

        // updatind ends here,  mainLevels , mainLevelsData and also subLevels and subLevelsData and mainLevelsVisibility 
        


        } else {
            console.log("event retrieving error ", EventResponse.status)
        }    
    }
    }

    fetchEventData();

    }, [eventId]);



    const sendDataToAPI= async () => {
        try {
            let process = true;
            let responseData = null
            let isMultiPricing = false
            let pricing = [];
            let multi_price = [];
            let isFreeEventVar =false;
            const authToken = localStorage.getItem('authToken');
                if (!authToken) {
                    throw new Error('Authentication token not found');
            }
            const authUserId = localStorage.getItem('authUserId');
            console.log("token is ", authToken);
            console.log("authUserId is ", authUserId);

            if (!authUserId) {
                throw new Error('Authentication authUserId not found');
            }
            console.log("event tax is , ", (salesTax));
            if(!salesTax || salesTax === null){
                setSalesTax(0)
            }
            const requestBody = {
                is_event_tax_enable : enableSalesTax,
                event_tax : salesTax,
                event_sale_start_date : eventSaleStartDate,
                event_sale_start_time : eventSaleStartTime,
                event_sale_end_date : eventSaleEndDate,
                event_sale_end_time : eventSaleEndTime,
                is_event_start_immediately : startImmediately,
                absorb_fee : absorbsServiceFees
            };
            const formData = new FormData();

            // Iterate over the properties of the object and append each key-value pair to the FormData
            for (const key in requestBody) {
                if (Object.hasOwnProperty.call(requestBody, key)) {
                    const value = requestBody[key];
                    formData.append(key, value);
                }
            }
            console.log("body is 1 and this is the error ", requestBody);
            console.log("eventId is ", eventId);
            console.log("REACT_APP_BASE_URL is ",(`${envUrl}/api/events/${eventId}/`) );
            // fetch event with eventId
            const EventResponse = await fetch(`${envUrl}/api/events/${eventId}/`, {
            method: 'PATCH',
            headers: {
                // 'Content-Type': 'application/json',
            },
            body: formData
            });
    
            // Check if the request was successful (status code 2xx)
            if (EventResponse.ok) {
                responseData = await EventResponse.json(); // Parse the response JSON
                isFreeEventVar = responseData.is_event_free;
                console.log("free event status is", isFreeEventVar);
                console.log('event patched successfully:', responseData);
                process = true;
                // Optionally, you can return the response data or perform other actions here
            } else {
                process = false;
                console.log('event response in worst :', EventResponse);
                console.log('EventResponse status :', EventResponse.status);
            }

            // create categories through API Calls
            if (process){

                let categoryId=""
                let category_list = []
            for (const mainLevel of mainLevels) {
                let priceVar = 0;
                if (mainLevel.isSubLevelsVisible){
                    console.log("Main Level Input Data:", mainLevelData[mainLevel.id].name);
                    console.log("Sub Level Input Data:");

                    const requestBody = JSON.stringify({
                        name : mainLevelData[mainLevel.id].name,
                        // price : parseInt( mainLevelData[mainLevel.id].price),
                        // quantity : mainLevelData[mainLevel.id].quantity,
                        // is_box_office : mainLevelData[mainLevel.id].box_office,
                        event : responseData.id,
                        venue_name : responseData.Venue_name,
                    });
                    console.log("body is 2", requestBody);
                    console.log("eventId is ", eventId);
                    // fetch event with eventId
                    const CategoryResponse = await fetch(`${envUrl}/api/categories/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${authToken}`
                    },
                    body: requestBody
                    });
            
                    // Check if the request was successful (status code 2xx)
                    if (CategoryResponse.ok) {
                        const responseData = await CategoryResponse.json(); // Parse the response JSON
                        categoryId = responseData.id;
                        process = true;
                        
                        console.log("in ok  category response ", CategoryResponse);
                        // Optionally, you can return the response data or perform other actions here
                    } else {
                        console.error(`Error: ${CategoryResponse.status}`);
                        const responseBody = await CategoryResponse.text();
                        // event.target.submit();
                        console.log('authToken', authToken);
                        console.log('Form submitted with data:', requestBody);
                        console.error(`Response body: ${responseBody}`);
                        process = false;
                    }
                if (process){
                isMultiPricing = false
                for (const subLevel of mainLevel.subLevels) {

                    // calling api for creating subcategories
                    // ------------------
                    // <<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>
                    if(subLevelData[mainLevel.id][subLevel.id].is_box_office){

                    }
                    const requestBody = JSON.stringify({
                        name: subLevelData[mainLevel.id][subLevel.id].name,
                        price: parseInt(subLevelData[mainLevel.id][subLevel.id].price),
                        quantity: subLevelData[mainLevel.id][subLevel.id].quantity,
                        event: responseData.id,
                        VenueChartCategory: categoryId,
                        venue_name: responseData.Venue_name,
                        ...(subLevelData[mainLevel.id][subLevel.id].is_box_office !== undefined && {
                            is_box_office: subLevelData[mainLevel.id][subLevel.id].is_box_office
                        })
                    });
                    // fetch event with eventId
                    const subCategoryResponse = await fetch(`${envUrl}/api/subcategories/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${authToken}`
                    },
                    body: requestBody
                    });
            
                    // Check if the request was successful (status code 2xx)
                    if (subCategoryResponse.ok) {
                        const responseData = await subCategoryResponse.json(); // Parse the response JSON
                        const subCategory = responseData.id;
                        console.log("in ok sub category response ", subCategoryResponse);
                        process = true;

                        isMultiPricing = true
                        if (!isFreeEventVar){
                        priceVar =parseInt(subLevelData[mainLevel.id][subLevel.id].price);

                        }
                        multi_price.push({
                        "ticketType": subLevelData[mainLevel.id][subLevel.id].name,
                        "price": priceVar
                        })
                        
                        // Optionally, you can return the response data or perform other actions here
                    } else {
                        console.error(`Error: ${subCategoryResponse.status}`);
                        const responseBody = await subCategoryResponse.text();
                        // event.target.submit();
                        console.log('authToken', authToken);
                        console.log('Form submitted with data:', requestBody);
                        console.error(`Response body: ${responseBody}`);
                        process = false;
                        return;
                    }
                    
                }; // sublevel loop ends here

                if (process){
                    
                    pricing.push({
                        "category": mainLevel.id,
                        "ticketTypes": multi_price,
                    });
                }
                else{
                    return;
                }
                    }// multipricing top if ends here 
                }
                else{
                    // when no multipricing
                    const requestBody = JSON.stringify({
                        name: mainLevelData[mainLevel.id].name,
                        price: parseInt(mainLevelData[mainLevel.id].price),
                        quantity: mainLevelData[mainLevel.id].quantity,
                        event: responseData.id,
                        venue_name: responseData.Venue_name,
                        ...(mainLevelData[mainLevel.id].is_box_office !== undefined && {
                            is_box_office: mainLevelData[mainLevel.id].is_box_office
                        })
                    });
                    console.log("body is 3", requestBody);
                    console.log("eventId is ", eventId);
                    // fetch event with eventId
                    const CategoryResponse = await fetch(`${envUrl}/api/categories/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${authToken}`
                    },
                    body: requestBody
                    });
            
                    // Check if the request was successful (status code 2xx)
                    if (CategoryResponse.ok) {
                        const responseData = await CategoryResponse.json(); // Parse the response JSON
                        console.log('categories saved successfully:', responseData);
                        categoryId = responseData.id;
                        process = true;
                        if (!isFreeEventVar){
                            priceVar = parseInt(mainLevelData[mainLevel.id].price)
                        }
                        pricing.push({
                            "category": mainLevel.id,
                            "price": priceVar
                        });
                        // Optionally, you can return the response data or perform other actions here
                    } else {
                        console.error(`Error: ${CategoryResponse.status}`);
                        const responseBody = await CategoryResponse.text();
                        // event.target.submit();
                        console.log('authToken', authToken);
                        console.log('Form submitted with data:', requestBody);
                        console.error(`Response body: ${responseBody}`);

                        process = false;
                        return;
                    }
                }
                const temp = {
                    'key': mainLevel.id,
                    'label': mainLevelData[mainLevel.id].name
                }
                category_list.push(temp)

            }; //Mainlevel loop ends here
            // here pricing will be append
            console.log("pricing array is \n", pricing);
            for (const pricingRow of pricing){


                const requestBody = JSON.stringify({
                    event : responseData.id,
                    pricing_data: pricingRow
                });
                console.log("body is 4", requestBody);
                console.log("eventId is ", eventId);
                // fetch event with eventId
                const PricingResponse = await fetch(`${envUrl}/api/pricing/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestBody
                });
        
                // Check if the request was successful (status code 2xx)
                if (PricingResponse.ok) {
                    const PricingResponseData = await PricingResponse.json(); // Parse the response JSON
                    console.log('event PricingResponseData successfully:', PricingResponseData);
                    process = true;
                    // Optionally, you can return the response data or perform other actions here
                } else {
                    console.error(`Error: ${PricingResponse.status}`);
                    const pricingResponseBody = await PricingResponse.text();
                    // event.target.submit();
                    console.log('authToken', authToken);
                    console.log('Form submitted with data:', requestBody);
                    console.error(`Response body: ${pricingResponseBody}`);
                    process = false;
                    return;
                }


            } //loop for pricing array
            //  pricing ends here
            if(process){
                alert("data saved successfully ");
                
            // get chart and event Ids 
            if (isReserveEvent){
                try {
                    let chartKey = chartKeyVenue
                    let eventKey = ""
                    const authToken = localStorage.getItem('authToken');
                    if (!authToken) {
                        throw new Error('Authentication token not found');
                        
                    }
                    
                    try{
                        console.log("chart key is : ", chartKeyVenue)
                        if (chartKeyVenue.includes("NONE")){

                        
                            const requestBody = JSON.stringify({
                                name : "No Name",
                                category_list: category_list
                            });
                            console.log("body of createchart api is : \n", requestBody);
                            // fetcb venue data
                            const createChartResponse = await fetch(`${envUrl}/api/createchart/`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Token ${authToken}`
                                },
                                body: requestBody
                            });
            
                            if (!createChartResponse.ok) {
                                process = false
                                console.log("create chart error is : ", createChartResponse.status)
                                throw new Error('Failed to fetch createchart data');
                            }
                            else{
                                const createChartData = await createChartResponse.json();
                                chartKey = createChartData.chart_key;
                                console.log("chart key fro create chart api is :\n", chartKey);
                                process = true
                            }
                        }
                        // ***********************************
                        // ********************************
                        //  now creating event at seatsio api
                        // **********************************
                        // ********************************
                        {
                            const requestBody2 = JSON.stringify({
                                chart_key : chartKey,
                                name: (responseData.Event_Name)
                            });
                            
                            console.log("authToken is : ", authToken);
                            console.log("url is  is : ", `${envUrl}/api/createseatsioevent/`);
                            console.log("requestBody2 is  is : ", requestBody2);

                            // fetcb venue data
                            const responseEventSeatsIO = await fetch(`${envUrl}/api/createseatsioevent/`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Token ${authToken}`
                                },
                                body: requestBody2
                            });
        
                            if (!responseEventSeatsIO.ok) {
                                process = false
                                throw new Error('Failed to fetch venue data');
                            }
                            else{
                                const seatsIOEventData = await responseEventSeatsIO.json();
                                eventKey = seatsIOEventData.event_id;
                                process = true
                            }

                            // now update chart key in venue model 
                            const requestBody3 = JSON.stringify({
                                chat_id : chartKey
                            });
                            // fetch venue data
                            // ******************
                            // ((((((((()))))))))
                            // ******************
                            const venueiD = responseData.Venue_name
                            const responseVenueUpdate = await fetch(`${envUrl}/api/venues/${venueiD}/`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Token ${authToken}`
                                },
                                body: requestBody3
                            });
        
                            if (!responseVenueUpdate.ok) {
                                process = false
                                throw new Error('Failed to fetch venue data');
                            }
                            else{
                                const responseVenueData = await responseEventSeatsIO.json();
                                // eventKey = seatsIOEventData.event_id;
                                process = true
                            }
        
                        } 

                    }
                    catch(error){
                        console.log("error is : ", error);
                    }
                    // update event with chart key and event_Id of seats io
                    try{
                        const requestBody = JSON.stringify({
                            event_id : eventKey,
                            chart_key : chartKey,
                        });
                        console.log("body is 5", requestBody);
                        console.log("eventId is ", eventId);
                        // fetch event with eventId
                        const EventResponse = await fetch(`${envUrl}/api/events/${eventId}/`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: requestBody
                        });
                
                        // Check if the request was successful (status code 2xx)
                        if (EventResponse.ok) {
                            responseData = await EventResponse.json(); // Parse the response JSON
                            isFreeEventVar = responseData.is_event_free;
                            console.log("event status is", isFreeEventVar);
                            console.log('event patched successfully:', responseData);
                            process = true;
                            
                            navigate(`/PublishEvent/${eventId}`);
                            // Optionally, you can return the response data or perform other actions here
                        } else {
                            process = false;
                            throw new Error('Authentication token not found');
                        }
                    }
                    catch(error){
                        console.log("error occured : ", error);
                    }
                    
                    
                    
                } catch (error) {
                    console.error('Error fetching venue data:', error);
                }
            }
            // if event is not reserved
            else{
                // event is not reserved, code here
                navigate(`/ShareEvent/${eventId}`);

            }
            

            }

            }
            
            else{
                alert("Error occured , please reload the page and try again ");
            }

        } catch (error) {
            // Handle network errors or other exceptions
            console.error('Error:', error.message);
        }
    
    }// api main function ends here
    

    return (
        <div>
            {showBackButton && <ArchivedBack />}
            <div id="Prices" className="w3-container w3-border city">
                {title && <h2 className='Archived_heading'>{title}</h2>}
                <form action="Create_event" className="event_froml">

                <div className={`ticket_form parentDiv ${isTicketGenerate ? 'disabled_div' : ''}`}>

                        <div className="form_price_option">
                            <label className="switch">
                                <input type="checkbox" 
                                checked={absorbsServiceFees}
                                onChange={(e) => handleAbsorbsServiceFeesChange(e.target.checked)}/>
                                <span className="slider round"></span>
                            </label>
                            <p className="ticket_fee_t">Customer absorbs service fees.</p>
                        </div>
                        <div className="ticket_form_sec">

                            <table>

                                <thead>
                                    <tr>
                                        <th>Del</th>
                                        <th>Ticket Type</th>
                                        {!isFreeEvent && <th>Price</th>}
                                        <th>QTY</th>
                                        <th>Box Office Only</th>
                                        <th>Multi-Level Pricing</th>
                                    </tr>
                                </thead>
                            </table>
                            {mainLevels.map(mainLev => (
                            <div key={mainLev.id} className="table_body">
                                <div className="main_table_body">

                                    <div className="del_table_btn">

                                        {/* <i className='bx bx-x'></i> */}
                                        <FaXmark className="form_X" style={{ color: "#FFE100" }} onClick={() => handleRemoveMainLevel(mainLev.id)} />

                                    </div>
                                    <div className="ticket_type_input">
                                        <input type="text" 
                                            value={mainLevelData[mainLev.id]?.name || ''}
                                            onChange={(e) => handleMainLevelInputChange(mainLev.id, 'name', e.target.value)}/>
                                    </div>

                                    {/* <div id="ds" style={{ visibility: dsVisible ? 'visible' : 'hidden' }}> */}
                                    <div id="ds" style={{ visibility: mainLevelsVisibility[mainLev.id] ? 'hidden' : 'visible' }}>


                                        <div className="ticket_type_Price">
                                            <input type="number" 
                                            style={{ display: isFreeEvent ? "none" : "block" }}
                                            value={mainLevelData[mainLev.id]?.price || ''}
                                            onChange={(e) => handleMainLevelInputChange(mainLev.id, 'price', e.target.value)}/>
                                        </div>
                                        <div className="ticket_type_qty" id="ids">
                                            <input type="text"
                                            value={mainLevelData[mainLev.id]?.quantity || ''}
                                            onChange={(e) => handleMainLevelInputChange(mainLev.id, 'quantity', e.target.value)} />
                                        </div>
                                        <div className={`ticket_type_only ${instantHideSwitch ? 'instant-hide' : ''}`}>
                                            <label className="switch">
                                                <input type="checkbox" 
                                                checked={mainLevelData[mainLev.id]?.is_box_office || false}
                                                value={mainLevelData[mainLev.id]?.is_box_office || false}
                                                onChange={(e) => handleMainLevelInputChange(mainLev.id, 'is_box_office', e.target.checked)} />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="ticket_type_multi top-1">
                                        {iconDirection === 'down' ? (
                                            <FaChevronDown className="down_icon" onClick={() => toggleVisibility(mainLev.id)} />
                                        ) : (
                                            <FaChevronUp className="down_icon" onClick={() => toggleVisibility(mainLev.id)} />
                                        )}


                                    </div>
                                </div>
                                <div className={`ticket_form_sec_hide bot-1`}
                                //  style={formSecDisplayStyle}
                                      style={{ display: mainLevelsVisibility[mainLev.id] ? "block" : "none" }}
                                      >

                                    <table>

                                        <thead>
                                            <tr>
                                                <th>Del</th>
                                                <th>Ticket Type</th>
                                                {!isFreeEvent && <th>Price</th>}
                                                <th>QTY</th>
                                                <th>Box Office Only</th>
                                            </tr>
                                        </thead>
                                    </table>
                                    <div>
                                        {/* {[...Array(subLevels.length)].map((_, index) => ( */}
                                        {mainLev.subLevels.map(subLev => (
                                            <div key={subLev.id} className="table_body">
                                                <div className="main_table_body">
                                                    {/* Your existing content */}
                                                    <div className="del_table_btn" onClick={() => handleRemoveSubLevel(mainLev.id, subLev.id)}>
                                                        <FaXmark className="form_X" style={{ color: "#FFE100" }} />
                                                    </div>
                                                    <div className="ticket_type_input">
                                                        <input type="text" 
                                                        value={subLevelData[mainLev.id]?.[subLev.id]?.name || ''}
                                                        onChange={(e) => handleSubLevelInputChange(mainLev.id, subLev.id, 'name', e.target.value)}/>
                                                    </div>
                                                    <div className="ticket_type_Price">
                                                        <input type="number"
                                                        style={{ display: isFreeEvent ? "none" : "block" }}
                                                        value={subLevelData[mainLev.id]?.[subLev.id]?.price || ''}
                                                        onChange={(e) => handleSubLevelInputChange(mainLev.id, subLev.id, 'price', e.target.value)}
                                                     />
                                                    </div>
                                                    <div className="ticket_type_qty">
                                                        <input type="number" 
                                                        value={subLevelData[mainLev.id]?.[subLev.id]?.quantity || ''}
                                                        onChange={(e) => handleSubLevelInputChange(mainLev.id, subLev.id, 'quantity', e.target.value)}
                                                      />
                                                    </div>
                                                    <div className="ticket_type_only">
                                                        <label className="switch">
                                                            <input type="checkbox" 
                                                            checked={subLevelData[mainLev.id]?.[subLev.id]?.is_box_office || false}
                                                            value={subLevelData[mainLev.id]?.[subLev.id]?.is_box_office || false}
                                                            onChange={(e) => handleSubLevelInputChange(mainLev.id, subLev.id, 'is_box_office', e.target.checked)}
                                                        />
                                                            <span className="slider round"></span>
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        <div className="add_sub" onClick={() => handleAddSubLevel(mainLev.id)}>
                                            <CiCirclePlus className="add_sub_i" />
                                            <p>Add New Sub-Level Ticket Type</p>
                                        </div>
                                    </div>
                                    </div>
                               

                            </div>
                            ))}
                        </div>

                        <div className="add_ticket_type" onClick={handleAddMainLevel}>
                            <CiCirclePlus className="add_ticket_type_i" />
                            <p>Add New Ticket Type</p>

                        </div> 
                        <div className="enable_sale_tax_section">
                            <div className="tax_btn"
                            style={{ display: !isFreeEvent ? "block" : "none" }}
                            >
                                <label className="switch">
                                    <input type="checkbox" checked={enableSalesTax} id="Sales_tax" value={enableSalesTax} onChange={handleCheckboxChange} />
                                    <span className="slider round" ></span>
                                </label><br/>
                                <p>Enable Sales Tax?</p>

                            </div>
                            {showTaxInputs && (
                                <div className="tax_inputs">
                                    <div className="per_tax">
                                        <input type="number" className='white_txt' min="0" defaultValue={salesTax} onChange={handleSalesTaxChange} />
                                        <span>%</span>

                                    </div>

                                </div>
                            )}
                            <div className="tax_inss">
                                <div className="start_tax">
                                    <div className="start_tax_sec">

                                        <p>When Should Ticket Sales Start?</p>
                                        <div className="start_tax_inputs">
                                            <input type="date" className="myInput2 white_txt"  
                                            disabled={startImmediately} Value={eventSaleStartDate} onBlur={handleEventSaleStartDateChange}
                                             min={eventStartDate} max={eventEndDate}
                                            />
                                            <input type="time" className="myInput2 white_txt"
                                             disabled={startImmediately} Value={eventSaleStartTime} onBlur={handleEventSaleStartTimeChange}/>

                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="button"
                                            className={`start_tax_caption ${startImmediately ? 'active' : ''}`}
                                            style={{ backgroundColor: startImmediately ? '#FFE100' : '' }}
                                            onClick={handleStartToggle}
                                        > Start Ticket Sales Immediately</button>

                                    </div>

                                </div>
                                <div className="start_tax">
                                    <div className="start_tax_sec" id="mainia2">

                                        <p>When Should Ticket Sales End?</p>
                                        <div className="start_tax_inputs">
                                            <input type="date" className="myInput3 white_txt"
                                             Value={eventSaleEndDate} onBlur={handleEventSaleEndDateChange} min={eventStartDate} max={eventEndDate}
                                             disabled={endImmediately} />
                                            <input type="time" className="myInput3 white_txt" 
                                            disabled={endImmediately} Value={eventSaleEndTime} onBlur={handleEventSaleEndTimeChange}/>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>








                    </div>

                    <div className="right_area_form">
                        <div className="ticket_right">
                            <p>Have Tables Bookable as a Whole?</p>
                            <div className="right_info_ticket">
                                <label className="switch">
                                    <input type="checkbox" onChange={handleCheckboxChange3} checked={isTicketGenerate} />
                                    <span className="slider round"></span>
                                </label>
                                <p>Generate ticket types for tables bookable as a whole</p>

                            </div>
                            {showForm && (
                                <div action="" className="ticket_right_ins">
                                    <div className="ticket_right_cat display_flex">
                                        <label htmlFor="" className='align_centre'>Category
                                        </label>
                                        {/* <input type="text" /> */}
                                        <div className='menus_wapper'>
                                        <select className='new_menu' onClick={handleTableOfCategory}>
                                            <option value="default">Select Ticket Type</option>
                                            {ticketTypes.map((type, index) => (
                                                <option key={index} value={type}>{type}</option>
                                            ))}
                                        </select>
                                        </div>
                                    </div>

                                    <div className="ticket_right_cat display_flex">
                                        <label htmlFor="" className='align_centre'>Table of</label>
                                        <input type="text" defaultValue={tableOfValue} onChange={handleTableOfValue} className='width_80 yellow_txt'/>
                                    </div>
                                    <div>

                                        <button type="button" className="right_btn" onClick={handleGenerateButtonClick}>Generate</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="next_btn2">

                            <button type='button' className="w3-bar-item w3-button tablink tab_btnn " onClick={handleNextButtonClick}>{label}</button>
                        </div>
                    </div>



                </form>
            </div></div>
    )
}

export default TicketPrice
