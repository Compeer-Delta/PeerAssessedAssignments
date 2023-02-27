import React from 'react'
//import { MdTableChart } from 'react-icons/md'
import {Link} from 'react-router-dom';
import { useState } from 'react';

function WorkItem({id, imgUrl, title, tech, workUrl, dueDate, setDate, open}) {

    const [BreifUrl, setBreifUrl] = useState("/compeerSamplePDF.pdf");
    //DB: read the file where the passed id (or title) matches with the breifing (select from breifs where title/id = passed parameter in workitem [title/id])

    let current = new Date();
    let time = formatTime();
    let date = new Date(dueDate.split(/(\s+)/)[2] + " " + time);

    function formatTime()
    {//formats the the time so it is able to be read by Date
        var tempHour = (dueDate.split(/(\s+)/)[0]).split(":")[0];
        var tempMin = ((dueDate.split(/(\s+)/)[0]).split(":")[1]).substring(0, ((dueDate.split(/(\s+)/)[0]).split(":")[1]).length - 2);
        var tempMeridiem = ((dueDate.split(/(\s+)/)[0]).split(":")[1]).substring(((dueDate.split(/(\s+)/)[0]).split(":")[1]).length - 2, ((dueDate.split(/(\s+)/)[0]).split(":")[1]).length);
        
        if (tempMeridiem === "pm"){tempHour = (parseInt(tempHour) + 12).toString()}
        if (parseInt(tempHour) < 10){tempHour = "0"+ tempHour;}
       // console.log(tempHour + " " + tempMin + " " + tempMeridiem);
        
        return tempHour + ":" + tempMin + ":00" 
    }

    function LockAfterDue()
    {//checks whether the current time is less than due date/ time, if so then submission remains open / otherwise close submission
       let dateNow = current.getTime();
       let dateDue = date.getTime();
      //  console.log("t" + current);
     //   console.log("t" + date);

       if (dateNow < dateDue)
       {
        return true;
       }
       else{
        return false;
       }
    }
   

    return (
        
        <div href={workUrl} target="_blank" rel="noreferrer" className='bg-slate-300 dark:bg-zinc-700 rounded-lg overflow-hidden w-full'>
            <img src={imgUrl} alt={title} className="w-full h-3 md:h-5 object-cover"/>
           <div className='text-gray-600 dark:text-gray-300 p-2 w-full'>
                <h3 className ='text-lg md:text-xl mb-2 md:mb-1 font-semibold'>{title}</h3>
                <p className ='text-lg md:text-sm mb-1 md:mb-1'>Description: Lorem ipsum dolor sit amet, consectetur
                 adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                   in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                    qui officia deserunt mollit anim id est laborum</p>
                <p className=' text-right text-base'>Set: {setDate}</p>
            
            <p className='flex flex-initial gap-2 flex-row items-center justify-start text-xs md:text-sm'>
                {/* {//tech.map(item=> ( */}

                    
                    {LockAfterDue() === true ? (

                    <Link to={"/upload/" + id} key="SubmitWork" className='inline-block px-2 py-3 text-yellow-800 font-bold bg-yellow-100 dark:bg-slate-900 hover:-translate-y-1 transform transition'>
                        Submit Work 📂
                    </Link>
                    ):
                    (
                        <div key="SubmitWork" className='inline-block px-2 py-3 text-red-100 font-bold bg-red-800 dark:bg-slate-900 hover:-translate-y-1 transform transition'>
                        Submission Closed 🔒
                    </div>
                    )
                    }

                    {open === true ? (
                    <Link to="/viewsubmissions" key="View Submissions" className='inline-block px-2 py-3 text-green-800 font-bold bg-green-100 dark:bg-slate-900 hover:-translate-y-1 transform transition'>
                        Peer Assess 📝
                    </Link>
                    ):(
                        <div key="SubmitWork" className='inline-block px-2 py-3 text-red-100 font-bold bg-red-800 dark:bg-slate-900 hover:-translate-y-1 transform transition'>
                        Peer Assess Locked 🔒
                    </div>
                    )}
                   

                    
                
               {/* )) }*/}
               <a href={BreifUrl} download className='inline-block px-2 py-3 text-blue-800 font-bold bg-blue-100 dark:bg-slate-900 hover:-translate-y-1 transform transition'>
                        Download Breif 📖
                    </a>

           
                <span className='text-right text-gray-600 dark:text-gray-300 p-2 w-full text-base '>Due: {dueDate}</span>
                
            </p>
            
           </div>
           
        </div>
    )
}
export default WorkItem