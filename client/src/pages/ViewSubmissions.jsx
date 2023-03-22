import React from 'react'
import HeroSection from '../components/HeroSection'
import Works from '../components/Works'
import StudentView from '../pages/StudentView'
import { useState } from 'react'
import {Link} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import LoginCard from '../components/LoginCard'

function ViewSubmissions() {

    let outputData = sessionStorage.getItem('loginSessionData');
    outputData = JSON.parse(outputData);

    const [submissions, setSubmission] = useState([
        {submissionTitle: "My Submission", submitBy: "Hathan Khatkar", numFeedback: 2,  submissionId:1},
        {submissionTitle: "Web Development assignment", submitBy: "Jordan D'Souza", numFeedback: 6, submissionId:2},
        {submissionTitle: "Assignment to be peer marked", submitBy: "Gregory Clews", numFeedback: 4 ,submissionId:3},
        {submissionTitle: "Assignment to be peer marked", submitBy: "Gregory Clews", numFeedback: 4 ,submissionId:4},
        {submissionTitle: "Assignment to be peer marked", submitBy: "Gregory Clews", numFeedback: 4 ,submissionId:5},
        {submissionTitle: "Assignment to be peer marked", submitBy: "Gregory Clews", numFeedback: 4 ,submissionId:6},
        {submissionTitle: "Assignment to be peer marked", submitBy: "Gregory Clews", numFeedback: 4 ,submissionId:7}]);
      //select all these fields ^ from submissions schema where submissions assignment id matches (FK)


        const location = useLocation();
        const {assignmentTitle} = location.state;
        const {assignmentId} = location.state;  
        const {modId} = location.state; //module id
        const {modTitle} = location.state;
         //use id / title to get peersPerSubmission to display this number of submissions
         //select peersPerSubmission from assignmentsschema where assignmentId = id in schema
         const peersPerSubmission = 3;
         const numOfSubmissions =  submissions.length;
         const TEMPORARYAccountID = 5;

         //limit what submissions are seen based on the user id so each one person sees a unique of submissions
         //TEMPORARILY JUST DISPLAYS FIRST FEW
         function limitViewedSubmissions()
         {
          var arr=[];
          if (outputData.accountType === "studentAccount") 
          {
            for (var i=0; i < numOfSubmissions; i++)
            {
          
            if (peersPerSubmission > i)
            {
            // setLimitedSubmissions(prev => [...prev, {submissionTitle: submissions[i-1].submissionTitle, submitBy: submissions[i-1].submitBy, numFeedback: submissions[i-1].numFeedback}]);
            arr.push({submissionTitle: submissions[i].submissionTitle, submitBy: submissions[i].submitBy, numFeedback: submissions[i].numFeedback});
            }

          //console.log("i " + (TEMPORARYAccountID-i))
         // if (i % TEMPORARYAccountID)
         // {
            
         // }
            }
          }
          else {
            arr= arr.concat(submissions);
          } 
         return arr
        }

  return (
    <>

    {/* {assignmentId} + {modId} + {assignmentTitle} */}
    <HeroSection prevPageName = "Home Page" prevUrl= {"/modules/" + modId} moduleTitle= {modTitle}></HeroSection>
    <LoginCard/>
    
    <h1 className= ' xl:pl-72 pl-10 py-10 text-3xl xl:w-[1200px] w-[400px] text-slate-600 font-semibold dark:text-white rounded-md '> {assignmentTitle}'s Submissions</h1> 
    
    <div className="overflow-x-scroll md:overflow-auto"> 
    <table className="table-fixed xl:w-2/3 w-[700px]  text-sm text-left text-gray-500 dark:text-gray-400 xl:ml-72 ml-10">
    <thead className="text-s text-gray-700 font-Dosis  bg-slate-50 dark:bg-gray-700 dark:text-gray-400 border-2 border-slate-900  ">
    <tr>
      <th className="px-6 py-3 border border-width-10">Submission Title</th>
      <th className="px-6 py-3 border border-width-10">Submitted by</th>
      <th className="px-6 py-3 border border-width-10">Feedback recieved</th>
      <th className="px-6 py-3 border border-width-10"></th>
    </tr>
  </thead>
  <tbody>
        {limitViewedSubmissions().map(submission => (
            <tr className=" dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-200 bg-slate-100 border-2 border-slate-900">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace dark:text-white">
                    {submission.submissionTitle}
                </th>
                <td class="px-6 py-4">
                {submission.submitBy}
                </td>
                <td class="px-6 py-4">
                {submission.numFeedback}
                </td>
                <td class="px-6 py-4 text-center">
                 <Link to={"/modules/"+ modId + "/viewsubmissions/"+ assignmentId + "/peerassess/"+ submission.submissionId} state={{assignmentTitle: assignmentTitle, assignmentId: assignmentId, modId: modId, modTitle: modTitle}} className=" font-Dosis text-blue-100 text-l bg-blue-500 border-black px-6 py-1 rounded-3xl hover:bg-blue-200 hover:text-blue-800">
                 Peer Assess
                 </Link>
                </td>
                
            </tr>
        ))}
  </tbody>
  </table>
  </div>

    </>
    
  )
}

export default ViewSubmissions