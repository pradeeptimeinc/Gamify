import { createReducer, createActions } from 'reduxsauce'

import firebase from '../Firebase';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  resetFeedback: null,
  addEmployee: ['emp']
})

export const feedbackTypes = Types
export default Creators

// const ref = firebase.database().ref('/employees');
// ref.once('value', (snapshot) => {
//   console.log('snapshot', snapshot.val());
// });
// ref.on('child_added', (data) => {
//   console.log('child_added', data.val());
// })
// ref.on('child_changed', (data) => {
//   console.log('child_added', data.val());
// })
// ref.on('child_removed', (data) => {
//   console.log('child_added', data.val());
// })

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  // emailId: null,
  feedBack: {},
  fetching: null,
  status: null,
  error: false,
}

/* ------------- Reducers ------------- */

// reset the feedback status reducer
export const reset = (state, action) => {
  console.log('reset')
  return state;
}
export const addEmployee = (state, action) => {
  console.log('addEmployee', action)
  return state;
}


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESET_FEEDBACK]: reset,
  [Types.ADD_EMPLOYEE]: addEmployee,
})
