import {createSlice, isFulfilled, isPending, isRejected} from "@reduxjs/toolkit";
import {orderActions} from "./orderSlice";
// import {commentActions} from "./commentSlice.ts";
// import {groupActions} from "./groupSlice.ts";
import {authActions} from "./authSlice";
// import {userActions} from "./userSlice.ts";

const {downloadExcel} = orderActions
// const {postComment} = commentActions
// const {createGroup} = groupActions
const {login} = authActions
// const {getAllManagers} = userActions

interface IState {
    isLoading: boolean
}

const initialState: IState = {
    isLoading: null
};

const loadingSlice = createSlice({
    name: 'loadingSlice',
    initialState,
    reducers: {},
    extraReducers: builder =>
        builder
            .addMatcher(isFulfilled(), state => {
                state.isLoading = false
            })
            .addMatcher(isPending(login), state => {
                state.isLoading = true
            })
            .addMatcher(isPending(downloadExcel), state => {
                state.isLoading = false
            })
            .addMatcher(isRejected(), state => {
                state.isLoading = false
            })
});

const {reducer: loadingReducer} = loadingSlice;

export {
    loadingReducer
}