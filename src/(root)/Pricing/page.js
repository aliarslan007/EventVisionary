'use client'
import PlanDrop from '../../components/PlanDrop/PlanDrop'

import React from 'react'
import RootLayout from '../layout';

const Pricing = () => {
  return (
    <>
    <RootLayout>
    <div className='main_container'>
      <h1>Pricing</h1>
            <div className="manager_blocks">
                <h2>Events Manager</h2>
                <div className="p_rows">
                    <div className="p_item_s">
                        <div className="p_hight">FREE</div>
                        <p>Creating and listing events is free for all Event Organizers by default. </p>
                        <p>Our platform does have service fees, but they are normally absorbed by the customer at checkout when they purchase tickets—this is the most common scenario across the industry. Service fees do not apply to free events. </p>
                    </div>
                    <div className="p_item_l res_none">
                        <h3>Not Sure If We’re the Right Fit?</h3>
                        <p>If you are not sure whether Event Visionary is a suitable option for your needs, you are welcome to create an account for free and simply have a look around, but we are confident that Event Visionary will serve you well. </p>
                        <p>If you have any inquiries, please reach out directly to us at support@eventvisionary.com</p>
                    </div>
                    <div className="p_item_s pc_none">
                        <div className="p_hight">Absorb Service Fees</div>
                        <p>Event Organizers may choose to absorb the service fees by electing to do so from the Organizer Dashboard when creating an event.  </p>
                        <p>However, it is most common practice to allow customers to pay service fees at checkout. </p>
                    </div>
                </div>
                <div className="p_rows2">
                    <div className="p_item_s res_none">
                        <div className="p_hight">Absorb Service Fees</div>
                        <p>Event Organizers may choose to absorb the service fees by electing to do so from the Organizer Dashboard when creating an event.  </p>
                        <p>However, it is most common practice to allow customers to pay service fees at checkout. </p>
                    </div>
                    <div className="p_item_l">
                        <h3 className="yellow_m">Service Fees by Event Type</h3>
                        <table className="p_tables">
                            <thead>
                            <tr>
                                <th>Event Type</th>
                                <th>Platform Fee</th>
                                <th>Payment Processing Fee</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Free Event</td>
                                <td>$0</td>
                                <td>$0</td>
                            </tr>
                            <tr>
                                <td>Paid Event</td>
                                <td>$1 + 4.25%</td>
                                <td>$0.30 + 2.9%</td>
                            </tr>
                            </tbody>
                        </table>
                        
                    </div>
                    <div className="p_item_l pc_none">
                        <h3>Not Sure If We’re the Right Fit?</h3>
                        <p>If you are not sure whether Event Visionary is a suitable option for your needs, you are welcome to create an account for free and simply have a look around, but we are confident that Event Visionary will serve you well. </p>
                        <p>If you have any inquiries, please reach out directly to us at support@eventvisionary.com</p>
                    </div>
                </div>
            </div>
            <div className="manager_blockssm">
                <h2>SMS Campaigns</h2>
                <div className="upper_grid">

                    <PlanDrop/>
                    <div className="pri_plan2">
                        <div className="p_hight">Included</div>
                        <div className="list_p">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                                <path d="M37.8753 8.875C37.3128 8.3125 36.4378 8.3125 35.8753 8.875L14.6253 29.5L4.12534 19.1875C3.56284 18.625 2.68784 18.6875 2.12534 19.1875C1.56284 19.75 1.62534 20.625 2.12534 21.1875L13.1878 31.9375C13.5628 32.3125 14.0628 32.5 14.6253 32.5C15.1878 32.5 15.6253 32.3125 16.0628 31.9375L37.8753 10.75C38.4378 10.3125 38.4378 9.4375 37.8753 8.875Z" fill="#52FF00"/>
                              </svg>
                              <p> Dedicated Number</p>
                        </div>
                        <div className="list_p">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                                <path d="M37.8753 8.875C37.3128 8.3125 36.4378 8.3125 35.8753 8.875L14.6253 29.5L4.12534 19.1875C3.56284 18.625 2.68784 18.6875 2.12534 19.1875C1.56284 19.75 1.62534 20.625 2.12534 21.1875L13.1878 31.9375C13.5628 32.3125 14.0628 32.5 14.6253 32.5C15.1878 32.5 15.6253 32.3125 16.0628 31.9375L37.8753 10.75C38.4378 10.3125 38.4378 9.4375 37.8753 8.875Z" fill="#52FF00"/>
                              </svg>
                              <p> Unlimited Keywords</p>
                        </div>
                        <div className="list_p">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                                <path d="M37.8753 8.875C37.3128 8.3125 36.4378 8.3125 35.8753 8.875L14.6253 29.5L4.12534 19.1875C3.56284 18.625 2.68784 18.6875 2.12534 19.1875C1.56284 19.75 1.62534 20.625 2.12534 21.1875L13.1878 31.9375C13.5628 32.3125 14.0628 32.5 14.6253 32.5C15.1878 32.5 15.6253 32.3125 16.0628 31.9375L37.8753 10.75C38.4378 10.3125 38.4378 9.4375 37.8753 8.875Z" fill="#52FF00"/>
                              </svg>
                              <p>Unlimited Contacts</p>
                        </div>
                        <div className="list_p list_pl">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="41" viewBox="0 0 40 41" fill="none">
                                <path d="M37.8753 8.875C37.3128 8.3125 36.4378 8.3125 35.8753 8.875L14.6253 29.5L4.12534 19.1875C3.56284 18.625 2.68784 18.6875 2.12534 19.1875C1.56284 19.75 1.62534 20.625 2.12534 21.1875L13.1878 31.9375C13.5628 32.3125 14.0628 32.5 14.6253 32.5C15.1878 32.5 15.6253 32.3125 16.0628 31.9375L37.8753 10.75C38.4378 10.3125 38.4378 9.4375 37.8753 8.875Z" fill="#52FF00"/>
                              </svg>
                              <p>Phone Support</p>
                        </div>
                </div>



            </div>
            <div className="lower_grid">
                <p>Event Organizers can use our SMS Campaigns feature built directly into our platform. </p>
                <p>No more hunting for 3rd parties to reach your recurring and growing customer base. </p>
                <p>We’ll assign you a dedicated toll free number to send text messages to your existing and growing clientele.</p>
            </div>

        </div>
    </div>
    </RootLayout>
    </>
  )
}

export default Pricing
