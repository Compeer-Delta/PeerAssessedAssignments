import React, {useState} from 'react'
import StudentView from '../pages/StudentView'
import { Link, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {ReactSession} from 'react-client-session';

function ModuleItem({title, modId}) { //parameters might need changing 

    const [isStudentorTeacher, setIsStudentorTeacher] = useState(()=> checkIfStudentorTeacher())
    const [modulename, setModulename] = useState(title);

    function checkIfStudentorTeacher()
    {
        if (ReactSession.get("accType") == "studentAccount" || ReactSession.get("accType") == "teacherAccount")
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    return (
     <>
    <Link to={"/modules/"+modId} state={{moduleTitle: modulename, nestedPage: "default"}} rel="noreferrer" className='z-10 font-Dosis bg-slate-300 dark:bg-zinc-700 rounded-lg w-[340px] h-32 overflow-hidden hover:-translate-y-1 transform transition '>

      
    <div className="w-full h-5 object-cover bg-slate-600 dark:bg-indigo-900 rounded-lg rounded-b-none"/>
           <div className='text-gray-600 dark:text-gray-300 p-3 rounded-lg'>
                <h3 className ='font-semibold text-center text-2xl mb-2 md:mb-1 rounded-lg'>{modulename}</h3>

               
                { !isStudentorTeacher ? (
                <div className='inline-block ml-64 mt-6 px-5 text-slate-700 bg-slate-100 dark:bg-indigo-800 dark:text-white hover:bg-indigo-300 dark:hover:bg-indigo-300'>
                                 Edit
                                </div>

                ):(<></>)}
                         
           </div>
    </Link>
   
   
    </>
    )
}
export default ModuleItem