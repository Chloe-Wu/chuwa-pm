import {configureStore} from '@reduxjs/toolkit';

import userReducer from'./userSlice.jsx';
import errorReducer from './errorSlice.jsx';

export default configureStore({
    reducer:{
        user: userReducer,
        error: errorReducer
    },
    devTools:true
});