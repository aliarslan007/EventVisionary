import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import ArchivedBack from '../ArchivedBack/ArchivedBack';

const ManageOrdersCom = ({ title = '', label = '', href = '', showBackButton }) => {
  return (
    <div className="manage_order_area">
        {showBackButton && <ArchivedBack />}

        <div className="manage_order_section">
             {title && <h1>{title}</h1>}
            <form action="" className="manage_order_form">

                <div className="manage_filter_row">
                    <div className="manage_filter_in">
                        <input type="search" placeholder="Search by name, order #, or amount..." />
                        {/* <i className='bx bx-search'></i> */}
                        <FaSearch style={{ color: '#000' }} />
                    </div>
                </div>
                <div className="manage_filter_d">
                    <div className="filterid">
                        <label htmlFor="">Filter by Date:</label>
                        <input type="date" />
                    </div>
                    --
                    <div className="filterid">
                        <input type="date" />
                    </div>
                </div>
                <button className="manage_filter_btn">Export CSV</button>

            </form>

        </div>
        <div className="manage_filter_table">
            <table className="manage_filter_tables">
                <thead>
                    <tr>
                        <th>Order #</th>
                        <th>Name</th>
                        <th># of Tickets</th>
                        <th>Total Paid</th>
                        <th>Payment Method</th>
                        <th>More</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>A-00011123323</td>
                        <td>Johnny Cash</td>
                        <td>4</td>
                        <td>$450.00</td>
                        <td>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path d="M11.625 18.5625H13.5L14.625 11.4375H12.7969L11.625 18.5625Z" fill="white" />
                                <path d="M18.375 14.2969C17.7188 13.9687 17.3438 13.7344 17.3438 13.4062C17.3438 13.125 17.6719 12.7969 18.4219 12.7969C19.0312 12.7969 19.4531 12.9375 19.8281 13.0781L20.0156 13.125L20.25 11.625C19.875 11.4844 19.3125 11.3438 18.6094 11.3438C16.7813 11.3438 15.4688 12.2812 15.4688 13.6875C15.4688 14.7187 16.3594 15.3281 17.1094 15.6562C17.8125 15.9844 18.0937 16.2187 18.0937 16.5469C18.0937 17.0156 17.5313 17.25 16.9688 17.25C16.2188 17.25 15.7969 17.1562 15.1875 16.875L14.9531 16.7812L14.6719 18.4219C15.0937 18.5625 15.8906 18.75 16.6875 18.75C18.6562 18.7969 19.9219 17.8125 19.9219 16.3125C19.875 15.4687 19.4063 14.8125 18.375 14.2969Z" fill="white" />
                                <path d="M23.5313 11.4375C23.1094 11.4375 22.7344 11.5781 22.5469 12.0469L19.7812 18.5625H21.6563V18.6094C21.6563 18.6094 21.9375 17.7188 22.0781 17.5313C22.2656 17.5313 24.1875 17.5313 24.4219 17.5313C24.4687 17.7656 24.6562 18.6094 24.6562 18.6094H26.3906L24.8906 11.4844H23.5313V11.4375ZM22.5938 16.0781C22.7344 15.6562 23.3437 14.1094 23.3437 14.1094C23.3437 14.1563 23.5312 13.6875 23.5781 13.4531L23.7187 14.0625C23.7187 14.0625 24.0938 15.7969 24.1406 16.125C23.8594 16.0781 22.9688 16.0781 22.5938 16.0781Z" fill="white" />
                                <path d="M10.125 11.4375L8.29688 16.3594L7.3125 11.4375H3.60938L5.67188 12.9844L7.17188 18.5625H9.09375L12.0937 11.4375H10.125Z" fill="white" />
                                <path d="M25.5937 6.23438H4.40625C2.4375 6.23438 0.796875 7.82812 0.796875 9.84375V20.1563C0.796875 22.125 2.39062 23.7656 4.40625 23.7656H25.5469C27.5156 23.7656 29.1562 22.1719 29.1562 20.1563V9.84375C29.2031 7.875 27.5625 6.23438 25.5937 6.23438ZM27.0938 20.1563C27.0938 21 26.4375 21.6563 25.5937 21.6563H4.40625C3.5625 21.6563 2.90625 21 2.90625 20.1563V9.84375C2.90625 9 3.5625 8.34375 4.40625 8.34375H25.5469C26.3906 8.34375 27.0469 9 27.0469 9.84375V20.1563H27.0938Z" fill="white" />
                            </svg>
                        </td>
                        <td>

                            <div className="box ">
                                <a className="" href="#popup5">
                                    {/* <i className='bx bx-dots-horizontal-rounded'style={{color: "#ffffff"}}></i> */}
                                    <HiOutlineDotsHorizontal style={{ color: "#ffffff" }} />

                                </a>
                            </div>
                            <div id="popup5" className="overlay ">
                               

                                <div className="order_deatils">
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
                                    <div className="order_dinfo">

                                        <div className="order_t">
                                            <div className="order_infog">
                                                <p>ORDER#</p>
                                                <p>Purchase Date/Time </p>
                                            </div>

                                            <div className="dropdown1" style={{ float: "left" }}>
                                                <button className="dropbtn1">More <i className='bx bx-chevron-down' ></i></button>
                                                <div className="dropdown-content1" style={{ left: "0" }}>
                                                    <div className="box ">
                                                        <a className="" href="#popup7">View eTickets</a>
                                                    </div>
                                                    <div className="box ">
                                                        <a className="" href="#popup8">Full Refund</a>
                                                    </div>
                                                    <div className="box ">
                                                        <a className="" href="#popup9">Partial Refund</a>
                                                    </div>
                                                    <div className="box ">
                                                        <a className="" href="#popup27">Send eTickets</a>
                                                    </div>
                                                    <div className="box ">
                                                        <a className="" href="#popup28">Add Ticket(s)</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="order_user">
                                            <p>Customer Name</p>
                                            <p>Number of Tickets Purchased:</p>
                                            <p>Order Total: $Total Paid</p>
                                            <p>Event Title: <br />
                                                Event start date/start time   - Event end date/end time</p>
                                        </div>
                                        <div className="order_typed">
                                            <table>

                                                <thead>
                                                    <tr>
                                                        <th>Ticket Type</th>
                                                        <th>QTY</th>
                                                        <th>Price</th>
                                                        <th>Service Fees</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>[ user defined ticket type]</td>
                                                        <td>1</td>
                                                        <td>$100</td>
                                                        <td>$ 9.99</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="order_payd">

                                            <div className="order_paydo">
                                                <p>Payment Method</p>
                                                <p>Last 4 Digits: <br />
                                                    ####-1234</p>
                                            </div>
                                            <div className="order_paydt">
                                                <div className="pay_row">
                                                    <p>Subtotal</p>
                                                    <p>$100</p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>
                            </div>
                        </td>
                        <div id="popup8" className="overlay ">
                            <div className="main_popupre">
                                <p>Notice</p>
                                <p>Confirm: You are about to send this customer a refund of. </p>
                                <div className="main_popupre_btns">
                                    <a href="" className="tran">Cancel</a>
                                    <div className="box ">
                                        <a className="yellow" href="#popup10">Confirm</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="popup10" className="overlay ">
                            <div className="main_popupre">
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
                                <p>Refund Successfully Initiated</p>
                                <p>Your customer should receive their refund within 3-5 business days </p>
                            </div>
                        </div>
                        <div id="popup9" className="overlay ">
                            <div className="main_popupre">
                                <a className="mclose" href="#">
                                    <i className="bx x"></i>
                                </a>
                                <div className="popup_center">

                                    <h3>Enter Partial Refund Amount</h3>
                                    <p className="sm">Order Total: $200.59</p>
                                    <div className="inputs_pup">
                                        <label htmlFor="">Partial Refund Amount:</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="main_popupre_btns">
                                    <a href="" className="tran">Cancel</a>
                                    <div className="box ">
                                        <a className="yellow" href="#">Refund</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="popup27" className="overlay ">
                            <div className="main_popupre">
                                <a className="mclose" href="#">
                                    <i className="bx x"></i>
                                </a>
                                <div className="popup_center">

                                    <h3>Send e-Tickets</h3>
                                    <div className="inputs_pup lg">
                                        <label htmlFor="">Email:</label>
                                        <input type="text" />
                                    </div>
                                </div>
                                <div className="main_popupre_btns">
                                    <a href="" className="tran">Cancel</a>
                                    <div className="box ">
                                        <a className="yellow" href="#">Send e-Tickets</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </tr>
                    <tr>
                        <td>A-00011123323</td>
                        <td>Johnny Cash</td>
                        <td>4</td>
                        <td>$450.00</td>
                        <td>
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path d="M25.5469 6.1875H4.45312C2.4375 6.1875 0.84375 7.82812 0.84375 9.79687V20.2031C0.84375 22.2187 2.48438 23.8125 4.45312 23.8125H25.5469C27.5625 23.8125 29.1562 22.1719 29.1562 20.2031V9.79687C29.2031 7.78125 27.5625 6.1875 25.5469 6.1875ZM27.0938 20.2031C27.0938 21.0469 26.3906 21.7031 25.5938 21.7031H4.5C3.65625 21.7031 3 21 3 20.2031V9.79687C3 8.95312 3.70312 8.29688 4.5 8.29688H25.5938C26.4375 8.29688 27.0938 9 27.0938 9.79687V20.2031Z" fill="white" />
                                <path d="M17.2969 10.5C16.3594 10.5 15.4688 10.7813 14.7656 11.2969C14.1094 10.8281 13.3125 10.6406 12.4688 10.6406C10.0781 10.6406 8.10938 12.6094 8.10938 15C8.10938 17.3906 10.0781 19.3594 12.4688 19.3594C13.2656 19.3594 14.0625 19.125 14.7656 18.7031C15.5156 19.2188 16.3594 19.5 17.2969 19.5C19.7813 19.5 21.7969 17.4844 21.7969 15C21.7969 12.5156 19.7813 10.5 17.2969 10.5ZM17.3906 18.375C16.7812 18.375 16.2188 18.1875 15.75 17.9531C16.4531 17.1562 16.9219 16.1719 16.9219 15C16.875 13.8281 16.4531 12.7969 15.75 12.0469C16.2656 11.7656 16.7812 11.625 17.3906 11.625C19.2188 11.625 20.7656 13.125 20.7656 15C20.7188 16.875 19.2188 18.375 17.3906 18.375Z" fill="white" />
                            </svg>
                        </td>
                        <td>
                            <a href="#popup5">
                                <HiOutlineDotsHorizontal style={{ color: "#ffffff" }} />
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>A-00011123323</td>
                        <td>Johnny Cash</td>
                        <td>4</td>
                        <td>$450.00</td>
                        <td>

                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                                <path d="M5.71827 10.5469C5.39014 10.9219 4.87452 11.2969 4.31202 11.2031C4.26514 10.6875 4.49952 10.0781 4.82764 9.70313C5.15577 9.32813 5.76514 8.95312 6.23389 8.95312C6.28077 9.65625 6.04639 10.1719 5.71827 10.5469ZM6.23389 11.4375C5.43702 11.3906 4.78077 11.9062 4.45264 11.9062C4.07764 11.9062 3.46827 11.4375 2.85889 11.4375C2.06202 11.4375 1.35889 11.9062 0.890144 12.6094C-0.000480652 14.0625 0.655769 16.2656 1.45264 17.4375C1.87452 18.0469 2.34327 18.7031 2.99952 18.7031C3.60889 18.7031 3.79639 18.3281 4.49952 18.3281C5.20264 18.3281 5.43702 18.7031 6.09327 18.6562C6.74952 18.6562 7.17139 18.0469 7.54639 17.4844C8.01514 16.8281 8.20264 16.1719 8.20264 16.0781C8.20264 16.0781 6.93702 15.5625 6.93702 14.1094C6.93702 12.8438 7.92139 12.3281 8.01514 12.3281C7.40577 11.4844 6.56202 11.4375 6.23389 11.4375ZM10.7808 9.70313V18.5625H12.187V15.5156H14.1089C15.8433 15.5156 17.1089 14.3438 17.1089 12.6094C17.1089 10.875 15.937 9.70313 14.2026 9.70313H10.7808ZM12.187 10.875H13.7808C14.9526 10.875 15.6558 11.5312 15.6558 12.6562C15.6558 13.7812 14.9995 14.4375 13.7808 14.4375H12.187V10.875ZM19.5464 18.7031C20.3901 18.7031 21.187 18.2344 21.6089 17.5781H21.6558V18.6562H22.9214V14.2031C22.9214 12.9375 21.937 12.0937 20.3433 12.0937C18.8901 12.0937 17.812 12.8906 17.7651 14.0625H18.937C18.9839 13.5469 19.5464 13.125 20.2495 13.125C21.0464 13.125 21.562 13.5 21.562 14.2031V14.7188L19.8276 14.7656C18.2339 14.8125 17.3901 15.5156 17.3901 16.6406C17.3433 17.9062 18.2808 18.7031 19.5464 18.7031ZM19.9214 17.625C19.1714 17.625 18.7495 17.2969 18.7495 16.6875C18.7495 16.1719 19.2183 15.8437 20.062 15.75L21.562 15.7031V16.2187C21.6089 17.0625 20.8589 17.625 19.9214 17.625ZM24.562 21C25.8745 21 26.5308 20.4844 27.0933 18.9375L29.5308 12.2344H28.1245L26.4839 17.4844H26.437L24.7964 12.2344H23.3433L25.6401 18.7031L25.4995 19.0312C25.312 19.6875 24.9839 19.9688 24.3745 19.9688C24.3276 19.9688 24.0464 19.9688 23.9995 19.9688V21.0469C24.187 21 24.5151 21 24.562 21Z" fill="white" />
                            </svg>
                        </td>
                        <td>
                            <a href="#popup5">
                                <HiOutlineDotsHorizontal style={{ color: "#ffffff" }} />
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>A-00011123323</td>
                        <td>Johnny Cash</td>
                        <td>4</td>
                        <td>$450.00</td>
                        <td>
                            cash
                        </td>
                        <td>
                            <a href="#popup5">
                                <HiOutlineDotsHorizontal style={{ color: "#ffffff" }} />
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ManageOrdersCom
