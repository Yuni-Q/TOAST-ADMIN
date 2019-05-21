import { combineReducers } from 'redux';
import user from './user';
import book from './book';
import part from './part';

const rootReducer = combineReducers({
  user,
  book,
  part,
});

export default rootReducer;
