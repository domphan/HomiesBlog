import React, { Component } from 'react';
import { BlogPost } from './';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loadUserPosts } from '../actions/post_actions';
import { isEmpty } from 'lodash';

const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
`

class BlogFeed extends Component {
  componentWillMount() {
    this.props.loadUserPosts();
  }
  renderPosts() {
    return Array.from(this.props.post.userPosts).map((post) => {
      return (
        <Grid item lg={4} xs='auto' >
          <BlogPost
            title={post.title}
            textContent={post.textContent}
            mediaUrl={post.mediaUrl}
            postID={post.id}
            userID={post.user.id}
          />
        </Grid>
      );
    })
  }
  render() {
    return (
      <StyledGrid
        container
        direction='row'
        spacing={16}
      >
        {!isEmpty(this.props.post) ? this.renderPosts() : ''}
      </StyledGrid>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.error,
  post: state.post,
})
export default connect(mapStateToProps, { loadUserPosts })(BlogFeed);