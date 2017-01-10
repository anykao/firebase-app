import React from 'react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { red500, green500 } from 'material-ui/styles/colors'
import { TextField } from 'redux-form-material-ui'
import { reduxForm, Field } from 'redux-form'
import { firebaseAuth } from '../../config/constants'

const onSubmit = (data, dispatch, ownProps) => {
  const {user} = ownProps
  const {email, oldPassword, newPassword} = data
  const credential = (new firebaseAuth.EmailAuthProvider()).credential(email, oldPassword)
  user.reauthenticate(credential).then(
    () => user.updatePassword(newPassword)
  )
}

const ChangePasswordForm = reduxForm({
  form: 'change_password',
  onSubmit,
})((props) => {
  const { handleSubmit } = props
  return (
    <form onSubmit={handleSubmit}>
      <Field
        fullWidth
        floatingLabelText="email"
        name="email"
        component={TextField}
      />
      <Field
        fullWidth
        floatingLabelText="old password"
        name="oldPassword"
        type="password"
        component={TextField}
      />
      <Field
        fullWidth
        floatingLabelText="new password"
        name="newPassword"
        type="password"
        component={TextField}
      />
      <RaisedButton
        primary
        type="submit"
        label="Change Password"
      />
    </form>
  )
})

class Setting extends React.Component {
  render() {
    const {user} = this.props
    return (
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 20,
        }}
      >
        <ChangePasswordForm user={user} />
        {!user.emailVerified &&
            <RaisedButton
              label="Sent Verification Mail"
              backgroundColor={green500}
              onTouchTap={
                () => {
                  user.sendEmailVerification().then(function() {
                    console.log("sendEmailVerification")
                  }, function(error) {
                    console.warn(error)
                  })
                }
              }
            />
        }
        <RaisedButton
          label="Delete Account"
          backgroundColor={red500}
          onTouchTap={
            () => {
              user.delete()
            }
          }
        />
      </Paper>
    )
  }
}

export default Setting

