import React from 'react'
import Works from '../components/Works'
import StudentView from '../pages/StudentView'
import HeroSection from '../components/HeroSection'
import { useState } from 'react'
function ViewFeedback() {

    const [recievedFeedback, setRecievedFeedback] = useState([{assignmentTitle:"Lorem Ipsum Essay", markedBy:"Hathan Khatkar", mark:"10/10", writtenFeedback:" Well done"},
    {assignmentTitle:"Lorem Ipsum Essay", markedBy:"Hathan Khatkar", mark:"10/10", writtenFeedback:" Well done"},
    {assignmentTitle:"Lorem Ipsum Essay", markedBy:"Hathan Khatkar", mark:"10/10", writtenFeedback:" Well done"},
    {assignmentTitle:"Lorem Ipsum Essay", markedBy:"Hathan Khatkar", mark:"10/10", writtenFeedback:" Well done"}]);
  return (
    <>
    <StudentView></StudentView>
    {recievedFeedback.map(fb => (
        <div className=" ml-80 w-[1700px]">
    <h1 className= 'ml-10 py-4  text-3xl w-[700px] text-slate-600 font-semibold dark:text-white rounded-md font-Dosis '> Thank you for your peer assessing Hathan! </h1> 
    <h1 className= 'font-Dosis ml-10  text-l w-[700px] text-slate-600 font-semibold dark:text-white rounded-md '> Given mark / grade: {fb.mark}</h1> 
     <div className= 'font-Dosis ml-10  text-l w-[700px] text-slate-600 font-semibold dark:text-white rounded-md'>Given feedback:</div>
     <p className="whitespace-pre-wrap break-words font-Dosis ml-10  text-l w-[700px] text-slate-600 font-semibold dark:text-white rounded-md">{fb.writtenFeedback}</p>
     </div>
    ))}
    </>
    
  )
}

export default ViewFeedback