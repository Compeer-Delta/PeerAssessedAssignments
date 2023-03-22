import React, { useState } from 'react'

import WorkItem from './WorkItem'
import works from '../data/works'

function Works({ assignments }) {

    // function sortByLastId(assignments)
    // {//sorts assignments from the biggest id to the smallest id, bigger ids are assignments that were set later
    //     let sortedAssignments;
    //     sortedAssignments = assignments.sort(function(a,b){ return b.id - a.id;})
    //     return sortedAssignments
    // }
    
    // var sorted = sortByLastId(assignments);

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