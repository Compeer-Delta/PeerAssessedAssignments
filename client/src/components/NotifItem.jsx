import React from "react";
import "../styles/notification.css";
import { useState } from "react";

//import {Link} from 'react-router-dom';

function NotifItem({ title, content, mId }) {
  const messageId = mId;

  const deleteNotif = () => {
    console.log(messageId);
    //Change to delete entry in DB, reload webpage
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
            Delete Notification{" "}
          </button>
        </div>
      </div>
    </a>
  );
}
export default NotifItem;
