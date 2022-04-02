import styled from 'styled-components';

export const StyledArea = styled.div`
  
  display: grid;
  grid-template-rows: repeat(
    ${props => props.height},
    calc(25vw / ${props => props.width})
  );
  grid-template-columns: repeat(${props => props.width}, 1fr);
  grid-gap: 1px;
  border: 1px solid white;
  width: 100%;
  
  max-width: 30vw;
  background-color: ${props => props.gamecolor};
`;
