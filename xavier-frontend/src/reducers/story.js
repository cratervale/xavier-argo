import {createStory, updateStory, fetchStoryById, deleteStoryById} from '../lib/apiServices';
import {fetchStories} from './stories';

const initState = {
  title: '',
  body: ''
};

const CURRENT_UPDATE = 'story/CURRENT_UPDATE'
const CLEAR_STATE = 'story/CLEAR_STATE'
const EDIT_STORY = 'story/EDIT_STORY'

export const saveStory = () => {
  return (dispatch, getState) => {
    const {story} = getState()
    if (story.id) {
      return updateStory(story)
        .then(dispatch(clearState()))
    } else {
      return createStory(story)
        .then(dispatch(clearState()))
    }
  }
}

export const getStory = (storyId) => {
  return (dispatch) => {
    return fetchStoryById(storyId)
      .then(
        story => dispatch(editStory(story)),
        error => (error)
      )
  }
}

export const cancelEdit = () => {
  return (dispatch) => {
    dispatch(clearState())
  }
}

export const deleteStory = (storyId) => {
  return (dispatch) => {
    deleteStoryById(storyId)
      .then(dispatch(clearState()))
  }
}

export const updateCurrent = (name, val) => ({type: CURRENT_UPDATE, payload: {name, val}})
export const editStory = (story) => ({type: EDIT_STORY, payload: story})
export const clearState = () => ({type: CLEAR_STATE, payload: {}})

export default (state = initState, action) => {
  switch (action.type) {
    case CURRENT_UPDATE:
      return {...state, [action.payload.name]: action.payload.val}
    case CLEAR_STATE:
      return {title: '', body: ''}
    case EDIT_STORY:
      return action.payload
    default:
      return state;
  }
};
