import { combineReducers } from 'redux';
import user from './user';
import book from './book';

const rootReducer = combineReducers({
  user,
  book,
});

export default rootReducer;
