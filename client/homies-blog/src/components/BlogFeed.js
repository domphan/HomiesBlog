import React, { Component } from 'react';
import { BlogPost } from './';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loadUserPosts } from '../actions/post_actions';
import { isEmpty } from 'lodash';

const StyledGrid = styled(Grid)`
  display: flex;
  justify-content: center;
  flex-direction: column;
`

class BlogFeed extends Component {
  componentWillMount() {
    this.props.loadUserPosts();
  }
  renderPosts() {
    return Array.from(this.props.post.userPosts).map((post) => {
      return (
        <Grid item lg='auto' xs={3}>
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
        direction='column'
        justify='center'
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