import React, { Component } from 'react';
import Tile from 'ol/layer/Tile';
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
    var gaodeMapLayer = new Tile({
        title: "高德地图",
        source: new XYZ({
            url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',
            wrapX: false
        })
    });

    this.map = new Map({
      view: new View({
        center: [113.4, 34.5], //将WGS8坐标转化为web墨卡托坐标
        zoom: 10,
        projection: 'EPSG:4326',
      }),
      layers: [gaodeMapLayer],
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
