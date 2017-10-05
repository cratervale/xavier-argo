import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import storyReducer from './reducers/story';
import storiesReducer from './reducers/stories';
import sessionReducer from './reducers/session';

const reducer = combineReducers({
  story: storyReducer,
  stories: storiesReducer,
  session: sessionReducer
});

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
