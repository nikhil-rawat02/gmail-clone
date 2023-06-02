import React from 'react'
import './navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AppsIcon from '@mui/icons-material/Apps';
import NotificationsIcon from '@mui/icons-material/Notifications';

import { IconButton, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';

import { getAuth} from 'firebase/auth'
import { useDispatch } from 'react-redux';
function Navbar() {
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const logout = () => {
        console.log("logout call")
        const auth = getAuth();
        auth.signOut()
        .then(()=>{
            dispatch({
                type: "logout"
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }
    return (
        <div className='navbar'>
            <div className="navbar-left">
                <IconButton>
                    <MenuIcon sx={{fontSize:'35px'}} />
                </IconButton>
                <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png'  alt='icon'/>
            </div>
            <div className="navbar-middle">
                <SearchIcon />
                <input type="text" placeholder='Search mail' />
                <ArrowDropDownIcon className='navbar-inputCaret'/>
            </div>

            <div className="navbar-right">
            <IconButton>
                <AppsIcon />
            </IconButton>
            <IconButton>
                <NotificationsIcon />
            </IconButton>
            <Avatar className='avatar'
            src={user?user.photoUrl : null}
            onClick ={logout}
            />
            </div>
        </div>
    )
}

export default Navbar
