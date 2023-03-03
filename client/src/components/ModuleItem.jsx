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
    <Link to={"/modules/"+modId} state={{moduleTitle: modulename, nestedPage: "default"}} rel="noreferrer" className='bg-slate-300 dark:bg-zinc-700 rounded-lg w-full h-20 overflow-hidden hover:-translate-y-1 transform transition '>
           <div className='text-gray-600 dark:text-gray-300 p-3'>
                <h3 className ='text-lg md:text-xl mb-2 md:mb-1 font-semibold'>{modulename}</h3>

               
                { !isStudentorTeacher ? (
                <div className='inline-block ml-72 px-10 text-slate-700 bg-slate-100 dark:bg-slate-900 hover:bg-indigo-300'>
                                 Edit
                                </div>

                ):(<></>)}
                         
           </div>
    </Link>
   
   
    </>
    )
}
export default ModuleItem