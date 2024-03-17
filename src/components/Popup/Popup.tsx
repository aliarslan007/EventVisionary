'use client'
import { RiCloseFill } from 'react-icons/ri';
import './index.css'
import { useState } from 'react';

interface PopupProps {
    isOpen: boolean;
    onClose: () => void;
    content: string;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose,content="" }) => {
    return (
        <div className={`popup ${isOpen ? 'open' : ''}`}>
            <div className="popup-content">
                <p>{content}</p>
                <a className="jclose" href="#pop" onClick={onClose}>
                    <RiCloseFill color="#FAE100" className="Xmarks" />
                </a>
            </div>
        </div>
    );
};
const PopupBox: React.FC = () => {
    const [isPopupOpen, setPopupOpen] = useState(true);

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    return (
        <div>
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}content='Ticket sales have ended' />
            <Popup isOpen={isPopupOpen} onClose={handleClosePopup}content='Ticket sales have not begun for this event. Ticket sales will start on { }. Please contact the organizer for more information' />
        </div>
    );
};

export default PopupBox;