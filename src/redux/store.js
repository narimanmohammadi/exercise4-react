import { configureStore } from '@reduxjs/toolkit'
import { collegeApi } from './services/collegeApi'

const store = configureStore({
    reducer: {
        [collegeApi.reducerPath]: collegeApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(collegeApi.middleware)
});

export default store;
