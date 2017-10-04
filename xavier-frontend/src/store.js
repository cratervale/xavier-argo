import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import storyReducer from './reducers/story';
import storiesReducer from './reducers/stories';

const reducer = combineReducers({
  story: storyReducer,
  stories: storiesReducer
});

export default createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
