import React from 'react'
import Modules from '../pages/Modules'
import HeroSection from '../components/HeroSection'
import {Link} from 'react-router-dom';
import { useState } from 'react';

function ApproveFeedback() {

    const [assignments, setAssignments] = useState([
        {title: 'A* Algorithm Assignment', markedBy: 'Hathan Khatkar',submissionBy: 'Gregory Clews',gradeGiven:"5", approved:false, id: 1, feedback:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n\n Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit "},
        {title: "Class work 3 submission", markedBy: 'Hathan Khatkar',submissionBy: 'Gregory Clews',gradeGiven:"2", approved:false, id: 2, feedback:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n Duis aute irure dolor in reprehenderit in voluptate velit "},
        {title: "Class work 2 submission",markedBy: 'Hathan Khatkar',submissionBy: 'Gregory Clews',gradeGiven:"12", approved:false, id: 3, feedback:"Good job"},
        {title: "Introduction to AI submission",markedBy: 'Hathan Khatkar',submissionBy: 'Gregory Clews',gradeGiven:"3", approved:false, id: 4, feedback:"Well done\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt "},
        {title: 'RE A* Algorithm Assignment',markedBy: 'Hathan Khatkar',submissionBy: 'Gregory Clews',gradeGiven:"6", approved:false, id: 5, feedback:"Needs improvement"},
        {title: "RE Class work 3 submission",markedBy: 'Hathan Khatkar',submissionBy: 'Gregory Clews',gradeGiven:"3", approved:false, id: 6, feedback:"Well done"},
        {title: "RE Class work 2 submission",markedBy: 'Hathan Khatkar',submissionBy: 'Gregory Clews',gradeGiven:1, approved:false, id: 7, feedback:"Well done"},
        { title: "RE Introduction to AI submission",markedBy: 'Hathan Khatkar',submissionBy: 'Gregory Clews',gradeGiven:"7", approved:false,id: 8, feedback:"Well done"}]);
        //DB: get all feedback where approved = false

        var i = 0;
        var stopcount = false;
        const [foundClicked, setFoundClicked] = useState(false);

   
    function toggleFeedback(view, teacherApproved)
    {
      let newArr = [...assignments];  
      newArr.forEach(findClickedFeedbackButton, view);

      newArr[i].approved = teacherApproved;

        setAssignments(newArr);
        i=0;
        stopcount= false;
        console.log(assignments);
        console.log("new arr " + newArr[0].approved);

        
    }
    function findClickedFeedbackButton(arr, index)
    {console.log(arr);console.log( this);

      
      if (arr.id == this.id)
      {
        setFoundClicked(true);
        stopcount= true;
        console.log("out" + foundClicked);
      }
      else {
        console.log("in");

        if (stopcount == false)
        {
          i = i+1;
        }
       
        console.log("i" + i);
      }
    
    }

    function toggleButtonText(view)
    {
      if (view.open == true)
      {
          return true;
      }
      else{ return false;}
    }

  return (
    <>
    <div  className="ml-80 mr-80 font-Dosis text-3xl font-bold py-2">Approve student feedback</div>
    <table className="table-fixed w-2/3 text-sm text-left text-gray-500 dark:text-gray-400 ml-80">
    <thead className="text-s text-gray-700 font-Dosis  bg-slate-50 dark:bg-gray-700 dark:text-gray-400 border-2 border-slate-900 ">
    <tr>
      <th className="px-6 py-3 border border-width-10">Assignment Title</th>
      <th className="px-6 py-3 border border-width-10">submission by</th>
      <th className="px-6 py-3 border border-width-10">marked by</th>
      <th className="px-6 py-3 border border-width-10">grade given</th>
      <th className="px-6 py-3 border border-width-10">Send to student ?</th>
   
    </tr>
  </thead>
  <br></br>
  <tbody>

        {assignments.map(assignment => (
           
            assignment.approved==false ? ( //displays row if the assignment due date has passed and teacher has not opened the assignment

            <>
            <tr class=" dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-200 bg-slate-100 border-2 border-slate-900">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {assignment.title}
                </th>
                <td className="px-6 py-4">
                {assignment.submissionBy}
                </td>
                <td className="px-6 py-4">
                {assignment.markedBy}
                </td>
                <td className="px-6 py-4">
                {assignment.gradeGiven}
                </td>

               
                <td className="px-6 py-4 text-center">

               
                 <button onClick={() => toggleFeedback(assignment, true)} className="mr-2 font-Dosis text-blue-100 text-l bg-green-500 border-black px-6 py-1 rounded-3xl hover:bg-green-200 hover:text-green-800 mb-3">             
                 <p>Approve</p>
                 </button>
                 <button onClick={() => toggleFeedback(assignment, false)} className=" font-Dosis text-blue-100 text-l bg-red-500 border-black px-8 py-1 rounded-3xl hover:bg-red-200 hover:text-red-800">             
                 <p>Reject</p>
                 </button>
                 
                 
              
                </td>
               
                
            </tr>
       
       
                <div className="mb-5 w-[1266px] bg-slate-200">
                    <p className="font-Dosis ml-10  text-xl font-semibold dark:text-white text-green-600 "> Given Feedback:</p>
                    <p className="whitespace-pre-wrap break-words font-Dosis ml-10  text-l text-slate-600 font-semibold dark:text-white rounded-md">{assignment.feedback}</p>
                    </div>
          
          
          
            </>
            ): assignment.approved==true ? (
               <></>
            ):(<></>)

        ))}
  </tbody>
  </table>
    </>
    
  )
}


export default ApproveFeedback