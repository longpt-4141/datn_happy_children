import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slicer/AuthSlicer";
import {persistStore,persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import RequestSlice from "./slicer/RequestSlicer";
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
  }

const persistedReducer = persistReducer(persistConfig, AuthSlice.reducer)

export const store = configureStore({
    reducer: {
        auth : persistedReducer,
        requests : RequestSlice.reducer
    },
    // middleware: [thunk]
})

export const persistor = persistStore(store)