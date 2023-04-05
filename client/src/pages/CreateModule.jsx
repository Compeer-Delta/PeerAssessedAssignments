/**
 * Credit:
 * Functionality: Hathan Khatkar
 * API Fetches: Hathan Khatkar
 */
import React, { useEffect } from "react";
import HeroSection from "../components/HeroSection";
import { useRef, useState, useLayoutEffect } from "react";
import AccountSearchBox from "../components/AccountSearchBox";
import FileUploader from "../components/FileUploader";
import LoginCard from "../components/LoginCard";
import { ReactSession } from "react-client-session";
import { Navigate, Route, Routes } from "react-router-dom";
import { getAllInInstitution } from "../functions/api/adminAPI";
import { createModule } from "../functions/api/moduleAPI";
//imports

function CreateModule() {
  let session = {
    token: ReactSession.get("token"),
    accType: ReactSession.get("accType"),
    email: ReactSession.get("email"),
    inst: ReactSession.get("inst"),
  };
  //session data

  var allAddedStudents, allAddedTeachers;
  const [toModulesPage, setToModulesPage] = useState(false);
  const [Accs, setAccs] = useState([]);
  //all combined accounts

  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  //all students / teachers in an institution

  const [currentStudent, setStudent] = useState("");
  const [currentTeacher, setTeacher] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleCode, setModuleCode] = useState("");

  const [addedTeachers, setAddedTeachers] = useState([]);
  const [addedStudents, setAddedStudents] = useState([]);
  //manually added users using the dropdown box

  const [uploadedTeacherData, setUploadedTeacherData] = useState([]);
  const [uploadedStudentData, setUploadedStudentData] = useState([]);
  //uploaded users using a CSV file

  const addModule = async () => {
    //API call for adding a new module details to the database
    console.log(
      moduleTitle +
        " " +
        allAddedTeachers +
        " " +
        allAddedStudents +
        " " +
        session.inst +
        " " +
        moduleCode
    ); 
    // Create a new module
    const response = await createModule(
      moduleTitle,
      "default description",
      allAddedTeachers,
      allAddedStudents,
      [],
      session.inst,
      moduleCode
    );

    const newModule = await response.json();
    setToModulesPage(true);
    //true so that we return to the modules page after creating
  };

  //function for adding a new student
  function addNewStudent() {
    console.log("current: " + currentStudent);
    //checks if the student is not already added in the list of added and uploaded students before appending
    if (
      !addedStudents.includes(currentStudent) &&
      !uploadedStudentData.includes(currentStudent) &&
      currentStudent != ""
    ) {
      setAddedStudents([...addedStudents, currentStudent]);
    }
  }

  //function for adding a new teacher
  function addNewTeacher() {
    //checks if the teacher is not already added in the list of added and uploaded teachers before appending
    if (
      !addedTeachers.includes(currentTeacher) &&
      !uploadedTeacherData.includes(currentTeacher) &&
      currentTeacher != ""
    ) {
      setAddedTeachers([...addedTeachers, currentTeacher]);
    }
  }

  //use effect will be called each render to filter out duplicate data the user tries to enter, so that no duplicates are sent to the API
  //also ensures they are in the list of available students/ teachers
  useEffect(() => {
    //students filter
    var filteredUploadedStudents = uploadedStudentData.filter((t) => {
      if (
        availableStudents.includes(t.replace(/^\s+|\s+$/g, "")) &&
        !addedStudents.includes(t.replace(/^\s+|\s+$/g, ""))
      ) {
        return t;
      }
    });

    //teacher filter
    var filteredUploadedTeachers = uploadedTeacherData.filter((t) => {
      if (
        availableTeachers.includes(t.replace(/^\s+|\s+$/g, "")) &&
        !addedTeachers.includes(t.replace(/^\s+|\s+$/g, ""))
      ) {
        return t;
      }
    });

    //concatenates all uploaded and added data to form one array of data needed to be sent to the DB
    var allAddedStudentDuplicates =
      filteredUploadedStudents.concat(addedStudents);
    var allAddedTeacherDuplicates =
      filteredUploadedTeachers.concat(addedTeachers);

    allAddedStudents = allAddedStudentDuplicates.filter((c, index) => {
      return allAddedStudentDuplicates.indexOf(c) === index;
    });
    allAddedTeachers = allAddedTeacherDuplicates.filter((c, index) => {
      return allAddedTeacherDuplicates.indexOf(c) === index;
    });

    allAddedStudents = allAddedStudents.map((student) =>
      student.split(" ")[2].replace("(", "").replace(")", "")
    );
    allAddedTeachers = allAddedTeachers.map((teacher) =>
      teacher.split(" ")[2].replace("(", "").replace(")", "")
    );

    console.log("Module Teachers:" + allAddedTeachers);
    console.log("Module Students:" + allAddedStudents);
  });

  
  useLayoutEffect(() => {
    //API call to fetch all teachers and student information in an institution
    const fetchData = async () => {
      const response = await getAllInInstitution(
        session.inst,
        ReactSession.get("token")
      );

      const data = await response.json();

      //separates teachers and student data by filtering by role
      const filteredTeachers = data.users.filter(function (f) {
        return f.role.toLowerCase() == "teacher";
      });
      const tempTeacherAccs = filteredTeachers.map(
        (user) => `${user.firstname} ${user.surname} (${user.email})`
      );

      const filteredStudents = data.users.filter(function (f) {
        return f.role.toLowerCase() == "student";
      });
      const tempStudentAccs = filteredStudents.map(
        (user) => `${user.firstname} ${user.surname} (${user.email})`
      );

      setAvailableStudents(tempStudentAccs);
      setAvailableTeachers(tempTeacherAccs);
      
    };
    fetchData();
  }, []);

  return (
    <>
      {/* Render main create module page if toModulePage is false*/} 
      {toModulesPage === false ? (
        <>
          {/* Hero section contains link back to admin view*/}
          <HeroSection
            prevPageName="Admin view"
            prevUrl="/adminview"
          ></HeroSection>
          <LoginCard></LoginCard>

          <div className="py-2 dark:bg-zinc-900 h-screen">
            {/* Page title */}
            <h1 className=" 2xl:pl-72 pl-10 py-10 2xl:text-5xl text-2xl  2xl:w-[1200px] text-slate-600 font-semibold dark:text-white rounded-2xl ">
              {" "}
              Add Module
            </h1>

            <div className=" 2xl:ml-80 2xl:mr-80 ml-10 mr-10 2xl:px-80  bg-slate-200 px-2">
              {/* Field for module code */}
              <div className="2xl:flex 2xl:items-center mb-6">  
                <div className=" ml-10 2xl:flex 2xl:items-center 2xl:px-8 px-1 py-5">
                  <input
                    onChange={(e2) => setModuleCode(e2.target.value)}
                    value={moduleCode}
                    required
                    className="bg-slate-100 appearance-none border-2 border-slate-200 rounded  w-[150px] px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                    id="moduleCode"
                    type="text"
                    placeholder="Module Code"
                  ></input>
                  {/* Field for module title */}
                  <input
                    onChange={(e) => setModuleTitle(e.target.value)}
                    value={moduleTitle}
                    required
                    className="bg-slate-100 appearance-none border-2 border-slate-200 rounded  w-[250px] px-3 py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500"
                    id="moduleTitle"
                    type="text"
                    placeholder="Module Title"
                  ></input>
                </div>
              </div>

              {/* All teachers displayed here */}
              <h1 className=" text-22xl w-[150px]  2xl:w-[1200px] text-slate-600 font-semibold dark:text-white rounded-2xl ">
                {" "}
                Teachers:{" "}
              </h1>

              <div className="bg-slate-100 w-full p-2 flex items-center justify-between rounded ">
                <ul className="bg-white overflow-y-auto sticky max-h-28  w-full">
                  {/* Maps all added teachers to be displayed in the view box */}
                  {addedTeachers?.map((addedTeachers) => (
                    <li
                      key={addedTeachers}
                      className="p-0 text-sm hover:bg-sky-600 hover:text-white "
                    >
                      {addedTeachers}
                    </li>
                  ))}
                  {/* Maps all uploaded teachers to be displayed in view box*/}
                  {uploadedTeacherData?.map((t) =>
                    availableTeachers.includes(t.replace(/^\s+|\s+$/g, "")) ===
                      true &&
                    !addedTeachers.includes(t.replace(/^\s+|\s+$/g, "")) ? (
                      <li
                        id="Teachers"
                        key={t}
                        className="p-0 text-sm hover:bg-sky-600 hover:text-white "
                      >
                        {t}
                      </li>
                    ) : (
                      console.log(Accs + " didnt include " + t)
                    )
                  )}
                </ul>
              </div>
              {/* Drop down search box for finding and adding a teachers*/}
              <div className="flex flex-row py-3">
                <AccountSearchBox
                  setInstitution={setTeacher}
                  MemberType="Teacher"
                ></AccountSearchBox>
                <button
                  onClick={addNewTeacher}
                  className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold w-100 h-10 px-3 ml-3 rounded "
                >
                  Add
                </button>
              </div>

              {/* Upload file button for uploaded a csv file containing list of teachers to add*/}
              <h1 className="  text-l w-[350px] pr-16 2xl:pr-0 2xl:w-[700px] text-slate-600 font-semibold dark:text-white rounded-2xl ">
                {" "}
                Or upload .csv file of usernames to automatically add teachers:{" "}
              </h1>
              <div id="teacherFileUpload" className="flex flex-row">
                <FileUploader
                  UploadedData={(uploadedTeacherData) =>
                    setUploadedTeacherData(uploadedTeacherData)
                  }
                  uploadType="modules"
                ></FileUploader>{" "}
              </div>

              {/* All students displayed here */}
              <h1 className="  text-22xl w-[150px] 2xl:w-[1200px] text-slate-600 font-semibold dark:text-white rounded-2xl ">
                {" "}
                Students:{" "}
              </h1>
               {/* Maps all added students to be displayed in the view box */}     
              <div className="bg-slate-100 2xl:w-[500px] w-full p-2 flex items-center justify-between rounded ">
                <ul className="bg-white overflow-y-auto sticky max-h-28 w-full">
                  {addedStudents?.map((addedStudents) => (
                    <li
                      key={addedStudents}
                      className="p-0 text-sm hover:bg-sky-600 hover:text-white"
                    >
                      {addedStudents}
                    </li>
                  ))}
                  {/* Maps all uploaded students to be displayed in view box*/}
                  {uploadedStudentData?.map((t) =>
                    availableStudents.includes(t.replace(/^\s+|\s+$/g, "")) ===
                      true &&
                    !addedStudents.includes(t.replace(/^\s+|\s+$/g, "")) ? (
                      <li
                        id="Students"
                        key={t}
                        className="p-0 text-sm hover:bg-sky-600 hover:text-white "
                      >
                        {t}
                      </li>
                    ) : (
                      console.log(Accs + " didnt include " + t)
                    )
                  )}
                  {console.log("addedStudents: " + addedStudents)}
                </ul>
              </div>
               {/* Drop down search box for finding and adding a students*/}         
              <div className="flex flex-row py-3">
                <AccountSearchBox
                  setInstitution={setStudent}
                  MemberType="Student"
                ></AccountSearchBox>
                <button
                  onClick={addNewStudent}
                  className="shadow bg-indigo-500 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold w-100 h-10 px-3 ml-3 rounded "
                >
                  Add
                </button>
              </div>
              {/* Upload file button for uploaded a csv file containing list of students to add*/}    
              <h1 className=" text-l w-[350px] pr-16 2xl:pr-0 2xl:w-[700px] text-slate-600 font-semibold dark:text-white rounded-2xl">
                {" "}
                Or upload .csv file of usernames to automatically add students:{" "}
              </h1>

              <div id="studentFileUpload" className="flex flex-row">
                <FileUploader
                  UploadedData={(uploadedStudentData) =>
                    setUploadedStudentData(uploadedStudentData)
                  }
                  uploadType="modules"
                ></FileUploader>{" "}
               
                
              </div>

              {/*submit button */}
              <div className="2xl:flex 2xl:items-center 2xl:px-32 pl-20 py-5">
                <div className="2xl:w-1/3"></div>
                <div className="2xl:w-2/3 ">
                  <button
                    onClick={addModule}
                    className="shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded "
                  >
                    Add module
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Navigate to="/modules" />} />
        </Routes>
      )}
    </>
  );
}

export default CreateModule;
