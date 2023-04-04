/**
 * Credit:
 * Functionality: Jordan D'Souza
 */
import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { ReactSession } from "react-client-session";
import { getUserModules } from "../functions/api/moduleAPI";;

const ModuleSearchBox = ({selectedModule}) => {

  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [moduleGroups, setModuleGroups] = useState();

  let session = {
    token: ReactSession.get("token"),
    accType: ReactSession.get("accType"),
    email: ReactSession.get("email"),
    inst: ReactSession.get("inst"),
  };

  useEffect(() => {
    const populateGroups = async() => {
      const response = await getUserModules(session.email, session.token);
      const details = await response.json();
      setModuleGroups(details);
    };

    populateGroups();
    //console.log("USE EFFECT TRIGGERED")
  }, []);

  return(

  <div className="w-72 h-3 font-small mb-14">
    <div
      onClick={(e) => setOpen(!open)}
      className={`bg-slate-100 w-full p-2 flex items-center justify-between rounded ${
      !selected && "text-gray-700"
      }`}
    >
      {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Add: NULLVAL"}
        {setSelectedModule(selected)}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
    </div>

    <div className="flex items-center px-1 sticky top-0 bg-slate-100">
      <AiOutlineSearch size={18} className="text-gray-700" />
      {/*search bar*/}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search"
        className="placeholder:text-gray-700 bg-slate-100 p-1 outline-none"
      />
    </div>

    {moduleGroups?.map((module) => 
      <li
        key = {module.moduleId}
        id = {module.title}
        value = {module.students}
        className = {`p-0 text-sm hover:bg-sky-600 hover:text-white
        ${
          module?.title?.toLowerCase() === selected?.toLowerCase() && "bg-indigo-600 text-white"
        }
        ${
          module?.title?.toLowerCase().includes(inputValue)
            ? "block"
            : "hidden"
        }`}
        onClick = {(e) => {
          if(module?.title?.toLowerCase() !== selected.toLowerCase()) {
            setSelected(e.target.value);
            setOpen(false);
            setInputValue("");
          }
        }}
      >
        {module.title}
      </li>
    )}
  </div>

  )
}

export default ModuleSearchBox;
