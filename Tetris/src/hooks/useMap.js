import { useState, useEffect } from 'react';
import { createArea } from '../mapSettings';

export const useMap = (target, reset) => {
  const [map, setMap] = useState(createArea());
  useEffect(() => {
    const openRows = newArea =>
      newArea.reduce((ack, row) => {
        if (row.findIndex(box => box[0] === 0) === -1) {
          ack.unshift(new Array(newArea[0].length).fill([0, 'open']));
          return ack;
        }
        ack.push(row);
        return ack;
      }, []);

    const updateMap = prevMap => {
      const newArea = prevMap.map(row =>
        row.map(box => (box[1] === 'open' ? [0, 'open'] : box))
      );

      target.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            newArea[y + target.coords.y][x + target.coords.x] = [
              value,
              `${target.contact ? 'closed' : 'open'}`,
            ];
          }
        });
      });


      if (target.contact) {
        reset();
        return openRows(newArea);
      }
      return newArea;
    };

    setMap(prev => updateMap(prev));
  }, [
    target.contact,
    target.coords.x,
    target.coords.y,
    target.shape,
    reset,
  ]);

  return [map, setMap];
};
