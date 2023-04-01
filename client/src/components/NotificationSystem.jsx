import React, { useState, useEffect } from "react";
import NotifItem from "./NotifItem";

function NotificationSystem() {
  const [notifications, setNotifications] = React.useState([]);
  const uid = ReactSession.get("uid");

  // Get all notifications for user
  useEffect(() => {
    const response = async () => {
      const response = fetch(`http://localhost:8081/notification/${uid}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + ReactSession.get("token"),
        },
      });
      setNotifications(await response.json());
    };
    response();
  }, [uid]);

  return (
    <div className="py-12 dark:bg-zinc-900">
      <div className="pr-80 pl-80 grid grid-cols-1 gap-3">
        {notifications.map((notif) => (
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
