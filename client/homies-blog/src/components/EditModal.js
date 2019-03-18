import React, { Component } from 'react';
import { PostForm } from '.';
import { Modal, Typography } from '@material-ui/core';
import styled from 'styled-components';


const StyledDiv = styled.div`
  background-color: white;
  background: white;
`;

const ModalContainer = styled.div`
  position: absolute;
  background-color: white;
  box-shadow: none;
`

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
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          hideBackdrop='true'
        >
          <StyledDiv>
            <PostForm formType='edit' onSubmit={this.props.onSubmit} currentPost={this.props.currentPost} />
          </StyledDiv>
        </Modal>
      </ModalContainer>
    );
  }
}

export default EditModal;