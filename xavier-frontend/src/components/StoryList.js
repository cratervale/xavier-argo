import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchStories} from '../reducers/stories'
import {editStory} from '../reducers/story'
import {Link} from 'react-router-dom'

const Story = ({editStory, story}) => {
  const {id, title, body, createdAt, updatedAt} = story
  return (
    <div>
      {title} <br/>
      {body}
      <Link to={`/admin/edit/${id}`}>edit</Link>
    </div>
  )
};

class StoryList extends Component {
  handleEditStoryClick(story) {
    console.log(story)
    editStory(story)
  }

  render(){
    this.props.fetchStories()
    const {stories} = this.props.stories
    return(
      <div className="Todo-List">
          {this.props.stories.map(story =>
            <Story
              editStory={this.handleEditStoryClick}
              key={story.id}
              story={story}
              // deleteTodo={this.props.deleteTodo}
               {...story} />)}
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({stories: state.stories.stories}),
  {fetchStories}
)(StoryList)
