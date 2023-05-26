import {createSlice} from "@reduxjs/toolkit";

const initialState={
    token:null,
    userDetail:null,
    users:[],
    admin:null,
    adminToken:null
}

const userSlice=createSlice({
    name: "user",
    initialState,
    reducers:{
        setLogin:(state, action)=>{
            state.token=action.payload.token;
            state.userDetail=action.payload.userDetail;
        },

        setLogOut:(state, action)=>{
            state.token=null;
            state.userDetail=null;
            state.admin=null;
            state.adminToken=null;
        },

        getUsers: (state, action)=>{
            state.users=action.payload.users;
        },

        setUserDetail:(state, action)=>{
            state.userDetail=action.payload.userDetail;

        },

        setAdmin:(state, action)=>{
            state.adminToken=action.payload.adminToken;
            state.admin=action.payload.admin;
        }

    }

})

export const {setLogin, setLogOut, getUsers, setUserDetail, setAdmin} = userSlice.actions;
export default userSlice.reducer;