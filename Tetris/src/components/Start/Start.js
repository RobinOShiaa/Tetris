import React from 'react';
import { StyledStart } from './Start.style';

const Start = ({text ,callback}) => (
  <StyledStart onClick={callback}>{text}</StyledStart>
);

export default Start;
