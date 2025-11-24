"use client";

import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    useEffect(() => {
        if (session){
            toast.success("Logged in with Google");
            router.push("/");
        }
    },[session,router]);

    const handleLogin=async(e)=>{
        e.preventDefault();
        const res=await signIn("credentials",{
            redirect:false,
            email,
            password,
        });
        if(res?.error)
            toast.error(res.error);
    }

    const handleGoogleLogin = async () => {
        try {
            await signIn("google", { callbackUrl: "/",
                prompt: "select_account"
             });
            
        }
        catch (error) {
            toast.error("Google login failed");
        }
    };
    
    // console.log(session);
    return (
        <>
            <Head>
                <title>{`EventGuide | Login`}</title>
            </Head>
            <div className='w-full bg-[#6897ff]'>
                <div className="hero bg-[#6897ff] min-h-screen w-full max-w-[500px] mx-auto">
                    <div className="w-full hero-content flex-col">
                        <p className='text-center text-[32px] font-bold mb-[10px]'>LOGIN</p>
                        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                            <form onSubmit={handleLogin} className="w-full card-body">
                                <fieldset className="fieldset ">
                                    <label className="email">Email</label>
                                    <input name="email" type="email" className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <label className="password">Password</label>
                                    <input name="password" type="password" className="input" placeholder="Password" required value={password}
  onChange={(e) => setPassword(e.target.value)} />
                                    <div className='w-full max-w-[320px]'>
                                        Don't have an account? <Link href="/register" className="link link-hover text-[#0047ab]">Register</Link> here
                                    </div>
                                    <button type="submit" className="btn btn-neutral mt-4 border-none bg-linear-to-r from-[#0047ab] to-[#1ca9c9] hover:from-[#D84437] hover:to-[#ff6b6b] ease-in transition duration-500">Login</button>
                                </fieldset>
                            </form>
                            <button onClick={handleGoogleLogin} className="w-full max-w-[336px] mx-auto btn btn-neutral border-none bg-linear-to-r from-[#0047ab] to-[#1ca9c9] hover:from-[#D84437] hover:to-[#ff6b6b] ease-in transition duration-500 mb-[30px]"><FaGoogle /> Continue with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;