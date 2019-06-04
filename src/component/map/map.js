// import ol from "./ol.css"
// react 组件
import React, { Component } from 'react';
// openlayers 函数
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj.js';
import {defaults as defaultControls, ZoomToExtent} from 'ol/control.js'


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
      view: new View({
        center: fromLonLat([center.lon, center.lat]),   //将WGS8坐标转化为web墨卡托坐标
        zoom: 5,
        projection: "EPSG:3857"
      }),
      layers: [
        new TileLayer({
          source: new OSM(), //加载OSM数据
        }),
      ],
      target: 'map',   //绑定地图容器

    });
    //  传值给父组件
    // if(this.props.getMap){
    //    this.props.getMap("map对象")
    // }
   
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
