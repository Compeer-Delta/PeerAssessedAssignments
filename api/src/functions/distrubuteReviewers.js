// This function is used to distrubute reviewers for each submission to review for a given assignment
import Assignment from "../schemas/assignment";

// numOfReviewers is the number of reviewers for each submission
// assignmentId is the id of the assignment
export function distrubuteReviewersr(numOfReviewers, assignmentId){
    const submissions = Assignment.findOne({assignmentId: assignmentId}).submissions;
    console.log(submissions);
    const distributedReviewers = [];
    for (let i = 0; i<submissions.length; i++){
        const chunk = submissions.slice(i * numOfReviewers, i * numOfReviewers +numOfReviewers);
        distributedReviewers.push(chunk);
    }
    console.log(distributedReviewers)
    return distributedReviewers;
}