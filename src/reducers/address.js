import { handleActions } from "redux-actions"

export default handleActions({
  LOAD_ADDRESS: (state, action) => {
    return {
      data: action.payload
    }
  }
}, {})
