import React, { Component } from 'react';
import { PostForm } from '.';
import { Modal } from '@material-ui/core';
import styled from 'styled-components';


const ModalContainer = styled.div`
  padding: 10px;
  top: 50%;
  left: 50%;
`

const StyledModal = styled(Modal)`
  margin-top: 5%;
`;

class EditModal extends Component {
  state = {
    open: true
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }
  render() {
    return (
      <ModalContainer>
        <StyledModal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          disableAutoFocus='true'
        >
          <PostForm formType='edit' onSubmit={this.props.onSubmit} currentPost={this.props.currentPost} />
        </StyledModal>
      </ModalContainer>
    );
  }
}

export default EditModal;