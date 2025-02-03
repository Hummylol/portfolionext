import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=50%", 
        scrub: 1,
        pin: true,
      }
    });

    tl.to(topRef.current, {
      yPercent: -101,
      ease: "none"
    })
    .to(bottomRef.current, {
      yPercent: 101, 
      ease: "none"
    }, "<"); 

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className='h-screen w-full dark:bg-black bg-white dark:text-white relative overflow-hidden'>
      <div 
        ref={topRef}
        className='h-1/2 w-screen dark:bg-black bg-white absolute z-10 flex justify-center items-end'
      >
        <div className='h-[15vw] md:h-[25vw] text-black overflow-hidden'>
          <div className='text-[15vw] md:text-[25vw] dark:text-white leading-none -translate-y-[-50%]'>ABOUT</div>
        </div>
      </div>
      <div className='h-full w-full absolute dark:bg-white bg-black text-white dark:text-black flex justify-center items-center'>
      </div>
      <div 
        ref={bottomRef}
        className='h-1/2 w-screen dark:bg-black bg-white absolute bottom-0 z-10 flex justify-center items-start'
      >
        <div className='h-[15vw] md:h-[25vw] text-black overflow-hidden'>
          <div className='text-[15vw] md:text-[25vw] dark:text-white leading-none translate-y-[-50%]'>ABOUT</div>
        </div>
      </div>
    </div>
  )
}

export default About