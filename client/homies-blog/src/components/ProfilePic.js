import React from 'react';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

const StyledImage = styled.img`
  height: 5rem;
`

export default (props) => {
  return (
    <StyledImage src="https://media.licdn.com/dms/image/C5603AQEmCBNvbaJp2Q/profile-displayphoto-shrink_200_200/0?e=1562198400&v=beta&t=ftis3WktXoI9WOtodrr_fWXXw4b9Vl2eATI50tMNnn0" alt="hardcoded" />
  );
}