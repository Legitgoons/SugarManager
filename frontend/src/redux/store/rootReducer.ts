import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userSliceReducer from '../slice/userSlice';
import navigationSliceReducer from '../slice/navigationSlice';
import timeReducer from '../slice/bloodSugarSlice';

const persistSetting = {
  key: 'root',
  storage: AsyncStorage,
  version: 0,
  whitelist: ['user', 'navigation', 'time'],
  blacklist: [],
};

const combinedReducers = combineReducers({
  user: userSliceReducer,
  navigation: navigationSliceReducer,
  time: timeReducer,
});

const rootReducer = persistReducer(persistSetting, combinedReducers);

export default rootReducer;
