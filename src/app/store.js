import {configureStore} from '@reduxjs/toolkit';

import userReducer from'./userSlice.js';
import errorReducer from './errorSlice.js';

export default configureStore({
    reducer:{
        user:userReducer,
        error: errorReducer
    },
    devTools:true
});
