import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistSetting = {
  key: 'root',
  storage: AsyncStorage,
  version: 0,
  whitelist: [],
  blacklist: [],
};
const combinedReducers = combineReducers({});
const rootReducer = persistReducer(persistSetting, combinedReducers);

export default rootReducer;
