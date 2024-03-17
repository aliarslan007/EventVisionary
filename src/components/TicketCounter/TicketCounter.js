import React, { useState } from 'react'

const TicketCounter = ({ Addclass="" }) => { 
    const [count, setCount] = useState(0);

    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const increment = () => {
        setCount(count + 1);
    };
    return (
        <div className={` ${Addclass}`}>
            <div >
                Ticket Type Name
            </div>
            <div className="sell_ticket_btns">
                <p>$25.00</p>
                <div className="counter-container">
                    <button onClick={decrement} className={`counter-btn ${count === 0 ? 'disabled' : 'minuss'}`}>
                        -
                    </button>
                    <span className="counter-value">{count}</span>
                    <button onClick={increment} className="counter-btn pluss">
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TicketCounter
