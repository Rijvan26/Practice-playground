import React from 'react'

const Thirdpage = () => {
  return (
    <div className='py-10 relative '>
         <div className='flex flex-col gap-5 lg:gap-0 lg:flex-row text-center lg:text-left  px-3 py-5 justify-between items-center'>
            <h1 className=' lg:text-5xl text-4xl'>Recent Project</h1>
            <h4 className='lg:w-[35%] lg:text-xl  text-2xl'> Step into the world of our most recent projects, 
                a showcase of our unwavering commitment to progressive design</h4>
        </div>
        <div className='grid py-10 lg:grid-cols-2 lg:gap-25 gap-10 flex-wrap'>
               <div className='lg:h-screen h-130 relative flex flex-col gap-3 lg:gap-10'>
             <div className=' h-[70%] relative rounded-4xl bg-center bg-cover bg-[url("https://landinpage-lime.vercel.app/img5.webp")]'>
                    <i className='ri-arrow-right-up-long-line absolute  right-5 top-5 bg-black text-6xl text-white rounded-full px-2 py-2 '></i>
                 <button className='px-5 py-2 left-5 border-none absolute bottom-6 text-2xl  rounded-3xl  bg-gray-400 text-white'>
                    2D Animation</button>

            </div>
            <div className='px-4'>
                <h2 className='lg:text-5xl text-3xl text-violet-700'>The Lighthouse</h2>
                <h4 className='lg:text-xl text-[17px] lg:mt-5 mt-2 lg:w-[85%] '>Adding a new dimension to projects through 
                    thoughtfully designed 2D animations</h4>
            </div>           
            </div>

            <div className=' lg:mt-35  lg:h-screen h-130 relative flex flex-col gap-3 lg:gap-10'>
             <div className=' h-[70%] relative rounded-4xl bg-center bg-cover bg-[url("https://landinpage-lime.vercel.app/img6.webp")]'>
                    <i className='ri-arrow-right-up-long-line absolute  right-5 top-5 bg-black text-6xl text-white rounded-full px-2 py-2 '></i>
                 <button className='px-5 py-2 left-5 border-none absolute bottom-6 text-2xl  rounded-3xl  bg-gray-400 text-white'>
                    Visual Identity</button>

            </div>
            <div className='px-4'>
                <h2 className='lg:text-5xl text-3xl text-violet-700'>Snowscape Haven</h2>
                <h4 className='lg:text-xl text-[17px] lg:mt-5 mt-2  lg:w-[80%] '>Crafting a visual identity that mirrors the
                     serenity and allure of a winter sanctuary</h4>
            </div>
            </div>

            <div className='  lg:h-screen h-130 lg:absolute bottom-40 lg:relative flex flex-col gap-3 lg:gap-10'>
             <div className=' h-[70%] relative rounded-4xl bg-center bg-cover bg-[url("https://landinpage-lime.vercel.app/img5.webp")]'>
                    <i className='ri-arrow-right-up-long-line absolute  right-5 top-5 bg-black text-6xl text-white rounded-full px-2 py-2 '></i>
                 <button className='px-5 py-2 left-5 border-none absolute bottom-6 text-2xl  rounded-3xl  bg-gray-400 text-white'>
                    Motion Graphics</button>

            </div>
            <div className='px-4'>
                <h2 className='lg:text-5xl text-3xl text-violet-700'>Navigating Possibilities</h2>
                <h4 className='lg:text-xl text-[17px] lg:mt-5 mt-2 w-[80%] '>Motion graphics breathe life into the project
                    , blending direction and creativity</h4>
            </div>
            </div>

            <div className='lg:h-screen h-130 relative flex flex-col gap-3 lg:gap-10'>
             <div className=' h-[70%] relative rounded-4xl bg-center bg-cover bg-[url("https://landinpage-lime.vercel.app/img7.webp")]'>
                    <i className='ri-arrow-right-up-long-line absolute  right-5 top-5 bg-black text-6xl text-white rounded-full px-2 py-2 '></i>
                 <button className='px-5 py-2 left-5 border-none absolute bottom-6 text-2xl  rounded-3xl  bg-gray-400 text-white'>
                    3D Animation</button>

            </div>
            <div className='px-4'>
                <h2 className='lg:text-5xl text-3xl text-violet-700'>Nocturnal Symphony</h2>
                <h4 className='lg:text-xl text-[17px] lg:mt-5 mt-2 w-[85%] '>Through 3D artistry, we orchestrate an animated
                     ode to the evening, a dance of shadows and dreams</h4>
            </div>           
            </div>

        </div>
    </div>
  )
}

export default Thirdpage