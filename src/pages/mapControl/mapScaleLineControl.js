import React, { Component } from 'react';
import Map from '../../component/map/map';

import {ScaleLine} from 'ol/control.js';

class MapScaleLineControl extends Component {
    constructor(props){
        super(props)
        this.state = {
            x:0,
            y:0
        }
    }
  componentDidMount() {
    let {map} = this.refs.map

    var scaleLineControl = new ScaleLine({
        //设置比例尺单位，degrees、imperial、us、nautical、metric（度量单位）
        units: "metric"
    });
    map.addControl(scaleLineControl)

  }

  render() {
    return (
      <div>
       {/*显示鼠标的坐标信息 */}
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }}  />;
      </div>
    );
  }
}

export default MapScaleLineControl;