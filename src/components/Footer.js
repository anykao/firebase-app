import React from 'react'

import {
  footerStyle,
} from '../styles'


export default class Footer extends React.Component {
  render(){
    return (
      <div
        className={footerStyle}
      >
        {"Copyright © 2016 eb"}
      </div>
    )
  }
}
