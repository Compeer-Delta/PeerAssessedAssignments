import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import {ReactSession} from 'react-client-session'


const AccountSearchBox = ({setInstitution, MemberType}) => {
  const [inst, setInst] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  let session = {
    token: ReactSession.get("token"),
    accType: ReactSession.get("accType"),
    email: ReactSession.get("email"),
    inst: ReactSession.get("inst"),
  };

  async function getAllInInstitution()
  {

    var fr = "";
  fr = "http://localhost:8081/admin/getallusers?institutionName=" + session.inst; //Fetch Route
 
    const response = await fetch(fr, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + ReactSession.get("token"), 
    },
  });

    const data = await response.json();
    console.log("allTeachers" + JSON.stringify(data.users));
   // return JSON.stringify(data);
    setInst(data.users);

  }

   /*[
    {id: "1", name: "Teacher A"},
    {id: "2",name: "Teacher B"},
    {id: "3",name: "Teacher C"},
    {id: "4",name: "Teacher D"},
    {id: "5",name: "Teacher E"},
  ];*/ //Replace values with db values , all teachers for a given insititution (access institution through session)

  const allStudents = [
    {id: "1",name: "Student A"},
    {id: "2",name: "Student B"},
    {id: "3",name: "Student C"},
    {id: "4",name: "Student D"},
    {id: "5",name: "Student E"},
  ];//Replace values with db values, all students for a given insititution (access institution through session)


 
  //Used to fetch data of all institutions in ukinstitutions.JSON
  useEffect(() => {
    getAllInInstitution();
   // if (MemberType == "Teacher")
   // {setInst(allTeachers);}
   // else{setInst(allStudents);}
  }, []);

  return (
    
    <div className="w-72 h-3 font-small mb-14">
{session.inst}
      {/*clicking the drop down should open the search bar and list of options */}
      <div onClick={() => setOpen(!open)} className={`bg-slate-100 w-full p-2 flex items-center justify-between rounded ${!selected && "text-gray-700"}`}>
        {selected
          ? selected?.length > 25 ? selected?.substring(0, 25) + "...": selected: "Add " + MemberType.toString()}
        {setInstitution(selected)}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
       {/*the drop down list, displays of a max height of 32. Other options can be scrolled through*/}
      <ul
        className={`bg-white overflow-y-auto sticky ${
          open ? "max-h-24 " : "max-h-0 "
        } `}
      >

        <div className="flex items-center px-1 sticky top-0 bg-slate-100">
          <AiOutlineSearch size={18} className="text-gray-700" />
          {/*search bar*/}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Search"
            className="placeholder:text-gray-700 bg-slate-100 p-1 outline-none"
          />
        </div>

        {/* maps all data collected from uk institutions into the drop down box*/}
        
        {inst?.map((inst) => (

          inst.role === ((MemberType.toString()).toLowerCase()) ? (
          <li
            key={inst?.userId}
            className={`p-0 text-sm hover:bg-sky-600 hover:text-white
            ${
              (inst?.firstname + " " + inst?.surname + " (" + inst?.email + ")")?.toLowerCase() === selected?.toLowerCase() &&
              "bg-indigo-600 text-white"
            }
            ${
              (inst?.firstname + " " + inst?.surname + " (" + inst?.email + ")")?.toLowerCase().includes(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if ((inst?.firstname + " " + inst?.surnanme + " (" + inst?.email).toLowerCase() !== selected.toLowerCase()) {
                setSelected((inst?.firstname + " " + inst?.surname + " (" + inst?.email + ")"));
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {(inst?.firstname + " " + inst?.surname + " (" + inst?.email + ")")}
          </li>

          ):(<></>)

        ))}
      </ul>
    </div>
  );
};

export default AccountSearchBox;