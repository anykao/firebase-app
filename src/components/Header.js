import React from 'react'
import AppBar from 'material-ui/AppBar'
import { green500 } from 'material-ui/styles/colors'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
//import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
//import NavigationClose from 'material-ui/svg-icons/navigation/close';
import { logout } from '../helpers/auth'
import Drawer from 'material-ui/Drawer'
import {List, ListItem, makeSelectable} from 'material-ui/List'

const SelectableList = makeSelectable(List)
const Logged = ({authed, onAuthed, router}) => {
  if (authed) {
    return(
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Sign out"
          onTouchTap={() => {
            logout()
            onAuthed(false)
            router.transitionTo("/")
          }}
        />
      </IconMenu>
    )
  } else {
    return(
      <IconMenu
        iconButtonElement={
          <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem
          primaryText="Login"
          onTouchTap={() => {
            router.transitionTo("/login")
          }}
        />
        <MenuItem
          primaryText="Register"
          onTouchTap={() => {
            router.transitionTo("/register")
          }}
        />
      </IconMenu>
    )
  }
}

export default class Header extends React.Component {
  state={
    open: false,
  }

  handleChangeList = (event, value) => {
    this.props.router.transitionTo(value)
    this.setState({
      open: false,
    })
  }

  render(){
    return (
      <div>
        <AppBar
          style={{
            backgroundColor: green500 ,
          }}
          title="社内システム"
          iconElementRight={<Logged {...this.props}/>}
          onLeftIconButtonTouchTap={
            () => {
              this.setState({
                open: !this.state.open,
              })
            }
          }
          iconStyleLeft={this.props.authed
            ? {}
            : { display: "none" }
          }
          onTitleTouchTap={
            () => {
              if (this.props.authed){
                this.props.router.transitionTo("/dashboard")
              }
            }
          }
        />
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open, reason) =>{
            //console.log(open, reason)
            this.setState({open})
          }}
        >
          <AppBar
            style={{
              cursor: "pointer",
              backgroundColor: green500 ,
            }}
            iconStyleLeft={{
              display: "none",
            }}
            onTitleTouchTap={
              ()=>{
                this.setState({
                  open: !this.state.open,
                })
              }
            }
          />
          <SelectableList
            value={location.pathname}
            onChange={this.handleChangeList}
          >
            <ListItem primaryText="お知らせ" />
            <ListItem
              primaryText="個人情報"
              value="/address"
            />
            <ListItem
              primaryText="私の作業"
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="処理待ち"
                />,
                <ListItem
                  key={2}
                  primaryText="確認待ち"
                />,
                <ListItem
                  key={3}
                  primaryText="処理完了"
                />,
                <ListItem
                  key={4}
                  primaryText="私の届けリスト"
                />,
                <ListItem
                  key={5}
                  primaryText="下書き"
                />,
                <ListItem
                  key={6}
                  primaryText="作業ログ"
                />,
              ]}
            />
            <ListItem
              primaryText="各種手続き"
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="各種証明証発行"
                  value="/paperwork"
                />,
                <ListItem
                  key={2}
                  primaryText="個人情報変更届け出"
                  nestedItems={[
                    <ListItem
                      key={1}
                      primaryText="扶養家族異動"
                    />,
                    <ListItem
                      key={2}
                      primaryText="氏名変更届"
                    />,
                  ]}
                />,
              ]}
            />
            <ListItem primaryText="パスワード変更" />
          </SelectableList>
        </Drawer>
      </div>
    )
  }
}
