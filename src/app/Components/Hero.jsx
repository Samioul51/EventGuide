"use client";
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from "next/image";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import a from '../assets/a.jpg';
import b from '../assets/b.jpg';
import c from '../assets/c.jpg';

const Hero = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide><Image src={a} className='w-full max-w-full h-full max-h-[650px]'/></SwiperSlide>
                <SwiperSlide><Image src={b} className='w-full max-w-full h-full max-h-[650px]'/></SwiperSlide>
                <SwiperSlide><Image src={c} className='w-full max-w-full h-full max-h-[650px]'/></SwiperSlide>
            </Swiper>
        </>
    );
};

export default Hero;