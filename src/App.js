import React, { Component } from 'react'
import { BrowserRouter, Match, Link } from 'react-router'

class Home extends Component {
  render() {
    return(
      <h1>Home</h1>
    )
  }
}

class About extends Component {
  render() {
    return(
      <h1>About</h1>
    )
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
          <Match exactly pattern="/" component={Home} />
          <Match exactly pattern="/about" component={About} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
