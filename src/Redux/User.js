import { createReducer, createActions } from 'reduxsauce'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setUser: ['user']
})

export const feedbackTypes = Types
export default Creators
/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  isLoggedIn: false,
}

/* ------------- Reducers ------------- */

// reset the feedback status reducer
export const setEmpId = (state, action) => {
  console.log('reset')
  return state;
}
export const setUser = (state, action) => {
  const userData = action.user;
  const newState = { ...state, ...userData, isLoggedIn: true };
  console.log('setting user', action)
  return newState;
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_USER]: setUser,
})
