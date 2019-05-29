// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
// 数据源
import { Vector as VectorSource,Cluster } from 'ol/source';
// 图层
import { Vector} from 'ol/layer';
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

class AddMarkerLable extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
  componentDidMount() {
    let {map} = this.refs.map


    var count = 100000;
    var features = new Array(count);
    var e = 7000000;
    for (var i = 0; i < count; ++i) {
        var coordinates = [2*e * Math.random() - e, 2 * e * Math.random() - e];
        features[i] = new Feature({
            geometry: new Point(coordinates),
        });
    }
    // 创建矢量数据源
    var vectorSource = new VectorSource({
        features: features
    });
    // 创建聚合标注数据源
    var clusterSource = new Cluster({
        distance: 40,
        source: vectorSource
    });
    // 创建聚合图层
    var styleCache = {};
    var clusters = new Vector({
        source: clusterSource,
        style: function (feature, resolution) {
            var size = feature.get('features').length;
            var style = styleCache[size];
            if (!style) {
                style = [
                    new Style({
                        image: new CircleStyle({
                            radius: 10,
                            stroke: new Stroke({
                                color: '#fff'
                            }),
                            fill: new Fill({
                                color: '#3399CC'
                            })
                        }),
                        text: new Text({
                            text: size.toString(),
                            fill: new Fill({
                                color: '#fff'
                            })
                        })
                    })
                ];
                styleCache[size] = style;
            }
            return style;
        }
    });
    
    // 将标注图层添加到地图上
    map.addLayer(clusters);

    this.setState({
        vectorSource,
        clusterSource,
        clusters
    })

  }
  // 移除聚合图层
  removeMarker = ()=>{
    let {map} = this.refs.map
    let {clusterSource,clusters} = this.state
    //当前聚合标注数据源中的要素
    var currentFeatrues = clusterSource.getSource().getFeatures();
    //如果聚合标注数据源中没有要素，则重新添加要素
    if (currentFeatrues.length != 0) {
        //移除聚合标注数据源中的所有要素
        clusterSource.getSource().clear();
        //移除标注图层
        map.removeLayer(clusters);
    }
  }

  render() {
    return (
      <div  >
        {/* <img src={bg}></img> */}
        <button onClick={this.removeMarker}>移除聚合</button>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }}  />;
      </div>
    );
  }
}

export default AddMarkerLable;