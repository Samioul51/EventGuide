"use client";


import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { data: session } = useSession();
    const [modalOpen, setModalOpen] = useState(false);

    const handleLogout =async () => {
        setModalOpen(false);
        toast.success("Logout successfully!");
        await signOut({ redirect:false });
        router.push("/");
    }

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <div className='bg-white flex flex-col items-center lg:justify-between lg:flex-row px-[30px] gap-[10px] lg:gap-0 py-[20px] box-border inter shadow-lg sticky top-0 z-50'>
            <div>
                <Link className='text-center text-3xl font-bold text-[#D84437] ' href='/'>
                    EventGuide
                </Link>
            </div>
            <div className='flex flex-col lg:flex-row gap-[30px]'>
                <Link href='/' className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500'>Home</Link>
                <Link href='/events' className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500'>All Events</Link>
                {
                    session && (
                        <>
                            <Link href='/add_event' className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500'>Add Event</Link>
                            <Link href='/manage_event' className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500'>Manage Event</Link>
                        </>
                    )
                }


            </div>
            <div className='flex flex-col items-center lg:flex-row gap-[30px]'>

                {
                    session ? (
                        <>
                            <div><img src={session.user.photoURL} className="w-[40px] h-[40px] rounded-[50%]" /></div>
                            <button onClick={handleOpenModal} className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500 cursor-pointer'>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link href='/login' className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500'>Login</Link>
                            <Link href='/register' className='text-center font-bold bg-linear-to-r from-[#0047ab] to-[#1ca9c9] bg-clip-text text-transparent hover:text-[#D84437] ease duration-500'>Register</Link>
                        </>
                    )
                }

            </div>
            {/* Modal for logout */}

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle" open={modalOpen}>
                <div className="modal-box">
                    <p className="py-4">Are you sure you want to logout?</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button onClick={handleLogout} className="btn">Yes</button>
                            <button onClick={handleCloseModal} className="btn">No</button>

                        </form>
                    </div>
                </div>
            </dialog>
        </div>


    );
};

export default Navbar;