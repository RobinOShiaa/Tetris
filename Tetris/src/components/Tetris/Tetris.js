import React, { useState } from 'react';
import { StyledContainer, StyledTetris } from './Tetris.style';
import { createArea, detectBoundary } from '../../mapSettings';

import { useDropTime } from '../../hooks/useClock';
import { useTarget } from '../../hooks/useTarget';
import { useMap } from '../../hooks/useMap';

import Area from '../Area/Area';
import Start from '../Start/Start';

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);
 

  const [target, updateCoords, reset, rotateTarget] = useTarget();
  const [map, setMap] = useMap(target, reset);

  const transform = dir => {
    if (!detectBoundary(target, map, { x: dir, y: 0 })) {
      updateCoords({ x: dir, y: 0 });
    }
  };

  const keyUp = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 40) {
        setDropTime(1000);
      }
    }
  };

  const startGame = () => {
    setMap(createArea());
    setDropTime(1000);
    reset();
    setGameOver(false);
  };

  const drop = () => {
    if (!detectBoundary(target, map, { x: 0, y: 1 })) {
      updateCoords({ x: 0, y: 1, contact: false });
    } else {
      if (target.coords.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updateCoords({ x: 0, y: 0, contact: true });
    }
  };

  const PauseAndDrop = () => {
    setDropTime(null);
    drop();
  };

  useDropTime(() => {
    drop();
  }, dropTime);

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        transform(-1);
      } else if (keyCode === 39) {
        transform(1);
      } else if (keyCode === 40) {
        PauseAndDrop();
      } else if (keyCode === 38) {
        rotateTarget(map, 1);
      }
    }
  };

  return (
    <StyledContainer
      role="button"
      tabIndex="0"
      onKeyDown={e => move(e)}
      onKeyUp={keyUp}
    >
      <StyledTetris>
        <Area gamecolor={gameOver ? 'red' : 'white'} area={map} />
        <div className='start'>
          {gameOver ? (
            <Start callback={startGame} text="Start Again" />
          ) : <Start callback={startGame} text='Start' />}         
        </div>
      </StyledTetris>
    </StyledContainer>
  );
};

export default Tetris;
