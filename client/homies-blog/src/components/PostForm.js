import React, { Component } from 'react'
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import styled from 'styled-components'
import { required } from '../common/validation';
import {
  Grid,
  Button,
  IconButton
} from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons';
import { Form, Field } from 'react-final-form';
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
  background-color: #f2f2f2;
  padding: 2.5%;
  box-shadow: 0 0 3pt 2pt lightblue;
  max-width: 25%;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1% 0;
`
const MediaContainer = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 10%;
`;

class PostForm extends Component {
  state = {
    fileUpload: null
  }

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
    const post = { ...values, upload: null };
    if (this.state.fileUpload) {
      post.upload = this.state.fileUpload[0];
    }
    await this.props.createPost(post, this.props.history);
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
              <MediaContainer item lg={12}>
                <Field name='mediaUrl'>
                  {({ input, meta }) => (
                    <div>
                      <LabelContainer>
                        <label>MediaUrl or Upload</label> {meta.error && meta.touched && <LabelError>{meta.error}</LabelError>}
                      </LabelContainer>
                      <input {...input}
                        type='text'
                        placeholder={this.state.fileUpload ? 'Uploaded Image' : 'https://i.redd.it/w2nho6o2k4n21.jpg'}
                        disabled={Boolean(this.state.fileUpload)}
                      />
                    </div>
                  )}
                </Field>
                <Field name="drop-zone">
                  {({ input, meta }) => (
                    <Dropzone
                      accept="image/*"
                      maxSize="15000000"
                      onDrop={acceptedFiles => this.setState({ fileUpload: acceptedFiles })}>
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <IconContainer>
                              <IconButton color="primary" aria-label="upload-image">
                                <PhotoCamera />
                              </IconButton>
                            </IconContainer>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  )}
                </Field>
              </MediaContainer>
            </Grid>
            <div className="buttons">
              <Button variant="contained" type="submit" color="primary" disabled={submitting}>
                Submit
              </Button>
            </div>
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

            <ButtonContainer>
              <Button variant="contained" type="submit" color="primary" disabled={submitting}>
                Submit
              </Button>
              <Button variant="contained" color="secondary" onClick={() => this.props.onSubmit()}>
                Cancel
              </Button>
            </ButtonContainer>
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
          <h4>{this.props.formType + ' Post'}</h4>
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