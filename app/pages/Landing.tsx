import React, { useEffect } from 'react'
import { gsap } from 'gsap'

const Landing = () => {
  const letters = "HUMAID".split("");

  useEffect(() => {
    letters.forEach((letter, index) => {
      const additionalDelay = (letter === 'A' || letter === 'I' || letter === 'D') ? 0.05 : 0;
      gsap.fromTo(  
        `#letter-${index}`,
        { y: 450 }, 
        { 
          y: 0, 
          delay: index * 0.05 + additionalDelay,
          duration: 0.8,
          ease: "power3.out"
        }
      );
    });
  }, []);

  return (
    <div className='h-full w-full dark:bg-black bg-white dark:text-white flex justify-center items-center text-[30vw] font-medium relative'>
      {letters.map((letter, index) => (
        <span 
          id={`letter-${index}`}
          key={index} 
          style={{ margin: '0 -0.06em' }}
        >
          {letter}
        </span>
      ))}
      <div className='h-[30vh] w-screen dark:bg-black bg-white absolute bottom-0'></div>
    </div>
  )
}

export default Landing

