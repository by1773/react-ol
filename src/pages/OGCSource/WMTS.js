import React, { Component } from 'react';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import Map from 'ol/Map';
import View from 'ol/View';
import { Projection } from 'ol/proj';
import WMTS from 'ol/source/WMTS.js';
import WMTSTileGrid from 'ol/tilegrid/WMTS.js';
const lon = 106.339310798525;
const lat = 26.669990451708;
const wz_lon = 106.21
const wz_lat = 	37.99

class MapOverviewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let { mapkey } = window.config;
    let that = this;
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

    //切片名
    var gridNames = ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];
    //切片大小
    var resolutions = [0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7];
    //设置地图投影
    var projection = new Projection({
      code: 'EPSG:4326',//投影编码
      units: 'degrees',
      axisOrientation: 'neu'
    });
    // 

    let wmts = new WMTS({
      //服务地址
      // url: 'http://localhost:8080/geoserver/gwc/service/wmts',
      url: "http://172.16.2.253:8082/geoserver/gwc/service/wmts?",
      // layer: 'erqi:test1',
      // layer: "QZOneMap:QZ_ImgLayers",
      layer:'NX_Service:NX_WZ__Level_17',
      //切片集
      matrixSet: 'EPSG:4326',
      format: 'image/png',
      projection: projection,
      //切片信息
      tileGrid: new WMTSTileGrid({
        tileSize: [256, 256],
        extent: [-180.0, -90.0, 180.0, 90.0],//范围
        origin: [-180.0, 90.0],
        resolutions: resolutions,
        matrixIds: gridNames,
      }),
      //
      style: '',
      wrapX: true
    })

    var tileLayer = new TileLayer({
      opacity: 1,
      source: wmts,
      wrapX: false,
    });
    this.map = new Map({
      view: new View({
        // center: [lon, lat], //将WGS8坐标转化为web墨卡托坐标
        center: [wz_lon, wz_lat], //将WGS8坐标转化为web墨卡托坐标
        zoom: 10,
        projection: 'EPSG:4326',
      }),
      layers: [TiandiMap_img, TiandiMap_cia, tileLayer],
      // layers: [tileLayer],
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
