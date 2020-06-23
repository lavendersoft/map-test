import { Map } from './Map';

export class CellularAutomata {
  data: Map;
  chanceToStartAlive: number;
  deathLimit: number;
  birthLimit: number;

  constructor(data: Map, chanceToStartAlive: number, deathLimit: number, birthLimit: number) {
    this.data = data;
    this.chanceToStartAlive = chanceToStartAlive;
    this.deathLimit = deathLimit;
    this.birthLimit = birthLimit;
  }

  doStep(): void {
    let newMap: boolean[][] = [];

    for (let x = 0; x < this.data.width; x++) {
      let row: boolean[] = [];
      for (let y = 0; y < this.data.height; y++) {
        let neighboringWalls = this.data.countNeighboringWalls(x, y);
        if (this.data.isWall(x, y)) {
          if (neighboringWalls < this.deathLimit) {
            row.push(false);
          }
          else {
            row.push(true);
          }
        }
        else {
          if (this.birthLimit < neighboringWalls) {
            row.push(true);
          }
          else {
            row.push(false);
          }
        }
      }

      newMap.push(row);
    }

    this.data.updateWithData(newMap);
  }

  initialize(): void {
    for (let x = 0; x < this.data.width; x++) {
      for (let y = 0; y < this.data.height; y++) {
        if (Math.random() < this.chanceToStartAlive) {
          this.data.setWall(x, y);
        }
        else {
          this.data.clearSpot(x, y);
        }
      }
    }
  }
}
