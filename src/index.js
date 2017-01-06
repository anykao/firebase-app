import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import App from './components'
import {setupPage} from "csstips"
setupPage('#root')

const middlewares = []

if (process.env.NODE_ENV === `development`) {
  const createLogger = require(`redux-logger`)
  const logger = createLogger({collapsed: true})
  middlewares.push(logger)
}
// mount it on the Store
const store = compose(applyMiddleware(...middlewares))(createStore)(reducer)


const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
