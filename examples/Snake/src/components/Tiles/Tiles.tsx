import { getSize } from "../utils";
import { Tile } from "./Tile";

const SIZE = getSize();

const Tiles = () => (
  <>
    {Array(SIZE)
      .fill(null)
      .map((_, y) =>
        Array(SIZE)
          .fill(null)
          .map((__, x) => <Tile key={`${x}_${y}`} x={x} y={y} />)
      )}
  </>
);

export default Tiles;
