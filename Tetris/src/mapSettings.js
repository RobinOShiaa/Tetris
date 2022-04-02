export const MAP_WIDTH = 12;
export const MAP_HEIGHT = 20;

export const createArea = () =>
  Array.from(Array(MAP_HEIGHT), () =>
    new Array(MAP_WIDTH).fill([0, 'open'])
  );

export const detectBoundary = (target, area, { x: coordX, y: coordY }) => {

  for (let y = 0; y < target.shape.length; y += 1) {
    for (let x = 0; x < target.shape[y].length; x += 1) {
      if (target.shape[y][x] !== 0) {
        if (!area[y + target.coords.y + coordY] || !area[y + target.coords.y + coordY][x + target.coords.x + coordX] ||
          area[y + target.coords.y + coordY][x + target.coords.x + coordX][1] !== 'open'
        ) {
          return true;
        }
      }
    }
  }
  return false;
};
