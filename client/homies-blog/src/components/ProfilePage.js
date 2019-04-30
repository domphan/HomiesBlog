import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user_actions';
import { LinearProgress } from '@material-ui/core';
import { ProfileText } from '.';

class ProfilePage extends Component {
  componentDidMount() {
    this.props.getUserInfo(this.props.match.params.username);
  }

  renderContent = () => {
    const { userinfo } = this.props.user;
    if (userinfo) {
      return (
        <div>
          <ProfileText userinfo={userinfo} />
        </div>
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { getUserInfo })(ProfilePage);