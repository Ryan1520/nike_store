//Step 5: gather all slices to one store
import {configureStore, combineReducers} from "@reduxjs/toolkit"
import cartReducer from "./cartSlice"
import userReducer from "./userSlice"

//import redux-persist and storage to save user and cart into to local storage => remain state whenever refresh the page
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist' 
import storage from 'redux-persist/lib/storage' //select local storage



const persistConfig = {
  key: 'root', //'root' key name in local storage
  version: 1,
  storage, 
}

//combines user and cart state/reducer
const rootReducer = combineReducers({ user: userReducer, cart: cartReducer });

//create persist reducer to save in local storage
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  // reducer:{
  //   //the State in Slice named 'cart' will be controlled by Reducer 'cartReducer' 
  //   cart: cartReducer, 
  //   user: userReducer
  // },
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
  }),
})

export let persistor = persistStore(store)