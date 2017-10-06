import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchStories} from '../reducers/stories'
import {editStory} from '../reducers/story'
import {Link} from 'react-router-dom'
import ReactHtmlParser from 'react-html-parser'
import moment from 'moment'

const Story = ({editStory, story, user, editable}) => {
  const {id, title, body, createdAt, updatedAt} = story
  return (
    <div className="storylist__story">
      {/* <img src="http://via.placeholder.com/200x300" /> */}
      <div className="storylist__text-grouping">
        <p className="storylist__story-datecreated">{moment(createdAt).format('MMMM Do YYYY, h:mm:ss a')}</p>
        <h2 className="storylist__story-title">{title}</h2>
        <p className="storylist__story-body">{ReactHtmlParser(body)}</p>
        <p className="storylist__story-daterevised">Updated {moment(updatedAt).format('MMMM Do YYYY, h:mm:ss a')}.</p>
      </div>
      {editable && <Link className="storylist__story-edit-link" to={`/admin/edit/${id}`}>edit post</Link>}
    </div>
  )
};

class StoryList extends Component {
  handleEditStoryClick(story) {
    editStory(story)
  }

  componentDidMount(){
    this.props.fetchStories()
  }

  render(){
    const hasPosts = (this.props.stories.length > 0)
    const headerText = hasPosts ? 'Latest News' : 'News Section Coming Soon!';
    return(
      <div className="storylist">
        <h3 className="storylist__header">{headerText}</h3>
          {this.props.stories.map(story =>
            <Story
              editStory={this.handleEditStoryClick}
              key={story.id}
              story={story}
              editable={this.props.editable}
               {...story} />)}
      </div>
    )
  }
}

export default connect(
  (state, ownProps) => ({stories: state.stories.stories, user:state.session.user}),
  {fetchStories}
)(StoryList)
