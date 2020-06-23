import React, { createRef } from "react";

export class Map {
  grid: boolean[][];
  height: number;
  width: number;


  constructor(width: number, height: number) {
    this.height = height;
    this.width = width;
    this.grid = [];

    for (let i = 0; i < width; i++) {
      let level = [];
      for (let j = 0; j < height; j++) {
        level.push(true);
      }
      this.grid.push(level);
    }
  }

  isWall(x: number, y: number): boolean {
    if (x < 0 || y < 0) {
      return true;
    }
    else if (this.width <= x || this.height <= y) {
      return true;
    }
    else {
      return this.grid[x][y];
    }
  }

  clearSpot(x: number, y: number): void {
    if (0 <= x && x < this.width && 0 <= y && y < this.height) {
      this.grid[x][y] = false;
    }
  }

  setWall(x: number, y: number): void {
    if (0 <= x && x < this.width && 0 <= y && y < this.height) {
      this.grid[x][y] = true;
    }
  }

  countNeighboringWalls(x: number, y: number): number {
      let count = 0;
      for (let a = x - 1; a <= x + 1; a++) {
          for (let b = y - 1; b <= y + 1; b++) {
              if (!(x == a && y == b) && this.isWall(a, b)) {
                  count += 1;
              }
          }
      }
      return count;
  }

  updateWithData(data: boolean[][]): void {
      if (data.length !== this.grid.length
        || (data.length > 0 && data[0].length !== this.grid[0].length)) {
            return;
      }

      for (let x = 0; x < this.width; x++) {
          for (let y = 0; y < this.height; y++) {
              this.grid[x][y] = data[x][y];
          }
      }
  }
}

interface IMapComponentProps {
    canvasWidth: number;
    canvasHeight: number;
    map: Map;
}

export class MapComponent extends React.Component<IMapComponentProps> {
    private canvasRef = createRef<HTMLCanvasElement>();
    private floorColor: string = "#FFFFFF";
    private wallColor: string = "#000000";
    private tileHeight: number;
    private tileWidth: number;

    constructor(props: IMapComponentProps) {
        super(props);

        if (props.canvasWidth % props.map.width !== 0) {
            throw new Error(`Expected canvas width to be a multiple of the number of tiles.`);
        }
        if (props.canvasHeight % props.map.height !== 0) {
            throw new Error(`Expected canvas height to be a multiple of the number of tiles.`);
        }

        this.tileWidth = props.canvasWidth / props.map.width;
        this.tileHeight = props.canvasHeight / props.map.height;
    }

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        const ctx = this.canvasRef.current?.getContext("2d");
        if (ctx == null) {
            return;
        }

        ctx.fillStyle = this.wallColor;
        ctx.fillRect(0, 0, this.props.canvasWidth, this.props.canvasHeight);

        for (let x = 0; x < this.props.map.width; x++) {
            for (let y = 0; y < this.props.map.height; y++) {
                if (this.props.map.grid[x][y]) {
                    ctx.fillStyle = this.wallColor;
                } else {
                    ctx.fillStyle = this.floorColor;
                }
                ctx.fillRect(
                    x * this.tileWidth,
                    y * this.tileHeight,
                    this.tileWidth,
                    this.tileHeight);
            }
        }
    }

    render() {
        return (
            <canvas
                ref={this.canvasRef}
                width={this.props.canvasWidth}
                height={this.props.canvasHeight}>
            </canvas>
        );
    }
}