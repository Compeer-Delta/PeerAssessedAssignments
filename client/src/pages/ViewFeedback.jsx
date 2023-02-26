import React from 'react'
import Works from '../components/Works'
import StudentView from '../pages/StudentView'
import HeroSection from '../components/HeroSection'
import { useState } from 'react'
function ViewFeedback() {

    const [recievedFeedback, setRecievedFeedback] = useState([
    {assignmentTitle:"Lorem Ipsum Essay", markedBy:"Hathan Khatkar", mark:"10/10", writtenFeedback:" Well done", viewFeedback:false},
    {assignmentTitle:"Lorem Ipsum Essay", markedBy:"Hathan Khatkar1", mark:"10/10", writtenFeedback:" Well done", viewFeedback:false},
    {assignmentTitle:"Lorem Ipsum Essay", markedBy:"Hathan Khatkar2", mark:"10/10", writtenFeedback:" Great job", viewFeedback:false},
    {assignmentTitle:"Lorem Ipsum Essay", markedBy:"Hathan Khatkar3", mark:"10/10", writtenFeedback:" Needs improvement", viewFeedback:false}]);

    const [viewFeedback, setViewFeedback] = useState(false);
    const [foundClicked, setFoundClicked] = useState(false);


    var i = 0;
    var stopcount = false;

    function toggleFeedback(view)
    {
      let newArr = [...recievedFeedback];  
      newArr.forEach(findClickedFeedbackButton, view);

      if (view.viewFeedback == true) {newArr[i].viewFeedback = false;}
      else {newArr[i].viewFeedback = true;}

        setRecievedFeedback(newArr);
        i=0;
        stopcount= false;
        console.log(recievedFeedback);
        console.log("new arr " + newArr[0].viewFeedback);
    }

    function findClickedFeedbackButton(arr, index)
    {console.log(arr);console.log( this);

      
      if (arr.assignmentTitle == this.assignmentTitle && arr.markedBy == this.markedBy && arr.mark == this.mark && arr.writtenFeedback == this.writtenFeedback)
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
      if (view.viewFeedback == true)
      {
          return true;
      }
      else{ return false;}
    }

  return (
    <>
   
    {recievedFeedback.map(fb => (
        <div className=" ml-80 w-2/3 bg-slate-300 mb-2 rounded">
    <h1 className= 'ml-10 pt-4  text-3xl w-[700px] text-slate-600 font-semibold dark:text-white rounded-md font-Dosis '> {fb.assignmentTitle} (Peer feedback) </h1> 
    <h1 className= 'ml-10 py-1  text-2xl w-[700px] text-slate-600 font-semibold dark:text-white rounded-md font-Dosis '> by {fb.markedBy}</h1> 
    <h1 className= 'font-Dosis ml-10  text-l w-[700px] text-blue-600 font-semibold dark:text-white rounded-md '> Given mark / grade: {fb.mark}</h1> 
     <button onClick={() => toggleFeedback(fb)} className= 'mt-2 mb-2 font-Dosis ml-10 text-l py-2 px-2 text-slate-600 font-semibold dark:text-white rounded-md bg-slate-50'>
      {toggleButtonText(fb) == true ? (
        <p>Hide Feedback</p>
      ):(<p> Show Feedback</p>)}
        
      </button>

     {fb.viewFeedback === true ?(
     <div className="bg-slate-200">
      <p className="font-Dosis ml-10  text-xl w-[700px] font-semibold dark:text-white text-green-600 "> Your Feedback:</p>
     <p className="whitespace-pre-wrap break-words font-Dosis ml-10  text-l w-[700px] text-slate-600 font-semibold dark:text-white rounded-md">{fb.writtenFeedback}</p>
     </div>
    ):(<></>)}
    </div>
 ))}
    </>
    
  )
}

export default ViewFeedback