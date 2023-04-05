/**
 * Credit:
 * Functionality: Hathan Khatkar
 * Middleware fetches: Jordan D'Souza
 */
import React, { useLayoutEffect, useState } from "react";
import WorkItem from "./WorkItem";
import { ReactSession } from "react-client-session";
import { getAssignmentInfo } from "../functions/api/assignmentAPI";
//imports

function Works(mod) {
  const [module, setModuleDetails] = useState(mod.mod);
  const [assignments, setAssignments] = useState([]);

  let session = {
    token: ReactSession.get("token"),
    accType: ReactSession.get("accType"),
    email: ReactSession.get("email"),
    inst: ReactSession.get("inst"),
    uid: ReactSession.get("uid"),
  };
  //get session data

  //Middleware call to get all assignments for a specific module
  useLayoutEffect(() => {
    const moduleId = module.moduleId;
    //Make a call to this for each id w/in module.assignments
    const getAssignmentDetails = async () => {
      const results = await Promise.all(
        module.assignments.map(async (id) => {
          const response = await getAssignmentInfo(moduleId, id, session.token);

          const data = await response.json();
          return data;
        })
      );
      setAssignments(results);
    };
    getAssignmentDetails();
  }, []);

  return (
    <div className="py-2 dark:bg-zinc-900">
      <div className="pr-80 lg:pl-80 pl-16 grid grid-cols-1 gap-3">
        {/* Map all assignments into a list of Work Item objects that will style each assignment accordingly */}
        {assignments
          .slice()
          .reverse()
          .map((a) => (
            <WorkItem
              key={a.assignmentId}
              id={a.assignmentId}
              imgUrl={a.imageURL}
              title={a.title}
              tech={"none"}
              workUrl={"/upload/" + a.assignmentId}
              dueDate={a.endDate}
              setDate={a.startDate}
              open={true}
              moduleId={module.moduleId}
              moduleTitle={module.title}
              moduleCode={module.moduleCode}
              description={a.description}
            ></WorkItem>
          ))}
      </div>
    </div>
  );
}
export default Works;
