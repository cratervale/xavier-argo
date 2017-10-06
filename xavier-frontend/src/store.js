import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import storyReducer from './reducers/story';
import storiesReducer from './reducers/stories';
import sessionReducer from './reducers/session';
import {persistStore, autoRehydrate} from 'redux-persist'

const reducer = combineReducers({
  story: storyReducer,
  stories: storiesReducer,
  session: sessionReducer
});

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk),
    autoRehydrate()
  )
);

persistStore(store);

export default store;
