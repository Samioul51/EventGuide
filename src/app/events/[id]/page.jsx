import Head from 'next/head';
import Link from 'next/link';

const EventPage = async ({ params }) => {
    const { id } = await params;
    
    const res = await fetch(`https://event-guide-server.vercel.app/events/${id}`, {
        cache: "no-store",
    });

    const event = await res.json();

    const {_id,image,title,price,fullDescription,location,date,priority,category}=event.data;

    return (
        <>
            <Head> <title>{`EventGuide | ${title}`}</title></Head>
            <div className='bg-[#6897ff] py-[50px]'>

                <div className='w-full max-w-[1440px] mx-auto flex flex-col items-center lg:items-stretch lg:flex-row lg:justify-between gap-[50px]'>

                    <img src={image} className='w-full max-w-[500px] h-auto rounded-[10px]' />

                    <div className='w-full max-w-[60%] flex flex-col justify-center p-[30px] bg-white rounded-[10px] shadow-lg'>

                        <p className='text-2xl font-extrabold mb-[10px] text-gray-900'>{title}</p>

                        <p className='w-[180px] bg-amber-300 px-[10px] box-border rounded-[10px] text-gray-800 text-center mb-[50px]'>{category}</p>

                        <p className='font-bold border-b-2 border-gray-300 pb-2 mb-[16px]'>DESCRIPTION:</p>
                        <p className='font-medium text-justify mb-[50px]'>{fullDescription}</p>


                        <p className='font-bold border-b-2 border-gray-300 pb-2 mb-[16px]'>CONTACT DETAILS:</p>
                        <div className='bg-gray-100 p-[8px] rounded-lg mb-[50px]'>
                            <p className='font-medium'>DATE: {date}</p>
                            <p className='font-medium'>LOCATION: {location}</p>

                        </div>
                        <div>
                            <p className='font-bold text-xl text-green-700 mb-[8px]'>PRICE: {price}</p>
                        </div>
                        <Link href="/events" className="btn btn-neutral mt-4 border-none bg-linear-to-r from-[#0047ab] to-[#1ca9c9] hover:from-[#D84437] hover:to-[#ff6b6b] ease-in transition duration-500">EXPLORE OTHER EVENTS</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EventPage;
