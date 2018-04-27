import { combineReducers } from 'redux'
import { reducer } from './User';
const rootReducer = combineReducers({
  user: reducer
})
export default rootReducer;