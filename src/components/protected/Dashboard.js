import React from 'react'
import ReactMaterialUiNotifications from 'react-materialui-notifications'
import { deepOrange500 } from 'material-ui/styles/colors'
import Message from 'material-ui/svg-icons/communication/message'
import {
  containerStyle,
  homeStyle,
} from '../../styles'
import HomeComp from './HomeComp'
import { Page, Row, Column } from 'hedron'

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
      <Page
        fluid
        width="100%"
      >
        <Row
          fluid
        >
          <Column md={12}>
            <HomeComp pathname={"/setting"} title="アカウント" />
          </Column>
          <Column md={6}>
            <HomeComp pathname={"/address"} title="個人情報"/>
          </Column>
          <Column md={6}>
            <HomeComp pathname={"/dashboard"} title="各種証明証発行"/>
          </Column>
        </Row>

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
      </Page>
    )
  }
}
