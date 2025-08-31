import {createAsyncThunk, createSlice, isFulfilled, isPending} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {commentService} from "../../services/commentService";

interface IState {
    trigger: boolean
    createCommentAction: boolean
}

const initialState: IState = {
    trigger: false,
    createCommentAction: false
}

const postComment = createAsyncThunk<void, { dto : { body: string }, id: string  }>(
    "commentSlice/postComment",
    async ({dto, id}, thunkAPI) => {
        try {
            await commentService.postComment(dto, id)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const commentSlice = createSlice({
    name: "commentSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addMatcher(isFulfilled(postComment), state =>{
            state.trigger = !state.trigger
            state.createCommentAction = false
        })
        .addMatcher(isPending(postComment), state =>{
            state.createCommentAction = true
        })

})

const {reducer: commentReducer, actions} = commentSlice

const commentActions = {
    ...actions,
    postComment
}

export {
    commentReducer,
    commentActions
}