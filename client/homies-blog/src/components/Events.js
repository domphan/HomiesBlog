import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Avatar,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Badge,
} from '@material-ui/core'
import {
  Image,
  ExpandMore,
} from '@material-ui/icons/'

const sampleEvents = [
  { id: 1, title: 'Event', content: 'Do your homework', date: '1/10/2019', description: 'Blah Blah Blah' },
  { id: 2, title: 'Event', content: 'Take out the trash', date: '1/10/2019', description: 'Blah Blah Blah' },
  { id: 3, title: 'Event', content: 'Mow the loan', date: '1/10/2019', description: 'Blah Blah Blah' },
  { id: 4, title: 'Event', content: 'Call your mom', date: '1/10/2019', description: 'Blah Blah Blah' },
  { id: 5, title: 'Event', content: 'Eat vegetables', date: '1/10/2019', description: 'Blah Blah Blah' },
]

const StyledExpansionPanel = styled(ExpansionPanel)`
    width: 300px;
    position: absolute;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const StyledBadge = styled(Badge)`
    width: 20%;
`

class Events extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  handleClick = (data) => {
    const { title, content, date, description } = data
    this.setState({
      title,
      content,
      date,
      description,
    })
    this.handleToggle()
  }

  handleToggle = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    const length = sampleEvents.length
    const events = sampleEvents.length ?
      sampleEvents.map(event => {
        return (
          <Fragment>
            <Divider />
            <ListItem key={event.id} onClick={() => this.handleClick(event)}>
              <Avatar>
                <Image />
              </Avatar>
              <ListItemText primary={event.title} secondary={event.content} />
              <Typography variant='subtitle2'>{event.date}</Typography>
            </ListItem>
            <Divider />
          </Fragment>
        )
      }) :
      "There are no events right now"

    const { title, content, /*date,*/ description } = this.state

    return (
      <Fragment>
        <StyledExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />}>
            <StyledBadge
              color="secondary"
              badgeContent={length}
              variant='dot'
            >
              <Typography variant='subtitle1'>
                Events
                            </Typography>
            </StyledBadge>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <List >
              {events}
            </List>
          </ExpansionPanelDetails>
        </StyledExpansionPanel>

        <Dialog
          open={this.state.open}
          onClose={this.handleToggle}
        >
          <DialogTitle>
            {title}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Divider />
              <Typography variant='subheading'>
                {content}
              </Typography>
              <Divider /><br />
              {description}
            </DialogContentText>
          </DialogContent>
          <Button
            variant='contained'
            onClick={this.handleToggle}
          >
            Close
                    </Button>
        </Dialog>
      </Fragment>
    );
  }
}

export default Events;