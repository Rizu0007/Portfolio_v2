import React from "react";
import {motion} from 'framer-motion'
import gsap from "gsap";
import { GoPrimitiveDot } from "react-icons/go";
import { FcApproval } from "react-icons/fc";
import { RoughNotation } from "react-rough-notation";
import { useTheme } from "next-themes";





const Myskills = () => {
  const { theme } = useTheme();

  return (

    
    <div className="w-full md:w-5/5 m-auto py-50 flex flex-col md:flex-row justify-between items-center p-5">
      <div className="w-full md:w-1/3 p-5 space-y-50 mx-10">
        <h1 className="text-5xl md:text-6xl font-bold mr-10">My Development Skills</h1>
        <p className=" text-gray-500">
        I value simple content structure, clean design patterns, and thoughtful interactions.
        I like to code things from scratch, and enjoy bringing ideas to life in the browser.
        I genuinely care about people, and love helping fellow designers work on their craft.
        </p>
      </div>


      <div className="w-8/12  bg-neutral-200  dark:bg-[#1B2731]	">
        
        <motion.div
        whileHover={{scale:[null,1.2,1.1]}}
        transition={{duration:0.3}}
        className="flex flex-col items-center bg-white  dark:bg-[#1B2731] rounded p-2 space-y-2 drop-shadow-xl">
            <div className="bg-gray-800 p-2 rounded-full">

            </div>
            <p className=	"section-heading ">Mern stack Skills
            </p>
            <ul class="space-y-4 text-left text-gray-500 dark:text-gray-400">
<li class="flex items-center space-x-3">
     <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
     </svg>
    <span className="text-bold text-gray-900 dark:text-white">Raect.js</span>
</li>
<li class="flex items-center space-x-3">
    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
     </svg>
    <span className="text-bold text-gray-900 dark:text-white">Next.js</span>
</li>
<li class="flex items-center space-x-3">
    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 ">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
     </svg>
    <span><span class="font-semibold text-gray-900 dark:text-white">Node</span></span>
</li>
<li class="flex items-center space-x-3">
    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
     </svg>
    <span> <span class="font-semibold text-gray-900 dark:text-white">mongodb</span></span>
</li>
<li class="flex items-center space-x-3">
    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
     </svg>
    <span><span class="font-semibold text-gray-900 dark:text-white">Redux</span></span>
    </li>

    <li class="flex items-center space-x-3">
    <svg class="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
     </svg>
    <span><span class="font-semibold text-gray-900 dark:text-white">Tailwind Css</span></span>

</li>
</ul>
            
            </motion.div>
       
      </div>
    </div>
  );
};

export default Myskills;