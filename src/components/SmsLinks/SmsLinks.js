// import Link from 'next/link'
import React from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { FaChevronDown, FaRegMessage } from 'react-icons/fa6'

const SmsLinks = ({ highlightedLink = "" }) => {

    const links = [
        { href: '/SendMessage', text: 'Send Message' },
        { href: '/PendingMessages', text: 'Pending Messages' },
        { href: '/MyPlan', text: 'My Plan' },
        { href: '/Contacts', text: 'Contacts' },
        { href: '/inbox', text: 'Inbox' },
        { href: '/Keywords', text: 'Keywords' },
        { href: '/Templates', text: 'Templates' },
        { href: '/Settings', text: 'Settings' }
    ];
    return (
        <div className="iocn-link">
            <div className="inner_nav_links " id="">
                <div className="flex_option_row accordion">

                    <FaRegMessage className="yellow_m menu_dash_i" />
                    <div className="Event_Title ">
                        <div className=" inner_flex">
                            <a href="/Event" className='yellow_m'>

                                SMS CAMPAIGNS
                            </a>
                        </div>
                    </div>
                </div>
                <ul className="upper_nav_i panel inner_nav_items2">


                    <ul className="inner_nav_items panel3">
                        {links.map((link, index) => (
                            <li className="inner_nav_item" key={index}>
                                <a href={link.href} className={link.href === highlightedLink ? 'yellow_m' : ''}>
                                    {link.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </ul>

            </div>
        </div>
    )
}

export default SmsLinks
