import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    modal: false,
    boardArray: [
        {
            boardId: 'board-0',
            boardName: '첫 번째 게시물',
            list: [
                {
                    listId: 'List-0',
                    ListName: "List 1"
                }
            ]
        }
    ]
}

const boardsSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {

    }
})

export const boardsReducer = boardsSlice.reducer;