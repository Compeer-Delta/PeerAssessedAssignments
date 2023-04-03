import React, { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection";
import Works from "../components/Works";
import StudentView from "../pages/StudentView";
import { Link, useLocation } from "react-router-dom";
import LoginCard from "../components/LoginCard";
import { ReactSession } from "react-client-session";
import { getSubmissions } from "../functions/api/submissionAPI";

function ViewSubmissions() {
  let outputData = sessionStorage.getItem("loginSessionData");
  outputData = JSON.parse(outputData);
  let session = {
    token: ReactSession.get("token"),
    accType: ReactSession.get("accType"),
    email: ReactSession.get("email"),
    inst: ReactSession.get("inst"),
    uid: ReactSession.get("uid"),
  };

  const [submissions, setSubmissions] = useState([]);
  const location = useLocation();
  const { assignmentTitle } = location.state;
  const { assignmentId } = location.state;
  const { modId } = location.state; //module id
  const { modCode } = location.state; //module id
  const { modTitle } = location.state;
  //use id / title to get peersPerSubmission to display this number of submissions
  //select peersPerSubmission from assignmentsschema where assignmentId = id in schema
  const peersPerSubmission = 3;
  const numOfSubmissions = submissions.length;

  useEffect(async () => {
    const response = await getSubmissions(assignmentId, session.token);
    const submissions = await response.json();
    console.log(submissions);
  }, [assignmentId]);

  //limit what submissions are seen based on the user id so each one person sees a unique of submissions
  //TEMPORARILY JUST DISPLAYS FIRST FEW
  function limitViewedSubmissions() {
    let arr = [];
    if (session.accType === "studentAccount") {
      /*for (var i = 0; i < numOfSubmissions; i++) {
        if (peersPerSubmission > i) {
          arr.push({
            submissionTitle: submissions[i].submissionTitle,
            submitBy: submissions[i].userId,
            numFeedback: submissions[i].feedback.length,
          });
        }
      }*/
      return submissions.slice(0, peersPerSubmission).map((submission) => {
        return {
          submissionTitle: submission.submissionTitle,
          submissionId: submission._id,
          submitBy: submission.userId,
          numFeedback: submission.feedback.length,
        };
      });
    } else {
      arr = [...submissions];
    }
    return arr;
  }

  const limitedSubmissions = limitViewedSubmissions();

  return (
    <>
      {/* {assignmentId} + {modId} + {assignmentTitle} */}
      <HeroSection
        prevPageName="Home Page"
        prevUrl={"/modules/" + modCode}
        moduleTitle={modTitle}
        moduleCode={modCode}
      ></HeroSection>
      <LoginCard />

      <h1 className=" xl:pl-72 pl-10 py-10 text-3xl xl:w-[1200px] w-[400px] text-slate-600 font-semibold dark:text-white rounded-md ">
        {" "}
        {assignmentTitle}'s Submissions
      </h1>

      <div className="overflow-x-scroll md:overflow-auto">
        <table className="table-fixed xl:w-2/3 w-[700px]  text-sm text-left text-gray-500 dark:text-gray-400 xl:ml-72 ml-10">
          <thead className="text-s text-gray-700 font-Dosis  bg-slate-50 dark:bg-gray-700 dark:text-gray-400 border-2 border-slate-900  ">
            <tr>
              <th className="px-6 py-3 border border-width-10">
                Submission Title
              </th>
              <th className="px-6 py-3 border border-width-10">Submitted by</th>
              <th className="px-6 py-3 border border-width-10">
                Feedback recieved
              </th>
              <th className="px-6 py-3 border border-width-10"></th>
            </tr>
          </thead>
          <tbody>
            {limitedSubmissions.map((submission) => (
              <tr className=" dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-200 bg-slate-100 border-2 border-slate-900">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace dark:text-white"
                >
                  {submission.submissionTitle}
                </th>
                <td class="px-6 py-4">{submission.submitBy}</td>
                <td class="px-6 py-4">{submission.numFeedback}</td>
                <td class="px-6 py-4 text-center">
                  <Link
                    to={
                      "/modules/" +
                      modId +
                      "/viewsubmissions/" +
                      assignmentId +
                      "/peerassess/" +
                      submission.submissionId
                    }
                    state={{
                      assignmentTitle: assignmentTitle,
                      assignmentId: assignmentId,
                      modId: modId,
                      modTitle: modTitle,
                      modCode: modCode,
                    }}
                    className=" font-Dosis text-blue-100 text-l bg-blue-500 border-black px-6 py-1 rounded-3xl hover:bg-blue-200 hover:text-blue-800"
                  >
                    Peer Assess
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ViewSubmissions;
