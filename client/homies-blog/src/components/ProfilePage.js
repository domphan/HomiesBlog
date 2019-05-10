import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user_actions';
import { LinearProgress, Grid } from '@material-ui/core';
import { BlogFeed, ProfileText, ProfilePic, PostForm } from '.';

class ProfilePage extends Component {
  componentDidMount() {
    this.props.getUserInfo(this.props.match.params.username);
  }

  renderContent = () => {
    const { userinfo } = this.props.user;
    if (userinfo) {
      return (
        <Grid container
          justify='center'
          spacing={16}
          direction='row'
          alignItems='center'
        >
          <Grid item>
            <ProfilePic />
          </Grid>
          <Grid item>
            <ProfileText userinfo={userinfo} />
          </Grid>
        </Grid>
      )
    } else {
      return (
        <div>loading</div>
      );
    }

  }

  render() {
    const { user } = this.props;
    return (
      <div>
        {user.isLoading ? <LinearProgress /> : this.renderContent()}
        <BlogFeed />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { getUserInfo })(ProfilePage);