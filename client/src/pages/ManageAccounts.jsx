import React from 'react'
import HeroSection from '../components/HeroSection'
import {Link} from 'react-router-dom';
import {useRef, useState, useEffect} from 'react';
import AccountSearchBox from '../components/AccountSearchBox';
import FileUploader from '../components/FileUploader';
import AdminView from './AdminView';

//still working on this, functionality not entirely implemented yet !
function ManageAccounts()
{function addNewAccounts()
    {
      //adding validation later
    
      //loop through uploadedAccountData and store all accounts that are new and update ones that have been changed
      //will later add a loop to delete all accounts that have been sent to a delete array
      //write values moduleTitle, addedStudents and addedTeachers
    }
    
    const allAccounts = [
       "Teacher A",
       "Teacher B",
      "Teacher C",
      "Teacher D",
       "Teacher E",
    ]; //Replace values with db values , all teachers for a given insititution (access institution through session)
    
    
    const [currentAccount, setAccount] = useState('');
        const [moduleTitle, setModuleTitle] = useState('');
        let outputData = sessionStorage.getItem('loginSessionData');
        outputData = JSON.parse(outputData);
    
    const [addedAccounts, setAddedAccounts] = useState([{username:"Ex_Account_1", password:"pass", firstname:"Ex_First", secondname:"Ex_Second", accounttype:"Student"}]);
    
    
    const [uploadedAccountData, setUploadedAccountData] = useState([])

 
     
    function addUploadedAccounts()
    {
      console.log("all uploaded: " + uploadedTeacherData);
        (uploadedTeacherData).map(line =>
                {
                    console.log("d " + String(line));
                    setTeacher(String(line))
                    console.log("s" + currentTeacher);
                    {addNewTeacher()}
                    
                })
                console.log("done! " + addedTeachers);   
    }
    
    
    
    
    
    
    function addNewTeacher()
    {
      var t_exists = false;
      setAddedAccounts(addedAccounts.map(addedAccounts =>{
    
      if (addedAccounts.name === currentAccount){
        t_exists = true;
      }
      }))
    
    if (t_exists === false){
      setAddedAccounts([...addedAcounts, {name: currentAccount}]);
    }
    else{
      setAddedAccounts([...addedAccounts]);
    }
    }
   return(
    <>
    <HeroSection prevPageName = "Admin view" prevUrl= "/adminview"></HeroSection>
 
   
   <div className = 'py-2 dark:bg-zinc-900 h-screen'>
      <h1 className= ' pl-72 py-10 text-5xl w-[1200px] text-slate-600 font-semibold dark:text-white rounded-md '> Add Accounts</h1> 

      <div className=" ml-80 mr-80 px-80  bg-slate-200 py-10"> 

      


      <h1 className= ' text-2xl w-[1200px] text-slate-600 font-semibold dark:text-white rounded-md pb-4'>  Accounts: </h1> 

      <div className= "bg-slate-100 w-full p-2 flex items-center justify-between rounded ">
<ul
      className="bg-white overflow-y-auto sticky max-h-28  w-full">
        {addedAccounts?.map((addedAccounts) => (
        <li
          key={addedAccounts?.name}
          className="p-0 text-sm hover:bg-sky-600 hover:text-white ">
          {"User: "+ addedAccounts?.username + " Temp Password: " + addedAccounts?.password + " Name: " +  addedAccounts?.firstname + " " + addedAccounts?.secondname}
        
        </li>
      ))}
      {uploadedAccountData?.map((t) => (
     
        <li
          key={t}
          className="p-0 text-sm hover:bg-sky-600 hover:text-white ">
          {"User: "+ t?.username + " Temp Password: " + t?.password + " Name: " +  t?.firstname + " " + t?.secondname}
        </li>
     
      ))}

</ul>

</div>
      

      <h1 className= '  text-l w-[700px] text-slate-600 font-semibold dark:text-white rounded-md '> Upload .csv file of format: firstname, secondname, username,password to add accounts: </h1> 
      <div className="flex flex-row"> 
      <FileUploader UploadedData ={uploadedAccountData => setUploadedAccountData(uploadedAccountData)} uploadType="accounts" ></FileUploader> {/*DOESNT WORK FOR ACCOUNTS YET.*/}
      <button onClick={addUploadedAccounts} className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold w-100 h-10 px-3 ml-3 rounded ">
                Add All
        </button>
      </div>

      {/*submit button */}
      <div className="md:flex md:items-center px-32 py-5">
        
          <div className="md:w-1/3"></div>
            <div className="md:w-2/3 ">

            <Link to="/adminview" className="shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded ">
              Confirm changes
              </Link>
            </div>   
          </div>
        


      </div>


      </div>
  
  </>
   )
    
}
export default ManageAccounts