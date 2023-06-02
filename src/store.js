import { configureStore } from '@reduxjs/toolkit';
import { mailReducer } from './components/redux/emailReducer';
import { userReducer } from './components/redux/userReducer';
const store = configureStore({
    reducer:{
        mail: mailReducer,
        user: userReducer,
    },
});
export default store;
