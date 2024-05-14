import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    modal: false,
    boardArray: []
}

const boardsSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {

    }
})

export const boardsReducer = boardsSlice.reducer;