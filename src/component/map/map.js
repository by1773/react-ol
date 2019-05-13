import React, { Component } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import {fromLonLat} from 'ol/proj.js';

class MapComponent extends Component {
  // 2.dom渲染成功后进行map对象的创建
  componentDidMount() {
    console.log(this.props)
    let {center} = this.props
    if(!center){
        center = {
            lon:113.8,
            lat:34.6
        }
    }
    console.log(center)
    var map = new Map({
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
  }

  render() {
    // 1.创建地图容器
    return(
        <div style={{height:"100%"}}>
            <div id="map" className="map" style={{height:"100%"}}/>
        </div>
    ) ;
  }
}

export default MapComponent;