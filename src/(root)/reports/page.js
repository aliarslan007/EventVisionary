import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
// import Link from 'next/link'
// import React from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaRegUser, FaSearch } from 'react-icons/fa'
import { FaGear, FaRegMessage } from 'react-icons/fa6'
import { IoSpeedometerOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'
import RootLayout from '../layout';
import React, { useState, useEffect, useCallback } from 'react'
import RevenueRow from '../../components/RevenueRow/RevenueRow'
import { saveAs } from 'file-saver';


const Reports = () => {
    const [revenues, setRevenues] = useState([]);
    const [authtoken, setAuthtoken] = useState([]);
    const [events, setEvents] = useState([]);

    const [tickets, setTickets] = useState(0);
    const [amount, setAmount] = useState(0);
    const [tax, setTax] = useState(0);
    const [servicefee, setServicefee] = useState(0);

    const [searchQuery, setSearchQuery] = useState('');
    const [csvData, setCsvData] = useState('');


    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const calculateTotals = useCallback(() => {
        let totalTickets = 0;
        let totalAmount = 0;
        let totalTax = 0;
        let totalServiceFee = 0;

        revenues.forEach(revenue => {
            totalTickets += revenue.revenue_total_tickets;
            totalAmount += revenue.revenue_amount;
            totalTax += revenue.revenue_total_tax;
            totalServiceFee += revenue.revenue_total_service_fees;
        });

        setTickets(totalTickets);
        setAmount(totalAmount);
        setTax(totalTax);
        setServicefee(parseFloat(totalServiceFee.toFixed(2))); // Limit to two decimal places
    }, [revenues]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const authToken = localStorage.getItem('authToken');
            setAuthtoken(authToken)

            if (!authToken) {
                throw new Error('Authentication token not found');
            }
            const authUserId = localStorage.getItem('authUserId');

            if (!authUserId) {
                throw new Error('Authentication user id   found');
            }
            // const token = 'e0d25a4a3fda989bf969bc5971a9e36878ece9f2';
            const response = await fetch('http://127.0.0.1:8000/api/revenues/', {
              headers: {
                Authorization: `Token ${authToken}`
              }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setRevenues(jsonData);

            

          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

    useEffect(() => {
        calculateTotals();
    }, [calculateTotals, revenues]);

    // const filteredRevenueData = revenues.filter((revenue) =>
    //     revenue.eventData.Event_Name.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };


    const convertToCsv = () => {
        const header = Array.from(document.querySelectorAll('.manage_filter_tables th')).map(th => th.innerText).join(',') + '\n';
        const rows = Array.from(document.querySelectorAll('.manage_filter_tables tbody tr')).map(tr =>
            Array.from(tr.children).map(td => td.innerText).join(',')
        ).join('\n');
        const csv = header + rows;
        setCsvData(csv);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'table_data.csv');
    };
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
                                    <span className="link_name">Dashboard</span>
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
                                    <RiMoneyDollarCircleLine className="yellow_m menu_dash_i" />
                                    <span className="link_name yellow_m">REPORTS</span>
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
                                    <h1>Manage Orders: Event Title Show Here</h1>
                                    <form action="" className="manage_order_form">

                                        <div className="manage_filter_row">
                                            <div className="manage_filter_in">
                                                <input type="search"
                                                value={searchQuery} onChange={handleSearchChange}
                                                 placeholder="Search by name, order #, or amount..."/>
                                                    {/* <i className='bx bx-search'></i> */}
                                                    <FaSearch style={{color: '#000'}} />
                                            </div>
                                        </div>
                                        <div className="manage_filter_d">
                                            <div className="filterid">
                                                <label htmlFor="">Filter by Date:</label>
                                                <input type="date"/>
                                            </div>
                                            --
                                            <div className="filterid">
                                                <input type="date"/>
                                            </div>
                                        </div>
                                        <button type='button' className="manage_filter_btn" onClick={convertToCsv}>Export CSV</button>

                                    </form>

                                </div>
                                <div className="manage_filter_table">
                                    <table className="manage_filter_tables">
                                        <thead>
                                            <tr>
                                                <th>Event Title</th>
                                                <th>Event Start Date</th>
                                                <th># of Tickets Sold</th>
                                                <th>Total Revenue</th>
                                                <th>Total Service Fees</th>
                                                <th>Taxes</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {revenues.map((revenue) => (
                                            <RevenueRow key={revenue.id} revenue={revenue} searchQuery={searchQuery}/>
                                        ))}
                                        <tr className="yellow_tables">
                                                <td></td>
                                                <td>Totals</td>
                                                <td>{tickets}</td>
                                                <td>${amount}</td>
                                                <td>${servicefee}</td>
                                                <td>${tax}</td>
                                        </tr>
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

export default Reports