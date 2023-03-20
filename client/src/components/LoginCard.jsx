import React, {useState, useEffect} from 'react'
import StudentView from '../pages/StudentView'
import { Link, Navigate, Routes, Route} from 'react-router-dom';
import Welcome from '../pages/Welcome';
import {ReactSession} from 'react-client-session';

function LoginCard() { //parameters might need changing 

    const [loggedOut, setLoggedOut] = useState(false);
    const [sessionUsername, setSessionUsername] = useState("");
    const [minimized, setMinimized] = useState(false);
    
    const getFirstName = async () => {
        const email = ReactSession.get("email");

        const fr = "http://localhost:8081/modules?email=" + email;

        const response = await fetch(fr, {
            method: "GET",
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + process.env.JWT_SECRET },
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

    function toggleMinimize()
    {
        if (minimized == true){setMinimized(false)}
        else {setMinimized(true)}

    }

    useEffect(() => {
        const onPageLoad = () => {
            if (sessionUsername == "" && ReactSession.get("email") != null)
            {
                setSessionUsername(getFirstName());
            }
        };
    
        if(document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            return () => window.removeEventListener('load', onPageLoad);
        }
      }, []);

    return (
        <div className = "fixed z-30">
    {/* Login tab */}

    { minimized === false ? (
    
    <h1 className = 'dark:border-indigo-900 mt-2 rounded-bl-lg rounded-tl-lg border-solid border-2 border-zinc-600 font-semibold sidebar fixed right-0 p-5 w-[300px] overflow-y-auto text-center text-gray-900 dark:text-gray-300 bg-slate-300 dark:bg-zinc-800'> Logged in as {sessionUsername}
    <button onClick={toggleMinimize} className = "font-Dosis text-sm absolute top-0 right-0 flex items-center  h-[20px] text-center px-1 cursor-pointer text-slate-100 dark:text-gray-300 bg-slate-600  transform transition">
             <p> Minimize </p>
    </button>
    <button onClick={logout} className = "ml-14 p-0.5 mt-3 flex items-center  text-center px-12 cursor-pointer text-slate-100 dark:text-gray-300 bg-red-600  hover:bg-red-300 transform transition">
             <p> Logout</p>

    </button> 
    </h1>
    ):
    (
        <button onClick={toggleMinimize} className = 'dark:border-indigo-900 mt-2 rounded-bl-lg rounded-tl-lg border-solid border-2 border-zinc-600 font-semibold sidebar fixed right-0 pb-6 h-[100px] w-[60px] text-sm text-left pl-1 text-gray-100 dark:text-gray-300 bg-slate-600 dark:bg-zinc-800'> View Login Info
    
    </button>
    )

    }
    <Routes>
    <Route path="/" element={loggedOut ? <Navigate to="/" /> : <></>}/>
    </Routes>
    </div>
    )
}
export default LoginCard