import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export const fetchMajors = createAsyncThunk("majors/fetchMajors",async()=>{
    const {data} = await instance.get('/majors');
    return data
})

export const fetchRemoveMajor = createAsyncThunk("majors/fetchRemoveMajor",async(id)=>{
    await instance.delete(`/majors/${id}`);
    return id
})


const initialState= {
    majors:{
        items:[],
        status:"loading",
    },
}

const majorsSlice = createSlice({
    name:"majors",
    initialState,
    reducers:{},
    extraReducers:{
        [fetchMajors.pending]:(state)=>{
            state.majors.items = [];
            state.majors.status = 'loading';
        },
        [fetchMajors.fulfilled]:(state,action)=>{
            state.majors.items = action.payload;
            state.majors.status = 'loaded';
        },
        [fetchMajors.rejected]:(state)=>{
            state.majors.items = [];
            state.majors.status = 'error';
        },
        //
        [fetchRemoveMajor.pending]:(state,action)=>{
            console.log(state)
            state.majors.items = Object.values(state.majors.items).filter((obj)=> obj._id !== action.meta.arg)
        },
        
    }
});



export const majorsReducer = majorsSlice.reducer;