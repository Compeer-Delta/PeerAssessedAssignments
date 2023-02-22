import React from 'react'
import HeroSection from '../components/HeroSection'
import Works from '../components/Works'
import StudentView from '../pages/StudentView'
import { useState } from 'react'
import {Link} from 'react-router-dom';

function ViewSubmissions() {

    const [submissions, setSubmission] = useState([
        {submissionTitle: "My Submission", submitBy: "Hathan Khatkar", numComments: 2 },
        {submissionTitle: "Web Development assignment", submitBy: "Jordan D'Souza", numComments: 6 },
        {submissionTitle: "Assignment to be peer marked", submitBy: "Gregory Clews", numComments: 4 }]);

  return (
    <>
    <HeroSection prevPageName = "Home Page" prevUrl= "/studentview"></HeroSection>
    <h1 className= ' pl-72 py-10 text-3xl w-[1200px] text-slate-600 font-semibold dark:text-white rounded-md '> Submissions for assignment: (Assignment name)</h1> 
    
    <table className="table-fixed w-2/3 text-sm text-left text-gray-500 dark:text-gray-400 ml-72">
    <thead className="text-s text-gray-700 font-Dosis  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
    <tr>
      <th className="px-6 py-3 border border-width-10">Submission Title</th>
      <th className="px-6 py-3 border border-width-10">Submitted by</th>
      <th className="px-6 py-3 border border-width-10">Comments</th>
      <th className="px-6 py-3 border border-width-10"></th>
    </tr>
  </thead>
  <tbody>
        {submissions.map(submission => (
            <tr class="bg-white border-b border-l dark:bg-gray-800 dark:border-gray-700 hover:bg-sky-100">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {submission.submissionTitle}
                </th>
                <td class="px-6 py-4">
                {submission.submitBy}
                </td>
                <td class="px-6 py-4">
                {submission.numComments}
                </td>
                <td class="px-6 py-4 text-center">
                 <Link to="/peerassess" className=" font-Dosis text-blue-100 text-l bg-blue-500 border-black px-6 py-1 rounded-3xl hover:bg-blue-200 hover:text-blue-800">
                 Peer Assess
                 </Link>
                </td>
                
            </tr>
        ))}
  </tbody>
  </table>

    </>
    
  )
}

export default ViewSubmissions