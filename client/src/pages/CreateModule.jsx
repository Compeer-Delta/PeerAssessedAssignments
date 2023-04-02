import React, { useEffect } from 'react'
import Modules from '../pages/Modules'
import HeroSection from '../components/HeroSection'
import {Link} from 'react-router-dom';
import {useRef, useState, useLayoutEffect} from 'react';
import AccountSearchBox from '../components/AccountSearchBox';
import FileUploader from '../components/FileUploader';
import LoginCard from '../components/LoginCard';
import {ReactSession} from 'react-client-session'
import {Navigate, Route, Routes } from "react-router-dom";

function CreateModule() {
//onSubmit={handleSubmit} 
let session = {
  token: ReactSession.get("token"),
  accType: ReactSession.get("accType"),
  email: ReactSession.get("email"),
  inst: ReactSession.get("inst"),
};




var allAddedStudents, allAddedTeachers;
const [toModulesPage, setToModulesPage] = useState(false);
const [Accs, setAccs] = useState([]);

const [availableTeachers, setAvailableTeachers] = useState([]);
const [availableStudents, setAvailableStudents] = useState([]);


async function getAllTeachersInInstitution()
{
   
}

/*const allTeachers [
   "Teacher A",
   "Teacher B",
  "Teacher C",
  "Teacher D",
   "Teacher E",
];*/ //Replace values with db values , all teachers for a given insititution (access institution through session)



const allStudents = [
  "Student A",
  "Student B",
 "Student C",
 "Student D",
  "Student E",
]; //Replace values with db values , all teachers for a given insititution (access institution through session)


const [currentStudent, setStudent] = useState('');
const [currentTeacher, setTeacher] = useState('');
    const [moduleTitle, setModuleTitle] = useState('');
    const [moduleCode, setModuleCode] = useState('');
  //  let outputData = sessionStorage.getItem('loginSessionData');
 //   outputData = JSON.parse(outputData);

const [addedTeachers, setAddedTeachers] = useState([]);

const [addedStudents, setAddedStudents] = useState([]);

//const getUploadedTeacherData = (data) => {
 // console.log("File contents "+ data)
 // const currentValues = data.split(',');
 // console.log("File contents "+ currentValues)

//currentValues.map(current =>{//problem uploading file from map//////////////////////////////////////////

//    console.log("current" + current);
//    setTeacher(current);
 //   setAddedStudents([...addedStudents, {name: currentTeacher}]);
//   // setTeacher(current);
 //   //console.log(currentTeacher);
 //   //addNewTeacher();
    
 //   //addNewTeacher();
    
  //  }
// )
//};
const [uploadedTeacherData, setUploadedTeacherData] = useState([])
//const getUploadedStudentData = (data) => {console.log("File contents "+ data)};
const [uploadedStudentData, setUploadedStudentData] = useState([]);

const addModule = async () => {

  //const { password, firstname, surname, email, institution, role } = req.body;
  console.log(moduleTitle + " " + allAddedTeachers + " " + allAddedStudents + " " + session.inst + " " + moduleCode); //PASSWORD, INSTITUTION IS BLANK FOR SOME REASON<<<<<<<<<<<<<<<<<<
//  const response = await fetch("http://localhost:8081/module/create", {
 //   method: "POST",
 //   headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', Authorization: "Bearer " + ReactSession.get("token") },
 //   body: JSON.stringify({
 //     "title": moduleTitle,
 //     "description": "default description",
 //     "teachers": allAddedTeachers,
  //    "students": allAddedStudents,
  //    "assignments": [],
 //     "institutionName": session.inst,
  //    "moduleCode": moduleCode,
      
  //  })
  //});

  //const newModule = await response.json();

  setToModulesPage(true);
}
 
function addUploadedTeachers()
{
  console.log("all uploaded: " + uploadedTeacherData);
    (uploadedTeacherData).map(line =>
            {
                console.log("d " + String(line));
                //setAddedTeachers([...addedTeachers, {name: line}])
                setTeacher(String(line))
                console.log("s" + currentTeacher);
                {addNewTeacher()}
                
            })
            console.log("done! " + addedTeachers);   
}
function addUploadedStudents()
{
  console.log("all uploaded: " + uploadedStudentData);
    (uploadedStudentData).map(line =>
            {
                console.log("d " + String(line));
                //setAddedTeachers([...addedTeachers, {name: line}])
                setStudent(String(line))
                console.log("s" + currentStudent);
                {addNewStudent()}
                
            })
            console.log("done! " + addedStudents);   
}



function addNewStudent()
{
  console.log("current: " + currentStudent)
  
  if (!addedStudents.includes(currentStudent) && !uploadedStudentData.includes(currentStudent) && currentStudent != "")
  {
  setAddedStudents([...addedStudents, currentStudent]);
  }

}

function addNewTeacher()
{
  
    if (!addedTeachers.includes(currentTeacher) && !uploadedTeacherData.includes(currentTeacher) && currentTeacher != "")
    {
    setAddedTeachers([...addedTeachers, currentTeacher]);
    }
}

useEffect(() =>{
  
  var filteredUploadedStudents =uploadedStudentData.filter((t) => 
  {if (availableStudents.includes(t.replace(/^\s+|\s+$/g, '')) && (! addedStudents.includes(t.replace(/^\s+|\s+$/g, ''))))  {return t;}})

  var filteredUploadedTeachers =uploadedTeacherData.filter((t) => 
  {if (availableTeachers.includes(t.replace(/^\s+|\s+$/g, '')) && (! addedTeachers.includes(t.replace(/^\s+|\s+$/g, ''))))  {return t;}})

  var allAddedStudentDuplicates = (filteredUploadedStudents.concat(addedStudents));
  var allAddedTeacherDuplicates = (filteredUploadedTeachers.concat(addedTeachers));

  allAddedStudents = allAddedStudentDuplicates.filter((c, index) =>{return allAddedStudentDuplicates.indexOf(c) === index;});
  allAddedTeachers = allAddedTeacherDuplicates.filter((c, index) =>{return allAddedTeacherDuplicates.indexOf(c) === index;});

  allAddedStudents = allAddedStudents.map(student => (((student.split(" "))[2]).replace("(", "")).replace(")", ""));
  allAddedTeachers = allAddedTeachers.map(teacher => (((teacher.split(" "))[2]).replace("(", "")).replace(")", ""));
  
  console.log("Module Teachers:" + allAddedTeachers);
  console.log("Module Students:" + allAddedStudents);
})

useLayoutEffect(() => {

  
  const fetchData = async () => { 
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
    
    const filteredTeachers = data.users.filter(function (f) {return (f.role).toLowerCase() == "teacher"});
    const tempTeacherAccs = filteredTeachers.map(user => `${user.firstname} ${user.surname} (${user.email})` );

    const filteredStudents = data.users.filter(function (f) {return (f.role).toLowerCase() == "student"});
    const tempStudentAccs = filteredStudents.map(user => `${user.firstname} ${user.surname} (${user.email})` );

    setAvailableStudents(tempStudentAccs);
    setAvailableTeachers(tempTeacherAccs);
    //setAccs(tempAccs);

    //console.log("this " + JSON.stringify(tempAccs))
 // console.log("ran");
  };
  fetchData()
 // if (!(addedTeachers === ""))
  //{
  
   // setAddedTeachers([...addedTeachers, {addedTeachers}]);
 // }
  //addedStudents.push({name:"test"});
}, []);

return (
  <>
  {toModulesPage === false ? (
    
    <>
      
      <HeroSection prevPageName = "Admin view" prevUrl= "/adminview"></HeroSection>
    <LoginCard></LoginCard>
     
     <div className = 'py-2 dark:bg-zinc-900 h-screen'>
     {uploadedTeacherData}
        
   
        <h1 className= ' 2xl:pl-72 pl-10 py-10 2xl:text-5xl text-2xl  2xl:w-[1200px] text-slate-600 font-semibold dark:text-white rounded-2xl '> Add Module</h1> 
      

        <div className=" 2xl:ml-80 2xl:mr-80 ml-10 mr-10 2xl:px-80  bg-slate-200 px-2"> 

        <div className="2xl:flex 2xl:items-center mb-6">        
            <div className="2xl:w-1/3"></div>
            <div className=" 2xl:flex 2xl:items-center 2xl:px-8 px-1 py-5">

            <input
                    onChange = {(e2) => setModuleCode(e2.target.value)}
                    value={moduleCode}
                    required 
                    className="bg-slate-100 appearance-none border-2 border-slate-200 rounded  w-[150px] px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="moduleCode" type="text" placeholder="Module Code">
                </input>
                <input
                    onChange = {(e) => setModuleTitle(e.target.value)}
                    value={moduleTitle}
                    required 
                    className="bg-slate-100 appearance-none border-2 border-slate-200 rounded  w-[250px] px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="moduleTitle" type="text" placeholder="Module Title">
                </input>

            </div>
        </div>


        <h1 className= ' text-22xl w-[150px]  2xl:w-[1200px] text-slate-600 font-semibold dark:text-white rounded-2xl '>  Teachers: </h1> 

        <div className= "bg-slate-100 w-full p-2 flex items-center justify-between rounded ">
  <ul
        className="bg-white overflow-y-auto sticky max-h-28  w-full">
          {addedTeachers?.map((addedTeachers) => (
          <li
            key={addedTeachers}
            className="p-0 text-sm hover:bg-sky-600 hover:text-white ">
            {addedTeachers}
          
          </li>
        ))}
        {uploadedTeacherData?.map((t) => (
          
          ((availableTeachers.includes(t.replace(/^\s+|\s+$/g, ''))) === true && (! addedTeachers.includes(t.replace(/^\s+|\s+$/g, ''))))  ? (

          <li
            id="Teachers"
            key={t}
            className="p-0 text-sm hover:bg-sky-600 hover:text-white ">
            {t}
          </li>

        ):(console.log(Accs+ " didnt include " +t))
                
        ))}

  </ul>

  </div>
        <div className = "flex flex-row py-3">
        <AccountSearchBox setInstitution ={setTeacher} MemberType= "Teacher"></AccountSearchBox>
        <button onClick={addNewTeacher} className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold w-100 h-10 px-3 ml-3 rounded ">
                Add 
        </button>
        </div>
  
        <h1 className= '  text-l w-[350px] pr-16 2xl:pr-0 2xl:w-[700px] text-slate-600 font-semibold dark:text-white rounded-2xl '> Or upload .csv file of usernames to automatically add teachers: </h1> 
        <div id="teacherFileUpload" className="flex flex-row"> 
        <FileUploader UploadedData ={uploadedTeacherData => setUploadedTeacherData(uploadedTeacherData)} uploadType="modules"></FileUploader> {/*onSubmit={getUploadedTeacherData} */}
        
        </div>


        <h1 className= '  text-22xl w-[150px] 2xl:w-[1200px] text-slate-600 font-semibold dark:text-white rounded-2xl '> Students: </h1>

        <div className= "bg-slate-100 2xl:w-[500px] w-full p-2 flex items-center justify-between rounded ">
       <ul
        className="bg-white overflow-y-auto sticky max-h-28 w-full">
          {addedStudents?.map((addedStudents) => (
          
          <li
            key={addedStudents}
            className="p-0 text-sm hover:bg-sky-600 hover:text-white">
            {addedStudents}
          </li>
        ))}

      {uploadedStudentData?.map((t) => (
       
       
       ( (availableStudents.includes(t.replace(/^\s+|\s+$/g, ''))) === true && (! addedStudents.includes(t.replace(/^\s+|\s+$/g, '')))) ? (
        
      
       <li 
         id="Students"
         key={t}
         className="p-0 text-sm hover:bg-sky-600 hover:text-white ">
         
         {t}
       </li>
       
      
      
     ):(console.log(Accs+ " didnt include " +t))
     
             
     ))}
    {console.log("addedStudents: " + addedStudents)}
  </ul>
</div>

        <div className = "flex flex-row py-3">
        <AccountSearchBox setInstitution ={setStudent} MemberType= "Student"></AccountSearchBox>
        <button onClick={addNewStudent} className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold w-100 h-10 px-3 ml-3 rounded ">
                Add 
        </button>

        
        </div>

        
        <h1 className= ' text-l w-[350px] pr-16 2xl:pr-0 2xl:w-[700px] text-slate-600 font-semibold dark:text-white rounded-2xl'> Or upload .csv file of usernames to automatically add students: </h1> 
    
        <div id="studentFileUpload" className="flex flex-row"> 
        <FileUploader UploadedData ={uploadedStudentData => setUploadedStudentData(uploadedStudentData)} uploadType="modules"></FileUploader> {/*onSubmit={getUploadedTeacherData} */}
        {uploadedStudentData}
        {/*}
       <button onClick={addUploadedStudents} className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold w-100 h-8 px-3 ml-1 rounded ">
                Add All
        </button>
       */}
        </div>
  

        {/*submit button */}
        <div className="2xl:flex 2xl:items-center 2xl:px-32 pl-20 py-5">
          
            <div className="2xl:w-1/3"></div>
              <div className="2xl:w-2/3 ">
                <button onClick={addModule} className="shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded ">
                Add module
                </button>
              </div>   
            </div>
          


        </div>

 
        </div>
    
    </>

):(
<Routes>
  <Route path="/" element={<Navigate to="/modules" />} />
</Routes>)}

    </>
  )
}

export default CreateModule