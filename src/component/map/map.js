// import ol from "./ol.css"
import React, { Component } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj.js';
import {defaults as defaultControls, ZoomToExtent} from 'ol/control.js';


class MapComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map:{}
    }
  }
  // 2.dom渲染成功后进行map对象的创建
  componentDidMount() {
    let { center } = this.props;
    if (!center) {
      center = { 
        lon: 113.8,
        lat: 34.6,
      };
    }
    this.map = new Map({
      // controls: defaultControls().extend([
      //   new ZoomToExtent({
      //     extent: [
      //       813079.7791264898, 5929220.284081122,
      //       848966.9639063801, 5936863.986909639
      //     ]
      //   })
      // ]),
      view: new View({
        center: fromLonLat([center.lon, center.lat]),
        zoom: 5,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',

    });
    //  传值给父组件
    if(this.props.getMap){
       this.props.getMap("map对象")
    }
   
  }

  render() {
    // 1.创建地图容器
    return (
      <div style={{ height: '100%' }}>
        <div id="map" className="map" style={{ height: '100%' }} />
      </div>
    );
  }
}

export default MapComponent;
