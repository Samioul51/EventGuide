"use client";

import React, { useState, useEffect } from 'react';
import { FaGoogle } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Register = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (session) 
            router.push("/");
    }, [session, router]);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!passwordRegex.test(password)) {
            setError("Password must be at least 6 characters. Include uppercase and lowercase letters.");
            return;
        }
        setError("");

        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    photoURL
                }),
            })

            const data = await res.json();
            if (res.ok) {

                const login = await signIn("credentials", {
                    redirect: false,
                    email,
                    password,
                });

                if (login?.error)
                    toast.error(login.error);
                else {
                    toast.success("Registered successfully!");
                    router.push("/");
                }
            }
            else
                toast.error("Registration Failed!");
        }
        catch (error) {
            toast.error(error.message);
        }
    };

    const handleGoogleRegister = async () => {
        try {
            await signIn("google", {
                callbackUrl: "/",
                prompt: "select_account"
            });

        }
        catch (error) {
            toast.error("Google login failed");
        }
    }

    return (
        <>
            <Head>
                <title>{`EventGuide | Register`}</title>
            </Head>
            <div className='w-full bg-[#6897ff] inter'>

                <div className="hero bg-[#6897ff] min-h-screen w-full max-w-[500px] mx-auto">
                    <div className="w-full hero-content flex-col">
                        <p className='text-center text-[32px] font-bold mb-[10px] text-black'>REGISTER</p>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <form onSubmit={handleRegister} className="w-full card-body">
                                <fieldset className="fieldset">
                                    <label className="name text-black">Name</label>
                                    <input name="name" type="text" className="input" placeholder="Name" required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} />
                                    <label className="email text-black">Email</label>
                                    <input name="email" type="email" className="input" placeholder="Email" required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />

                                    <label className="photo text-black">Photo URL</label>
                                    <input name="photo" type="url" className="input" placeholder="Photo URL" required
                                        value={photoURL}
                                        onChange={(e) => setPhotoURL(e.target.value)} />
                                    <label className="password text-black">Password</label>
                                    <input name="password" type="password" className="input" placeholder="Password" required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                    {
                                        error && <p className='text-xs text-red-500'>{error}</p>
                                    }
                                    <div className=' text-black'>Already have an account?
                                        <Link href="/login" className="link link-hover text-[#0047ab]"> Login</Link> here
                                    </div>
                                    <button type="submit" className="btn btn-neutral mt-4 border-none bg-linear-to-r from-[#0047ab] to-[#1ca9c9] hover:from-[#D84437] hover:to-[#ff6b6b] ease-in transition duration-500">Register</button>

                                </fieldset>
                            </form>
                            <button onClick={handleGoogleRegister} className="w-full max-w-[336px] mx-auto btn btn-neutral border-none bg-linear-to-r from-[#0047ab] to-[#1ca9c9] hover:from-[#D84437] hover:to-[#ff6b6b] ease-in transition duration-500 mb-[30px]"><FaGoogle /> Continue with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;