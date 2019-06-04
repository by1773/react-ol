import React, { Component } from 'react';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';
import Map from 'ol/Map';
import View from 'ol/View';
import { fromLonLat } from 'ol/proj';

class MapOverviewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let { mapkey } = window.config;
    var TiandiMap_vec = new TileLayer({
      name: '天地图矢量图层',
      source: new XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=' + mapkey, //mapkey为天地图密钥
        wrapX: false,
      }),
    });
    var TiandiMap_cva = new TileLayer({
      name: '天地图矢量注记图层',
      source: new XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=' + mapkey, //mapkey为天地图密钥
        wrapX: false,
      }),
    });
    var TiandiMap_img = new TileLayer({
      name: '天地图影像图层',
      source: new XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + mapkey, //mapkey为天地图密钥
        wrapX: false,
      }),
    });
    var TiandiMap_cia = new TileLayer({
      name: '天地图影像注记图层',
      source: new XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=' + mapkey, //mapkey为天地图密钥
        wrapX: false,
      }),
    });

    this.map = new Map({
      view: new View({
        center: [113.4, 34.5], //将WGS8坐标转化为web墨卡托坐标
        zoom: 10,
        projection: 'EPSG:4326',
      }),
      layers: [TiandiMap_vec, TiandiMap_cva, TiandiMap_img, TiandiMap_cia],
      target: 'map', //绑定地图容器
    });
  }

  render() {
    return (
      <div>
        <div id="map" className="map" style={{ height: '100%' }} />
      </div>
    );
  }
}

export default MapOverviewMap;
