"use client";
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';

const ManageEvent = () => {
    const [events,setEvents]=useState([]);
    const [loading, setLoading] = useState(true);
    const [editingEvent, setEditingEvent] = useState(null);
    const orderModalRef = useRef(null);
    const {data:session}=useSession();
    const router = useRouter();
    useEffect(() => {
            if (!session)
                router.push("/");
        },[session,router]);

    useEffect(() => {
        fetch("https://event-guide-server.vercel.app/events")
            .then(res => res.json())
            .then(data => {
                setEvents(data.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            })
    }, []);

    useEffect(()=>{
        if(editingEvent && orderModalRef.current)
           orderModalRef.current.showModal();
    },[editingEvent]);

    const myData = session?.user?.email ? events.filter(list => list.email === session.user.email): [];
    // console.log(myData);

    const handleDelete = (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                fetch(`https://event-guide-server.vercel.app/events/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your event has been deleted.",
                                icon: "success"
                            });

                            const remaining = events.filter(list => list._id !== _id);
                            setEvents(remaining);
                        }
                    })
            }
        });
    }

    const handleModalOpen = (list) => {
        setEditingEvent(list);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        if(!editingEvent?._id)
            return;

        const updatedData = {
            title: form.title.value,
            location: form.location.value,
            price: form.price.value,
            shortDescription: form.shortDescription.value,
            image: form.image.value,
            date: form.date.value
        }

        fetch(`https://event-guide-server.vercel.app/events/${editingEvent._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    Swal.fire({
                        title: "Updated!",
                        text: data.message,
                        icon: "success"
                    });

                    const updatedEvents = events.map(list => list._id === editingEvent._id ? { ...list, ...updatedData } : list);
                    setEvents(updatedEvents);
                    orderModalRef.current.close();
                }
            })
    }
    return (
        <>
            <Head><title>{`EventGuide | My Events`}</title></Head>
            <div className='bg-[#6897ff] py-[50px]'>
                
                <p className='text-center text-[32px] font-bold mb-[10px] text-black'>MY LISTINGS</p>
                <div className='w-full max-w-[1440px] h-auto mx-auto bg-white p-[50px] rounded-[10px]'>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Location</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    myData.map((list, index) => (
                                        <tr key={list._id}>
                                            <td className='text-black'>{index + 1}</td>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src={list.image}
                                                                alt="" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-black'>
                                                {list.title}
                                            </td>
                                            <td className='text-black'>
                                                {list.category}
                                            </td>
                                            <td className='text-black'>{list.price}</td>
                                            <td className='text-black'>{list.location}</td>
                                            <td className='text-black'>{list.shortDescription}</td>
                                            <td className='text-black'>{list.date}</td>
                                            <td className='flex flex-col'>
                                                <button onClick={() => handleModalOpen(list)} type="submit" className="btn btn-neutral mt-4 border-none bg-linear-to-r from-[#0047ab] to-[#1ca9c9] hover:from-[#D84437] hover:to-[#ff6b6b] ease-in transition duration-500">
                                                    Edit
                                                </button>
                                                <button onClick={() => handleDelete(list._id)} type="submit" className="btn btn-neutral mt-4 border-none bg-linear-to-r from-[#0047ab] to-[#1ca9c9] hover:from-[#D84437] hover:to-[#ff6b6b] ease-in transition duration-500">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <dialog ref={orderModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4 text-black">UPDATE INFORMATION</h3>
                        <form onSubmit={handleSubmit}>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text text-black">Name</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={editingEvent?.title}
                                    name="title"
                                    className="input input-bordered w-full text-black"
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text text-black">Category</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={editingEvent?.category}
                                    readOnly
                                    name="category"
                                    className="input input-bordered w-full text-black"
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text text-black">Price</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={editingEvent?.price}
                                    name="price"
                                    className="input input-bordered w-full text-black"
                                    min={0}
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text text-black">Location</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={editingEvent?.location}
                                    name="location"
                                    className="input input-bordered w-full text-black"
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text text-black">Description</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={editingEvent?.shortDescription}
                                    name="shortDescription"
                                    className="input input-bordered w-full text-black"
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text text-black">Image URL</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={editingEvent?.image}
                                    name="image"
                                    className="input input-bordered w-full text-black"
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text text-black">Organizer Name</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={session?.user?.name}
                                    readOnly
                                    name="organizer"
                                    className="input input-bordered w-full text-black"
                                />
                            </div>

                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text text-black">Organizer Email</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={session?.user?.email}
                                    readOnly
                                    name="email"
                                    className="input input-bordered w-full text-black"
                                />
                            </div>
                            <div className="form-control mb-2">
                                <label className="label">
                                    <span className="label-text text-black">Date</span>
                                </label>
                                <input
                                    type="text"
                                    defaultValue={editingEvent?.date}
                                    readOnly
                                    name="date"
                                    className="input input-bordered w-full text-black"
                                />
                            </div>


                            <div className="modal-action justify-between">
                                <button
                                    type="button" className="btn btn-neutral mt-4 border-none bg-linear-to-r from-[#0047ab] to-[#1ca9c9] hover:from-[#D84437] hover:to-[#ff6b6b] ease-in transition duration-500"
                                    onClick={() => orderModalRef.current.close()}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-neutral mt-4 border-none bg-linear-to-r from-[#0047ab] to-[#1ca9c9] hover:from-[#D84437] hover:to-[#ff6b6b] ease-in transition duration-500">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </>
    );
};

export default ManageEvent;