import React, {useState} from 'react'
import StudentView from '../pages/StudentView'
import { Link } from 'react-router-dom';

function ModuleItem({title}) { //parameters might need changing 
   
    let outputData = sessionStorage.getItem('loginSessionData');
    outputData = JSON.parse(outputData);

    const [isStudent, setIsStudent] = useState(()=> checkIfStudent())

    function checkIfStudent()
    {
        if (outputData.accountType == "studentAccount")
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    return (
     
    <Link to= {{pathname: "/studentview", state: {stateParam: title}}} rel="noreferrer"  className='bg-slate-300 dark:bg-zinc-700 rounded-lg w-full h-20 overflow-hidden hover:-translate-y-1 transform transition '>
           <div className='text-gray-600 dark:text-gray-300 p-3'>
                <h3 className ='text-lg md:text-xl mb-2 md:mb-1 font-semibold'>{title}</h3>

               
                { !isStudent ? (
                <div className='inline-block ml-72 px-10 text-slate-700 bg-slate-100 dark:bg-slate-900 hover:bg-indigo-300'>
                                 Edit
                                </div>

                ):(<></>)}
                         
           </div>
    </Link>
   
    )
}
export default ModuleItem