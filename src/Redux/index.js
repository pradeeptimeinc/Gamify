import { combineReducers } from 'redux'
import Firebase, { reducer } from './Firebase';
const rootReducer = combineReducers({
  firebase: reducer
})
export default rootReducer;