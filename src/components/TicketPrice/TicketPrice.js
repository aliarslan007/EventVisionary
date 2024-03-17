import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import "./index.css";
import { CiCirclePlus } from 'react-icons/ci';
// import Link from 'next/link';
import ArchivedBack from '../ArchivedBack/ArchivedBack';

const TicketPrice = ({ title = '', label = '', href = '', showBackButton }) => {
    const [dsVisible, setDsVisible] = useState(true);
    const [formSecVisible, setFormSecVisible] = useState(false);
    const [iconDirection, setIconDirection] = useState('down');
    const [instantHideSwitch, setInstantHideSwitch] = useState(false);

    const toggleVisibility = () => {
        setDsVisible(!dsVisible);
        setFormSecVisible(!formSecVisible);
        setIconDirection(iconDirection === 'down' ? 'up' : 'down');
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

    const [subLevels, setSubLevels] = useState(1); // Initial sub-levels count

    const handleAddSubLevel = () => {
      setSubLevels((prevSubLevels) => prevSubLevels + 1);
    };
  
    const handleRemoveSubLevel = () => {
      if (subLevels > 1) {
        setSubLevels((prevSubLevels) => prevSubLevels - 1);
      }
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
                                <input type="checkbox" checked />
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
                            <div className="table_body">
                                <div className="main_table_body">

                                    <div className="del_table_btn">

                                        {/* <i className='bx bx-x'></i> */}
                                        <FaXmark className="form_X" style={{ color: "#FFE100" }} />

                                    </div>
                                    <div className="ticket_type_input">
                                        <input type="text" />
                                    </div>

                                    <div id="ds" style={{ visibility: dsVisible ? 'visible' : 'hidden' }}>

                                        <div className="ticket_type_Price">
                                            <input type="text" />
                                        </div>
                                        <div className="ticket_type_qty" id="ids">
                                            <input type="text" />
                                        </div>
                                        <div className={`ticket_type_only ${instantHideSwitch ? 'instant-hide' : ''}`}>
                                            <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="ticket_type_multi top-1">
                                        {iconDirection === 'down' ? (
                                            <FaChevronDown className="down_icon" onClick={toggleVisibility} />
                                        ) : (
                                            <FaChevronUp className="down_icon" onClick={toggleVisibility} />
                                        )}


                                    </div>
                                </div>


                            </div>
                        </div>




                        <div className={`ticket_form_sec_hide bot-1`} style={formSecDisplayStyle}>

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
                                {[...Array(subLevels)].map((_, index) => (
                                    <div key={index} className="table_body">
                                        <div className="main_table_body">
                                            {/* Your existing content */}
                                            <div className="del_table_btn" onClick={handleRemoveSubLevel}>
                                                <FaXmark className="form_X" style={{ color: "#FFE100" }} />
                                            </div>
                                            <div className="ticket_type_input">
                                                <input type="text" />
                                            </div>
                                            <div className="ticket_type_Price">
                                                <input type="text" />
                                            </div>
                                            <div className="ticket_type_qty">
                                                <input type="text" />
                                            </div>
                                            <div className="ticket_type_only">
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="add_sub" onClick={handleAddSubLevel}>
                                    <CiCirclePlus className="add_sub_i" />
                                    <p>Add New Sub-Level Ticket Type</p>
                                </div>
                            </div>
                        </div>

                        <div className="add_ticket_type">
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
                                        <input type="number" min="0" />
                                        <span>%</span>

                                    </div>

                                </div>
                            )}
                            <div className="tax_inss">
                                <div className="start_tax">
                                    <div className="start_tax_sec">

                                        <p>When Should Ticket Sales Start?</p>
                                        <div className="start_tax_inputs">
                                            <input type="date" className="myInput2" disabled={startImmediately} />
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
                                            <input type="date" className="myInput3" disabled={endImmediately} />
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

                                        <button type="submit" className="right_btn">Generate</button>
                                    </div>
                                </form>
                            )}
                        </div>
                        <div className="next_btn2">

                            <a className="w3-bar-item w3-button tablink tab_btnn " href={href}>{label}</a>
                        </div>
                    </div>



                </form>
            </div></div>
    )
}

export default TicketPrice
