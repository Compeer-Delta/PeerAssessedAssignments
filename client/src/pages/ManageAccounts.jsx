/**
 * Credit:
 * Functionality: Hathan Khatkar
 * API Fetches: Hathan Khatkar
 */
import React from "react";
import HeroSection from "../components/HeroSection";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import FileUploader from "../components/FileUploader";
import LoginCard from "../components/LoginCard";
import { ReactSession } from "react-client-session";
import { createUser } from "../functions/api/userAPI";
import { getAllInInstitution } from "../functions/api/adminAPI";

function ManageAccounts() {
  let session = {
    token: ReactSession.get("token"),
    accType: ReactSession.get("accType"),
    email: ReactSession.get("email"),
    inst: ReactSession.get("inst"),
  };
  //get session data


  const [currentAccount, setAccount] = useState("");
  const [alreadyAddedAccounts, setAlreadyAddedAccounts] = useState([]);
  const [addedAccounts, setAddedAccounts] = useState([]); //{username:"Ex_Account_1", password:"pass", firstname:"Ex_First", secondname:"Ex_Second", accounttype:"Student"}
  const [uploadedAccountData, setUploadedAccountData] = useState([]);
  const [allAddedAccounts, setAllAddedAccounts] = useState([]);
  //current account is the current account selected from the dropdown
  //alreadyAddedAccounts are accounts retrieved from database
  //upoadedAccountsData is uploaded csv accounts

  //use effect is used to manage duplicates and filter accounts in the proper format to be added to the database
  useEffect(() => {
 
    //concatenates the accounts from DB and recently uploaded accounts then filters out any duplicates so two of the same account arent added
    var allAddedAccountDuplicates =
      alreadyAddedAccounts.concat(uploadedAccountData);
    var allAddedAccountsTemp = allAddedAccountDuplicates.filter((c, index) => {
      return allAddedAccountDuplicates.indexOf(c) === index;
    });
    
    allAddedAccountsTemp = allAddedAccounts.filter((account) => {
      if (!alreadyAddedAccounts.includes(account)) {
        return account;
      }
    });

    console.log("Accounts:" + allAddedAccounts);
  }, []);


  useLayoutEffect(() => {
    const fetchAccountData = async () => {
      // return all accounts for a given institution
      const response = await getAllInInstitution(session.inst, session.token);
      const data = await response.json();
      const tempAccs = data.users.map(
        (user) => `${user.email} ${user.firstname} ${user.surname} ${user.role}`
      );

      //console.log("accData" + JSON.stringify(tempAccs));
      setAlreadyAddedAccounts(tempAccs);
      //console.log("this " + JSON.stringify(tempAccs));
    
    };
    fetchAccountData();
  }, []);

  const addNewAccounts = async () => {
   
    //loop through uploadedAccountData and store all accounts that are new and update ones that have been changed
    //write values moduleTitle, addedStudents and addedTeachers
    console.log(uploadedAccountData);
    
    for (let i = 0; i < uploadedAccountData.length; i++) {

      //For debugging purposes we can display in console each field of uploaded account data
      //console.log(uploadedAccountData[i][0].replace(" ", ""));
      //console.log(uploadedAccountData[i][1].replace(" ", ""));
      //console.log(uploadedAccountData[i][2].replace(" ", ""));
      //console.log(uploadedAccountData[i][3].replace(" ", ""));
      //console.log(uploadedAccountData[i][4].replace(" ", "").replace("/r", ""));
      //console.log(session.inst);

      // register new user
      //Api call to createUser to send user information to backend
      const response = await createUser(
        uploadedAccountData[i][1].replace(" ", ""),
        uploadedAccountData[i][2].replace(" ", ""),
        uploadedAccountData[i][3].replace(" ", ""),
        uploadedAccountData[i][0].replace(" ", ""),
        session.inst,
        uploadedAccountData[i][4].replace(" ", "").replace("/r", "")
      );
      const newAccount = await response.json();

    }
  };


  return (
    <>
      {/* Herosection previous page goes back to admin view */}
      <HeroSection prevPageName="Admin view" prevUrl="/adminview"></HeroSection>
      <LoginCard></LoginCard>

      {/* Page title*/}
      <div className="py-2 dark:bg-zinc-900 h-screen">
        <h1 className="  2xl:pl-72 pl-10 py-10 2xl:text-5xl text-2xl  2xl:w-[1200px] text-slate-600 font-semibold dark:text-white rounded-2xl  ">
          {" "}
          Add Accounts
        </h1>

        <div className="  2xl:ml-80 2xl:mr-80 ml-10 mr-10 2xl:px-80  bg-slate-200 px-2">
          <h1 className=" text-2xl w-[100px] text-slate-600 font-semibold dark:text-white rounded-md pb-4">
            {" "}
            Accounts:{" "}
          </h1>


          <div className="bg-slate-100 w-full p-2 flex items-center justify-between rounded ">
            <ul className="bg-white overflow-y-auto sticky max-h-28  w-full">
              {/* Displays all accounts retrieved from database as a row of fields email, name and account type*/}
              {alreadyAddedAccounts?.map((addedAccounts) => (
                <li
                  key={addedAccounts.split(" ")[0]}
                  className="p-0 text-sm hover:bg-sky-600 hover:text-white "
                >
                  {"Email: " +
                    addedAccounts.split(" ")[0] +
                    "| Name: " +
                    addedAccounts.split(" ")[1] +
                    " " +
                    addedAccounts.split(" ")[2] +
                    "| Account: " +
                    addedAccounts.split(" ")[3]}
                </li> //LOAD INTO addedAccounts the DB data
              ))}
              {/* Display accounts that have just been uploaded using a csv file in the same format */}
              {uploadedAccountData?.map((t) => (
                <li
                  key={t}
                  id="Accounts"
                  className="p-0 text-sm hover:bg-sky-600 hover:text-white "
                >
                  {"Email: " +
                    t[0] +
                    "| Name: " +
                    t[2] +
                    " " +
                    t[3] +
                    "| Account: " +
                    t[4]}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Csv file uploader button and prompt stores returned data into use state for uploaded account data*/}
          <h1 className="  text-l w-[270px] md:w-[700px] text-slate-600 font-semibold dark:text-white rounded-md ">
            {" "}
            Upload .csv file of format: firstname, secondname, username,password
            and account type (student / teacher) to add accounts. Use a separate
            line for each account:{" "}
          </h1>
          <div id="accountsFileUpload" className="flex flex-row">
            <FileUploader
              UploadedData={(uploadedAccountData) =>
                setUploadedAccountData(uploadedAccountData)
              }
              uploadType="accounts"
            ></FileUploader>{" "}
           
          </div>

          {/*submit button */}
          <div className="md:flex md:items-center sm:pl-18 py-5">
            <div className="md:w-[0px]"></div>
            <div className="w-[200px] ">
              <button
                onClick={addNewAccounts}
                className=" shadow bg-green-700 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded "
              >
                Confirm changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ManageAccounts;
