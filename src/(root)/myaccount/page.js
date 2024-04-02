import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
// import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { FaGear, FaRegMessage } from 'react-icons/fa6'
import { IoSpeedometerOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'
import RootLayout from '../layout';
import { color } from 'framer-motion'


const Myaccount = () => {
    const [myaccount, setMyaccount] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    const [first_name, setFirst_name] = useState([]);
    const updateFirstName = (e) => {
        setFirst_name(e.target.value);
    };
    const [last_name, setLast_name] = useState([]);
    const updateLastName = (e) => {
        setLast_name(e.target.value);
    };
    const [business_name, setBusiness_name] = useState([]);
    const updateBusinessName = (e) => {
        setBusiness_name(e.target.value);
    };
    const [business_address, setBusiness_address] = useState([]);
    const updateBusinessAddress = (e) => {
        setBusiness_address(e.target.value);
    };
    const [city, setCity] = useState([]);
    const updateCity = (e) => {
        setCity(e.target.value);
    };
    const [state, setState] = useState([]);
    const updateState = (e) => {
        setState(e.target.value);
    };
    const [postal_code, setPostal_code] = useState([]);
    const updatePostalCode = (e) => {
        setPostal_code(e.target.value);
    };
    const [email, setEmail] = useState([]);
    const updateEmail = (e) => {
        setEmail(e.target.value);
    };
    const [phone, setPhone] = useState([]);
    const updatePhone = (e) => {
        setPhone(e.target.value);
    };

    const updateUser = async () => {
        try {
            const authToken = localStorage.getItem('authToken');

            if (!authToken) {
                throw new Error('Authentication token not found');
            }
            const authUserId = localStorage.getItem('authUserId');

            if (!authUserId) {
                throw new Error('Authentication user id   found');
            }
            // Create the request body with the updated user information
            const body = JSON.stringify({
                first_name: first_name,
                last_name: last_name,
                business_name: business_name,
                business_address: business_address,
                city: city,
                state: state,
                postal_code: postal_code,
                email: email,
                phone: phone
            });
    
            // Make the PATCH request to update the user
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${authUserId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body: body
            });
    
            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Failed to update user information');
            }
    
            // Handle success
            console.log('User information updated successfully');
            window.location.reload();
        } catch (error) {
            // Handle error
            console.error('Error updating user information:', error);
        }
    };

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');

                if (!authToken) {
                  throw new Error('Authentication token not found');
                }
                const authUserId = localStorage.getItem('authUserId');

                if (!authUserId) {
                  throw new Error('Authentication user id   found');
                }
                // const token = 'e0d25a4a3fda989bf969bc5971a9e36878ece9f2';
                
                // Fetch event data
                const myaccountResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${authUserId}/`, {
                    method: 'GET',  // Assuming you are making a POST request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${authToken}`
                    }
                 });
                if (!myaccountResponse.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const myaccountData = await myaccountResponse.json();
                setMyaccount(myaccountData);
                setFirst_name(myaccountData.first_name)
                setLast_name(myaccountData.last_name)
                setBusiness_name(myaccountData.business_name)
                setBusiness_address(myaccountData.business_address)
                setCity(myaccountData.city)
                setState(myaccountData.state)
                setPostal_code(myaccountData.postal_code)
                setEmail(myaccountData.email)
                setPhone(myaccountData.phone)

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
    
        // Call the fetchData function
        fetchData();
    }, []); // Include eventId in the dependency array to trigger the effect when it changes
    
  return (
    <>
        <RootLayout>
    <div className='main_container'>
            <div className="dashboard_main">
                <div className="dashboard_section">
                    <div className="sidebar ">
                        <ul className="nav-links">
                            <Silder_icon />
                            <li>
                                <a href="/Dashboard">

                                    <IoSpeedometerOutline className=" menu_dash_i" />
                                    <span className="link_name ">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <a href="/NewEvent">
                                        <CiCirclePlus className=" menu_dash_i" />

                                        <span className="link_name ">CREATE AN EVENT</span>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <SubMenus />
                            </li>
                            <li>
                                <a href="/venues">
                                    <SlLocationPin className=" menu_dash_i" />
                                    <span className="link_name">VENUES</span>
                                </a>
                            </li>
                            <li>
                                <a href="/reports">
                                    <RiMoneyDollarCircleLine className=" menu_dash_i" />
                                    <span className="link_name">REPORTS</span>
                                </a>
                            </li>
                            <li>
                                <a href="/settingdash">
                                    <FaGear className=" menu_dash_i" />
                                    <span className=" link_name">SETTINGS</span>
                                </a>
                            </li>
                            {/* <li>
                                <div className="iocn-link">
                                    <Link href="/SmsCampaigns">
                                        <FaRegMessage className=" menu_dash_i" />
                                        <span className="link_name">SMS CAMPAIGNS</span>
                                    </Link>
                                </div>
                            </li> */}
                            <li>
                                <div className="iocn-link">
                                    <a href="/myaccount">
                                        <FaRegUser className="yellow_m menu_dash_i" />
                                        <span className="link_name yellow_m">MY ACCOUNT</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">
                        <div className="my_acc_section">
                        <h1>My Account</h1>
                        <div className="my_acc_row">
                            <div className="my_acc_col">
                                <div className="sell_form_section">
                                    <div className="sell_forma">
                                        <div className="row_form raw_grey">
                                            <label htmlFor="">First Name *</label>
                                            <input type="text"
                                            value={first_name}
                                            onChange={updateFirstName}
                                            className='white_txt'
                                            />
                                        </div>
                                        <div className="row_form raw_grey">
                                            <label htmlFor="">Last Name *</label>
                                            <input type="text"
                                            value={last_name}
                                            onChange={updateLastName}
                                            className='white_txt'/>
                                        </div>
                                    </div>
                                    <div className="billing_info raw_grey l_binfo">
                                        <label htmlFor="">Business Name</label>
                                        <input type="text" 
                                            className="billing_info white_txt"
                                            value={business_name}
                                            onChange={updateBusinessName}
                                            />

                                    </div>
                                    <div className="billing_info raw_grey l_binfo">
                                        <label htmlFor="">Business Address </label>
                                        <input type="text" 
                                            className="billing_info white_txt"
                                            value={business_address}
                                            onChange={updateBusinessAddress}/>

                                    </div>
                                    <div className="sell_forma">
                                        <div className="row_form raw_grey">
                                            <label htmlFor="">City</label>
                                            <input type="text"
                                            className="white_txt"
                                            value={city}
                                            onChange={updateCity}/>
                                        </div>
                                        <div className="row_form raw_grey">
                                            <label htmlFor="">State</label>
                                            <input type="text" 
                                            className="white_txt"
                                            value={state}
                                            onChange={updateState}/>
                                        </div>
                                    </div>
                                    <div className="sell_forma">
                                        <div className="row_form raw_grey">
                                            <label htmlFor="">Postal Code</label>
                                            <input type="text"
                                            className="white_txt"
                                            value={postal_code}
                                            onChange={updatePostalCode} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="my_acc_col">
                                <form action="" className="reset_pass">
                                    <div className="inputs_sm">
                                        <label htmlFor="">Email</label>
                                        <input type="email"
                                        className="white_txt"
                                        value={email}
                                        onChange={updateEmail}/>
                                    </div>
                                    <div className="inputs_sm">
                                        <label htmlFor="">Phone</label>
                                        <input type="text"
                                        className="white_txt"
                                        value={phone}
                                        onChange={updatePhone}/>
                                    </div>
                                    <button type="submit"> Reset Password</button>
                                </form>
                            </div>
                        </div>
                        <button onClick={updateUser} className="my_acc_btn">Save</button>
                      </div>

                        </div>
                    </section>
                </div>
            </div>
        </div>
        </RootLayout>
    </>
  )
}

export default Myaccount
