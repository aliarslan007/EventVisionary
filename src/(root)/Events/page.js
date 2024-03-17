import React from 'react'
import './index.css'
// import Image from 'next/image'
import { Rectangle } from '../../public'
// import Link from 'next/link'
import RootLayout from '../layout';

const Events = () => {
  return (
    <>
        <RootLayout>
    <div className='main_container'>
      <div className="event_container">
                <div className="orgainer_card">
                    <div className="orgainer_card_info">
                        <p>ORGANIZER NAME</p>
                        <p>(###) ### - ####</p>
                        <p>email@email.com</p>
                    </div>
                    <div className="organiner_img"></div>

                </div>
                <h2>Upcoming Events</h2>
                <div className="main_events">

                    <div className="events_row_2">
                        <div className="event_cards" >
                            <div className="event_card">
                                <img src={Rectangle} alt='Rectangle' className='event_card_img'/>
                                <div className="card_info">
                                    <p>Event Title</p>
                                    <p>Sat, July 15, 2025 • 7:30 PM</p>
                                    <p>Venue Name</p>
                                    <a href="/SingleEvent" className="btn sm">Sell tickets</a>
                                </div>
                            </div>
                            <div className="event_card">
                                <img src={Rectangle} alt='Rectangle' className='event_card_img'/>
                                <div className="card_info">
                                    <p>Event Title</p>
                                    <p>Sat, July 15, 2025 • 7:30 PM</p>
                                    <p>Venue Name</p>
                                    <a href="/SingleEvent" className="btn sm">Sell tickets</a>
                                    {/* <a href="./singleevent.html" className="btn sm">Sell tickets</a> */}
                                </div>
                            </div>
                            <div className="event_card">
                                <img src={Rectangle} alt='Rectangle' className='event_card_img'/>
                                <div className="card_info">
                                    <p>Event Title</p>
                                    <p>Sat, July 15, 2025 • 7:30 PM</p>
                                    <p>Venue Name</p>
                                    <a href="/SingleEvent" className="btn sm">Sell tickets</a>
                                    {/* <a href="./singleevent.html" className="btn sm">Get tickets</a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    </RootLayout>
    </>
  )
}

export default Events
