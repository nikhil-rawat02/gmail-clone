import React from 'react'
import './SendMail.css'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { setDoc, doc, Timestamp,getDocs, collection , orderBy, query } from 'firebase/firestore/lite';
import { db } from '../../firebase';

function SendMail() {

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const dispatch = useDispatch();

    function getDateAndTimeFromFirebaseServer() {
        const seconds = Timestamp.fromDate(new Date());
        const date = new Date(1970, 0, 1);
        date.setSeconds(seconds);
        date.setFullYear(date.getFullYear() - 1970);
        return date;
    }
    
    const handleSubmitButtonFunction = async (formData) => {

        const date = getDateAndTimeFromFirebaseServer();
        const id = Math.random().toString().substring(2);
        
        const docRef = doc(db, "email", id); 
        const payload = {
            to: formData.toRequired,
            subject: formData.subjectRequired,
            message: formData.messageRequired,
            timestamp: date,
        };
        await setDoc(docRef, payload);

        dispatch({
            type: "componseMailclose",
        })
            
        // get all mails from firebase

        const q = query(collection(db, "email"), orderBy("timestamp", "desc"));
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
            // updated redux 
            dispatch({
                type:"loadInbox",
                payload:setEmailsObject,
            })
        }).catch(error => 
            console.log(error)
        )
    }
    return (
        <div className='send-mail'>
            <div className="send-mail-header">
                <h3>New message</h3>
                <CloseIcon onClick={() => {
                    dispatch({
                        type: "componseMailclose"
                    })
                }
                } className="send-mail-close" />
            </div>

            <form onSubmit={handleSubmit(handleSubmitButtonFunction)}>
                <input
                    name="to"
                    type="email"
                    placeholder='To'
                    {...register('toRequired', { required: true })}
                />
                {errors.toRequired && <p className='send-mail-error'>To is Required</p>}
                <input
                    name="subject"
                    type="text"
                    placeholder='Subject'
                    {...register("subjectRequired", { required: true })}
                />
                <p>
                    {errors.subjectRequired && <p className='send-mail-error'>Subject is Required</p>}
                </p>
                <input
                    name="message"
                    type="text"
                    placeholder='Message..' className='send-mail-message'
                    {...register('messageRequired', { required: true })}
                />
                {errors.messageRequired && <p className='send-mail-error'>Message is Required</p>}

                <div className="send-mail-options">
                    <Button className='send-mail-send-btn' type='submit'>Send</Button>
                </div>
            </form>

        </div>
    )
}

export default SendMail
