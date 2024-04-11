import SubMenus, { Silder_icon } from '../../components/SubMenus/SubMenus'
import { Settingdasg_img, Square, Strip } from '../../public'
// import Image from 'next/image'
// import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { FaGear, FaRegMessage } from 'react-icons/fa6'
import { IoSpeedometerOutline } from 'react-icons/io5'
import { RiMoneyDollarCircleLine } from 'react-icons/ri'
import { SlLocationPin } from 'react-icons/sl'
import RootLayout from '../layout';
import { Upload_img } from '../../public';

import "./index.css"

const Settingdash = () => {
    
    const [user, setUser] = useState([]);
    const [email, setEmail] = useState([]);
    const [isDisplayEmail, setisDisplayEmail] = useState([]); 
    const [phone, setPhone] = useState([]);
    const [isDisplayPhone, setisDisplayPhone] = useState([]);
    const [logo, setLogo] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [billingInfo_id, setBillingInfo_id]= useState(null);

    // form data
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [creditCard, setCreditCard] = useState('');
    const [securityCode, setSecurityCode] = useState('');
    const [expDate, setExpDate] = useState('');

    // form data ends here

    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        throw new Error('Authentication token not found');
    }
    const authUserId = localStorage.getItem('authUserId');
    console.log("token is ", authToken);
    console.log("authUserId is ", authUserId);

    if (!authUserId) {
        throw new Error('Authentication authUserId not found');
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
      };
    
      const handleLastNameChange = (e) => {
        setLastName(e.target.value);
      };
    
      const handleBillingAddressChange = (e) => {
        setBillingAddress(e.target.value);
      };
    
      const handleCityChange = (e) => {
        setCity(e.target.value);
      };
    
      const handleStateChange = (e) => {
        setState(e.target.value);
      };
    
      const handlePostalCodeChange = (e) => {
        setPostalCode(e.target.value);
      };
    
      const handleCreditCardChange = (e) => {
        setCreditCard(e.target.value);
      };
    
      const handleSecurityCodeChange = (e) => {
        setSecurityCode(e.target.value);
      };

      const handleExpDateChange = (e) => {
        setExpDate(e.target.value);
      };
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handleisEmailChange = async () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        const to_status=!isDisplayEmail;
        setisDisplayEmail(!isDisplayEmail);

        const requestBody = JSON.stringify({
            is_email_display : to_status
        });
        // Fetch user data
        const userResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${authUserId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body:requestBody
        });
        if (!userResponse.ok) {
            alert('Failed to update user data');
        }
        const userData = await userResponse.json();
        alert('Email status updated successfully ');



    };

    const handleisPhoneChange = async () => {
        const to_status=!isDisplayPhone;
        setisDisplayPhone(!isDisplayPhone);

        const requestBody = JSON.stringify({
            is_phone_display : to_status
        });
        // Fetch user data
        const userResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${authUserId}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body:requestBody
        });
        if (!userResponse.ok) {
            alert('Failed to update user data');
        }
        const userData = await userResponse.json();
        alert('Phone status updated successfully ');



    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]; 
        // Do something with the uploaded image file
        console.log("file upload is ", file);
        setUploadedImage(file);

        const body = {
            logo_image : file
        };
        
        const formData = new FormData();
        for (const key in body) {
            if (Object.hasOwnProperty.call(body, key)) {
                const value = body[key];
                formData.append(key, value);
            }
        }
        // Fetch user data
        const userResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${authUserId}/`, {
            method: 'PATCH',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body:formData
        });
        if (!userResponse.ok) {
            alert('Failed to update User Image');
        }
        else{
            const userData = await userResponse.json();
            alert('User Image updated successfully ', userResponse);
        }



      };
      
      const handleDragOver = (e) => {
        e.preventDefault();
        const file = e.target.files[0]; 
        // Do something with the uploaded image file
        setUploadedImage(file);
      };
      
      const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        // Do something with the dropped image file
        setUploadedImage(file);
      };

      
      const handleStripeClick = async () => {

        const requestBody = JSON.stringify({
            user_id : authUserId
        });
        // Fetch user data
        const stripeResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/getstripeonborad/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body:requestBody
        });
        if (!stripeResponse.ok) {
            alert('Failed to update user data');
        }
        else{
            const stripeData = await stripeResponse.json();
            const linkStripe = stripeData.onboarding_url;
            const current_staus= stripeData.current_staus
            // alert('Stipe onBoarding link is  status updated successfully ', linkStripe);
            if(current_staus){
                window.open(linkStripe, '_blank');
            }
            else{
                alert("Payment is already enable")
            }
        }
        // alert('Stipe onBoarding link is  status updated successfully ');
      };

    //   handle submit button response for billingInfo data
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Perform validations4
        console.log('All fields ');
        if (
          firstName=== '' ||
          lastName=== '' ||
          billingAddress=== '' ||
          city=== '' ||
          state === '' ||
          postalCode=== '' ||
          creditCard=== '' ||
          securityCode=== '' ||
          expDate=== ''
        ) {
          alert('All fields are required');
          return;
        }
    
        const requestBody = JSON.stringify({
            // billingInfo: {
              first_name: firstName,
              last_name: lastName,
              billing_address_line1: billingAddress,
              billing_state: state,
              billing_city: city,
              billing_zip_code: postalCode,
              card_number: creditCard,
              card_expiry: expDate,
              card_cvc: securityCode,
              user: user.id
            // }
          });
          
        console.log("requestBody is ", requestBody);
        console.log("credit length is ", creditCard.length);
        console.log("credit  is ", creditCard);
        // Validate credit card length
        if (isNaN(creditCard) || creditCard.toString().length !== 16) {

          alert('Credit card number must be 16 digits', creditCard.length);
          return;
        }
    
        // Validate security code length
        if (isNaN(securityCode) || securityCode.toString().length !== 3) {
          alert('Security code (CVV) must be 3 digits', securityCode.length);
          console.log("securityCode length is ", securityCode.length);
          console.log("securityCode  is ", securityCode);
          return;
        }
    
        // Validate expiration date
        const currentDate = new Date();
        const selectedExpDate = new Date(expDate);
        if (selectedExpDate < currentDate) {
          alert('Expiration date must be in the future');
          return;
        }
    
        // Create the request body
        
          
    
        // Make your API call with the requestBody
        try {
            
            // Fetch user data
            let url=`${process.env.REACT_APP_BASE_URL}/api/billinginfo/`, 
            methodVar= 'POST';

            if(billingInfo_id){
                url = `${process.env.REACT_APP_BASE_URL}/api/billinginfo/${billingInfo_id}/`;
                methodVar = 'PATCH';
            }
            const billingInfoResponse = await fetch(url, {
            method: methodVar,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}`
            },
            body:requestBody
            });
            if (!billingInfoResponse.ok) {
                alert('Failed to update user data');
                console.log("bad response is ", billingInfoResponse);
            }
            else{
                alert('Data submitted successfully');
                window.location.reload();
            }
        } catch (error) {
          console.error('Error:', error.message);
          alert('Failed to submit data');
        }
      };

    // end here for handling billingInfo data 
    useEffect(() => {
        const fetchEventData= async () => {
            

            const imageUrlToFile = async (imageUrl) => {
                try {
                  const response = await fetch(imageUrl);
                  const blob = await response.blob();
                  return new File([blob], 'image.jpg', { type: 'image/jpeg' });
                } catch (error) {
                  console.error('Error fetching image:', error);
                  return null;
                }
              };


            // Fetch user data
            const userResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/users/${authUserId}/`, {
                headers: {
                    Authorization: `Token ${authToken}`
                }
            });
            if (!userResponse.ok) {
                throw new Error('Failed to fetch event data');
            }
            const userData = await userResponse.json();
            setUser(userData);
            setEmail(userData.email);
            setisDisplayEmail(userData.is_email_display);
            setPhone(userData.phone);
            setisDisplayPhone(userData.is_phone_display);
            // setLogo(userData.logo_image);
            imageUrlToFile(userData.logo_image)
                .then((file) => {
                setUploadedImage(file);
                })
                .catch((error) => {
                console.error('Error converting image URL to file:', error);
                });


            // fetch billinginfo data
             // Fetch user data
            const requestBody = JSON.stringify({
                user_id : authUserId
              });
             const billinginfoResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/api/billlinginfoofuser/`, {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${authToken}`
                },
                body:requestBody
            });
            if (!billinginfoResponse.ok) {
                if(billinginfoResponse.status === 404){
                    console.error("No Bookings Found ");
                }
                else{
                    console.log("billinginfoResponse is ", billinginfoResponse.status);
                    console.error('Failed to fetch event data');
                }
            }
            else{
                const billinginfoResponseData =await  billinginfoResponse.json();
                
                console.log("billinginfoResponseData is ", billinginfoResponseData);
                console.log("billing info is ", billinginfoResponseData.billingInfo);
                const billingInfo_Data = billinginfoResponseData.billingInfo;

                setBillingInfo_id(billingInfo_Data.id);
                setFirstName(billingInfo_Data.first_name || '');
                setLastName(billingInfo_Data.last_name || '');
                setBillingAddress(`${billingInfo_Data.billing_address_line1 || ''} ${billingInfo_Data.billing_address_line2 || ''}`.trim());
                setCity(billingInfo_Data.billing_city || '');
                setState(billingInfo_Data.billing_state || '');
                setPostalCode(billingInfo_Data.billing_zip_code || '');
                setCreditCard(billingInfo_Data.card_number || '');
                setSecurityCode(billingInfo_Data.card_cvc || '');
                setExpDate(billingInfo_Data.card_expiry || '');
                // Assuming card_expiry is in MM/YYYY format, you can split it and format it as needed
                // const [expMonth, expYear] = (billingInfo_Data.card_expiry || '').split('/');
                // setExpDate(`${expMonth || ''}/${expYear || ''}`);
            }

        }
        fetchEventData();
    }, []);
            
    return (
        <>
            <RootLayout>
        <div className='main_container'>
            <div className="dashboard_main">
                <div className="dashboard_section">
                    <div className="sidebar ">
                        <ul className="nav-links">
                            <Silder_icon />
                            <li>
                                <a href="/Dashboard">

                                    <IoSpeedometerOutline className=" menu_dash_i" />
                                    <span className="link_name ">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <div className="iocn-link">
                                    <a href="/NewEvent">
                                        <CiCirclePlus className=" menu_dash_i" />

                                        <span className="link_name ">CREATE AN EVENT</span>
                                    </a>
                                </div>
                            </li>
                            <li>
                                <SubMenus />
                            </li>
                            <li>
                                <a href="/venues">
                                    <SlLocationPin className=" menu_dash_i" />
                                    <span className="link_name">VENUES</span>
                                </a>
                            </li>
                            <li>
                                <a href="/reports">
                                    <RiMoneyDollarCircleLine className=" menu_dash_i" />
                                    <span className="link_name">REPORTS</span>
                                </a>
                            </li>
                            <li>
                                <a href="/settingdash">
                                    <FaGear className="yellow_m menu_dash_i" />
                                    <span className="yellow_m link_name">SETTINGS</span>
                                </a>
                            </li>
                            {/* <li>
                                <div className="iocn-link">
                                    <Link href="/SmsCampaigns">
                                        <FaRegMessage className=" menu_dash_i" />
                                        <span className="link_name">SMS CAMPAIGNS</span>
                                    </Link>
                                </div>
                            </li> */}
                            <li>
                                <SubMenus/>
                            </li>
                        </ul>
                    </div>
                    <section className="home-section">
                        <div className="home-content">
                            <div className="main_setting">
                                <h1>Settings</h1>
                                <div className="main_set">
                                    <div className="setting_contact">
                                        <div className="setting_contact_warp">

                                            <p>Display Contact Information</p>
                                            <div className="setting_contact_inp">
                                                <label className="switch">
                                                    <input type="checkbox" className="age-checkbox"
                                                     onChange={handleisEmailChange}
                                                    checked={isDisplayEmail} />
                                                    <span className="slider round"></span>
                                                </label>
                                                <label htmlFor="">Email:</label>
                                                <input type="email" readOnly  value={email} onChange={handleEmailChange} className='setting_contact_input' />

                                            </div> 
                                            <div className="setting_contact_inp">
                                                <label className="switch">
                                                    <input type="checkbox"
                                                    onChange={handleisPhoneChange}
                                                    checked={isDisplayPhone}  className="age-checkbox"  />
                                                    <span className="slider round"></span>
                                                </label>
                                                <label htmlFor="">Phone:</label>
                                                <input type="text" readOnly value={phone} onChange={handlePhoneChange} className='setting_contact_input' />

                                            </div>
                                        </div>
                                        <div className="setting_logos">
                                            <p>Logo:</p>
                                            {/* <div className="setting_logo ">
                                                <img src={logo} alt='Logo Icon' className='img_inside_div'></img>
                                            </div> */}
                                            <div className="setting_logo cursor_pointer" onDragOver={handleDragOver} onDrop={handleDrop}>
                                                <input type="file" id="fileInput" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                                                <label htmlFor="fileInput" className='cursor_pointer img_inside_div'>
                                                
                                                {/* <img src={Upload_img} alt="Upload Icon"  />  */}
                                                {uploadedImage ? (
                                                    <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded icon" className='img_inside_div' />
                                                    ) : (
                                                        <div>
                                                        <img src={Upload_img} alt="Upload Icon" />
                                                        <p>Drag and drop image here or click to upload</p>
                                                    </div>
                                                    )
                                                    }
                                                </label>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="setting_pay">
                                        <p className='yellow_cr'>Payout Method</p>
                                        <p>Choose an option below to connect your account to a payout method. This is how you will receive payouts for customers’ ticket purchases.</p>
                                        <div className="pay_logos cursor_pointer">

                                            <img src={Strip} alt='' onClick={handleStripeClick} />
                                            <img src={Square} alt='' />
                                        </div>

                                    </div>
                                    <div className="method">
                                        <p className='yellow_cr'>Payout Method</p>
                                        <p>Billing Information</p>
                                        <p>You will only be charged in the event you elect to absorb service fees or use our SMS campaigns service.</p>
                                        <form onSubmit={handleSubmit} className='setting_method'>
                                            <div className="setting_method_row">
                                            <div className="method_inputs">

                                                <div className="method_input">
                                                    <label htmlFor="">First Name</label>
                                                    <input type="text"
                                                    value={firstName} onChange={handleFirstNameChange} />
                                                </div>
                                                <div className="method_input">
                                                    <label htmlFor="">Last Name</label>
                                                    <input type="text" value={lastName} onChange={handleLastNameChange} />
                                                </div>
                                            </div>
                                            <div className="method_inputs">

                                                <div className="method_input">
                                                    <label htmlFor="">Billing Address</label>
                                                    <input type="text" value={billingAddress} onChange={handleBillingAddressChange}/>
                                                </div>
                                                <div className="method_input">
                                                    <label htmlFor="">City</label>
                                                    <input type="text"  value={city} onChange={handleCityChange}/>
                                                </div>
                                                <div className="method_input">
                                                    <label htmlFor="">State</label>
                                                    <input type="text"  value={state} onChange={handleStateChange}/>
                                                </div>
                                                <div className="method_input">
                                                    <label htmlFor="">Postal Code</label>
                                                    <input type="number" value={postalCode} onChange={handlePostalCodeChange} />
                                                </div>
                                            </div>
                                            <div className="method_inputs">

                                                <div className="method_input">
                                                    <label htmlFor="">Credit/Debit Card</label>
                                                    <input type="number" value={creditCard} onChange={handleCreditCardChange}/>
                                                </div>
                                            </div>
                                            <div className="method_inputs">

                                                <div className="method_input">
                                                    <label htmlFor="">Security Code</label>
                                                    <input type="number" value={securityCode} onChange={handleSecurityCodeChange} />
                                                </div>
                                                <div className="method_input">
                                                    <label htmlFor="">Exp Date</label>
                                                    <input type="date" value={expDate} onChange={handleExpDateChange}/>
                                                </div>
                                            </div>
                                            </div>
                                            <div className='save_btn_method'>

                                            <button type='submit' >Save</button>
                                            </div>
                                        </form>


                                    </div>

                                </div>
                            </div>


                        </div>
                    </section>
                </div>
            </div>
        </div>
        </RootLayout>
        </>
    )
}

export default Settingdash
