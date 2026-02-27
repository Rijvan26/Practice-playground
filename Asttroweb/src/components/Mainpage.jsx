import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import gsap from "gsap"

const Mainpage = () => {
  const mainpageref = useRef(null)

  const SplitText = ({ text, className }) => {
  return (
    <h1 className={className}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </h1>
  )
}

useGSAP(
  () => {
    const tl = gsap.timeline({ delay: 0.3 })

    tl.from(".char", {
      x: -60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.15
    })

    tl.from(".main-tag", {
      x: 130,
      opacity: 0,
      duration: 0.8,
      stagger: 0.3
    }, "-=0.3")

    tl.from(".right-img", {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")

     tl.from(".mainpg-icon", {
      opacity: 0,
      x:400,
      rotate:720,
      duration: 0.8,
      ease: "power2.out"
    }, )

    gsap.to(".left-img", {
      y: -20,
      repeat: -1,
      yoyo: true,
      duration: 1.5,
      ease: "sine.inOut"
    })

    tl.from(".mainp-btn", {
      y: 40,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out"
    })
  },
  { scope: mainpageref }
)


  return (
    <div
    ref={mainpageref} className='flex justify-center lg:py-10 relative py-3'>
      <div className='lg:px-[15%]  flex flex-col text-center  justify-center items-cente'>
        <h4 className='lg:text-3xl text-xl text-gray-500 '>Igniting the Spark of Inspiration</h4>
       <SplitText
  text="Unlease Your"
  className="text-6xl lg:text-8xl py-2 overflow:hidden"
/>
<h1 className='pt-2'>
<i class="ri-shining-2-fill mainpg-icon border-2 border-violet-700 bg-amber-600 text-6xl px-1.5 py-1.5 border  rounded-[50%] text-white"></i>

</h1>
<SplitText
  text="Brand with our"
  className="text-6xl lg:text-8xl py-1"
/>

<SplitText
  text="Magico Design"
  className="text-6xl lg:text-8xl"
/>

        {/* <h1 className=' px-5 font-sans lg:text-[109px] lg:leading-[110px] leading-15 text-black/85 text-5xl text-center '>Unleash Your Brand <span className='  lg:text-center lg:rounded-[50%] lg:text-[90px] px-2 lg:scroll-py-2  hidden lg:block  '><i class="ri-shining-2-fill  bg-amber-600  px-1.5 py-1.5 border  rounded-[50%] text-white"></i></span> with Our <span className='text-blue-800 rotate-4 bg-amber-200 rotate-3 py-1 rounded-2xl px-2  '>Magico</span>  Design </h1> */}
      </div>
      <div className='lg:absolute hidden lg:flex gap-4 flex flex-col items-end right-2 top-8'>
        <h5 className='main-tag bg-violet-700 text-xl text-white px-4 py-2 rounded-3xl'>Via della Creativita, 23</h5>
        <h5 className='main-tag bg-violet-700 text-xl text-white px-3 w-fit text-center py-1.5 rounded-3xl'>20121 Milano</h5>
      </div>
      <div>
        <button className=' mainp-btn hidden lg:block absolute px-4 py-4 rounded-[60px]  border-2 border-red-600 left-8 -bottom-4 text-3xl rotate-[-10deg]'>Create Magic </button>
         <i class="  ri-asterisk text-6xl hidden lg:block  px-1 py-1 bg-violet-700 rounded-full -bottom-4 left-58 text-white absolute "></i>
         <i class="  ri-arrow-left-up-long-fill text-5xl rounded-full -bottom-4 left-72 text-yellow-400 absolute "></i>
      </div>
        <img className=' right-img absolute h-29 bottom-12  -right-4 lg:right-1 lg:h-80 lg:-bottom-19' src="https://landinpage-lime.vercel.app/img2.png" alt="" />
        <img className=' left-img absolute h-30 w-30 top-12 -left-1 lg:h-80 lg:w-70 opacity-80 -z-10 lg:top-10 lg:left-15 -rotate-8 rounded-bl-[50%] rounded-br-[50%] rounded-tl-2xl rounded-tr-2xl' src="https://landinpage-lime.vercel.app/img1.png" alt="" />
    </div>
  )
}

export default Mainpage