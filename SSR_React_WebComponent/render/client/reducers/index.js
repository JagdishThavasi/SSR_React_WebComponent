import { combineReducers } from 'redux'
import acntReducer from './acntReducer'

export default combineReducers({
  accounts: acntReducer
});
