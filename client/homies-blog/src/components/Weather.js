import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import {
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  Divider,
} from '@material-ui/core'

// const Alert = styled.span`
//   color: red;
// `
const StyledPaper = styled(Paper)`
  padding: 20px;
  width: 325px;
`
const StyledButton = styled(Button)`
    margin-top: 15px;
`
const GridContainer = styled(Grid)`
  
`

const zipcodeValid = (zipcode) => (
  zipcode.length === 5 && !isNaN(zipcode)
)

const weatherIcon = (pngId) => (
  `http://openweathermap.org/img/w/${pngId}.png`
)

const openWeatherURL = (zipcode) => (
  `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&units=imperial&APPID=c0ac390bc07fd8f76d79182fc3edf8f9`
)

class Weather extends Component {
  state = {
    zipcode: "",
    valid: true,
    weather: {},
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { zipcode } = this.state
    const self = this // must do this. Using "this" inside promise resolution will refer to promise obj

    zipcodeValid(zipcode)
      ? this.setState((prevState) => {
        // let weather = {}

        axios.get(openWeatherURL(zipcode))
          .then((res) => {
            const { main, weather, name } = res.data

            self.setState({
              valid: true,
              weather: {
                ...main,
                ...weather[0],

              },
              name,
            }, () => console.log(this.state))
          })
          .catch(err => console.log(err))
      })
      : this.setState({
        zipcode: "",
        valid: false,
        weather: {},
      })

  }

  handleChange = event => {
    const { name, value } = event.target

    this.setState({
      [name]: value,
    })
  }

  render() {
    const { valid, zipcode, weather, city } = this.state

    const weatherInfo = Object.entries(weather).length === 0 && weather.constructor === Object
      ? null
      : (<Fragment>
        <img src={weatherIcon(weather.icon)} alt="weather" />
        <Typography
          variant='caption'
        >
          City: {city}
        </Typography>
        <Divider />
        <Typography variant='caption'>
          Skies: {weather.description}
        </Typography>
        <Divider />
        <Typography
          variant='caption'
        >
          Temperature: {weather.temp}
        </Typography>
        <Divider />
        <Typography
          variant='caption'
        >
          Min. Temperature: {weather.temp_min}
        </Typography>
        <Divider />
        <Typography
          variant='caption'
        >
          Max Temperature: {weather.temp_max}
        </Typography>
      </Fragment>)

    return (
      <StyledPaper>
        <Typography variant='headline' align='center'>
          Your Local Weather
        </Typography>
        <form>
          <GridContainer
            container
            sm={12}
            direction='column'
            justify='space-between'
            alignItems='center'
          >
            <Grid item sm>
              <label htmlFor='zipcode'>Enter Your Zip Code</label>
            </Grid>
            <Grid item sm>
              <TextField
                name='zipcode'
                label={valid ? 'Zip Code' : 'Invalid Entry'}
                placeholder='54321'
                maxLength='5'
                error={!valid}
                variant='standard'
                value={zipcode}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid sm item>
              <StyledButton
                variant='outlined'
                color='primary'
                onClick={this.handleSubmit}
              >
                Go!
              </StyledButton>
            </Grid>
          </GridContainer>
        </form>
        {weatherInfo}
      </StyledPaper>
    )
  }
}

export default Weather