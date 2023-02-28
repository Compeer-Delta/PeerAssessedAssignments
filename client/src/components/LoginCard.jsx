import React, {useState} from 'react'
import StudentView from '../pages/StudentView'
import { Link, Navigate, Routes, Route} from 'react-router-dom';
import Welcome from '../pages/Welcome';

function LoginCard() { //parameters might need changing 

    let outputData = sessionStorage.getItem('loginSessionData');
    outputData = JSON.parse(outputData);

    const [loggedOut, setLoggedOut] = useState(false);
    const [sessionUsername, setSessionUsername] = useState("");

    //if not null
    if (sessionUsername == "" && outputData != null)
    {
        setSessionUsername(outputData.username);
    }
    

    function logout(){
        
        setLoggedOut(true);
        setSessionUsername("");
        
        sessionStorage.clear();
        
       
    }
    return (
        <>
    {/* Login tab */}

    {
    <h1 className = 'mt-2 rounded-bl-lg rounded-tl-lg border-solid border-2 border-zinc-600 font-semibold sidebar fixed lg:right-0 p-5 w-[300px] overflow-y-auto text-center text-gray-900 dark:text-gray-300 bg-slate-300 dark:bg-zinc-800'> Logged in as {sessionUsername}
    <button onClick={logout} className = "ml-14 p-0.5 mt-3 flex items-center  text-center px-12 cursor-pointer text-slate-100 dark:text-gray-300 bg-red-600 dark:bg-zinc-900 hover:bg-red-300 transform transition">
             <p> Logout</p>

    </button> 
    </h1>
    }
    <Routes>
    <Route path="/" element={loggedOut ? <Navigate to="/" /> : <></>}/>
    </Routes>
    </>
    )
}
export default LoginCard