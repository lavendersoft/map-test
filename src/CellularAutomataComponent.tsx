import React from 'react';
import { MapComponent } from './Map';
import { CellularAutomata } from './CellularAutomata';
import { IMapGenerationAlgorithmProps } from './App';

export class CellularAutomataComponent extends React.Component<IMapGenerationAlgorithmProps> {
  algorithm: CellularAutomata;

  constructor(props: IMapGenerationAlgorithmProps) {
    super(props);

    this.algorithm = new CellularAutomata(
      this.props.map,
      0.45,
      3,
      4);
    this.algorithm.initialize();
  }

  reInitialize() {
    this.algorithm.initialize();
    this.forceUpdate();
  }

  doNextStep() {
    this.algorithm.doStep();
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.reInitialize.bind(this)}>Re-initialize</button>
          <button onClick={this.doNextStep.bind(this)}>Next Step</button>
        </div>
        <div>
          <MapComponent
            canvasWidth={this.props.canvasWidth}
            canvasHeight={this.props.canvasHeight}
            map={this.props.map}>
          </MapComponent>
        </div>
      </div>
    );
  }
}
