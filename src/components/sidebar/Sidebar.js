import React from 'react'
import './Sidebar.css';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InboxIcon from '@mui/icons-material/Inbox';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LabelImportantIcon from '@mui/icons-material/LabelImportant';
import NearMeIcon from '@mui/icons-material/NearMe';
import NoteIcon from '@mui/icons-material/Note';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import DuoIcon from '@mui/icons-material/Duo';
import PhoneIcon from '@mui/icons-material/Phone';
import SideBarOption from './sidebar options/SideBarOption';
import { useDispatch } from 'react-redux';

function Sidebar() {
    const dispatch = useDispatch();

    return (
        <div className='sidebar'>
            <Button
                startIcon={<AddIcon sx={{fontSize:'35px'}}/>}
                className='sidebar-compose'
                onClick={()=> dispatch({
                    type:"componseMailOpen"
                })}
                >
                Compose
            </Button>
            <SideBarOption Icon={InboxIcon} title ="inbox" number = {54} selected ={true}/>
            <SideBarOption Icon={StarIcon} title ="Started" number = {54}selected ={false} />
            <SideBarOption Icon={AccessTimeIcon} title ="Snoozed" number = {54}selected ={false} />
            <SideBarOption Icon={LabelImportantIcon} title ="Imortant" number = {54}selected ={false} />
            <SideBarOption Icon={NearMeIcon} title ="Sent" number = {54}selected ={false} />
            <SideBarOption Icon={NoteIcon} title ="Drafts" number = {54}selected ={false} />
            <SideBarOption Icon={ExpandMoreIcon} title ="More" number = {54}selected ={false} />
            <div className="sidebar-footer">
                <div className="sidebar-footer-icon">
                    <IconButton>
                        <PersonIcon />
                    </IconButton>
                    <IconButton>
                        <DuoIcon />
                    </IconButton>
                    <IconButton>
                        <PhoneIcon />
                    </IconButton>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
