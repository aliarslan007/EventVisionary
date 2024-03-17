'use client'
import React, { useState } from 'react';
import './index.css'
// import Link from 'next/link';
import RootLayout from '../layout';

const Sign_Up = () => {


  return (
    <>
      <RootLayout>
    <div className='main_container'>
      <div className="login_container">
                <div className="login_section">
                    <div className="coustomer_form">
                        <h2>CUSTOMERS</h2>
                           
                            

                            <form action="" className="login_cous">
                                    <h2>Sign Up</h2>
                                    <label htmlFor="">Email:</label>
                                    <input type="email" required/>

                                    <label htmlFor="">Password:</label>
                                    <input type="Password" required/>

                                    <label htmlFor="">Confirm Password:</label>
                                    <input type="Password" required/>
                                <button type="submit" className='form_btn'>Sign Up</button>

                            </form>
                            <div className="sign_btnss">
                                <p >Already have an account?</p>
                                <a href="/Login" className="cursor_pointer sign_btnss" >Login</a>

                            </div>
                            <a href="/Sign_Up_org">Or Sign up as <span className='yellow_cr'>Organizer</span> </a>
                        </div>
                </div>
            </div>
    </div>
    </RootLayout>
    </>
  )
}

export default Sign_Up
