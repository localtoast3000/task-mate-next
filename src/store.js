import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from '@/reducers/users';

const persistorConfig = {
  key: 'task-mate',
  storage,
};

const reducers = {
  user,
};

export const store = configureStore({
  reducer: persistReducer(persistorConfig, combineReducers(reducers)),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
