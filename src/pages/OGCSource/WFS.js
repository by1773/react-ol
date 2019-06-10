import React, { Component } from 'react';
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import Map from 'ol/Map';
import View from 'ol/View';
import { DragBox, Select } from 'ol/interaction.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { click} from 'ol/events/condition.js';
import { Vector as VectorLayer} from 'ol/layer.js';
import {bbox as bboxStrategy} from 'ol/loadingstrategy.js';
import {Stroke, Style} from 'ol/style.js';
import VectorSource from 'ol/source/Vector.js';

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
    // http://localhost:8080/geoserver/erqi/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=erqi:three_&maxFeatures=50&outputFormat=application%2Fjson
    var vectorSource = new VectorSource({
        format: new GeoJSON(),
        url: function(extent) {
          return 'http://localhost:8080/geoserver/erqi/ows?service=WFS&' +
              'version=1.0.0&request=GetFeature&typename=erqi:three_&' +
              'outputFormat=application/json&srsname=EPSG:4326&' +
              'bbox=' + extent.join(',') + ',EPSG:4326';
        },
        strategy: bboxStrategy
      });
      var vector = new VectorLayer({
        source: vectorSource,
        style: new Style({
          stroke: new Stroke({
            color: 'rgba(0, 0, 255, 1.0)',
            width: 2
          })
        })
      });

    let view = new View({
      center: [113.4, 34.5], //将WGS8坐标转化为web墨卡托坐标
      zoom: 10,
      projection: 'EPSG:4326',
    });
    // 获取要素信息
    this.map = new Map({
      view: view,
      layers: [TiandiMap_img, TiandiMap_cia, vector],
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
    // this.map.on('click', function(event) {
    //     console.log(event)
    //     var view = that.map.getView();
    //     var viewResolution = view.getResolution();
    //     var source = wmsLayer.getSource() 
    //     var url = source.getGetFeatureInfoUrl(
    //       event.coordinate, viewResolution, view.getProjection(),
    //       {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 50});
    //       console.log(url)
    //     if (url) {
    //       //  用网络请求获取url中所含有的信息
    //       // document.getElementById('nodelist').innerHTML = '<iframe seamless src="' + url + '"></iframe>';
    //     }
    // });
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
