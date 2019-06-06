import React, { Component } from 'react';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import Map from 'ol/Map';
import View from 'ol/View';
import { DragBox, Select } from 'ol/interaction.js';
import ImageLayer from 'ol/layer/Image.js';
import ImageWMS from 'ol/source/ImageWMS.js';
import { click, pointerMove, altKeyOnly } from 'ol/events/condition.js';
class WMS extends Component {
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

    let wmsSource = new ImageWMS({
      //WMS服务基地址
      url: 'http://localhost:8080/geoserver/erqi/wms',
      //图层参数
      params: { LAYERS: 'erqi:two' },
      //服务类型
      serverType: 'geoserver',
      opacity: 0.5,
    });

    var wmsLayer = new ImageLayer({
      source: wmsSource,
    });
    let view = new View({
      center: [113.4, 34.5], //将WGS8坐标转化为web墨卡托坐标
      zoom: 10,
      projection: 'EPSG:4326',
    });
    console.log(wmsLayer)
    // 获取要素信息
    this.map = new Map({
      view: view,
      layers: [TiandiMap_img, TiandiMap_cia, wmsLayer],
      target: 'map', //绑定地图容器
    });

    // 点击获取选中要素的属性
    var select = new Select({
      condition: click,
    });
    this.map.addInteraction(select);
    // var selectedFeatures = select.getFeatures();
    select.setActive(true);
    //    setActive
    select.on('select', function(e) {
      console.log(e);
    });
    this.map.on('click', function(event) {
        console.log(event)
      var features =  that.map.getFeaturesAtPixel(event.pixel);
      console.log("++",features)
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

export default WMS;
