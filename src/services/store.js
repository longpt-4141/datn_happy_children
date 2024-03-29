import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slicer/AuthSlicer";
import {persistStore,persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import RequestSlice from "./slicer/RequestSlicer";
import ReportSlice from "./slicer/ReportSlicer";
import NotificationSlice from "./slicer/NotificationSlicer";
import ArticleSlicer from "./slicer/ArticleSlicer";
import DonateSlicer from "./slicer/DonateSlicer";
import FundSlicer from "./slicer/FundSlicer";
import TopicSlicer from "./slicer/TopicSlicer";
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user'],
  }

// const reducers = combineReducers({
//     auth :AuthSlice.reducer   
//    });

const persistedReducer = persistReducer(persistConfig, AuthSlice.reducer)


export const store = configureStore({
    reducer: {
        auth : persistedReducer,
        requests : RequestSlice.reducer,
        reports: ReportSlice.reducer,
        notifications: NotificationSlice.reducer,
        articles: ArticleSlicer.reducer,
        donate: DonateSlicer.reducer,
        funds : FundSlicer.reducer,
        topics : TopicSlicer.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
    // middleware: [thunk]
})

export const persistor = persistStore(store)