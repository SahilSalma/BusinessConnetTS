import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './Reducer/rootReducer';
import storage from 'redux-persist/lib/storage';
import rootSaga from './Saga/rootSaga';
import { persistReducer, persistStore } from 'redux-persist';

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with reducers and middleware
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) => 
    getDefaultMiddleware().concat(sagaMiddleware), // Include thunk by default
});

// Run the root saga
sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export default {store, persistor};