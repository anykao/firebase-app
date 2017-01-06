import React, { Component } from 'react'
import { Match, BrowserRouter, Miss, Redirect } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Header from './Header'
import Footer from './Footer'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Dashboard from './protected/Dashboard'
import Address from './protected/Address'
import Paperwork from './protected/Paperwork'
import { firebaseAuth } from '../config/constants'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'flexboxgrid/dist/flexboxgrid.min.css'
import {
  pageStyle,
  paneStyle,
} from '../styles'

injectTapEventPlugin()

function MatchWhenAuthed ({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

function MatchWhenUnauthed ({component: Component, authed, ...rest}) {
  return (
    <Match
      {...rest}
      render={(props) => authed === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}


export default class App extends Component {
  state = {
    authed: false,
    loading: true,
  }

  handleAuthed = (authed) => {
    this.setState({
      authed: authed,
    })
  }

  componentDidMount () {
    this.removeListener = firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authed: true,
          loading: false,
        })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }
  componentWillUnmount () {
    this.removeListener()
  }
  render() {
    return this.state.loading === true ? <h1>Loading</h1> : (
      <MuiThemeProvider>
        <BrowserRouter>
          {({router}) => (
            <div className={pageStyle}>
              <Header authed={this.state.authed} onAuthed={this.handleAuthed} router={router} />
            <div className={paneStyle}>
              <Match pattern='/' exactly component={Home} />
              <MatchWhenUnauthed authed={this.state.authed} pattern='/login' component={Login} />
              <MatchWhenUnauthed authed={this.state.authed} pattern='/register' component={Register} />
              <MatchWhenAuthed authed={this.state.authed} pattern='/dashboard' component={Dashboard} />
              <MatchWhenAuthed authed={this.state.authed} pattern='/address' component={Address} />
              <MatchWhenAuthed authed={this.state.authed} pattern='/paperwork' component={Paperwork} />
              <Miss render={() => <h3>No Match</h3>} />
            </div>
            <Footer />
          </div>
          )}
        </BrowserRouter>
      </MuiThemeProvider>
    )
  }
}
