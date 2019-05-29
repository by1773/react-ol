// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
// 数据源
import { Vector as VectorSource } from 'ol/source';
// 图层
import { Vector } from 'ol/layer';
// 要素
import Feature from 'ol/Feature';
//
import { Point } from 'ol/geom';
// 坐标系转化
import { fromLonLat } from 'ol/proj';
// 样式
import {Icon,Style,Text,Fill,Stroke} from 'ol/style';
// mark标注图片
import markImage from '../../assets/Marker.png';
class AddMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let { map } = this.refs.map;
    //创建标注要素
    let markFeature = new Feature({
      geometry: new Point(fromLonLat([116.28, 39.54])),
      name:"标注"
    });
    //设置图标的样式
    markFeature.setStyle(this.setMakerStyle(markFeature));
    // 创建标注的数据源
    var vectorSource = new VectorSource({
      features: [markFeature],
    });
    // 创建标注图层
    var vectorLayer = new Vector({
      source: vectorSource,
    });
    // 将标注图层添加到地图上
    map.addLayer(vectorLayer);

    this.setState({
      vectorSource,
    });
  }

  addMarker = () => {
    let { map } = this.refs.map;
    let that = this;
    //鼠标单击事件
    map.on('singleclick', function(e) {
      console.log(e);
      // alert("鼠标被单击了"+e.coordinate);
      that.addMakerOn(e.coordinate);
    });
  };

  addMakerOn = coordinate => {
    //创建标注要素
    let markFeature = new Feature({
      geometry: new Point(coordinate),
      name:'标注'
    });
    //设置图标的样式
    markFeature.setStyle(this.setMakerStyle(markFeature));
    // 图标要素添加到数据源上
    this.state.vectorSource.addFeature(markFeature);
  };

  setMakerStyle = (feature) => {
    return new Style({
      /**{olx.style.IconOptions}类型*/
      image: new Icon({
        anchor: [0.5, 40],
        anchorOrigin: 'top-right',
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        offsetOrigin: 'top-right',
        // offset:[0,10],
        //图标缩放比例
        scale: 0.6,
        //透明度
        opacity: 0.75,
        //图标的url
        src: markImage,
      }),
      text: new Text({
        //位置
        textAlign: 'center',
        //基准线
        textBaseline: 'middle',
        //文字样式
        font: 'normal 14px 微软雅黑',
        //文本内容
        text: feature.get('name'),
        //文本填充样式（即文字颜色）
        fill: new Fill({ color: '#aa3300' }),
        stroke: new Stroke({ color: '#ffcc33', width: 2 })
    })
    });
  };

  render() {
    return (
      <div>
        {/* <img src={bg}></img> */}
        <button onClick={this.addMarker}>点击开始添加标注</button>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }} />;
      </div>
    );
  }
}

export default AddMarker;
