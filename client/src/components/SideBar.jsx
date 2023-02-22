
import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import * as FAIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { sidebardata} from '../data/sidebardata';

function SideBar({modulename}) {

   const [sidebar, setSidebar] = useState(false)
   const showSidebar = () => setSidebar(!sidebar)

   
    return (

        <>
                     {/* module tab */}
                    <h1 className = ' rounded-br-lg rounded-tr-lg border-solid border-2 border-zinc-600 font-semibold sidebar fixed lg:left-0 p-5 w-[300px] overflow-y-auto text-center text-gray-900 dark:text-gray-300 bg-slate-300 dark:bg-zinc-800'> {modulename} Module Tabs
                    {sidebardata.map((item, index) =>{
                        return (
                            <div className = 
                            "p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-slate-900 dark:text-gray-300 bg-slate-100 dark:bg-zinc-900 hover:-translate-y-2 transform transition">
                            <li key={index} className= {item.cName}>
                            
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                            </div>
                        )
                    })}
                    </h1>


                    
                            
                    {/* Teachers tab */}
                    <h1 className = 'mt-32 rounded-bl-lg rounded-tl-lg border-solid border-2 border-zinc-600 font-semibold sidebar fixed lg:right-0 p-5 w-[300px] overflow-y-auto text-center text-gray-900 dark:text-gray-300 bg-slate-300 dark:bg-zinc-800'> Module Teachers
                    {sidebardata.map((item, index) =>{
                        return (
                            <div className = 
                            "p-1 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer text-slate-900 dark:text-gray-300 bg-slate-200 dark:bg-zinc-900 hover:-translate-y-2 transform transition">
                            <div key={index} className= {item.cName}>
                            
                                <p>
                                    
                                    <span>Teacher</span>
                                </p>
                            </div>
                            </div>
                        )
                    })}
                    </h1>
                {/*</ul>
            </nav> </> 
            </div> */}
    
        </>
        
        
       
    )
}

export default SideBar