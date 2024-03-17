import React from 'react'

const SmsTrial = () => {
    return (
        <div className='main_container'>
            <div className='Free_trail_box'>
                <div className='Free_trail'>
                    <div className="headings_trail">
                        <h2>FREE TRAIL</h2>
                        <p>12 Credits</p>
                    </div>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique.</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nihil, facere corrupti explicabo ducimus eius voluptates molestias harum architecto neque. Tempora odit eius repellat nobis est, quam eveniet fuga quod praesentium molestias aliquam sunt doloribus ipsam quae facilis laudantium soluta. Repellendus, veritatis ea. Autem illo, consequatur id saepe dolore nesciunt at vel natus inventore recusandae tenetur, distinctio, alias magnam possimus!</p>
                </div>
                <div className='Free_trail'>
                    <div className="headings_trail">
                        <h2>Sign Up</h2>
                    </div>
                    <form action="" className='Sign_form_box'>
                        <div className='Sign_form'>
                        <div className="sing_form_input">
                            <label htmlFor="">Name</label>
                            <input type="text" />
                        </div>
                        <div className="sing_form_input">
                            <label htmlFor="">business name</label>
                            <input type="text" />
                        </div>
                        <div className="sing_form_input">
                            <label htmlFor="">business category</label>
                            <input type="text" />
                        </div>
                        <div className="sing_form_input">
                            <label htmlFor="">organization type</label>
                            <input type="text" />
                        </div>
                        <div className="sing_form_input">
                            <label htmlFor="">Email</label>
                            <input type="email" />
                        </div>
                        <div className="sing_form_input">
                            <label htmlFor="">Mobile Phone (optional)</label>
                            <input type="number" />
                        </div>
                        <div className="sing_form_input">
                            <label htmlFor="">Password</label>
                            <input type="password" />
                        </div>
                        <div className="sing_form_input">
                            <label htmlFor="">Confirm Password</label>
                            <input type="password" />
                        </div>
                        <div className="sign_check">
                            <input type="checkbox" />
                            <label htmlFor="">i agree to the trems of service</label>
                        </div>
                        </div>
                        <div>

                        <button type="submit" className='btn'>Sign Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SmsTrial
