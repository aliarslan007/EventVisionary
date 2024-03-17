import React from 'react';
import { FaSearch, FaCheck } from 'react-icons/fa';
import ArchivedBack from '../ArchivedBack/ArchivedBack';

const AttendeesCom = ({ title = "", showBackButton }) => {
    return (
        <div className="manage_order_area">
            {showBackButton && <ArchivedBack />}

            <div className="manage_order_section">
                {title && <h1>{title}</h1>}
                <form action="" className="manage_order_form">
                    <div className="manage_filter_row">
                        <div className="manage_filter_in">
                            <input type="search" placeholder="Search by name, order #, or amount..." />
                            <FaSearch style={{ color: '#000' }} />
                        </div>
                    </div>
                    <button className="manage_filter_btn">Export CSV</button>
                </form>
            </div>

            <div className="manage_filter_table">
                <table className="manage_filter_tables">
                    <thead>
                        <tr>
                            <th>Mark Admitted</th>
                            <th>Name</th>
                            <th>Section</th>
                            <th>Seat ID</th>
                            <th>Table ID</th>
                            <th>Order #</th>
                            <th>Order Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><FaCheck style={{ color: "green" }} /></td>
                            <td>Johnny Cash</td>
                            <td>A</td>
                            <td>39</td>
                            <td>6</td>
                            <td>A-00011123323</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><FaCheck style={{ color: "green" }} /></td>
                            <td>Johnny Cash</td>
                            <td>A</td>
                            <td>39</td>
                            <td>6</td>
                            <td>A-00011123323</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><FaCheck style={{ color: "green" }} /></td>
                            <td>Johnny Cash</td>
                            <td>A</td>
                            <td>39</td>
                            <td>6</td>
                            <td>A-00011123323</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendeesCom;
