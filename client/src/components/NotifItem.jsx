/**
 * Credit:
 * Functionality: Jordan D'Souza
 */
import React, { useLayoutEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import "../styles/notification.css";
import { deleteNotification } from "../functions/api/notificationAPI";
import { getAssignmentInfo } from "../functions/api/assignmentAPI";

//import {Link} from 'react-router-dom';

function NotifItem({ title, content, messageId, urgency, assignmentId, moduleId }) {

  const [assignment, setAssignment] = useState(null);

  // Delete Notification from user notification list
  const deleteNotif = async () => {
    console.log("Delete Notification");
    console.log(messageId);
    await deleteNotification(uId, mId).then((response) => {
      if (response.ok) {
        console.log("Notification Deleted");
        window.location.reload();
      } else {
        console.log("Notification not deleted");
      }
    });
  };

  useLayoutEffect(() => {
    if(assignmentId) {
      const getAssignment = async () => {
        const response = await getAssignmentInfo(
          moduleId,
          assignmentId,
          ReactSession.get("token")
        );

        const data = await response.json();
        setAssignment(data);
      }

      getAssignment();
    }
  }, []);
  
  return (
    <a
      target="_blank"
      rel="noreferrer"
      className="bg-slate-300 dark:bg-zinc-700 rounded-lg overflow-hidden w-full"
    >
      <div className={ urgency ? ("text-rose-600 dark:text-gray-300 p-2 w-full") : ("text-gray-600 dark:text-gray-300 p-2 w-full")}>
        <p id="notifTitleP">
          <strong>{title}</strong>
        </p>
        <p id="notifContentP">{content}</p>
        { assignment ? 
          (<>
          <p id="notifRefAssignment" className="text-sm"><i>See Assignment: {assignment.title}</i></p>
          </>) 
          : 
          (<></>)
        }

        <div id="buttonContainer">
          <button id="delNotifButton" onClick={deleteNotif}>
            {" "}
            Mark as Read{" "}
          </button>
        </div>
      </div>
    </a>
  );
}
export default NotifItem;
