// import Link from 'next/link'
import React, { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import ArchivedBack from '../ArchivedBack/ArchivedBack.js';
// import Image from 'next/image';
import { Upload_img } from '../../public';


var AgeValue;
(function (AgeValue) {
    AgeValue["P"] = "P";
    AgeValue["A"] = "A";
    AgeValue["H"] = "H";
})(AgeValue || (AgeValue = {}));

const EventRegister = ({ title = '', label = '', href = '', showBackButton }) => {
    const [selectedAge, setSelectedAge] = useState(null);

    const handleCheckboxChange = (value) => {
        setSelectedAge(prevSelectedAge =>
            prevSelectedAge === value ? null : value
        );
    };
    const [isChecked, setIsChecked] = useState(false);

    const toggleOptions = () => {
        setIsChecked(!isChecked);
    };
    const [selectedRadio, setSelectedRadio] = useState(null);

    const handleRadioChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedRadio(selectedValue);
    };

    return (
        <div className="Details">
            {showBackButton && <ArchivedBack />}
            <div className="event_from">
                <div className="area_form_left">
                    {title && <h2>{title}</h2>}
                    <div className="inputs_left">

                        <label >Event Title</label>
                        <input type="text" />

                    </div>
                    <div className='events_inputs'>
                        <div className="event_in">
                            <label htmlFor="">Event Type</label>
                            <div className="menus_wapper">
                                <select name="" id="" className="new_menu">
                                    <option value="f" selected disabled>Event Type</option>
                                    <option value="f"> In-Person</option>
                                    <option value="f">Virtual</option>
                                </select>
                            </div>
                        </div>
                        <div className="event_in">
                            <label htmlFor="">Category</label>
                            <div className="menus_wapper">
                                <select name="" id="" className="new_menu">
                                    <option value="f" disabled selected>Category</option>
                                    <option value="f">Concert</option>
                                    <option value="f">Dance Performance</option>
                                    <option value="f">Festival</option>
                                    <option value="f">Theatre</option>
                                    <option value="f">Contest</option>
                                    <option value="f">Live Speaker Panel</option>
                                    <option value="f">Nightclub Event</option>
                                    <option value="f">Other</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="events_inputs">
                        <div className="event_in">
                            <label htmlFor="">Venue</label>
                            <div className="menus_wapper">
                                <select name="" id="" className="new_menu">
                                    <option value="f">Venue</option>
                                    <option value="f">knn</option>
                                    <option value="f">lknnojnoj</option>
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
                                    <form action="">
                                        <label htmlFor="">Venue Name</label>
                                        <input type="text" className="full_in" />
                                        <label htmlFor="">Venue Alias</label>
                                        <input type="text" className="full_in" />
                                        <h3>Venue Location</h3>
                                        <label htmlFor="">Address </label>
                                        <input type="text" className="full_in" />
                                        <div className="sub_venue">
                                            <div className="sub_vi">

                                                <label htmlFor="">City</label>
                                                <input type="text" />
                                            </div>
                                            <div className="sub_vi">

                                                <label htmlFor=""> State</label>
                                                <select name="" id="">
                                                    <option value="" selected>delaware</option>
                                                    <option value="">LA</option>
                                                    <option value="">Utha</option>
                                                    <option value="">NYC</option>
                                                </select>
                                            </div>

                                        </div>
                                        <div className="sub_venue">
                                            <div className="sub_vi">

                                                <label htmlFor=""> Postal Code</label>
                                                <input type="text" />
                                            </div>
                                            <div className="sub_vi">

                                                <label htmlFor=""> Country</label>
                                                <select name="" id="">
                                                    <option value="" selected>united states</option>
                                                    <option value="">united Kingdom</option>
                                                    <option value="">Saudi Arabia</option>
                                                </select>
                                            </div>

                                        </div>
                                        <button type="submit" className="btn" style={{ color: "#fff" }}>Create Venue</button>
                                    </form>

                                </div>
                            </div>

                        </div>
                    </div>
                    <label htmlFor="">Tell your customers a little bit about this event</label>
                    <textarea name="" id="" className="desc_event"></textarea>
                    <label htmlFor=""   >Add a special note to your tickets</label>
                    <textarea name="" id=""
                        placeholder="This note will appear on your customer’s tickets under their order information"></textarea>
                    <div className="date_inputs">
                        <div className="date_in">
                            <label htmlFor="">Start Date/Start Time</label>
                            <div className="event_inputs1">
                                <input type="date" className="cursor_pointer" />
                                <input type="time" className="cursor_pointer" />
                                {/* <Calendar onChange={onChange} value={value} /> */}

                            </div>
                        </div>
                        <div className="date_in">
                            <label htmlFor="">End Date/End Time</label>
                            <div className="event_inputs1">
                                <input type="date" className="cursor_pointer" />
                                <input type="time" className="cursor_pointer" />

                            </div>

                        </div>
                    </div>



                </div>
                {/* <div className="area_form_right"></div> */}
                <div className="right_area_form">
                    <div className="age">
                        <p>Age Restrictions</p>
                        <form action="">
                            <div className="age_row">
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        className="age-checkbox"
                                        checked={selectedAge === 'P'}
                                        onChange={() => handleCheckboxChange('P')}
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
                                        onChange={() => handleCheckboxChange('A')}
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
                                        onChange={() => handleCheckboxChange('H')}
                                    />
                                    <span className="slider round"></span>
                                </label>
                                <p>This event is for persons 21+</p>
                            </div>
                        </form>
                    </div>

                    <div className="option">
                        <p>More Options</p>
                        <div className="age_row">
                            <label className="switch">
                                <input type="checkbox" className="Present 2" name="attedence[]"
                                    id="watch-mainn" value="P" />
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

                                <input type="text" placeholder="Name Your Chart" />
                            </div>
                        </div>

                        <div>
                        </div>

                    </div>
                    <div className="file_form cursor_pointer">
                        <img src="./imgs/upload 1.png" alt="" />
                        <img src={Upload_img} alt=''/>
                        <p>Drag and drop image here</p>
                    </div>
                    <div className="next_btn">

                        <a className="w3-bar-item w3-button tablink tab_btnn cursor_pointer  "
                            href={href}>{label}</a>

                    </div>

                </div>


            </div>
        </div>

    )
}

export default EventRegister
