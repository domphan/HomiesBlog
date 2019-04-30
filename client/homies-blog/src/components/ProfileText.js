import React from 'react';
import styled from 'styled-components';


const StyledDiv = styled.div`
  height: 25%;
`;

export default (props) => {
  const { userinfo } = props;
  return (
    <StyledDiv>
      <h4>{userinfo.username}</h4>
      <b>{userinfo.firstName} {userinfo.lastName}</b>
    </StyledDiv>
  );
}