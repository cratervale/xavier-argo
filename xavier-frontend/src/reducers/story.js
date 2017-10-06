import {createStory, updateStory, fetchStoryById, deleteStoryById} from '../lib/apiServices';

const initState = {
  title: '',
  body: ''
};

const CURRENT_UPDATE = 'story/CURRENT_UPDATE'
const CLEAR_STATE = 'story/CLEAR_STATE'
const EDIT_STORY = 'story/EDIT_STORY'
export const SUCCESSFUL_SAVE = 'story/SUCCESSFUL_SAVE'

export const saveStory = () => {
  return (dispatch, getState) => {
    const {story, session} = getState()
    if (story.id) {
      return updateStory(story, session.user.id)
      .then(stories => dispatch(successfulSave(stories)))
    } else {
      return createStory(story, session.user.id)
      .then(stories => dispatch(successfulSave(stories)))
    }
  }
}

export const getStory = (storyId) => {
  return (dispatch, getState) => {
    const {session} = getState()
    return fetchStoryById(storyId, session.user.id)
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
  return (dispatch, getState) => {
    const {session} = getState()
    return deleteStoryById(storyId, session.user.id)
    .then(stories => dispatch(successfulSave(stories)))
  }
}

export const updateCurrent = (name, val) => ({type: CURRENT_UPDATE, payload: {name, val}})
export const editStory = (story) => ({type: EDIT_STORY, payload: story})
export const successfulSave = (stories) => ({type: SUCCESSFUL_SAVE, payload: stories})
export const clearState = () => ({type: CLEAR_STATE, payload: {}})

export default (state = initState, action) => {
  switch (action.type) {
    case CURRENT_UPDATE:
      return {...state, [action.payload.name]: action.payload.val}
    case SUCCESSFUL_SAVE:
    case CLEAR_STATE:
      return {title: '', body: ''}
    case EDIT_STORY:
      return action.payload
    default:
      return state;
  }
};
