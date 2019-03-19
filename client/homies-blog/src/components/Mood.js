import React, { Component } from 'react'
import styled from 'styled-components'
import {
  Paper,
  TextField,
  Button,
} from '@material-ui/core'


const StyledPaper = styled(Paper)`
  width: 400px;
  position: relative;
`
const StyledTextField = styled(TextField)`
  width: 80%;
`
const StyledButton = styled(Button)`
  width: 20%;
  bottom: 0;
  top: 0;
  position: absolute;
`

class Mood extends Component {
  state = {
    mood: "",
  }
  //TODO: implement
  // handleSubmit = (event) => {
  //   const { name, value } = event.target

  //   this.setState({
  //     mood: "",
  //   })
  // }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  render() {
    const { mood } = this.state

    return (
      <StyledPaper>
        <form onSubmit={this.handleSumbmit}>
          <StyledTextField
            name='mood'
            label="What's going on?"
            variant='filled'
            value={mood}
            onChange={this.handleChange}
          />
          <StyledButton variant='outlined' color='primary'>Mood</StyledButton>
        </form>
      </StyledPaper>
    )
  }
}

export default Mood