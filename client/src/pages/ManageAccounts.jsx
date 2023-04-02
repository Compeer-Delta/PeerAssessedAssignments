import React from 'react'
import HeroSection from '../components/HeroSection'
import {Link} from 'react-router-dom';
import {useRef, useState, useEffect, useLayoutEffect} from 'react';
import AccountSearchBox from '../components/AccountSearchBox';
import FileUploader from '../components/FileUploader';
import AdminView from './AdminView';
import LoginCard from '../components/LoginCard';
import {ReactSession} from 'react-client-session'

//still working on this, functionality not entirely implemented yet !
function ManageAccounts()

{
  let session = {
    token: ReactSession.get("token"),
    accType: ReactSession.get("accType"),
    email: ReactSession.get("email"),
    inst: ReactSession.get("inst"),
  };
  

    
    const allAccounts = [
       "Teacher A",
       "Teacher B",
      "Teacher C",
      "Teacher D",
       "Teacher E",
    ]; //Replace values with db values , all teachers for a given insititution (access institution through session)
    
    
    const [currentAccount, setAccount] = useState('');
        const [moduleTitle, setModuleTitle] = useState('');

      const [alreadyAddedAccounts, setAlreadyAddedAccounts] = useState([]);
       // let outputData = sessionStorage.getItem('loginSessionData');
       // outputData = JSON.parse(outputData);
    
    const [addedAccounts, setAddedAccounts] = useState([]);//{username:"Ex_Account_1", password:"pass", firstname:"Ex_First", secondname:"Ex_Second", accounttype:"Student"}
    
    
    const [uploadedAccountData, setUploadedAccountData] = useState([])
    const [allAddedAccounts, setAllAddedAccounts] = useState([])

    useEffect(() => {

    

    // console.log("Ac:" + uploadedAccountData);
     //var a = uploadedAccountData
     
      var allAddedAccountDuplicates = (alreadyAddedAccounts.concat(uploadedAccountData));
      var allAddedAccountsTemp = allAddedAccountDuplicates.filter((c, index) =>{return allAddedAccountDuplicates.indexOf(c) === index;});
      allAddedAccountsTemp = allAddedAccounts.filter(account => {if (!alreadyAddedAccounts.includes(account)){return account};})
      
     // setAllAddedAccounts(allAddedAccountsTemp);
     // allAddedStudents = allAddedStudents.map(student => (((student.split(" "))[2]).replace("(", "")).replace(")", ""));
     // allAddedTeachers = allAddedTeachers.map(teacher => (((teacher.split(" "))[2]).replace("(", "")).replace(")", ""));
      
      console.log("Accounts:" + allAddedAccounts);
      
    }, [])
     
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

    useLayoutEffect(() => {

  
      const fetchAccountData = async () => { 
      var fr = "";
    
      fr = "http://localhost:8081/admin/getallusers?institutionName=" + session.inst //Fetch Route
     
        const response = await fetch(fr, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + ReactSession.get("token"), 
        },
      });
    
        const data = await response.json();
      // console.log("this1 " + JSON.stringify(data.users))
       // for (let i =0; i < data.users.length ; i++)
       // {
        //setAccs([...Accs, (data.users[i]).firstname + " " + (data.users[i]).surname + " (" + (data.users[i]).email + ")" ]);
       // }
        
      
       const tempAccs = (data.users).map(user => `${user.email} ${user.firstname} ${user.surname} ${user.role}` );

       console.log("accData" + JSON.stringify(tempAccs));
    
    
       // setAvailableStudents(tempStudentAccs);
       // setAvailableTeachers(tempTeacherAccs);

        setAlreadyAddedAccounts(tempAccs);
    
        console.log("this " + JSON.stringify(tempAccs))
     // console.log("ran");
      };
      fetchAccountData()
     
    }, []);
    

    const addNewAccounts = async () => {
      //adding validation later
    
      //loop through uploadedAccountData and store all accounts that are new and update ones that have been changed
      //will later add a loop to delete all accounts that have been sent to a delete array
      //write values moduleTitle, addedStudents and addedTeachers

      console.log(uploadedAccountData);

      for (let i=0; i < uploadedAccountData.length; i++)
      {
        console.log(uploadedAccountData[i][0].replace(" ", ""));
        console.log(uploadedAccountData[i][1].replace(" ", ""));
        console.log(uploadedAccountData[i][2].replace(" ", ""));
        console.log(uploadedAccountData[i][3].replace(" ", ""));
        console.log((uploadedAccountData[i][4].replace(" ", "")).replace("/r", ""));
        console.log(session.inst);

        const response = await fetch("http://localhost:8081/register", {
        method: "POST",
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "password": uploadedAccountData[i][1].replace(" ", ""),
          "firstname": uploadedAccountData[i][2].replace(" ", ""),
          "surname": uploadedAccountData[i][3].replace(" ", ""),
          "email": uploadedAccountData[i][0].replace(" ", ""),
          "institutionName": session.inst,
          "role": (uploadedAccountData[i][4].replace(" ", "")).replace("/r", "")
        })    
      });
      const newAccount = await response.json();
      
      }
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
        {alreadyAddedAccounts?.map((addedAccounts) => (
        <li
          key={addedAccounts.split(" ")[0]}
          className="p-0 text-sm hover:bg-sky-600 hover:text-white ">
          {"Email: "+ addedAccounts.split(" ")[0] + "| Name: " +  addedAccounts.split(" ")[1] + " " + addedAccounts.split(" ")[2] + "| Account: " + addedAccounts.split(" ")[3]}
          
        </li>//LOAD INTO addedAccounts the DB data
      ))}
      {uploadedAccountData?.map((t) => (
     
        <li
          key={t}
          id="Accounts"
          className="p-0 text-sm hover:bg-sky-600 hover:text-white ">
          {"Email: "+ t[0] + "| Name: " +  t[2] + " " + t[3] + "| Account: " +  t[4] }
        </li>// Accounts are listing properly yet check back in FileUploader and make sure uploadedAccountData is formatted right 
     
      ))}

</ul>

</div>
      

      <h1 className= '  text-l w-[270px] md:w-[700px] text-slate-600 font-semibold dark:text-white rounded-md '> Upload .csv file of format: firstname, secondname, username,password and account type (student / teacher) to add accounts. Use a separate line for each account: </h1> 
      <div id="accountsFileUpload" className="flex flex-row"> 
      <FileUploader UploadedData ={uploadedAccountData => setUploadedAccountData(uploadedAccountData)} uploadType="accounts" ></FileUploader> {/*DOESNT WORK FOR ACCOUNTS YET.*/}
      
      </div>

      {/*submit button */}
      <div className="md:flex md:items-center sm:pl-18 py-5">
        
          <div className="md:w-[0px]"></div>
            <div className="w-[200px] ">

            <button onClick={addNewAccounts} className=" shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded ">
              Confirm changes
              </button>
            
            </div>   
          </div>
        


      </div>


      </div>
  
  </>
   )
    
}
export default ManageAccounts