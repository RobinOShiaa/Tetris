import { useState, useCallback } from 'react';

import { OBJECTS, randomOBJECTS } from '../incomingTarget';
import { MAP_WIDTH, detectBoundary } from '../mapSettings';

export const useTarget = () => {
  const [target, setTarget] = useState({
    coords: { x: 0, y: 0 },
    shape: OBJECTS[0].shape,
    contact: false,
  });

  function rotate(matrix, tmp) {
    const rotatedArray = matrix.map((_, index) => matrix.map(column => column[index]));
    if (tmp > 0) return rotatedArray.map(row => row.reverse());;
    return rotatedArray.reverse();
  }

  function rotateTarget(map, tmp) {
    const duplicateTarget = {...target};
    duplicateTarget.shape = rotate(duplicateTarget.shape, tmp);

    const coords = duplicateTarget.coords.x;
    let offset = 1;
    while (detectBoundary(duplicateTarget, map, { x: 0, y: 0 })) {
      duplicateTarget.coords.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > duplicateTarget.shape[0].length) {
        rotate(duplicateTarget.shape, -tmp);
        duplicateTarget.coords.x = coords;
        return;
      }
    }
    setTarget(duplicateTarget);
  }

  const updateCoords = ({ x, y, contact }) => {
    setTarget(prev => ({
      ...prev,
      coords: { x: (prev.coords.x += x), y: (prev.coords.y += y) },
      contact,
    }));
  };

  const reset = useCallback(() => {
    setTarget({
      coords: { x: MAP_WIDTH / 2 - 2, y: 0 },
      shape: randomOBJECTS().shape,
      contact: false,
    });
  }, []);

  return [target, updateCoords, reset, rotateTarget];
};
