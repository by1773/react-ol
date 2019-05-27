import React, { Component } from 'react';
import Map from '../../component/map/map';
import {createStringXY} from 'ol/coordinate.js';
import mousePosition from 'ol/control/MousePosition.js';

class MousePosition extends Component {
    constructor(props){
        super(props)
        this.state = {
            x:0,
            y:0
        }
    }
  componentDidMount() {
    let {map} = this.refs.map

    var mousePositionControl = new mousePosition({
        coordinateFormat: createStringXY(4),
        projection: 'EPSG:4326',
        // // comment the following two lines to have the mouse position
        // // be placed within the map.
        className: 'custom-mouse-position',
        target: document.getElementById('mouse-position'),
        undefinedHTML: '&nbsp;'
    });
    map.addControl(mousePositionControl)
  }

  render() {
    return (
      <div>
       {/*显示鼠标的坐标信息 */}
       <div id="mouse-position">坐标信息</div>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }}  />;
      </div>
    );
  }
}

export default MousePosition;