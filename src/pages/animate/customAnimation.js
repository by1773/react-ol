/**
 * 说明：地图要素自定义动画
 */
// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
// 数据源
import { Vector as VectorSource,Cluster } from 'ol/source';
// 图层
import { Tile as TileLayer,Vector as VectorLayer} from 'ol/layer';
// 要素
import Feature from 'ol/Feature';
// 
import {Point} from 'ol/geom';
// 坐标系转化
import {fromLonLat} from 'ol/proj';
// 样式
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style';
// mark标注图片
import AddMarkerpng from '../../assets/Marker.png'

import {unByKey} from 'ol/Observable';

import {easeOut} from 'ol/easing';


class AddMarkerLable extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
  componentDidMount() {
    let {map} = this.refs.map
    let that = this
    // 创建数据源
    var source = new VectorSource({wrapX: false});
    //创建图层
    var vector = new VectorLayer({ source: source });
    // 将图层添加到地图上
    map.addLayer(vector);

    var duration = 3000;
   
    source.on('addfeature', function(e) {
        that.flash(e.feature);
    });

    this.setState({
        source
    })

    setInterval(that.addRandomFeature,1000)
  }
   /**
    * 添加随机要到到数据源上
    */
   addRandomFeature=() =>{
    var x = Math.random() * 360 - 180;
    var y = Math.random() * 180 - 90;
    var geom = new Point(fromLonLat([x, y]));
    var feature = new Feature(geom);
    this.state.source.addFeature(feature);
  }

 
   flash=(feature) =>{
    let {map} = this.refs.map
    var duration = 3000;
    var start = new Date().getTime();
    var listenerKey = map.on('postcompose', animate);

    function animate(event) {
      var vectorContext = event.vectorContext;
      var frameState = event.frameState;
      var flashGeom = feature.getGeometry().clone();
      var elapsed = frameState.time - start;
      var elapsedRatio = elapsed / duration;
      // radius will be 5 at start and 30 at end.
      var radius = easeOut(elapsedRatio) * 25 + 5;
      var opacity = easeOut(1 - elapsedRatio);

      var style = new Style({
        image: new CircleStyle({
          radius: radius,
          stroke: new Stroke({
            color: 'rgba(255, 0, 0, ' + opacity + ')',
            width: 0.25 + opacity
          })
        })
      });

      vectorContext.setStyle(style);
      vectorContext.drawGeometry(flashGeom);
      if (elapsed > duration) {
        unByKey(listenerKey);
        return;
      }
      // tell OpenLayers to continue postcompose animation
      map.render();
    }
  }


  render() {
    return (
      <div  >
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }}  />;
      </div>
    );
  }
}

export default AddMarkerLable;