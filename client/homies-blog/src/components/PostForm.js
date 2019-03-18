import React, { Component } from 'react'
import { connect } from 'react-redux';
import styled from 'styled-components'
import { required } from '../common/validation';
import {
  Paper,
  Grid,
  Button,
  Typography,
} from '@material-ui/core'
import { Form, Field } from 'react-final-form';
import { TextField } from 'final-form-material-ui';
import { createPost, updatePost } from '../actions/post_actions';
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
`

class PostForm extends Component {
  generateFields(name, validation, type, label, placeholder, textarea) {
    return (
      <Grid item lg={12}>
        <Field name={name} validate={validation}>
          {({ input, meta }) => (
            <div>
              <LabelContainer>
                <label>{label}</label> {meta.error && meta.touched && <LabelError>{meta.error}</LabelError>}
              </LabelContainer>
              {textarea ? <textarea {...input} type={type} placeholder={placeholder} /> : <input {...input} type={type} placeholder={placeholder} />}
            </div>
          )}
        </Field>
      </Grid>
    );
  }

  onSubmit = async (values) => {
    await this.props.createPost(values, this.props.history);
  }

  submitUpdate = async (values, dirtyFields) => {
    const toBeUpdated = dirtyFields.getState().dirtyFields
    const patchArray = [];
    for (let key in toBeUpdated) {
      patchArray.push({
        path: `/${key}`,
        op: 'replace',
        value: `${values[key]}`
      });
    }
    await this.props.updatePost(patchArray, values.id);
    this.props.onSubmit();
  }

  renderCreate() {
    return (
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, reset, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} autoComplete='off'>
            <Grid
              container
              spacing={16}
              direction='column'>
              {this.generateFields('title', required, 'text', 'title', 'cool descriptive title', false)}
              {this.generateFields('textContent', required, 'text', 'textContent', 'your life story', true)}
              {this.generateFields('mediaUrl', '', 'text', 'Media URL', 'www.reddit.com/post/1', false)}
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
    );
  }

  renderEdit(post) {
    return (
      <Form
        onSubmit={this.submitUpdate}
        initialValues={post}
        render={({ handleSubmit, reset, submitting, pristine, values, dirtyFields }) => (
          <form onSubmit={handleSubmit} autoComplete='off'>
            <Grid
              container
              spacing={16}
              direction='column'>
              {this.generateFields('title', required, 'text', 'title', '', false)}
              {this.generateFields('textContent', required, 'text', 'textContent', '', true)}
              {this.generateFields('mediaUrl', '', 'text', 'Media URL', '', false)}
            </Grid>
            <div className="buttons">
              <Button variant="contained" type="submit" color="primary" disabled={submitting}>
                Submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
            <pre>{JSON.stringify(dirtyFields, 0, 2)}</pre>
          </form>
        )}
      />
    );
  }

  render() {
    const { currentPost } = this.props;
    return (
      <StyledDiv>
        <FormContainer>
          <h1>{this.props.formType + ' Post'}</h1>
          {this.props.formType.toLowerCase() !== 'edit' ? this.renderCreate() : this.renderEdit(currentPost)}
        </FormContainer>
      </StyledDiv>
    );

  }
}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
  post: state.post,
})

export default connect(mapStateToProps, { createPost, updatePost })(PostForm);