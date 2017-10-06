import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import StoryEdit from './components/StoryEdit'
import StoryList from './components/StoryList'
import AppBar from './components/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
          <Router>
            <div className="App">
              <Route
                exact
                path="/"
                render={({match, history}) => (
                <AppBar editable={false} />
                )} />

              <Route
                path="/admin"
                render={({match, history}) => (
                <AppBar editable={true} />
                )} />

              <div className="container" >
              <Route exact path="/" component={StoryList} />
              <Route
                exact
                path="/admin"
                render={({match, history}) => (
                <StoryList editable={true} />
                )} />
              <Route exact path="/admin/new" component={StoryEdit} />
              <Route
                exact
                path="/admin/edit/:storyId"
                render={({match, history}) => (
                  <StoryEdit storyId={match.params.storyId} history={history}/>
                )} />
              </div>
            </div>
          </Router>
    </MuiThemeProvider>
    );
  }
}

export default App
