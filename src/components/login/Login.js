import React from 'react'
import './Login.css'
import { Button } from '@mui/material'
import { getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { useDispatch } from 'react-redux'
function Login() {
    const dispatch = useDispatch();
    const signIn = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // const credential = GoogleAuthProvider.credentialFromResult(result);
                // const token = credential.accessToken;
                const user = result.user;
                console.log(user);
                dispatch({
                    type: "login",
                    payload: {
                     "displayName" : user.displayName,
                     "email": user.email,
                     "photoUrl": user.photoURL,   
                    }
                })
                // dispatch user deatils
            })
            .catch((error) => {
                console.log(`error Code =>  ${error.code}`);
                console.log(`error message =>  ${error.message}`);
                console.log(`Email error =>  ${error.customData.email}`);
                console.log(`Authentication error =>  ${GoogleAuthProvider.credentialFromError(error)}`);
            })
    }
  return (
    <div className='login'>
      <div className="login_container">
      <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png'  alt='icon'/>
      <Button variant='contained' color='primary' onClick={signIn} >Login</Button>
      </div>
    </div>
  )
}

export default Login
