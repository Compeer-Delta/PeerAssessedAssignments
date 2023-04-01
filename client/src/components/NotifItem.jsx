import React from "react";
import "../styles/notification.css";
import { useState } from "react";

//import {Link} from 'react-router-dom';

function NotifItem({ title, content, mId, uId }) {
  const messageId = mId;

  // Delete Notification from user notification list
  const deleteNotif = () => {
    console.log("Delete Notification");
    console.log(messageId);
    fetch(`http://localhost:8081/notification/${uId}/${mId}`, {
      method: "DELETE",
    }).then((response) => {
      if (response.ok) {
        console.log("Notification Deleted");
        window.location.reload();
      } else {
        console.log("Notification not deleted");
      }
    });
  };

  return (
    <a
      target="_blank"
      rel="noreferrer"
      className="bg-slate-300 dark:bg-zinc-700 rounded-lg overflow-hidden w-full"
    >
      <div className="text-gray-600 dark:text-gray-300 p-2 w-full">
        <p id="notifTitleP">
          <strong>{title}</strong>
        </p>
        <p id="notifContentP">{content}</p>

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
