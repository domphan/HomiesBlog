import React, { Component } from 'react'
import styled from 'styled-components'
import { Form, Field } from 'react-final-form'
import {
  Paper,
  Typography,
  Grid,
  Button,
} from '@material-ui/core'

const StyledPaper = styled(Paper)`
    width: 300px;
    padding: 20px 0;
`

const StyledGrid = styled(Grid)`
    width: 95%;
`
const StyledTextarea = styled.textarea`
    resize: none;
    outline: none;
    border: none;
    border-bottom: 1px #99AAAB solid;
    &:active {
        border-bottom: 1px #00CCCD solid;
    };
`
const Alert = styled.span`
    color: red;
`

const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

const required = (value) => (
  value ? undefined : 'Required'
)

class EventForm extends Component {

  state = {
    event: "",
    description: "",
    date: "",
    details: "",
  }

  handleSubmit = values => (event) => {
    event.preventDefault()
    alert(JSON.stringify(values, 0, 2))
  }

  handleChange = values => {
    this.setState({
      ...values,
    })
  }

  render() {
    const fields = ['title', 'description', 'date'].map(type => {

      return (
        <StyledGrid item lg>
          <Field
            name={type}
            component={type === 'date' ? 'date' : 'input'}
            validate={required}
            placeholder={toTitleCase(type)}
          >
            {
              ({ input, meta, placeholder }) => (
                <div className={meta.active ? 'active' : ''}>
                  <label>{toTitleCase(type)}</label>
                  <input {...input} placeholder={placeholder} />
                  {meta.error && meta.touched && <Alert>{meta.error}</Alert>}
                </div>
              )
            }
          </Field>
        </StyledGrid>
      )
    })

    return (
      <StyledPaper>
        <Typography
          variant='headline'
          align='center'
        >
          Create Event
                </Typography>
        <Form
          onSubmit={this.handleSubmit}
        >
          {({ handleSubmit, values, submitting, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
              <Grid
                container
                lg={12}
                direction='column'
                justify='center'
                alignItems='center'
              >
                {fields}

                <StyledGrid item lg>
                  <Field
                    name='details'
                    component='input'
                    validate={required}
                    placeholder='Details'
                    value={values.details}
                  >
                    {
                      ({ input, meta, placeholder }) => (
                        <div className={meta.active ? 'active' : ''}>
                          <label>Details</label>
                          <StyledTextarea {...input} placeholder={placeholder} rows='6' />
                          {meta.error && meta.touched && <Alert >{meta.error}</Alert>}
                        </div>
                      )
                    }
                  </Field>
                </StyledGrid>
                <Button
                  type='submit'
                  disabled={pristine || invalid || submitting}
                  variant='outlined'
                  color='primary'
                >
                  Create
                                </Button>
              </Grid>
            </form>
          )}
        </Form>
      </StyledPaper>
    )
  }
}

export default EventForm