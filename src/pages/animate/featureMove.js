/**
 * 说明：地图要素自定义动画
 */
// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
// 数据源
import { Vector as VectorSource, Cluster } from 'ol/source';
// 图层
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
// 要素
import Feature from 'ol/Feature';
//
import { Point, LineString } from 'ol/geom';
// 坐标系转化
import { fromLonLat } from 'ol/proj';
// 样式
import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from 'ol/style';
// mark标注图片
import AddMarkerpng from '../../assets/Marker.png';

class FeatureMove extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating:false,   //是否开始动画
      speed: 10,           //运动速度
      now: new Date(),     //时间
    };
  }
  componentDidMount() {
    let { map } = this.refs.map;
    let that = this;
    //构建一组离散化的点
    var Coordinates = new Array();
    for (var i = 0; i < 600000; i += 5000) {
      Coordinates.push([-30322402 + i, 5444359 - i]);
    }
    for (var j = 0; j < 600000; j += 5000) {
      Coordinates.push([-30322402 + 600000 + j, 5444359 - 600000]);
    }
    for (var k = 0; k < 600000; k += 5000) {
      Coordinates.push([-30322402 + 1200000 + k, 5444359 - 600000 - k]);
    }
    for (var h = 0; h < 600000; h += 5000) {
      Coordinates.push([-30322402 + 1800000 + h, 5444359 - 1200000]);
    }
    //将离散点构建成一条折线
    var route = new LineString(Coordinates);
    //获取直线的坐标
    var routeCoords = route.getCoordinates();
    var routeLength = routeCoords.length;
// 样式
    var styles = {
        route: new Style({
            stroke: new Stroke({
                width: 6,
                color: [237, 212, 0, 0.8],
            }),
        }),
        icon: new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: AddMarkerpng,
            }),
        }),
        geoMarker: new Style({
            image: new CircleStyle({
                radius: 7,
                snapToPixel: false,
                fill: new Fill({ color: 'black' }),
                stroke: new Stroke({
                color: 'white',
                width: 2,
                }),
            }),
        }),
    };

    var routeFeature = new Feature({
      type: 'route',
      geometry: route,
      style:styles.route,
    });
    // 运动的mark
    var geoMarker = new Feature({
      type: 'geoMarker',
      geometry: new Point(routeCoords[0]),
      style:styles.geoMarker,
    });
    // 起点
    var startMarker = new Feature({
      type: 'icon',
      geometry: new Point(routeCoords[0]),
      style:styles.icon,
    });
    // 终点
    var endMarker = new Feature({
      type: 'icon',
      geometry: new Point(routeCoords[routeLength - 1]),
      style:styles.icon,
    });

    // 创建数据源
    var source = new VectorSource({
      features: [routeFeature, geoMarker, startMarker, endMarker],
      style: function(feature) {
          console.log("++++")
        //如果动画是激活的就隐藏geoMarker
        if (this.state.animating && feature.get('type') === 'geoMarker') {
          return null;
        }
        return styles[feature.get('type')];
      },
    });

    //创建图层
    var vector = new VectorLayer({ source: source });
    // 将图层添加到地图上
    map.addLayer(vector);
    this.setState({
        routeLength,routeCoords,styles,geoMarker
    })
  }
  moveFeature = event => {
    let { map } = this.refs.map;
    let {animating,now,speed,routeLength,routeCoords,styles}= this.state
    var vectorContext = event.vectorContext;
    var frameState = event.frameState;

    if (animating) {
      var elapsedTime = frameState.time - now;
      //通过增加速度，来获得lineString坐标
      var index = Math.round((speed * elapsedTime) / 1000);

      if (index >= routeLength) {
        this.stopAnimation(true);
        return;
      }

      var currentPoint = new Point(routeCoords[index]);
      var feature = new Feature(currentPoint);
      vectorContext.drawFeature(feature, styles.geoMarker);
    }
    //继续动画效果
    map.render();
  };

  startAnimation = () => {
    let { map } = this.refs.map;
    let {animating,now,geoMarker}= this.state
    if (animating) {
      this.stopAnimation(false);
    } else {
      animating = true;
      now = new Date().getTime();
      //隐藏geoMarker
      geoMarker.setStyle(null);
      //设置显示范围
      map.getView().setCenter([-28480226.95, 4254221.52]);
      map.on('postcompose', this.moveFeature);
      map.render();
    }
    this.setState({
        animating:true
    })
  };

  /**
   * @param {boolean}结束动画
   */
  stopAnimation = ended => {
    let { map } = this.refs.map;
    let {animating,now,speed,routeLength,routeCoords,styles,geoMarker}= this.state
    // startButton.textContent = '开始运动';

    //如果动画取消就开始动画
    var coord = ended ? routeCoords[routeLength - 1] : routeCoords[0];
    /** @type {ol.geom.Point} */
    geoMarker.getGeometry().setCoordinates(coord);
    //移除监听
    map.un('postcompose', this.moveFeature);
    this.setState({
        animating:false
    })
  };

  changState=()=>{
    let {animating}= this.state
    if(animating){
        this.stopAnimation()
    }else{
        this.startAnimation()
    }
  }
  render() {
    return (
      <div>
          <button onClick={this.changState}>运动</button>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }} />;
      </div>
    );
  }
}

export default FeatureMove;
