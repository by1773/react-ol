// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
// import style from './map.css'
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { Vector as VectorSource } from 'ol/source';
import { Vector } from 'ol/layer';
import { Point } from 'ol/geom';
import { Style, Fill, Stroke, Icon } from 'ol/style';
import { Draw, Modify, Snap} from 'ol/interaction';
import bg from '../../assets/arrow.png'


class DrawLinearrow extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // console.log(bg)
    let { map } = this.refs.map;
    let { mapkey } = window.config;
    let that = this
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
    // 添加绘制图层
    var source = new VectorSource({ wrapX: false });
    var vector = new Vector({
        source: source,
        style: that.styleFunction
    });
    //将绘制层添加到地图容器中

    // 加载数据
    map.addLayer(TiandiMap_vec);
    map.addLayer(TiandiMap_cva);
    map.addLayer(vector);
    // 绘制图形
    var draw = new Draw({
        //绘制层数据源
        source: source,
        /** @type {ol.geom.GeometryType}几何图形类型 */
        type:"LineString",
    });
    map.addInteraction(draw);

    this.setState({
      TiandiMap_vec,
      TiandiMap_cva,
      vector,
      source
    });
  }
  //设置箭头样式
  styleFunction = feature => {
    var geometry = feature.getGeometry();
    var styles = [
    //设置线的样式
      new Style({
          stroke: new Stroke({
              color: '#ffcc33',
              width: 2
          })
      })
    ];
    geometry.forEachSegment(function (start, end) {
        var dx = end[0] - start[0];
        var dy = end[1] - start[1];
        var rotation = Math.atan2(dy, dx);
        //arrows
        styles.push(new Style({
            geometry: new Point(end),
            image: new Icon({
                src:bg,
                anchor: [0.75, 0.5],
                rotateWithView: false,
                rotation: -rotation
            })
        }));
    });
    return styles;
  }


  render() {
    return (
      <div>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }} />;
      </div>
    );
  }
}

export default DrawLinearrow;
