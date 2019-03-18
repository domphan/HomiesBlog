import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import { required, validEmail, validDate, minSix, composeValidators } from '../common/validation';
import Grid from '@material-ui/core/Grid';
import { signup, setErrorMsg } from '../actions/user_actions';
import { isEmpty } from 'lodash';

const LabelError = styled.span`
  color: red;
  font-size: 0.75rem;
  justify-content: right;  
`

const LabelContainer = styled.label`
  display:flex;
  justify-content: space-between;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`

const FormContainer = styled.div`
  margin: auto;
  width: 50%;
`

class AuthForm extends Component {
  onSubmit = async (values) => {
    if (values.password === values.passwordConfirmation) {
      await this.props.signup(values, this.props.history);
    } else {
      this.props.setErrorMsg('passwords do not match');
    }
  }

  generateFields(name, validation, type, label, placeholder) {
    return (
      <Grid item xs={3}>
        <Field name={name} validate={validation}>
          {({ input, meta }) => (
            <div>
              <LabelContainer>
                <label>{label}</label> {meta.error && meta.touched && <LabelError>{meta.error}</LabelError>}
              </LabelContainer>
              <input {...input} type={type} placeholder={placeholder} />
            </div>
          )}
        </Field>
      </Grid>
    );
  }
  render() {
    const { errors } = this.props;

    return (
      <StyledDiv>
        <FormContainer>
          <h1>Signup</h1>
          <Form
            onSubmit={this.onSubmit}
            render={({ handleSubmit, reset, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit} autoComplete='off'>
                <Grid container spacing={16}>
                  {this.generateFields('email', composeValidators(required, validEmail), 'text', 'Email', 'email@example.com')}
                  {this.generateFields('username', required, 'text', 'Username', 'user1234')}
                  {this.generateFields('firstName', composeValidators(required), 'text', 'First Name', 'John')}
                  {this.generateFields('lastName', composeValidators(required), 'text', 'Last Name', 'Doe')}
                  {this.generateFields('birthday', composeValidators(required, validDate), 'date', 'Birthday', '')}
                </Grid>
                <Grid container spacing={16}>
                  {this.generateFields('password', composeValidators(required, minSix), 'password', 'Password', '')}
                  {this.generateFields('passwordConfirmation', composeValidators(required, minSix), 'password', 'Confirm Password', '')}
                </Grid>
                <div className="buttons">
                  <Button variant="contained" type="submit" color="primary" disabled={submitting}>
                    Submit
                </Button>
                </div>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            )}
          />
        </FormContainer>
      </StyledDiv>
    );

  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { signup, setErrorMsg })(AuthForm);