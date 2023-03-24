import React, { useLayoutEffect, useState } from 'react'

import WorkItem from './WorkItem'
import works from '../data/works'
import Modules from '../pages/Modules';

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

    console.log(module);
    console.log(module.assignments);
    console.log(module.moduleId);

    useLayoutEffect(() => {

        const assignmentIds = module.assignments;
        const moduleId = module.moduleId;

        //Make a call to this for each id w/in assignmentIds
        const getAssignmentDetails = async (fr) => {
            const response = await fetch(fr, {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + ReactSession.get("token"),
                }
            });

            const data = await response.json();
            setAssignments([...assignments, data]);
        }

        for(const i = 0; i < assignmentIds.length; i++) {
            const fr = "http://localhost:8081/?moduleId=" + moduleId + "&assignmentID=" + assignmentIds[i];
            getAssignmentDetails(fr);
        }
    }, []);

    return (
        <div className = 'py-2 dark:bg-zinc-900'>
          {
            }
            <div className='pr-80 lg:pl-80 pl-16 grid grid-cols-1 gap-3'>
                {assignments.map(work => (
                    <WorkItem key={work.id}
                              id={work.id}
                              imgUrl={work.imgUrl}
                              title={work.title}
                              tech={work.tech}
                              workUrl={"/upload/" + work.id}
                              dueDate={work.dueDate}
                              setDate={work.setDate}
                              open= {work.open}
                              moduleId = {work.moduleId}
                              moduleTitle = {modulename}>
                    </WorkItem>
                ))}
            </div>
        </div>
    )
}
export default Works