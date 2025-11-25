"use client";

import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AddEvent = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [fullDescription, setFullDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState(session?.user?.email);
    useEffect(() => {
        if (!session)
            router.push("/");
    }, [session, router]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEvent = {
            title,
            shortDescription,
            fullDescription,
            price,
            priority,
            category,
            location,
            image,
            date,
            email,
        };

        try {
            const res = await fetch("https://event-guide-server.vercel.app/events", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newEvent),
            });
            if (!res.ok)
                throw new Error("Failed to add event");
            else
                toast.success("Event added successfully!");
            router.push("/");
        }
        catch (error) {
            toast.error("Error adding event");
        }
    }
    return (
        <><Head><title>{`EventGuide | Add Event`}</title></Head>
            <div className='w-full bg-[#6897ff] py-[50px]'>

                <p className='text-center text-[32px] font-bold mb-[10px] text-black'>ADD EVENT</p>
                <form className='w-full max-w-[1440px] h-auto mx-auto bg-white p-[50px] rounded-[10px]' onSubmit={handleSubmit}>
                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text text-black">Event Name</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            className="input input-bordered w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text text-black">Short description</span>
                        </label>
                        <textarea
                            type="text"
                            name="shortDescription"
                            className="input input-bordered w-full resize-none"
                            value={shortDescription}
                            onChange={(e) => setShortDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text text-black">Full description</span>
                        </label>
                        <textarea
                            type="text"
                            name="fullDescription"
                            className="input input-bordered w-full resize-none"
                            value={fullDescription}
                            onChange={(e) => setFullDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text text-black">Price</span>
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="input input-bordered w-full"
                            min={0}
                            required
                        />
                    </div>

                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text text-black">Date</span>
                        </label>
                        <input
                            type="date"
                            name="date"
                            className="input input-bordered w-full"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text text-black">Priority</span>
                        </label>
                        <select
                            name="priority"
                            className="select select-bordered w-full"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            required
                        >
                            <option value="" hidden>Select priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>

                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text text-black">Category</span>
                        </label>
                        <select
                            name="category"
                            className="select select-bordered w-full"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="" hidden>Select a category</option>
                            <option value="Conference">Conference</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Business">Business</option>
                            <option value="Volunteer">Volunteer</option>
                            <option value="Workshop">Workshop</option>
                            <option value="Festival">Festival</option>
                            <option value="Education">Education</option>

                        </select>
                    </div>

                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text text-black">Location</span>
                        </label>
                        <input
                            type="text"
                            name="location"
                            className="input input-bordered w-full"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text text-black">Image URL</span>
                        </label>
                        <input
                            type="text"
                            name="image"
                            className="input input-bordered w-full"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-control mb-2">
                        <label className="label">
                            <span className="label-text text-black">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={session?.user?.email || ""}
                            readOnly
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className='w-full flex justify-center'>
                        <button type="submit" className="btn btn-neutral mt-4 border-none bg-linear-to-r from-[#0047ab] to-[#1ca9c9] hover:from-[#D84437] hover:to-[#ff6b6b] ease-in transition duration-500">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddEvent;