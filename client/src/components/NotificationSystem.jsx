/**
 * Credit:
 * Functionality: Jordan D'Souza
 */
import React, { useState, useEffect } from "react";
import { ReactSession } from "react-client-session";
import NotifItem from "./NotifItem";
import { getAllNotifications } from "../functions/api/notificationAPI";

function NotificationSystem() {
  const [notifications, setNotifications] = React.useState([]);
  const uid = ReactSession.get("uid");

  // Get all notifications for user
  useEffect(() => {
    const response = async () => {
      const response = await getAllNotifications(
        uid,
        sessionStorage.getItem("token")
      );
      setNotifications(await response.json());
    };
    response();
  }, [uid]);

  return (
    <div className="py-12 dark:bg-zinc-900">
      <div className="pr-80 pl-80 grid grid-cols-1 gap-3">
        {Array.isArray(notifications) &&
          notifications.map((notif) => (
            <NotifItem
              key={notif._id}
              title={notif.notifTitle}
              content={notif.notifContent}
              mId={notif.messageId}
            ></NotifItem>
          ))}
      </div>
    </div>
  );
}

export default NotificationSystem;
