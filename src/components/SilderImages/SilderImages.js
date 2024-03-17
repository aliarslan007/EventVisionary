import { Des_1, Des_2, Des_3, General_img, Mulitple, Pexel_imgg, Render } from '../../public'
import { motion } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useInView } from 'react-intersection-observer';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import './styles.css';

const SilderImages = () => {

    
  
    return (
        <div className='imags_box'>
            <img src={Pexel_imgg} alt="" className='main_imag' />
            <div className='images_collage'>
                <img src={Render} alt="" className='collage_img'/>
                <img src={Mulitple} alt="" className='collage_img'/>
                <img src={General_img} alt="" className='collage_img'/>
            </div>
        </div>
    );
}

export default SilderImages
