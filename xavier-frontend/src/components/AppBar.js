// @flow weak

import React, {Component} from 'react';
import {connect} from 'react-redux'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import LoginDialog from './LoginDialog'
import {Link} from 'react-router-dom'
import {authenticate, signOut} from '../reducers/session';

class ButtonAppBar extends Component {

  render(){
    const {errors, user} = this.props.session

    return (
      <div >
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton  color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
            <Typography type="title" color="inherit">
              Xavier
            </Typography>
            <div className="appbar__menu-buttons">
              {this.props.editable && <LoginDialog errors={errors} user={user} signOut={this.props.signOut} authenticate={this.props.authenticate} />}
              {user.id && <Link to="/admin/new"><Button onClick={this.handleNewPostClick} color="contrast">New Post</Button></Link>}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}



export default connect(
  (state, ownProps) => ({session: state.session}),
  {authenticate, signOut}
)(ButtonAppBar)
