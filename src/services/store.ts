import { configureStore } from '@reduxjs/toolkit'
import { rootReducer} from "./reducers";
import thunk from "redux-thunk";
import {socketMiddleware} from "./middleware/socket-middleware";
import {API_WS_URL} from "../constants/constants";
const wsActions = {
    wsInit: "WS_INIT",
    wsSendMessage: "WS_SEND_MESSAGE",
    onOpen: "WS_CONNECTION_SUCCESS",
    onClose: "WS_CONNECTION_CLOSED",
    onError: "WS_CONNECTION_ERROR",
    onMessage: "WS_GET_MESSAGE"
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(thunk).concat(socketMiddleware(API_WS_URL, wsActions)),
    devTools: true,
    enhancers: [],
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch