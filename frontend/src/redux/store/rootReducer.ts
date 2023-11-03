import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userSliceReducer from '../slice/userSlice';

const persistSetting = {
  key: 'root',
  storage: AsyncStorage,
  version: 0,
  whitelist: ['user'],
  blacklist: [],
};
const combinedReducers = combineReducers({ user: userSliceReducer });
const rootReducer = persistReducer(persistSetting, combinedReducers);

export default rootReducer;
