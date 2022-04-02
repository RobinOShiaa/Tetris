import React from 'react';
import { StyledArea } from './Area.style';

import Box from '../Box/Box';

const Area = ({ area, gamecolor }) => (
  <StyledArea  gamecolor={gamecolor} width={area[0].length} height={area.length}>
    {area.map(row => row.map((cell, x) => <Box key={x} type={cell[0]} />))}
  </StyledArea>
);

export default Area;
