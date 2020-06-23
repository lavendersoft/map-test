import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Map } from './Map';
import { CellularAutomataComponent } from './CellularAutomataComponent';


class App extends React.Component {
  map: Map;
  canvasWidth = 1000;
  canvasHeight = 1000;

  constructor() {
    super({});

    this.map = new Map(100, 100);
  }


  render() {
    return (
      <div className="App">
        <header>
          <title>Map Generation Demo</title>
        </header>
        <body>
          <div>
            <p>This is a demo of different map generation algorithms.</p>
          </div>
          <CellularAutomataComponent map={this.map} canvasWidth={this.canvasWidth} canvasHeight={this.canvasHeight} />
        </body>
      </div>
    );
  }
}

export interface IMapGenerationAlgorithmProps {
  map: Map;
  canvasWidth: number;
  canvasHeight: number;
}

export default App;
