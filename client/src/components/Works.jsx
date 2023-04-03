import React, { useLayoutEffect, useState } from 'react'
import WorkItem from './WorkItem'
import Modules from '../pages/Modules';
import { ReactSession } from 'react-client-session';
import { getAssignmentInfo } from '../functions/api/assignmentAPI';

function Works(mod) {
    
    //DB read in to display only assignmnets that match module id
    //var assignments = a;

    // function sortByLastId(assignments)
    // {//sorts assignments from the biggest id to the smallest id, bigger ids are assignments that were set later
    //     let sortedAssignments;
    //     sortedAssignments = assignments.sort(function(a,b){ return b.id - a.id;})
    //     return sortedAssignments
    // }
    
    // var sorted = sortByLastId(assignments);

    const [module, setModuleDetails] = useState(mod.mod);
    const [assignments, setAssignments] = useState([]);

    let session = {
        token: ReactSession.get("token"),
        accType: ReactSession.get("accType"),
        email: ReactSession.get("email"),
        inst: ReactSession.get("inst"),
        uid: ReactSession.get("uid")
    };

    // console.log(module);
    // console.log(module.assignments);
    // console.log(module.moduleId);

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

            //const data = await response.json();
            setAssignments(results);
            //console.log(results);
            //setAssignments([...assignments, data]);
        }

        //getAssignmentDetails("http://localhost:8081/assignment?assignmentId=" + module.assignments[0]);
        //let fr = "http://localhost:8081/assignment?assignmentID=" + module.assignments[i];

        getAssignmentDetails();
    }, []);

    //console.log(assignments);
    return (
     
        <div className = 'py-2 dark:bg-zinc-900'>
          
            <div className='pr-80 lg:pl-80 pl-16 grid grid-cols-1 gap-3'>
                {assignments.slice().reverse().map(a => (
                    
                    
                    <WorkItem key={a.assignmentId}
                              id={a.assignmentId}
                              imgUrl={a.imageURL}
                              title={a.title}
                              tech={"none"}
                              workUrl={"/upload/" + a.assignmentId}
                              dueDate={a.endDate}
                              setDate={a.startDate}
                              open= {true}
                              moduleId = {module.moduleId}
                              moduleTitle = {module.title}
                              moduleCode = {module.moduleCode}
                              description = {a.description}>
                    </WorkItem>
                   
                ))}
            </div>
        </div>
    )
}
export default Works