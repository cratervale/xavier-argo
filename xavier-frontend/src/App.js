import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import StoryEdit from './components/StoryEdit'
import StoryList from './components/StoryList'
// import Footer from './components/Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
            <div className="TodoApp">
              <Route exact={true} path="/" component={StoryList} />
              <Route exact={true} path="/admin" component={StoryList} />
              <Route exact={true} path="/admin/new" component={StoryEdit} />
              <Route
                exact={true}
                path="/admin/edit/:storyId"
                render={({match, history}) => (
                  <StoryEdit storyId={match.params.storyId} history={history}/>
                )} />
            </div>
          </Router>
      </div>
    );
  }
}

export default App
