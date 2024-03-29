/**
 * Credit:
 * Functionality: Hathan Khatkar
 * API fetches: Hathan Khatkar
 */
import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { ReactSession } from "react-client-session";
import { getAllInInstitution } from "../functions/api/adminAPI";
//imports

const AccountSearchBox = ({ setInstitution, MemberType }) => {
  //Account search box contains props for the Institution SETTER therefore allowing data to be returned back to its caller, and account type

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
  //get session data

  //API Call Used to fetch data of all users in an institution
  useEffect(() => {
    const allInInstitution = async () => {
      const response = await getAllInInstitution(session.inst, session.token);
      const data = await response.json();
      setInst(data.users);
    };
    allInInstitution();
  }, []);

  return (
    <div className="w-72 h-3 font-small mb-14">
      {/*clicking the drop down should open the search bar and list of options */}
      <div
        onClick={() => setOpen(!open)}
        className={`bg-slate-100 w-full p-2 flex items-center justify-between rounded ${
          !selected && "text-gray-700"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Add " + MemberType.toString()}
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

        {/* maps all data collected for each instance into the drop down box*/}
        {inst?.map((inst) =>
          inst.role === MemberType.toString().toLowerCase() ? (
            <li
              key={inst?.userId}
              className={`p-0 text-sm hover:bg-sky-600 hover:text-white
            ${
              (
                inst?.firstname +
                " " +
                inst?.surname +
                " (" +
                inst?.email +
                ")"
              )?.toLowerCase() === selected?.toLowerCase() &&
              "bg-indigo-600 text-white"
            }
            ${
              (inst?.firstname + " " + inst?.surname + " (" + inst?.email + ")")
                ?.toLowerCase()
                .includes(inputValue)
                ? "block"
                : "hidden"
            }`}
              onClick={() => {
                if (
                  (
                    inst?.firstname +
                    " " +
                    inst?.surnanme +
                    " (" +
                    inst?.email
                  ).toLowerCase() !== selected.toLowerCase()
                ) {
                  setSelected(
                    inst?.firstname +
                      " " +
                      inst?.surname +
                      " (" +
                      inst?.email +
                      ")"
                  );
                  setOpen(false);
                  setInputValue("");
                }
              }}
            >
              {inst?.firstname + " " + inst?.surname + " (" + inst?.email + ")"}
            </li>
          ) : (
            <></>
          )
        )}
      </ul>
    </div>
  );
};

export default AccountSearchBox;
