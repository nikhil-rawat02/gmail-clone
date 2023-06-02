import React, { useState, useEffect } from 'react'
import './EmailList.css'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import RedoIcon from '@mui/icons-material/Redo';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import SettingsIcon from '@mui/icons-material/Settings';
import InboxIcon from '@mui/icons-material/Inbox';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import { CheckBox } from '@mui/icons-material'
import { IconButton } from '@mui/material'

import Section from './section/Section';
import EmailRow from './section/email-row/EmailRow';
import { db } from '../../firebase';
import { getDocs, collection , orderBy, query} from 'firebase/firestore/lite';
import { useSelector } from 'react-redux';

function EmailList() {
    const [emails, setEmails] = useState({});
    useEffect(() => {
        const q = query(collection(db, "email"), orderBy("timestamp", "desc"));
            console.log("in email list")
        const docSnap = getDocs(q);

        docSnap.then(data => {
            const setEmailsObject = [];
            data.docs.forEach((mail) => {
                const data = mail._document.data.value.mapValue.fields;
                const to = data.to.stringValue;
                const message = data.message.stringValue;
                const subject = data.subject.stringValue;
                const timestamp = data.timestamp.timestampValue;
                const mailDetails = {
                    "to": to,
                    "subject": subject,
                    "message": message,
                    "timestamp": timestamp,
                }
                setEmailsObject.push(mailDetails);
            })
            setEmails(setEmailsObject);
        }).catch(error => 
            console.log(error)
        )
    }, [])

    return (
        <div className='email-list'>
            <div className="email-list-settings">
                <div className='email-list-setting-left'>
                    <CheckBox />
                    <IconButton>
                        <ArrowDropDownIcon />
                    </IconButton>
                    <IconButton>
                        <RedoIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
                <div className='email-list-setting-right'>
                    <IconButton>
                        <ChevronLeftIcon />
                    </IconButton>
                    <IconButton>
                        <ChevronRightIcon />
                    </IconButton>
                    <IconButton>
                        <KeyboardHideIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                </div>
            </div>
            <div className="email-list-sections">
                <Section Icon={InboxIcon} title="Primary" color="red" selected={true} />
                <Section Icon={SupervisorAccountIcon} title="Social" color="blue" selected={false} />
                <Section Icon={LocalOfferIcon} title="Promotion" color="green" selected={false} />
            </div>
            <div className="email-list-list">
                {
                    Object.entries(emails)
                        .map(arr => (
                            <EmailRow
                                id={arr[0]}
                                key={arr[0]}
                                title={arr[1].to}
                                subject={arr[1].subject}
                                description={arr[1].message}
                                time={arr[1].timestamp.toString()}
                            />
                        ))
                }
            </div>
        </div>
    )
}

export default EmailList
