import React, { Component } from 'react';

class PlanDrop extends Component {
    componentDidMount() {
        const selectElement = document.querySelector('.plan_drop');
        if (selectElement) {
            selectElement.addEventListener('change', this.handleSelectChange);
        }
    }

    componentWillUnmount() {
        const selectElement = document.querySelector('.plan_drop');
        if (selectElement) {
            selectElement.removeEventListener('change', this.handleSelectChange);
        }
    }

    handleSelectChange = (event) => {
        const selectElement = event.target;
        changePrice(selectElement);
    }

    render() {
        return (
            <div className="pri_plan unique">
                <div className="p_hight">Message Plans</div>
                <div className="plan_d_div">
                    <select name="" id="" className="plan_drop">
                        <option value="c" selected>500 Credits</option>
                        <option value="f">1000 Credits</option>
                        <option value="a">1500 Credits</option>
                        <option value="g">2000 Credits</option>
                        <option value="b">2500 Credits</option>
                        <option value="h">5000 Credits</option>
                        <option value="i">10000 Credits</option>
                        <option value="j">Custom</option>
                    </select>
                </div>
                <p><span className="price1">$18.49</span>month</p>
                <p>Billed annually</p>
                <p>OR</p>
                <p><span className="price2">$24.95</span>  billed monthly</p>
            </div>
        );
    }
}

function changePrice(select) {
    const selectedOption = select.value;
    const priceElement1 = document.querySelector('.price1');
    const priceElement2 = document.querySelector('.price2');
    const pTags = document.querySelectorAll('.pri_plan p');
    const spanTags = document.querySelectorAll('.pri_plan span');
    const customOption = document.querySelector('option[value="j"]');

    const priPlanDiv = document.querySelector('.pri_plan');

    if (selectedOption === 'j') {
        pTags.forEach(pTag => {
            pTag.style.display = 'none';
        });
        spanTags.forEach(spanTag => {
            spanTag.style.display = 'none';
        });
        priPlanDiv.classList.add('flex-container');
        if (!document.querySelector('.contact-us-link')) {
            const contactUsLink = document.createElement('a');
            contactUsLink.textContent = 'Contact Us';
            contactUsLink.setAttribute('href', 'Login');
            contactUsLink.setAttribute('class', 'contact-us-link yellow_m');
            priPlanDiv.appendChild(contactUsLink);
        }
        customOption.removeAttribute('disabled');
    } else {
        pTags.forEach(pTag => {
            pTag.style.display = 'block';
        });
        spanTags.forEach(spanTag => {
            spanTag.style.display = 'inline';
        });
        priPlanDiv.classList.remove('flex-container');
        const contactUsLink = document.querySelector('.contact-us-link');
        if (contactUsLink && priPlanDiv.contains(contactUsLink)) {
            priPlanDiv.removeChild(contactUsLink);
        }
    }

    // Set default values for other options
    const priceMapping = {
        'c': { price1: "$18.49/", price2: "$24.95" },
        'f': { price1: "$29.95/", price2: "$39.95" },
        'g': { price1: "$54.95/", price2: "$69.95" },
        'h': { price1: "$99.95/", price2: "$129.95" },
        'i': { price1: "$199.95/", price2: "$199.95" },
        'a': { price1: "$44.95/", price2: "$54.95" },
        'b': { price1: "$59.95/", price2: "$79.95" }
    };

    if (priceMapping[selectedOption]) {
        priceElement1.textContent = priceMapping[selectedOption].price1;
        priceElement2.textContent = priceMapping[selectedOption].price2;
    }
}

export default PlanDrop;