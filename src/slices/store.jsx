import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice.jsx';
import errorReducer from './errorSlice.jsx';


const persistConfig = {
  key: 'root',
  storage,
};


const persistedReducer = persistReducer(persistConfig, userReducer);


const store = configureStore({
  reducer: {
    user: persistedReducer,
    error: errorReducer,
  },
  devTools: true,
});


const persistor = persistStore(store);

export { store, persistor };
