import React from 'react'
import Modules from '../pages/Modules'
import HeroSection from '../components/HeroSection'
import {Link} from 'react-router-dom';
import {useRef, useState, useEffect} from 'react';
import AccountSearchBox from '../components/AccountSearchBox';
import FileUploader from '../components/FileUploader';
import LoginCard from '../components/LoginCard';

function CreateModule() {
//onSubmit={handleSubmit} 

function addModule()
{
  //adding validation later

  //write values moduleTitle, addedStudents and addedTeachers
}

const allTeachers = [
   "Teacher A",
   "Teacher B",
  "Teacher C",
  "Teacher D",
   "Teacher E",
]; //Replace values with db values , all teachers for a given insititution (access institution through session)

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
    let outputData = sessionStorage.getItem('loginSessionData');
    outputData = JSON.parse(outputData);

const [addedTeachers, setAddedTeachers] = useState([{name:"Example Teacher 1"}]);

const [addedStudents, setAddedStudents] = useState([{name:"Added Student 1"}]);

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
  var s_exists = false;
  setAddedStudents(addedStudents.map(addedStudents =>{

  if (addedStudents.name === currentStudent){
    s_exists = true;
  }
  }))

if (s_exists === false){
  setAddedStudents([...addedStudents, {name: currentStudent}]);
}
else{
  setAddedStudents([...addedStudents]);
}
}

function addNewTeacher()
{
  var t_exists = false;
  setAddedTeachers(addedTeachers.map(addedTeachers =>{

  if (addedTeachers.name === currentTeacher){
    t_exists = true;
  }
  }))

if (t_exists === false){
  setAddedTeachers([...addedTeachers, {name: currentTeacher}]);
}
else{
  setAddedTeachers([...addedTeachers]);
}
}



useEffect(() => {
  console.log("ran");
 // if (!(addedTeachers === ""))
  //{
  
   // setAddedTeachers([...addedTeachers, {addedTeachers}]);
 // }
  //addedStudents.push({name:"test"});
});

return (
    <>
      <HeroSection prevPageName = "Admin view" prevUrl= "/adminview"></HeroSection>
    <LoginCard></LoginCard>
     
     <div className = 'py-2 dark:bg-zinc-900 h-screen'>
     {uploadedTeacherData}
        
   
        <h1 className= ' 2xl:pl-72 pl-10 py-10 2xl:text-5xl text-2xl  2xl:w-[1200px] text-slate-600 font-semibold dark:text-white rounded-2xl '> Add Module</h1> 
      

        <div className=" 2xl:ml-80 2xl:mr-80 ml-10 mr-10 2xl:px-80  bg-slate-200 px-2"> 

        <div className="2xl:flex 2xl:items-center mb-6">        
            <div className="2xl:w-1/3"></div>
            <div className=" 2xl:flex 2xl:items-center 2xl:px-32 px-1 py-5">
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
            key={addedTeachers?.name}
            className="p-0 text-sm hover:bg-sky-600 hover:text-white ">
            {addedTeachers?.name}
          
          </li>
        ))}
        {uploadedTeacherData?.map((t) => (
       
          (allTeachers.includes(t.replace(/^\s+|\s+$/g, ''))) == true ? (

          <li
            key={t}
            className="p-0 text-2xl hover:bg-sky-600 hover:text-white ">
            {t}
          </li>

        ):(console.log(allTeachers+ " didnt include " +t))
                
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
        <div className="flex flex-row"> 
        <FileUploader UploadedData ={uploadedTeacherData => setUploadedTeacherData(uploadedTeacherData)} uploadType="modules"></FileUploader> {/*onSubmit={getUploadedTeacherData} */}
        
        </div>


        <h1 className= '  text-22xl w-[150px] 2xl:w-[1200px] text-slate-600 font-semibold dark:text-white rounded-2xl '> Students: </h1>

        <div className= "bg-slate-100 2xl:w-[500px] w-full p-2 flex items-center justify-between rounded ">
       <ul
        className="bg-white overflow-y-auto sticky max-h-28 w-full">
          {addedStudents?.map((addedStudents) => (
          
          <li
            key={addedStudents?.name}
            className="p-0 text-sm hover:bg-sky-600 hover:text-white">
            {addedStudents?.name}
          </li>
        ))}

      {uploadedStudentData?.map((t) => (
       
       ( allStudents.includes(t.replace(/^\s+|\s+$/g, ''))) == true ? (


       <li 
         key={t}
         className="p-0 text-2xl hover:bg-sky-600 hover:text-white ">
         
         {t}
       </li>
       
       
      
     ):(console.log(allStudents+ " didnt include " +t))
     
             
     ))}
    {console.log("addedStudents: " + addedStudents.name)}
  </ul>
</div>

        <div className = "flex flex-row py-3">
        <AccountSearchBox setInstitution ={setStudent} MemberType= "Student"></AccountSearchBox>
        <button onClick={addNewStudent} className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold w-100 h-10 px-3 ml-3 rounded ">
                Add 
        </button>

        
        </div>

        
        <h1 className= ' text-l w-[350px] pr-16 2xl:pr-0 2xl:w-[700px] text-slate-600 font-semibold dark:text-white rounded-2xl'> Or upload .csv file of usernames to automatically add students: </h1> 
    
        <div className="flex flex-row"> 
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
    
  )
}

export default CreateModule