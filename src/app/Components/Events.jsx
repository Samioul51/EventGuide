import Head from 'next/head';
import React, { use } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import Even from '../Components/Even';

const eventsPromise = fetch("https://event-guide-server.vercel.app/events").then(res => res.json());
const Events = () => {
    const eventsData = use(eventsPromise);
    // console.log(category.data);
    const events = eventsData.data;
    return (
        <>
            <Head><title>{`EventGuide | All Events`}</title></Head>
            <div className='bg-[#6897ff] py-[50px]'>

                <p className='text-center text-[32px] font-bold mb-[30px] text-black'>ALL EVENTS</p>

                <div className='w-full max-w-[1440px] h-auto grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 gap-[50px] px-[40px] pb-[50px] box-border'>

                    {
                        events.map(item => (
                            <Even key={item._id} item={item}></Even>
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Events;