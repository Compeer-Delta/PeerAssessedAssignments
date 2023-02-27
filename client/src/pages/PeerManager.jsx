import React from 'react'
import Works from '../components/Works'
import StudentView from '../pages/StudentView'
import { useState } from 'react';
import { Link } from 'react-router-dom';
function PeerManager() {

    const [assignments, setAssignments] = useState([
        {title: 'A* Algorithm Assignment',dueDate: '9:00pm 1/10/22',setDate: '4.32pm 10/10/22',id: 1},
        {title: "Class work 3 submission", dueDate: '9:00pm 1/10/22',setDate: '4.32pm 10/10/22',id: 2},
        {title: "Class work 2 submission",dueDate: '9:00pm 1/10/22',setDate: '4.32pm 10/10/22',id: 3},
        {title: "Introduction to AI submission",dueDate: '9:00pm 1/10/22',setDate: '4.32pm 10/10/22',id: 4},
        {title: 'RE A* Algorithm Assignment',dueDate: '9:00pm 1/10/22',setDate: '4.32pm 10/10/22', id: 5},
        {title: "RE Class work 3 submission",dueDate: '9:00pm 1/10/22',setDate: '4.32pm 10/10/22',id: 6},
        {title: "RE Class work 2 submission",dueDate: '9:00pm 1/10/24',setDate: '4.32pm 10/10/22', id: 7},
        { title: "RE Introduction to AI submission",dueDate: '9:00pm 1/10/24',setDate: '4.32pm 10/10/22',id: 8}]);

        //filter to closed assignments

  return (
    <>
    <div  className="ml-80 mr-80">Closed Assignments</div>
    <table className="table-fixed w-2/3 text-sm text-left text-gray-500 dark:text-gray-400 ml-80">
    <thead className="text-s text-gray-700 font-Dosis  bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
    <tr>
      <th className="px-6 py-3 border border-width-10">Assignment Title</th>
      <th className="px-6 py-3 border border-width-10">Set date</th>
      <th className="px-6 py-3 border border-width-10">Due date</th>
      <th className="px-6 py-3 border border-width-10"></th>
    </tr>
  </thead>
  <tbody>
        {assignments.map(assignment => (
            <tr class="bg-white border-b border-l dark:bg-gray-800 dark:border-gray-700 hover:bg-sky-100">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {assignment.title}
                </th>
                <td className="px-6 py-4">
                {assignment.setDate}
                </td>
                <td className="px-6 py-4">
                {assignment.dueDate}
                </td>
                <td className="px-6 py-4 text-center">
                 <Link to="/peerassess" className=" font-Dosis text-blue-100 text-l bg-blue-500 border-black px-6 py-1 rounded-3xl hover:bg-blue-200 hover:text-blue-800">
                 Open to Peers
                 </Link>
                </td>
                
            </tr>
        ))}
  </tbody>
  </table>
    </>
    
  )
}

export default PeerManager