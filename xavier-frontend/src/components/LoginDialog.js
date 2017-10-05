/* eslint-disable flowtype/require-valid-file-annotation */

import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class FormDialog extends React.Component {
  state = {
    open: false,
    email: '',
    password: ''
  };

  handleEmailChange = event => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleRequestSignIn = () => {
      this.props.authenticate(this.state.email, this.state.password)
      .then(()=> {if (!this.props.errors) this.handleRequestClose()})
  };

  handleSignOut = () => {
    this.props.signOut()
  }

  handleRequestClose = () => {
    this.setState({ open: false, email: '', password: '' });
  };

  componentDidReceiveProps(a,b,c){
    console.log("props", a,b,c)
  }

  render() {
    return (
      <div>
        {!this.props.user.id && <Button color="contrast" onClick={this.handleClickOpen}>Sign In</Button>}
        {!!this.props.user.id && <Button color="contrast" onClick={this.handleSignOut}>Sign Out</Button>}
        <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
          <DialogTitle>{'Sign In'}</DialogTitle>
          <DialogContent>
            {!!this.props.errors && <p style={{color:'red'}}>Bad email or password.</p>}
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              value={this.state.email}
              onChange={this.handleEmailChange}
              fullWidth
            />
            <TextField
              margin="dense"
              id="name"
              label="Password"
              type="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRequestClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleRequestSignIn} color="primary">
              Sign In
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
