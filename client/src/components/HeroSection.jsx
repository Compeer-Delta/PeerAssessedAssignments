import React from 'react'

function HeroSection() {
    return (
        <div id='hero' className= 'flex items-center justify-center flex-co py-1 bg-slate-800 dark:bg-zinc-800 text-gray-300'>

         {/* id=hero is used for the footer, when clicked it will zoom back up to the HeroSection*/}
            <div className='text-center'>
            <h1 className= 'text-2xl  md:text-4xl mb-1 md:mb-4 font-semibold  text-gray-300 rounded-md'> PeerApp</h1>
            {/*<p className=' text-gray-600 dark:text-gray-300 bg-indigo-100 dark:bg-indigo-800 py-1 rounded-md'> Modules → Artificial Intelligence Module → Submit Work </p> */}
            
            </div>
        </div>
    )
}

export default HeroSection