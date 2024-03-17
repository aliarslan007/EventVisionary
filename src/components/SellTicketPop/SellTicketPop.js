import { Render, Render_mobile_only } from '../../public'
// import Image from 'next/image'
import React from 'react'
import { RiCloseFill } from 'react-icons/ri'

const SellTicketPop = () => {
    return (
        <div className="get_ticket_over">
            <div className="get_ticket_overi">

                <h1>Event Title</h1>
                <p className="res_yellow">Saturday, July 5, 2025 at 7:30 pm PST</p>
                <p className="res_p">Select your seat(s) or table(s) below to add it to your cart</p>
            </div>
            <img alt='' src={Render} className="res_triangle res_none" />
            <img alt='' src={Render_mobile_only} className="res_triangle pc_none" />
            <div className="promo_ticket">
                <form action="" className="promo_cl res_none">
                    <label htmlFor="promo">Promo Code</label>
                    <div className="promo_ticket_input">
                        <input type="text" />
                        <button type="submit">Apply</button>
                    </div>
                </form>
                <div className="box">
                    <a className="btn res_none" href="#popup15">Get Tickets</a>
                </div>

            </div>

        </div>
    )
}

export default SellTicketPop
