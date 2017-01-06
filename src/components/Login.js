import React from 'react'
import { login } from '../helpers/auth'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {
  containerStyle,
  centerCenterStyle,
} from '../styles'

export default class Login extends React.Component {
  state ={
    email: "",
    pw: "",
  }
  handleSubmit = (e) => {
    e.preventDefault()
    login(this.state.email, this.state.pw)
  }
  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    })
  }
  handlePwChange = (e) => {
    this.setState({
      pw: e.target.value,
    })
  }
  render () {
    return (
      <div
        className={centerCenterStyle}
      >
        <Paper>
          <form
            className={containerStyle}
            onSubmit={this.handleSubmit}
          >
            <h1> Login </h1>
            <TextField
              floatingLabelText="Email"
              value={this.state.email}
              onChange={this.handleEmailChange}
            />
            <TextField
              type="password"
              floatingLabelText="Password"
              value={this.state.pw}
              onChange={this.handlePwChange}
            />
            <RaisedButton
              type="submit"
              label="Login"
            />
          </form>
        </Paper>
      </div>
    )
  }
}
