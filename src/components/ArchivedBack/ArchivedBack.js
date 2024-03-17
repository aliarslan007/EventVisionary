// import Link from 'next/link'
import React from 'react'
import { FaChevronLeft } from 'react-icons/fa'

const ArchivedBack = () => {
    return (

        <a className="arc_btn" href="/archived">
            <FaChevronLeft style={{ color: "#FFE100", marginRight: "10px" }} />

            <p>Back</p>
        </a>
    )
}

export default ArchivedBack
