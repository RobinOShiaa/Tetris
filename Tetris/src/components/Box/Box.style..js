import styled from 'styled-components';

export const StyledBox = styled.div`
  width: auto;
  /* border-radius: 5px; */
  background: rgba(${props => props.color}, 0.95);
  border: ${props => (props.type === 0 ? '0px solid' : '4px solid')};
`
