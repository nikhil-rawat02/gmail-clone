import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    inboxMail:{},
    isComposeMailOpen: false,
    selectedMail : null,
}

export const mailReducer = createReducer(initialState, {

    loadInbox : (state,action) => {
        state.inboxMail = action.payload;
    },
    selectMail: (state,action) => {
        state.selectedMail = action.payload;
    },
    componseMailOpen: (state) => {
        state.isComposeMailOpen = true;
    },
    componseMailclose: (state) => {
        state.isComposeMailOpen = false;
    },
},
);


export const selectIsComposeMailOpen = (state) => state.isComposeMailOpen
export const selectOpenMail = (state) => state.selectedMail
export default mailReducer.reducer;