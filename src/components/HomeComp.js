import React from 'react'
import Paper from 'material-ui/Paper'
import { Link } from 'react-router'

export default class HomeComp extends React.Component {
  state = {
    zDepth: 0,
  }

  handleMouseEnter = () => {
    this.setState({
      zDepth: 4,
    })
  }

  handleMouseLeave = () => {
    this.setState({
      zDepth: 0,
    })
  }
  render(){
    return(
      <Link
        to={this.props.pathname}
      >
        {
          ({isActive, location, href, onClick, transition}) => (
            <Paper
              style={{
                width: "33.3%",
                height: 200,
                cursor: "pointer",
              }}
              zDepth={this.state.zDepth}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              onTouchTap={
                () => {
                  //console.log(isActive)
                  //console.log(location)
                  //console.log(href)
                  //console.log(onClick)
                  //console.log(transition)
                  transition(href)
                }
              }
            >
            </Paper>
          )
        }
      </Link>
    )
  }
}
