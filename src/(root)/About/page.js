import { About_img } from '../../public'
// import Image from 'next/image'
// import Link from 'next/link'
import React from 'react'

import RootLayout from '../layout';

const About = () => {
  return (
    <>
        <RootLayout>
    <div className='main_container'>
        <h1>About</h1>
            <div className="about_sec">
                <div className="about_sec_l">
                    <p>Welcome to Event Visionary, your one-stop solution for ticketing services for a wide array of events, from inspiring speaking engagements to pulsating nightclub extravaganzas and electrifying concerts - both grand and intimate. We are passionate about creating unforgettable experiences and connecting event organizers with enthusiastic attendees.</p>
                    <p>At Event Visionary, we take pride in offering cutting-edge features that set us apart from the rest. One of our standout features is the ability for organizers to craft dynamic seating charts. This means you, as a valued customer, can handpick your preferred seats and tables, all in real time! No more guessing games or settling for less; with us, you get to curate your own extraordinary event experience down to the very last detail.</p>
                </div>
                <div className="about_sec_r">
                    <img src="./imgs/pexels-wendy-wei-1916817 1.png" alt=""/>
                    <img src={About_img} alt='About_img'/>
                </div>
            </div>
            <div className="about_p">

                <p>Now, we know the frustrations of ticket buyers and event organizers alike when faced with sudden cancellations due to political agendas. But fear not, as we have a clear and unwavering stance on this matter. Event Visionary pledges to remain neutral and apolitical. Our mission is to foster a welcoming platform where the focus lies solely on celebrating shared interests, passions, and experiences. We firmly believe that politicking is best left to those who make a living out of it - the politicians themselves. Here, we cherish the principles laid out by the founders of the United States, including the fundamental right to freedom of speech.</p>
                <p>Our team at Event Visionary is devoted to ensuring your ticketing journey is seamless, from the moment you select your ideal spot to the second you walk through the event doors. We've carefully crafted our platform with user-friendliness in mind, making navigation a breeze and ticket purchase a joy.</p>
                <p>Join us as we redefine the ticketing experience, embracing innovation, and most importantly, the celebration of human connection. Your cherished memories await, and we can't wait to be a part of your incredible journey.</p>
                <p>Thank you for choosing Event Visionary. Let's make your Vision a reality.</p>
            </div>
            <div className="about_btns">
                <a className="btn" href="/EventsPage">Create an Event</a>
                <a className="btn" href="/EventsPage">Browse Events</a>
            </div>
      
    </div>
    </RootLayout>
    </>
  )
}

export default About
