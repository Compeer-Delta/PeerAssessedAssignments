import React, { useState } from 'react'

import WorkItem from './WorkItem'
import works from '../data/works'

function Works() {
    
    var assignments = works;

    function sortByLastId(assignments)
    {//sorts assignments from the biggest id to the smallest id, bigger ids are assignments that were set later
        let sortedAssignments;
        sortedAssignments = assignments.sort(function(a,b){ return b.id - a.id;})
        return sortedAssignments
    }
    
    var sorted = sortByLastId(assignments);
    
    

    return (
        <div className = 'py-12 dark:bg-slate-900'>
          {
            }
            <div className='pr-80 pl-80 grid grid-cols-1 gap-3'>
                {sorted.map(work => (
                    <WorkItem key={work.id}
                              id={work.id}
                              imgUrl={work.imgUrl}
                              title={work.title}
                              tech={work.tech}
                              workUrl={"/upload/" + work.id}
                              dueDate={work.dueDate}
                              setDate={work.setDate}>
                               
                    </WorkItem>
                ))}
            </div>
        </div>
    )
}
export default Works