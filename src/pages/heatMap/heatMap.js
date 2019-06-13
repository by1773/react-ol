import React, { Component } from 'react';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Map from 'ol/Map';
import View from 'ol/View';
import { Heatmap as HeatmapLayer } from 'ol/layer';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import KML from 'ol/format/KML';
class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let { mapkey } = window.config;
    let that = this;
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
    var heatData = [
      {
        type: 'FeatureCollection',
        features: [
          { type: 'Point', coordinates: [117.363228, 32.939667] },
          { type: 'Point', coordinates: [117.359623, 32.941612] },
          { type: 'Point', coordinates: [117.365631, 32.94651] },
          { type: 'Point', coordinates: [117.36443, 32.928789] },
          { type: 'Point', coordinates: [117.351212, 32.95328] },
          { type: 'Point', coordinates: [117.363228, 32.936281] },
          { type: 'Point', coordinates: [117.385029, 32.948383] },
          { type: 'Point', coordinates: [117.370781, 32.920144] },
          { type: 'Point', coordinates: [117.393097, 32.936137] },
          { type: 'Point', coordinates: [117.373528, 32.919856] },
          { type: 'Point', coordinates: [117.353443, 32.916541] },
          { type: 'Point', coordinates: [117.397217, 32.913803] },
          { type: 'Point', coordinates: [117.35207, 32.904148] },
        ],
      },
    ];

    var vector = new HeatmapLayer({
      source: new VectorSource({
        //   1
        // url: '2012-02-10.kml',
        // format: new KML({
        //   extractStyles: false,
        // }),
        // 2
        // features: new GeoJSON().readFeatures(heatData[0], {
        //   dataProjection: 'EPSG:4326',
        //   featureProjection: 'EPSG:4326',
        // }),
        // 3
        url:
          'http://localhost:8080/geoserver/sf/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=sf:bugsites&maxFeatures=50&outputFormat=application%2Fjson',
        format: new GeoJSON(),
      }),
      blur: 10, //模糊
      radius: 10, //热点半径
    });

    //为矢量数据源添加addfeature事件监听
    vector.getSource().on('addfeature', function(event) {
      // 示例数据2012_Earthquakes_Mag5.kml，可从其地标名称提取地震信息
      //要素的名称属性
      console.log(1, event.feature);
      var name = event.feature.get('cat');
      console.log(name);
      //   //得到要素的地震震级属性（magnitude）
      //   var magnitude = parseFloat(name.substr(2));
      //   //设置要素的weight属性
      event.feature.set('weight', name - 5);
    });

    this.map = new Map({
      view: new View({
        center: [113.4, 34.5], //将WGS8坐标转化为web墨卡托坐标
        zoom: 10,
        // projection: 'EPSG:4326',
      }),
      layers: [TiandiMap_vec, TiandiMap_cva, vector],
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

export default HeatMap;
