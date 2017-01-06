import React from 'react'
import NavigationPrompt from 'react-router/NavigationPrompt'
import Redirect from 'react-router/Redirect'
import { reduxForm, Field, reset } from 'redux-form'
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

const onSubmit = (data) => {
  const user = firebaseAuth().currentUser
  if (user) {
    ref.child(`users/${user.uid}/paperwork`)
      .set(data)
      .catch((error) => console.log('Oops', error))
  }
}

class Paperwork extends React.Component {
  componentWillMount(){
    const { initialize } = this.props
    const user = firebaseAuth().currentUser
    if (user) {
      ref.child(`users/${user.uid}/paperwork`)
        .once('value')
        .then((snapshot)=>{
          initialize(snapshot.val())
        })
        .catch((error) => console.log('Oops', error))
    }
  }
  render() {
    const { handleSubmit, form, dirty, submitSucceeded } = this.props
    console.log(form)
    return(
      <Paper
        className={containerStyle}
      >
        <form onSubmit={handleSubmit}>
          {submitSucceeded && (
            <Redirect to={"/dashboard"}/>
          )}
          <NavigationPrompt
            when={dirty && !submitSucceeded}
            message={(location) => (
              `Are you sure you want to go to ${location.pathname}`
            )}
          />

          <div>
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
              onTouchTap={
                () => reset(form)
              }
            />
            <RaisedButton
              label="フロー図"
            />
          </div>
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
        </form>
      </Paper>
    )
  }
}

export default reduxForm({
  form: 'PAPERWORK',
  onSubmit,
})(Paperwork)
