'use client'
import React, { useState } from 'react';
import './index.css'
// import Link from 'next/link';
import RootLayout from '../layout';

const Sign_Up_org = () => {


  return (
    <>
      <RootLayout>
    <div className='main_container'>
      <div className="login_container">
        <div className="login_section">

          <div className="coustomer_form ">
            <h2>ORGANIZERS</h2>

            <form action="" className="login_cous" >
              <h2>Sign Up</h2>
              <label htmlFor="">First Name:</label>
              <input type="text" />
              <label htmlFor="">Last Name:</label>
              <input type="text" />
              <label htmlFor="">Business Name:</label>
              <input type="text" />
              <label htmlFor="">Role:</label>
              <div className="sign_up_btns">
                <button>Organizer</button>
                <button>Venue</button>
                <button>Other</button>
              </div>


              <label htmlFor="">Email</label>
              <input type="email" required />

              <label htmlFor="">Password</label>
              <input type="Password" required />

              <label htmlFor="">Confirm Password</label>
              <input type="Password" required />
              <button type="submit">Sign Up</button>

            </form>
            <div className="sign_btnss">

              <p>Already have an account?</p>
              <a href="/Login_org" className="cursor_pointer" >Login</a>
            </div>
            <a href="/Sign_Up">Or Sign up as <span className='yellow_cr'>Customer</span> </a>

          </div>
        </div>
      </div>
    </div>
    </RootLayout>
    </>
  )
}

export default Sign_Up_org
