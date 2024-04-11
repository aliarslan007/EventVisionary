'use client'
import { Logo } from '../../public'
import { Img } from 'react-image';
import { NavLink } from 'react-router-dom';
import React, { useEffect, useState } from 'react'

import './index.css'
import { BsX, BsList } from 'react-icons/bs'
import { FaChevronDown } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';


const Header = () => {
    
    const navigate = useNavigate();
    const [selectedLink, setSelectedLink] = useState('/'); // Initial selected link is '/'
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [log_button, setLog_button] = useState('Logout');


    const links = [
        { path: '/', text: 'Home' },
        { path: '/Pricing', text: 'Pricing' },
        { path: '/EventsPage', text: 'EVENTS' },
        { path: '/Login', text: 'Login', className: 'login-button pc_none' },
        { path: '/NewEvent', text: 'CREATE EVENT', className: 'li_active' },
    ];

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            setLog_button('Login');
        }
        else{
            setLog_button('Logout')

        }
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition >= 100);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        if (log_button.includes('Logout')){
            localStorage.removeItem('authToken');
            navigate(`/Login/`);
            setIsOpen(false);
        }
    };
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [isDropdownListVisible, setDropdownListVisible] = useState(false);
    const [user, setUser] = useState(''); 

    const toggleDropdown = () => {
        setDropdownListVisible(!isDropdownListVisible);
    };

    useEffect( () => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');

                if (!authToken) {
                  console.error('Authentication token not found');
                  return
                }
                const authUserId = localStorage.getItem('authUserId');

                if (!authUserId) {
                    console.error('Authentication user id   found');
                    return
                }
            
                // const token = 'e0d25a4a3fda989bf969bc5971a9e36878ece9f2';
                
                // Fetch user data
                const userResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${authUserId}/`, {
                    headers: {
                        Authorization: `Token ${authToken}`
                    }
                });
                if (!userResponse.ok) {
                    console.error('Failed to fetch event data');
                    return
                }
                else{
                const userData = await userResponse.json();
                setUser(userData);
                setDropdownVisible(true);
                }
                


            } catch (error) {
                console.error(error);
            } 
        };
    
        // Call the fetchData function
        fetchData();
        // Update selectedLink when the component mounts to reflect the initial URL
        setSelectedLink(window.location.pathname);
    }, []);

    const addYellowCrrClass = (path) => {
        return selectedLink === path ? 'yellow_crr' : '';
    };

    const handleLinkClick = (path) => {
        setSelectedLink(path);
        // Add additional logic for any other actions when a link is clicked
    };



    return (
        <nav className={isScrolled ? 'scrolled' : ''}>
            <a href="/">
                <Img src={Logo} alt='logo' className='logo_nav' />
            </a>


            <button onClick={toggleMenu} className="menu-btn">
                {isOpen ? <BsX className="icon_i" /> : <BsList className="icon_i" />}
            </button>
            <div className={`menu ${isOpen ? 'open' : ''}`}>
                <ul className="navs-links">
                    {/* {links.map(({ path, text, className }) => (
                        <li key={path}>
                            <a
                                href={path}
                                onClick={() => {
                                    setSelectedLink(path);
                                    closeMenu();
                                }}
                                className={`${className || ''} ${selectedLink === path && window.location.pathname === path ? 'yellow_crr' : ''}`}
                            >
                                {text}
                            </a>
                        </li>
                    ))} */}
                    <li><a href='/' className={addYellowCrrClass('/')}>Home</a></li>
                    <li><a href='/Pricing' className={addYellowCrrClass('/Pricing')}>Pricing</a></li>
                    <li><a href='/EventsPage' className={addYellowCrrClass('/EventsPage')}>EVENTS</a></li>
                    <li><a href='/Login' className={`login-button pc_none ${addYellowCrrClass('/Login')}`}>{log_button}</a></li>
                    <li><a href='/NewEvent' className={`li_active ${addYellowCrrClass('/NewEvent')}`}>CREATE EVENT</a></li>
                </ul>
            </div>
            
            <div className='dropdwon_custom_warp' style={{ display: isDropdownVisible ? "block" : "none" }} 
            onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                <p className='dropdwon_custom' >
                    Hover over me
                    <FaChevronDown className="dropdwon_custom_i" />
                </p>
                {isDropdownListVisible && (
                    <div className="dropdownStyles">
                        <ul>
                            <a href="/Dashboard">Dashboard</a>
                            <a href="/NewEvent">Create an Event</a>
                            <a href="/Events">Events</a>
                            <a href="/settingdash">Settings</a>
                            <a href="/SmsCampaigns">SMS Campaigns</a>
                            <a href="/myaccount">My Account</a>
                        </ul>
                    </div>
                )}
            </div>

            <button  className="login-button  res_none" onClick={closeMenu}>{log_button}</button>
        </nav>
    )
}

export default Header
