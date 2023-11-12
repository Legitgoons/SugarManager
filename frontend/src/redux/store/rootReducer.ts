import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userSliceReducer from '../slice/userSlice';
import navigationSliceReducer from '../slice/navigationSlice';

const persistSetting = {
  key: 'root',
  storage: AsyncStorage,
  version: 0,
  whitelist: ['user', 'navigation'],
  blacklist: [],
};
const combinedReducers = combineReducers({
  user: userSliceReducer,
  navigation: navigationSliceReducer,
});
const rootReducer = persistReducer(persistSetting, combinedReducers);

export default rootReducer;
