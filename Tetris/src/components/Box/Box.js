import React from 'react';
import { StyledBox } from './Box.style.';
import { OBJECTS } from '../../incomingTarget';

// React.memo makes sure we only re-render the changed cells
const Box = ({ type }) => {
  return (
  <StyledBox type={type} color={OBJECTS[type].color}>
  </StyledBox>
  )
};

export default React.memo(Box);