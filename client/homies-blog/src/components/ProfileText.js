import React from 'react';
import styled from 'styled-components';


export default (props) => {
  const { userinfo } = props;
  return (
    <div>
      <h5>{userinfo.username}</h5>
      <b>{userinfo.firstName} {userinfo.lastName}</b>
      <p>{userinfo.aboutme}</p>
    </div>
  );
}