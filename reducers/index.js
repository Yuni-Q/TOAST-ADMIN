import { combineReducers } from 'redux';
import user from './user';
import book from './book';
import part from './part';
import question from './question';

const rootReducer = combineReducers({
  user,
  book,
  part,
  question,
});

export default rootReducer;
