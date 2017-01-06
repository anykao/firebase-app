import React from 'react'
import NavigationPrompt from 'react-router/NavigationPrompt'
import Redirect from 'react-router/Redirect'
//import { compose } from 'redux'
//import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
//import { Redirect } from 'react-router'
import {
  TextField,
} from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import {
  containerStyle
} from '../../styles'

import { ref, firebaseAuth } from '../../config/constants'

//import { loadAddress} from '../../actions'
import { Watch } from 'scrollmonitor-react'

const Watched =  Watch(class ButtonGroup extends React.Component {
  render () {
    return(
      <div
        style={this.props.style}
      >
        <RaisedButton
          label="提出"
          type="submit"
        />
        <RaisedButton
          label="一時保存"
        />
        <RaisedButton
          label="リセット"
          type="reset"
        />
        <RaisedButton
          label="フロー図"
        />
      </div>
    )
  }
})


const onSubmit = (data) => {
  const user = firebaseAuth().currentUser
  ref.child(`users/${user.uid}/address`)
    .set(data)
    .catch((error) => console.log('Oops', error))
}
const onSubmitSuccess = (data, dispatch) => {
  console.log("onSubmitSuccess")
}

const style = {
  position: "absolute",
  top: 0,
}

class Address extends React.Component {
  state = {
    style
  }
  receiveStateChange = (watcher) => {
    watcher.lock()
    if ( watcher.isAboveViewport){
      this.setState({
        style: {
          position: "fixed",
          zIndex:10000,
          top: 0,
        }
      })
    } else {
      this.setState({
        style: style
      })
    }
    //console.log('state changed!', watcher)
  }
  componentWillMount(){
    const { initialize } = this.props
    const user = firebaseAuth().currentUser
    if (user) {
      ref.child(`users/${user.uid}/address`)
        .once('value')
        .then((snapshot)=>{
          initialize(snapshot.val())
        })
        .catch((error) => console.log('Oops', error))
    }
  }
  render() {
    const { handleSubmit, dirty, submitSucceeded } = this.props
    return(
      <Paper
        className={containerStyle}
      >
        <form onSubmit={handleSubmit}
          style={{
            position: "relative",
            paddingTop: 32,
          }}
        >
          {submitSucceeded && (
            <Redirect to={"/dashboard"}/>
          )}
          <NavigationPrompt
            when={dirty && !submitSucceeded}
            message={(location) => (
              `Are you sure you want to go to ${location.pathname}`
            )}
          />
          <Watched style={this.state.style} stateChange={this.receiveStateChange} />
          <Field
            fullWidth
            name="username"
            component={TextField}
            floatingLabelText="社員コード"
          />
          <Field
            fullWidth
            name="yubinBangou"
            component={TextField}
            floatingLabelText="郵便番号"
          />
          <Field
            fullWidth
            name="address"
            component={TextField}
            floatingLabelText="住所"
          />
          <Field
            fullWidth
            name="connect_name"
            component={TextField}
            floatingLabelText="緊急連絡先（氏名）"
          />
          <Field
            fullWidth
            name="connect_tel"
            component={TextField}
            floatingLabelText="緊急連絡先（電話番号）"
          />
          <Field
            fullWidth
            name="connect_relation"
            component={TextField}
            floatingLabelText="緊急連絡者との続柄"
          />
          <Field
            fullWidth
            name="hometown_connect"
            component={TextField}
            floatingLabelText="中国の緊急連絡先"
          />
          <Field
            fullWidth
            name="private_tel"
            component={TextField}
            floatingLabelText="個人電話番号(任意)"
          />
          <Field
            fullWidth
            name="business_tel"
            component={TextField}
            floatingLabelText="業務電話番号(任意)"
          />
          <Field
            fullWidth
            name="private_email"
            component={TextField}
            floatingLabelText="個人メールアドレス"
          />
          <Field
            fullWidth
            name="compony_email"
            component={TextField}
            floatingLabelText="会社メールアドレス"
          />
          <Field
            fullWidth
            name="home_station"
            component={TextField}
            floatingLabelText="最寄駅"
          />
        </form>
      </Paper>
    )
  }
}

export default reduxForm({
  form: 'ADDRESS',
  onSubmit,
  onSubmitSuccess,
})(Address)
//export default compose (
  //connect(
    //state => ({
      //initialValues: state.address.data
    //}),
    //{ load: loadAddress }
  //),
  //reduxForm({
    //form: 'ADDRESS',
    //onSubmit,
    //onSubmitSuccess,
  //})
//)(Address)
