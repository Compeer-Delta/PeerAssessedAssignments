import React from 'react'
import HeroSection from '../components/HeroSection'
import {Link} from 'react-router-dom';
import {useRef, useState, useEffect} from 'react';
import AccountSearchBox from '../components/AccountSearchBox';
import FileUploader from '../components/FileUploader';
import AdminView from './AdminView';
import LoginCard from '../components/LoginCard';

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
    <LoginCard></LoginCard>
   
   <div className = 'py-2 dark:bg-zinc-900 h-screen'>
      <h1 className= '  2xl:pl-72 pl-10 py-10 2xl:text-5xl text-2xl  2xl:w-[1200px] text-slate-600 font-semibold dark:text-white rounded-2xl  '> Add Accounts</h1> 

      <div className="  2xl:ml-80 2xl:mr-80 ml-10 mr-10 2xl:px-80  bg-slate-200 px-2"> 

      


      <h1 className= ' text-2xl w-[100px] text-slate-600 font-semibold dark:text-white rounded-md pb-4'>  Accounts: </h1> 

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
          {"User: "+ t+ " Temp Password: " + t + " Name: " +  t + " " + t + " Account" +  t }
        </li>// Accounts are listing properly yet check back in FileUploader and make sure uploadedAccountData is formatted right 
     
      ))}

</ul>

</div>
      

      <h1 className= '  text-l w-[270px] md:w-[700px] text-slate-600 font-semibold dark:text-white rounded-md '> Upload .csv file of format: firstname, secondname, username,password to add accounts: </h1> 
      <div className="flex flex-row"> 
      <FileUploader UploadedData ={uploadedAccountData => setUploadedAccountData(uploadedAccountData)} uploadType="accounts" ></FileUploader> {/*DOESNT WORK FOR ACCOUNTS YET.*/}
      {uploadedAccountData}
      </div>

      {/*submit button */}
      <div className="md:flex md:items-center sm:pl-18 py-5">
        
          <div className="md:w-[0px]"></div>
            <div className="w-[200px] ">

            <Link to="/adminview" className=" shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded ">
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