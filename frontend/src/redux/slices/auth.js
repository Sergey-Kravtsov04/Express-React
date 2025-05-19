import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export const fetchUserData = createAsyncThunk("majors/fetchUserData",async(params)=>{
    const {data} = await instance.post('/auth/login',params);
    return data
})

export const fetchUserRegister = createAsyncThunk("majors/fetchUserRegister",async(params)=>{
    const {data} = await instance.post('/auth/register',params);
    return data
})

export const fetchUserAuth = createAsyncThunk("majors/fetchUserAuth",async()=>{
    const {data} = await instance.get('/auth/me');
    return data
})


const initialState= {
    data:null,
    status:"loading",
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:state=>{
            state.data = null
        }
    },
    extraReducers:{
        [fetchUserData.pending]:(state)=>{
            state.status = 'loading';
            state.data = null;
        },
        [fetchUserData.fulfilled]:(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchUserData.rejected]:(state)=>{
            state.status = 'error';
            state.data = null;
        },
        [fetchUserAuth.pending]:(state)=>{
            state.status = 'loading';
            state.data = null;
        },
        [fetchUserAuth.fulfilled]:(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchUserAuth.rejected]:(state)=>{
            state.status = 'error';
            state.data = null;
        },
        [fetchUserRegister.pending]:(state)=>{
            state.status = 'loading';
            state.data = null;
        },
        [fetchUserRegister.fulfilled]:(state,action)=>{
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchUserRegister.rejected]:(state)=>{
            state.status = 'error';
            state.data = null;
        },
    }
})

export const isAuthSelector = (state) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer;

export const {logout} = authSlice.actions