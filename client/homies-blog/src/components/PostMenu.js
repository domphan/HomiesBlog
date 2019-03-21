import React, { Component } from 'react';
import {
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { deletePost } from '../actions/post_actions';
import { connect } from 'react-redux';
import { EditModal } from '.';

const options = [
  'edit',
  'delete'
]

const ITEM_HEIGHT = 32;

class PostMenu extends Component {
  constructor() {
    super();
    this.state = {
      anchorEl: null,
      mountModal: false
    };
    this.closeAfterEdit = this.closeAfterEdit.bind(this);
  }

  closeAfterEdit = () => {
    this.setState({ mountModal: false });
  }
  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  handleClose = (option) => {
    this.setState({ anchorEl: null });
    if (option === 'delete') {
      this.props.deletePost(this.props.currentPost.id)
    } else if (option === 'edit') {
      this.setState({ mountModal: true });
    }
  }

  renderEditModal() {
    return (
      <EditModal currentPost={this.props.currentPost} onSubmit={this.closeAfterEdit} />
    );
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 150,
            },
          }}
        >
          {options.map(option => (
            <MenuItem key={option} onClick={() => this.handleClose(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
        {this.state.mountModal && this.renderEditModal()}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  errors: state.error,
  post: state.post
})

export default connect(mapStateToProps, { deletePost })(PostMenu);