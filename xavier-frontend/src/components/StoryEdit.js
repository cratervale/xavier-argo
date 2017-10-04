import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateCurrent, saveStory, getStory, cancelEdit, deleteStory} from '../reducers/story';

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
    // if(confirm("Are you sure you want to delete this post?")){
      this.props.deleteStory(this.props.story.id)
      this.props.history.goBack()
    // }
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
      <div>
        <input type="text" name="title" placeholder="Title"
          value={title}
          onChange={this.handleInputChange}
        />
        <textarea name="body" value={body} onChange={this.handleInputChange}/>
        {this.props.story.id && <button onClick={this.handleDelete}>Delete</button>}
        <button onClick={this.handleCancel}>Cancel</button>
        <button onClick={this.handleSave}>Save and Post</button>
    </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({story: state.story}),
  {updateCurrent, saveStory, getStory, cancelEdit, deleteStory}
)(StoryEdit)
