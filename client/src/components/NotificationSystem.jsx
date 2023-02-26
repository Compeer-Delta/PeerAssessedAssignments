import React from 'react'
import tempNotifs from '../data/tempNotifs';
import NotifItem from './NotifItem';

function NotificationSystem() {

    const userData = JSON.parse(sessionStorage.getItem('loginSessionData'));

    return (
        <div className = 'py-12 dark:bg-slate-900'>
            <div className='pr-80 pl-80 grid grid-cols-1 gap-3'>
            {tempNotifs.map(notif => (
                    <NotifItem
                    title={notif.notifTitle}
                    content={notif.notifContent}
                    mId={notif.messageId}>
                    </NotifItem>
                ))}
            </div>
        </div>
    )
}

export default NotificationSystem