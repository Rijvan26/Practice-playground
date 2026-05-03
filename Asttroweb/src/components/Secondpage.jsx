import React from 'react'

const Secondpage = () => {
  return (
    <div className=' mt-25 bg-amber-50 flex flex-col gap-5 lg:gap-10 lg:px-15 px-5  lg:py-20 py-5 border-2 border-gray-400 rounded-4xl '>
        <div className='flex flex-col lg:flex-row lg:justify-between gap-4 text-center lg:text-left items-center'>
            <h1 className='text-5xl'>Our Service</h1>
            <h4 className='lg:w-[40%] text-xl'> Discover a wide range of opportunities through a comprehensive range of qualified services
</h4>
        </div>

        <div className='grid lg:grid-cols-3 gap-7  '>
            <div className='border-2 px-5 py-5 border-violet-700 rounded-2xl'>
                <div className=' border-b-3 py-3 border-violet-700 flex justify-between items-center px-1 py-1 '>
                    <h3 className='text-4xl w-[40%]'>Motion Graphics</h3>
                    <i className='ri-arrow-right-up-long-fill text-6xl text-white bg-violet-700 rounded-full px-1 py-1'></i>
                </div>
                    <p className='py-6 text-xl'>Bring your ideas to life through dynamic visuals and engaging animations.</p>

                <div className='py-2'>
                    <img className=' object-cover rounded-3xl' src="https://landinpage-lime.vercel.app/img3.png" alt="" />
                </div>
            </div>


             <div className=' rounded-bl-[40%]  lg:rounded-bl-[50%]  border-2 px-5 py-5  bg-violet-700 text-white  border-violet-700 rounded-2xl'>
                <div className=' border-b-3 py-3 border-white flex justify-between items-center px-1 py-1 '>
                    <h3 className='text-4xl w-[40%]'>Motion Graphics</h3>
                </div>
                    <p className='py-6 text-xl'>Bring your ideas to life through dynamic visuals and engaging animations.</p>

                <div className='py-2 relative z-20'>
                    <img className=' lg:absolute pl-3 pb-0 z-10 rounded-bl-[50%] lg:rounded-bl-[70%] rounded-2xl ' src="https://landinpage-lime.vercel.app/img3.png" alt="" />
                    <i className='ri-arrow-right-up-long-line  absolute text-6xl bg-white text-violet-700 border-3 -left-5 top-19 z-20 px-2 py-2 lg:px-4 lg:top-22 lg:py-4 lg:border-4 rounded-full'></i>
                </div>
            </div>

           <div className='border-2 px-5 py-5 border-violet-700 rounded-2xl'>
                <div className=' border-b-3 py-3 border-violet-700 flex justify-between items-center px-1 py-1 '>
                    <h3 className='text-4xl w-[40%]'>Motion Graphics</h3>
                    <i className='ri-arrow-right-up-long-fill text-6xl text-white bg-violet-700 rounded-full px-1 py-1'></i>
                </div>
                    <p className='py-6 text-xl'>Bring your ideas to life through dynamic visuals and engaging animations.</p>

                <div className='py-2'>
                    <img className=' object-cover rounded-3xl' src="https://landinpage-lime.vercel.app/img3.png" alt="" />
                </div>
            </div>
        </div>

        <div className='flex justify-between items-center lg:px-5 '>
            <div className='lg:text-3xl flex gap-2 '>
                <i class="ri-arrow-left-long-line text-gray-600"></i>
                <i class="ri-arrow-right-long-line"></i>
            </div>
            <div className='flex gap-2 text-[10px] lg:text-3xl'>
                <p className=''>_____</p>
                <p className='text-gray-600'>____</p>
                <p className='text-gray-600'>____</p>
                <p className='text-gray-600'>____</p>

            </div>
        </div>

        <div className='flex flex-col justify-center items-center'>
            <h2 className='uppercase text-center text-2xl text-gray-600'><span>__</span>About astratto</h2>

            <h1 className='lg:text-6xl text-3xl lg:leading-20  leading-[60px] text-center px-40 py-10'>Our <span className='text-gray-500'> visionary</span> <span className='text-amber-600'>artisans </span> collaborate
             <span className='text-violet-700'>seamlessly </span>to craft <span><i class="ri-shining-2-fill text-white px-2 py-2 rounded-full bg-violet-800"></i></span> inspiring <span className='text-gray-500'> experiences</span>, <span className='text-amber-600'> leaving </span> lasting  <span className='text-gray-500'> imprints</span> on <span className='text-violet-700'>brands</span> and spaces. 
             <i class="ri-shining-2-fill rotate-7 text-6xl text-yellow-500 "></i>
</h1>
        </div>
    </div>
  )
}

export default Secondpage