import {loadStories} from '../lib/apiServices';
import {SUCCESSFUL_SAVE} from './story';


const initState = {
  stories: []
};

const STORIES_LOAD = 'stories/STORIES_LOAD'

export const fetchStories = () => {
  return (dispatch) => {
    loadStories()
      .then(stories => dispatch(loadStoriesIntoState(stories)))
  }
}

const loadStoriesIntoState = (stories) => ({type: STORIES_LOAD, payload: stories})

export default (state = initState, action) => {
  switch (action.type) {
    case STORIES_LOAD:
    case SUCCESSFUL_SAVE:
      return {stories : action.payload}
    default:
      return state;
  }
};
