import React from 'react'
import './EmailRow.css'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import { IconButton } from '@mui/material'

import {useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
function EmailRow({ id, title, subject, description, time }) {
    const navigate = useNavigate();
const dispatch = useDispatch();
    const openMail = () =>{
        dispatch({
            type: "selectMail",
            payload: {
                id,
                title,
                subject,
                description,
                time
            }
        })
        navigate("/mail");
    };
    return (
        <div onClick={openMail} className='email-row'>
            <div className="email-row-options">
                <IconButton>
                    <CheckBoxOutlineBlankIcon sx={{color:'black'}}/> 
                </IconButton>
                <IconButton>
                    <StarBorderIcon />
                </IconButton>
                <IconButton>
                    <LabelImportantIcon />
                </IconButton>
            </div>

            <h3 className="email-row-title" >{title} </h3>

            <div className="email-row-message">
                <h4>{subject}{" "}
                    <span className="email-row-description">
                        -{" "}{description}
                    </span>
                </h4>

            </div>
            <p className="email-row-time">
                {time}
            </p>
        </div>
    )
}

export default EmailRow
