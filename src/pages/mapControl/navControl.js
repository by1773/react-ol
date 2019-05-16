import React, { Component } from 'react';
import Map from '../../component/map/map';
import {defaults as defaultControls, ZoomToExtent,ZoomSlider} from 'ol/control.js';

class NavControl extends Component {
  componentDidMount() {
    let {map} = this.refs.map

    var zoomslider = new ZoomSlider();
    map.addControl(zoomslider);
    //实例化zoomToExtent控件并加载到地图容器中
    var zoomToExtent = new ZoomToExtent({
        extent: [
        813079.7791264898, 5929220.284081122,
        848966.9639063801, 5936863.986909639
        ]
    });
    map.addControl(zoomToExtent);

  }

  render() {
    return (
      <div>
       
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }}  />;
        <div id="test">样式测试</div>
      </div>
    );
  }
}

export default NavControl;
