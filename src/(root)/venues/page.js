import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
// import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaRegCalendarAlt, FaChevronDown, FaRegUser, FaSearch } from 'react-icons/fa'
import { FaGear, FaRegMessage } from 'react-icons/fa6'
import { IoSpeedometerOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'
import RootLayout from '../layout';

const Venues = () => {

    const [venueslist, setVenueslist] = useState([]);
    const [filteredVenuesList, setFilteredVenuesList] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchquery, setSearchquery] = useState('');
    const [searchInput, setSearchInput] = useState(''); 
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [ed_venue_name, setEd_venue_name] = useState(null);
    const [ed_venue_nickName, setEd_venue_nickName] = useState(null);
    const [ed_venue_address, setEd_venue_address] = useState(null);
    const [ed_venue_city, setEd_venue_city] = useState(null);
    const [ed_venue_postal_code, setEd_venue_postal_code] = useState(null);
    const [ed_venue_state, setEd_venue_state] = useState(null);
    const [ed_venue_country, setEd_venue_country] = useState(null);

    const handleVenueNameChange = (event) => {
        setEd_venue_name(event.target.value);
      };
    
      const handleVenueNickNameChange = (event) => {
        setEd_venue_nickName(event.target.value);
      };
    
      const handleVenueAddressChange = (event) => {
        setEd_venue_address(event.target.value);
      };
    
      const handleVenueCityChange = (event) => {
        setEd_venue_city(event.target.value);
      };
    
      const handleVenuePostalCodeChange = (event) => {
        setEd_venue_postal_code(event.target.value);
      };
    
      const handleVenueStateChange = (event) => {
        setEd_venue_state(event.target.value);
      };
    
      const handleVenueCountryChange = (event) => {
        setEd_venue_country(event.target.value);
      };

    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // Format the date as desired
        const formattedDate = date.toLocaleDateString(); // Format: MM/DD/YYYY
        return formattedDate;
    };

    // Function to handle input change
    const handleInputChange = (e) => {
        // Update the search input value state
        setSearchInput(e.target.value);
        // Call the function to update the search query state in the parent component
        setSearchquery(e.target.value);
    };

    const openPopup = (venue) => {
        setSelectedVenue(venue);
        setIsPopupOpen(true);
        setEd_venue_name(venue.venue_name)
        setEd_venue_nickName(venue.venue_nickName)
        setEd_venue_address(venue.venue_address)
        setEd_venue_city(venue.venue_city)
        setEd_venue_state(venue.venue_state)
        setEd_venue_postal_code(venue.venue_postal_code)
        setEd_venue_country(venue.venue_country)
    };

    const closePopup = () => {
        setSelectedVenue(null);
        setIsPopupOpen(false);
    };

    const handleSaveChanges = async () => {
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
                venue_name: ed_venue_name,
                venue_nickName: ed_venue_nickName,
                venue_address: ed_venue_address,
                venue_city: ed_venue_city,
                venue_postal_code: ed_venue_postal_code,
                venue_country: ed_venue_country,
                venue_state: ed_venue_state
            });
            const id = selectedVenue.id
    
            // Make the PATCH request to update the user
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/venues/${id}/`, {
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
        // Implement saving changes to the backend here
        // You can use the selectedVenue state to get the edited values
        closePopup();
    };
    
    // useEffect to update filteredVenuesList when searchquery changes
    useEffect(() => {
        // Function to filter venues based on search query
        const filterVenues = (query) => {
            const filteredVenues = venueslist.filter((venue) => {
                // Perform case-insensitive search on venue name
                const lowerCaseQuery = query.toLowerCase();

                return (
                    venue.venue_name.toLowerCase().includes(lowerCaseQuery) ||
                    venue.venue_nickName.toLowerCase().includes(lowerCaseQuery)
                );            });
            // Update the filteredVenuesList state with the filtered venues
            setFilteredVenuesList(filteredVenues);
        };
    
        filterVenues(searchquery);
    }, [searchquery, venueslist]);

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
                const venuesResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/venues`, {
                    method: 'GET',  // Assuming you are making a POST request
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${authToken}`
                    }
                 });
                if (!venuesResponse.ok) {
                    throw new Error('Failed to fetch event data');
                }
                const venuesData = await venuesResponse.json();
                setVenueslist(venuesData);

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
                                    <SlLocationPin className="yellow_m menu_dash_i" />
                                    <span className="link_name yellow_m">VENUES</span>
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
                                    <span className="link_name">SETTINGS</span>
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
                                        <FaRegUser className=" menu_dash_i" />
                                        <span className="link_name">MY ACCOUNT</span>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">
                            <div className="manage_order_area">

                                <div className="manage_order_section">
                                    <h1>Venues</h1>
                                    <form action="" className="manage_order_form">

                                        <div className="manage_filter_row">
                                            <div className="manage_filter_in">
                                                <input type="search" placeholder="Search by name"
                                                value={searchInput}
                                                onChange={handleInputChange} />
                                                {/* <i className='bx bx-search'></i> */}
                                                <FaSearch style={{ color: '#000' }} />

                                            </div>
                                        </div>

                                    </form>

                                </div>
                                <div className="manage_filter_table">
                                    <table className="manage_filter_tables">
                                        <div className="table_bar"></div>
                                        <thead>
                                            <tr>
                                                <th>Venue Name</th>
                                                <th>Date Created</th>
                                                <th>Alias</th>
                                                <th>Active Events</th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {filteredVenuesList && Array.isArray(filteredVenuesList) && filteredVenuesList.map(venuelist => (
                                            <tr>
                                                <td className="flex_data">
                                                    <p>{venuelist.venue_name}</p>
                                                    <p className="c_grey">{venuelist.venue_address}, <br />{venuelist.venue_city}, {venuelist.venue_state} {venuelist.venue_postal_code}</p>
                                                </td>
                                                <td>{formatDate(venuelist.created)}</td>
                                                <td>{venuelist.venue_nickName}</td>
                                                <td>1</td>
                                                <td>
                                                    {/* <button className="table_e" onClick={() => openPopup(venuelist)}>Edit Details</button> */}
                                                    <a href='#popup22' onClick={() => openPopup(venuelist)}>Edit Details</a>
                                                    </td>
                                                <td>
                                                    <a className="table_e" href="/settingChart">Edit Seating</a>
                                                    {/* {isPopupOpen && ( */}
                                                    <div id="popup22" className="overlay">
                                                        <div className="main_edit">

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
                                                                <h2>Edit Venue Details</h2>
                                                                <form action="" className="edit_ve">
                                                                    <label htmlFor="">Venue Name</label>
                                                                    <input type="text" defaultValue={ed_venue_name} onChange={handleVenueNameChange}/>
                                                                    <label htmlFor="">Venue Alias</label>
                                                                    <input type="text" defaultValue={ed_venue_nickName} onChange={handleVenueNickNameChange}/>
                                                                    <h3>Venue Location</h3>
                                                                    <label htmlFor="">Address</label>
                                                                    <input type="text" defaultValue={ed_venue_address} onChange={handleVenueAddressChange  }/>
                                                                    <div className="sub_venue"> 
                                                                        <div className="sub_vi">

                                                                            <label htmlFor="">City</label>
                                                                            <input type="text" defaultValue={ed_venue_city} onChange={handleVenueCityChange }/>
                                                                        </div>
                                                                        <div className="sub_vi">

                                                                            <label htmlFor="">State</label>
                                                                            <input type="text" defaultValue={ed_venue_state} onChange={handleVenueStateChange }/>
                                                                        </div>

                                                                    </div>
                                                                    <div className="sub_venue">
                                                                        <div className="sub_vi">

                                                                            <label htmlFor="">Postal Code</label>
                                                                            <input type="text" defaultValue={ed_venue_postal_code} onChange={handleVenuePostalCodeChange } />
                                                                        </div>
                                                                        <div className="sub_vi">

                                                                            <label htmlFor="">Country</label>
                                                                            <input type="text" defaultValue={ed_venue_country} onChange={handleVenueCountryChange } />
                                                                        </div>

                                                                    </div>
                                                                    <button type="button" onClick={handleSaveChanges} className="btn">Save Changes</button>
                                                                </form>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* )} */}
                                                </td>
                                            </tr>
                                        ))} 
                                        </tbody>
                                    </table>
                                </div>
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

export default Venues
