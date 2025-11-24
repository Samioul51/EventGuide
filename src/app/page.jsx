import Image from "next/image";
import Hero from "./Components/Hero";
import Even from "./Components/Even";
import { use } from "react";


const eventsPromise = fetch("http://localhost:3000/events").then(res => res.json());


export default function Home() {
  const eventsData = use(eventsPromise);
  // console.log(category.data);
  const events = eventsData.data;

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <Hero></Hero>

      <p className='text-center text-black text-[32px] font-bold mb-[10px] mt-[50px]'>UPCOMING EVENTS</p>

      <div className='w-full max-w-[1440px] h-auto grid grid-cols-1 mx-auto md:grid-cols-2 lg:grid-cols-3 gap-[50px] px-[40px] pb-[50px] box-border'>
        {
          events.slice(0, 6).map(item => (
            <Even key={item._id} item={item}></Even>
          ))
        }
      </div>
    </div>
  );
}
