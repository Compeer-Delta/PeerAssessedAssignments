import React, {useState} from 'react'
import StudentView from '../pages/StudentView'
import { Link, Navigate, Routes, Route} from 'react-router-dom';
import Welcome from '../pages/Welcome';
import {ReactSession} from 'react-client-session';

function LoginCard() { //parameters might need changing 

    const [loggedOut, setLoggedOut] = useState(false);
    const [sessionUsername, setSessionUsername] = useState("");

    //if not null
    if (sessionUsername == "" && ReactSession.get("email") != null)
    {
        setSessionUsername(getFirstName());
    }
    
    const getFirstName = async () => {
        const email = ReactSession.get("email");

        const response = await fetch("http://localhost:8081/user/me", {
            method: "GET",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email
            })
        });

        const userData = await response.json()

        return userData.firstname;
    }

    function logout(){
        
        setLoggedOut(true);
        setSessionUsername("");
        
        ReactSession.remove("email");
        ReactSession.remove("accType");
        ReactSession.remove("token");

        console.log("LOGOUT SUCCESS")
    }
    
    return (
        <>
    {/* Login tab */}

    {
    <h1 className = 'dark:border-indigo-900 mt-2 rounded-bl-lg rounded-tl-lg border-solid border-2 border-zinc-600 font-semibold sidebar fixed lg:right-0 p-5 w-[300px] overflow-y-auto text-center text-gray-900 dark:text-gray-300 bg-slate-300 dark:bg-zinc-800'> Logged in as {sessionUsername}
    <button onClick={logout} className = "ml-14 p-0.5 mt-3 flex items-center  text-center px-12 cursor-pointer text-slate-100 dark:text-gray-300 bg-red-600  hover:bg-red-300 transform transition">
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