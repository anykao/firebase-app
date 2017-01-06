import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import address from './address'

const rootReducer = combineReducers({
  address,
  form: formReducer,
})

//const rootReducer = (state, action) => {
  //if (action.type === types.CLEAR_STORE) {
    //state = undefined
  //}
  //return appReducer(state, action)
//}

export default  rootReducer
