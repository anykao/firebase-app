import React from 'react'
import ReactMaterialUiNotifications from 'react-materialui-notifications'
import { deepOrange500 } from 'material-ui/styles/colors'
import Message from 'material-ui/svg-icons/communication/message'
import {
  containerStyle,
  homeStyle,
} from '../../styles'
import HomeComp from './HomeComp'

export default class Dashboard extends React.Component {
  state={
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

  showNotification = () => {
    ReactMaterialUiNotifications.showNotification({
      title: 'Title',
      additionalText: `Some message to be displayed`,
      icon: <Message />,
      iconBadgeColor: deepOrange500,
      overflowText: "joe@gmail.com",
    })
  }

  render () {
    return (
      <div
        className={containerStyle}
      >
        <div
          className={homeStyle}
        >
          <HomeComp pathname={"/setting"} title="アカウント" />
          <HomeComp pathname={"/address"} title="個人情報"/>
          <HomeComp pathname={"/dashboard"} title="各種証明証発行"/>
        </div>
        <div
          className={homeStyle}
        >
          <HomeComp pathname={"/setting"} title="アカウント" />
          <HomeComp pathname={"/address"} title="個人情報"/>
          <HomeComp pathname={"/dashboard"} title="各種証明証発行"/>
        </div>
        <ReactMaterialUiNotifications
          desktop={true}
          transitionName={{
            leave: 'dummy',
            leaveActive: 'fadeOut',
            appear: 'dummy',
            appearActive: 'zoomInUp'
          }}
          transitionAppear={true}
          transitionLeave={true}
        />
      </div>
    )
  }
}
