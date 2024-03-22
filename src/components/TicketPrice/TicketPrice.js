import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import "./index.css";
import { CiCirclePlus } from 'react-icons/ci';
// import Link from 'next/link';
import ArchivedBack from '../ArchivedBack/ArchivedBack';
import { v4 as uuidv4 } from 'uuid';


const TicketPrice = ({ title = '', label = '', href = '', showBackButton, eventId=null, eventStartDate="", eventEndDate="" }) => {
    const [dsVisible, setDsVisible] = useState(true);
    const [formSecVisible, setFormSecVisible] = useState(false);
    const [iconDirection, setIconDirection] = useState('down');
    const [instantHideSwitch, setInstantHideSwitch] = useState(false);
    const [absorbsServiceFees, setAbsorbsServiceFees] = useState(false);
    const [enableSalesTax, setEnableSalesTax] = useState(false);
    const [salesTax, setSalesTax] = useState(null);
    const [eventSaleStartDate, setEventSaleStartDate] = useState('');
    const [eventSaleStartTime, setEventSaleStartTime] = useState('');
    const [eventSaleEndDate, setEventSaleEndDate] = useState('');
    const [eventSaleEndTime, setEventSaleEndTime] = useState('');
    const [mainLevelsVisibility, setMainLevelsVisibility] = useState({});
    const [mainLevelData, setMainLevelData] = useState([]);
    const [subLevelData, setSubLevelData] = useState({});

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
        { id: 1, subLevels: [{ id: 1 }], isSubLevelsVisible: true },
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

    // const toggleVisibility = () => {
    //     setDsVisible(!dsVisible);
    //     setFormSecVisible(!formSecVisible);
    //     setIconDirection(iconDirection === 'down' ? 'up' : 'down');
    // };
    const toggleVisibility = (mainLevelId) => {
        setMainLevelsVisibility((prevVisibility) => ({
          ...prevVisibility,
          [mainLevelId]: !prevVisibility[mainLevelId],
        }));
      };


    const formSecDisplayStyle = formSecVisible ? { display: 'block' } : {};

    const [showTaxInputs, setShowTaxInputs] = useState(false);

    const handleCheckboxChange = () => {
        setShowTaxInputs(!showTaxInputs);
    };

    const [startImmediately, setStartImmediately] = useState(false);
    const [endImmediately, setEndImmediately] = useState(false);

    const handleStartToggle = () => {
        setStartImmediately(!startImmediately);
        setEndImmediately(false); // Deactivate the other button
    };

    const handleEndToggle = () => {
        setEndImmediately(!endImmediately);
        setStartImmediately(false); // Deactivate the other button
    };
    const [showForm, setShowForm] = useState(false);

    const handleCheckboxChange3 = (e) => {
        setShowForm(e.target.checked);
    };

    const handleMainLevelInputChange = (mainLevelId, fieldName, value) => {
        const updatedMainLevelData = { ...mainLevelData };
        updatedMainLevelData[mainLevelId] = {
          ...updatedMainLevelData[mainLevelId],
          [fieldName]: value,
        };
        setMainLevelData(updatedMainLevelData);
      };
      
      const handleSubLevelInputChange = (mainLevelId, subLevelId, fieldName, value) => {
        const updatedSubLevelData = { ...subLevelData };
        updatedSubLevelData[mainLevelId] = updatedSubLevelData[mainLevelId] || {};
        updatedSubLevelData[mainLevelId][subLevelId] = {
          ...updatedSubLevelData[mainLevelId][subLevelId],
          [fieldName]: value,
        };
        setSubLevelData(updatedSubLevelData);
      };
      
    const handleNextButtonClick = () => {
    // Display or log mainLevel data
    console.log("Main Level Data:");
    mainLevels.forEach(mainLevel => {
        console.log(`Main Level ID: ${mainLevel.id}`);
        console.log("Main Level Input Data:", mainLevelData[mainLevel.id]);
        console.log("Sub Level Input Data:");
        mainLevel.subLevels.forEach(subLevel => {
        console.log(`  Sub Level ID: ${subLevel.id}`);
        console.log("  Sub Level Input Data:", subLevelData[mainLevel.id]?.[subLevel.id]);
        });
        });
      };

    const handleAddMainLevel = () => {
        console.log("inside add main ");
        // setMainLevels((prevMainLevels) => prevMainLevels + 1);
        const lastMainLevelId = mainLevels.length > 0 ? mainLevels[mainLevels.length - 1].id : 0;
        const newMainLevel = { id: lastMainLevelId + 1, subLevels: [{ id: 1 }], isSubLevelsVisible: false };
        setMainLevels([...mainLevels, newMainLevel]);
      };

    
    const handleRemoveMainLevel  = (mainId) => {
        console.log("Removing main level at mainId:", mainId);
        if (mainLevels.length > 1) {
        //   setMainLevels((prevMainLevels) => prevMainLevels - 1);
        const updatedMainLevels = mainLevels.filter(level => level.id !== mainId);
        setMainLevels(updatedMainLevels);

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
                    const updatedSubLevels = mainLevel.subLevels.filter(subLevel => subLevel.id !== subId);
                    return { ...mainLevel, subLevels: updatedSubLevels };
                    }
                    
                }
                return mainLevel;
            });
        });
    };


    return (
        <div>
            {showBackButton && <ArchivedBack />}
            <div id="Prices" className="w3-container w3-border city">
                {title && <h2 className='Archived_heading'>{title}</h2>}
                <form action="Create_event" className="event_froml">

                    <div className=" ticket_form">

                        <div className="form_price_option">
                            <label className="switch">
                                <input type="checkbox" 
                                checked={absorbsServiceFees}
                                onChange={handleAbsorbsServiceFeesChange}/>
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
                                        <th>Price</th>
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
                                            value={mainLevelData[mainLev.id]?.ticket_type || ''}
                                            onChange={(e) => handleMainLevelInputChange(mainLev.id, 'ticket_type', e.target.value)}/>
                                    </div>

                                    {/* <div id="ds" style={{ visibility: dsVisible ? 'visible' : 'hidden' }}> */}
                                    <div id="ds" style={{ visibility: mainLevelsVisibility[mainLev.id] ? 'hidden' : 'visible' }}>


                                        <div className="ticket_type_Price">
                                            <input type="text" 
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
                                                value={mainLevelData[mainLev.id]?.box_office || ''}
                                                onChange={(e) => handleMainLevelInputChange(mainLev.id, 'box_office', e.target.value)} />
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
                                                <th>Price</th>
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
                                                        value={subLevelData[mainLev.id]?.[subLev.id]?.ticket_type || ''}
                                                        onChange={(e) => handleSubLevelInputChange(mainLev.id, subLev.id, 'ticket_type', e.target.value)}/>
                                                    </div>
                                                    <div className="ticket_type_Price">
                                                        <input type="text"
                                                        value={subLevelData[mainLev.id]?.[subLev.id]?.price || ''}
                                                        onChange={(e) => handleSubLevelInputChange(mainLev.id, subLev.id, 'price', e.target.value)}
                                                     />
                                                    </div>
                                                    <div className="ticket_type_qty">
                                                        <input type="text" 
                                                        value={subLevelData[mainLev.id]?.[subLev.id]?.quantity || ''}
                                                        onChange={(e) => handleSubLevelInputChange(mainLev.id, subLev.id, 'quantity', e.target.value)}
                                                      />
                                                    </div>
                                                    <div className="ticket_type_only">
                                                        <label className="switch">
                                                            <input type="checkbox" 
                                                            value={subLevelData[mainLev.id]?.[subLev.id]?.box_office || ''}
                                                            onChange={(e) => handleSubLevelInputChange(mainLev.id, subLev.id, 'box_office', e.target.value)}
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
                            <div className="tax_btn">
                                <label className="switch">
                                    <input type="checkbox" id="Sales_tax" onChange={handleCheckboxChange} />
                                    <span className="slider round"></span>
                                </label>
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
                                            disabled={startImmediately} defaultValue={eventSaleStartDate} onBlur={handleEventSaleStartDateChange}
                                             min={eventStartDate} max={eventEndDate}
                                            />
                                            <input type="time" className="myInput2" disabled={startImmediately} />

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
                                             defaultValue={eventSaleEndDate} onBlur={handleEventSaleEndDateChange} min={eventStartDate} max={eventEndDate}
                                             disabled={endImmediately} />
                                            <input type="time" className="myInput3" disabled={endImmediately} />

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
                                    <input type="checkbox" onChange={handleCheckboxChange3} />
                                    <span className="slider round"></span>
                                </label>
                                <p>Generate ticket types for tables bookable as a whole</p>

                            </div>
                            {showForm && (
                                <form action="" className="ticket_right_ins">
                                    <div className="ticket_right_cat">
                                        <label htmlFor="">Category</label>
                                        <input type="text" />
                                    </div>

                                    <div className="ticket_right_cat">
                                        <label htmlFor="">Table of</label>
                                        <input type="text" />
                                    </div>
                                    <div>

                                        <button type="button" className="right_btn">Generate</button>
                                    </div>
                                </form>
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
