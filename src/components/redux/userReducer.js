import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    user:null,
}

export const userReducer = createReducer(initialState,{

    login: (state, action) => {
        state.user = action.payload;
    },
    logout: state => {
        state.user = null;
    },
})

export const selectUser = state =>  state.user

