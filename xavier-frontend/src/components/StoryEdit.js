import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCurrent, saveStory, getStory, cancelEdit, deleteStory} from '../reducers/story';
import {fetchStories} from '../reducers/stories';
import AlertDialog from './AlertDialog'
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';

class StoryEdit extends Component{

  handleInputChange = (evt) => {
    const val = evt.target.value
    const name = evt.target.name
    this.props.updateCurrent(name, val)
  }

  handleSave = () => {
    this.props.saveStory()
    .then(this.props.history.goBack())
  }

  handleDelete = () =>{
      this.props.deleteStory(this.props.story.id)
      .then(this.props.history.goBack())
  }

  handleCancel = () => {
    this.props.cancelEdit()
    this.props.history.goBack()
  }

  componentDidMount(){
    if(this.props.storyId){
      this.props.getStory(this.props.storyId)
        .then((res) => {
          if (res.payload.error) this.props.history.goBack()
        })
    }
  }

  render(){
    const {title, body} = this.props.story
    return (
      <Paper className="storyedit">

        <div className="storyedit__text-input-container">
          <TextField
            type="text"
            className="storyedit__title"
            name="title"
            placeholder="Title"
            value={title}
            onChange={this.handleInputChange}
          />
          <textarea className="storyedit__body" name="body" value={body} onChange={this.handleInputChange}/>
        </div>

        <Divider className="storyedit__divider" />
        <div className="storyedit__buttons-container">
          {this.props.story.id && <AlertDialog  deleteStory={this.handleDelete} /> }
          <div className="storyedit__buttons">

            <Button onClick={this.handleCancel} color="secondary">Cancel</Button>
            <Button onClick={this.handleSave} color="primary">Save and Post</Button>
          </div>
        </div>
      </Paper>
    )
  }
}

export default connect(
  (state, ownProps) => ({story: state.story}),
  {updateCurrent, saveStory, getStory, cancelEdit, deleteStory, fetchStories}
)(StoryEdit)
