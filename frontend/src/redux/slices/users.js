import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export const fetchUsers = createAsyncThunk("users/fetchUsers",async()=>{
    const {data} = await instance.get('/users');
    return data
})

const initialState= {
    users:{
        items:[],
        status:"loading",
    },
}

const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:{
            [fetchUsers.pending]:(state)=>{
                state.users.items = [];
                state.users.status = 'loading';
            },
            [fetchUsers.fulfilled]:(state,action)=>{
                state.users.items = action.payload;
                state.users.status = 'loaded';
            },
            [fetchUsers.rejected]:(state)=>{
                state.users.items = [];
                state.users.status = 'error';
            },
        }
})

export const usersReducer = usersSlice.reducer;