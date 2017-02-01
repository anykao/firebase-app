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
                width: "100%",
                height: 200,
                cursor: "pointer",
                //backgroundColor: "papayawhip",
                borderRadius: 10,
                textAlign: "center",
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
              <h3
                style={{
                  color: "palevioletred",
                }}
              >
                {this.props.title}
              </h3>
            </Paper>
          )
        }
      </Link>
    )
  }
}
