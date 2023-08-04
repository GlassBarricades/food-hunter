import { configureStore, combineReducers } from '@reduxjs/toolkit'
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
import storage from 'redux-persist/lib/storage'
import orderReducer from './orderSlice'
import productQuantitySlice from './productQuantitySlice'
import productsArrSlice from './productsArrSlice'
import quantitySlice from './quantitySlice'

const rootReducer = combineReducers({
	order: orderReducer,
	quantity: quantitySlice,
	productsArr: productsArrSlice,
	productQuantity: productQuantitySlice,
})

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
})
export const persistor = persistStore(store)
export default store
