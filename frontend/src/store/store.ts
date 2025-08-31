import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slices/authSlice";
import {orderReducer} from "./slices/orderSlice";
import {commentReducer} from "./slices/commentSlice";
import {groupReducer} from "./slices/groupSlice";
import {userReducer} from "./slices/userSlice";
import {loadingReducer} from "./slices/loadingSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        order: orderReducer,
        comment: commentReducer,
        group: groupReducer,
        user: userReducer,
        loading: loadingReducer,
    }
})
export {
    store
}