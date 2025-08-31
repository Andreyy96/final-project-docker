import {createAsyncThunk, createSlice, isFulfilled} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {IManagerRes, IManagerWithStatistic} from "../../interfaces/user.interface";
import {userService} from "../../services/userService";

interface IState {
    managers: IManagerWithStatistic[]
    total: number
    limit: number
    page: number
    userTrigger: boolean
    createError: string
}

const initialState: IState = {
    managers: [],
    total: null,
    limit: null,
    page: null,
    userTrigger: false,
    createError: null,
}

const getAllManagers = createAsyncThunk<IManagerRes, {query: string}>(
    "userSlice/getAllManagers",
    async ({query}, thunkAPI) => {
        try {
            const {data} = await userService.getAllManagers(query)
            return data
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

const bannedById = createAsyncThunk<void, {userId: string}>(
    "userSlice/bannedById",
    async ({userId}, thunkAPI) => {
        try {
            await userService.bannedById(userId)

        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


const unbannedById = createAsyncThunk<void, {userId: string}>(
    "userSlice/unbannedById",
    async ({userId}, thunkAPI) => {
        try {
            await userService.unbannedById(userId)
        }
        catch (e) {
            const error = e as AxiosError
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)


const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAllManagers.fulfilled, (state, action) => {
            state.managers = action.payload.data
            state.page = action.payload.page
            state.limit = action.payload.limit
            state.total = action.payload.total
        })
        .addMatcher(isFulfilled(bannedById, unbannedById), state =>{
            state.userTrigger = !state.userTrigger
        })
})

const {reducer: userReducer, actions} = userSlice

const userActions = {
    ...actions,
    getAllManagers,
    bannedById,
    unbannedById
}

export {
    userReducer,
    userActions
}