import React, { Component, Fragment } from 'react';
import EventForm from './EventForm'
import styled from 'styled-components'
import { connect } from 'react-redux';
import { getUserInfo } from '../actions/user_actions';
import Weather from './Weather'
import Mood from './Mood'
import { SignupForm, PostForm } from '.';
import breakpoint from 'styled-components-breakpoint'
import {
  Typography,
  Grid,
} from '@material-ui/core'

const StyledTypography = styled(Typography)`
  text-align: center;
  margin: 25px;
`

class HomePage extends Component {
  componentDidMount() {
    this.props.getUserInfo();
  }
  render() {
    const { classes } = this.props
    const { user } = this.props;
    return (
      <div>
        <StyledTypography
          variant='h1'
        >
          {user.userinfo ? `Hello ${user.userinfo.firstName}` : 'make an account dude'}
        </StyledTypography>

        <PostForm formType='Create' history={this.props.history} />
        <Grid
          container
          lg={12}
          justify='space-between'
          alignItems='stretch'
        >
        </Grid>
      </div>
    );

  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.error
});


export default connect(mapStateToProps, { getUserInfo })(HomePage);
