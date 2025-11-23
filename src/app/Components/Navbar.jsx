import React from 'react';

const Navbar = () => {
    return (
        <div className='flex flex-col items-center lg:justify-between lg:flex-row px-[30px] gap-[10px] lg:gap-0 py-[20px] box-border inter shadow-lg'>
            <div>
                <p className='text-center text-3xl font-bold text-[#D84437] ' to='/'>
                    EventGuide
                </p>
            </div>
            <div className='flex flex-col lg:flex-row gap-[30px]'>
                <p to='/home' className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500'>Home</p>
                {/* {
                    user ? (
                        <> */}
                            <p to='/add_listings' className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500'>Events</p>
                            <p to='/my_listings' className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500'>Add Event</p>
                            <p to='/my_orders' className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500'>Manage Event</p>
                        {/* </>
                    ) : (
                        <>

                        </>
                    )
                } */}
            </div>
            <div className='flex flex-col items-center lg:flex-row gap-[30px]'>
                <p to='/login' className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500'>Login</p>
                <p to='/register' className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500'>Register</p>
                {/* {
                    user ? (
                        <>
                            <p><img src={user.photoURL} className="w-[40px] h-[40px] rounded-[50%]" /></p>
                            <p onClick={handleOpenModal} className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500'>Logout</p>
                        </>
                    ) : (
                        <>

                        </>
                    )
                } */}

            </div>
        </div>

    );
};

export default Navbar;