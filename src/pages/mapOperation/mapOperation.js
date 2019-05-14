import React, { Component } from 'react';
import Map from '../../component/map/map';
import { Button } from 'antd';
import { fromLonLat } from 'ol/proj.js';
// import {defaults as defaultControls, ZoomToExtent} from './node_modules/ol/control.js.js';

class MapOperation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      view: null,
    };
  }

  componentDidMount() {
    let { map } = this.refs.map;
    //   map.addNavControl()
    let layrs = map.getOverlays();
    console.log('图层信息', layrs);
    // 缩小
    var view = map.getView();
    console.log('地图', view);
    // var zoom = view.getZoom();
    this.setState({
      map,
      view,
    });
  }
  // 地图缩小
  zoomin = () => {
    let { view } = this.state;
    var zoom = view.getZoom();
    view.setZoom(zoom - 1);
  };
  // 地图放大
  zoomout = () => {
    var view = this.state.map.getView();
    var zoom = view.getZoom();
    view.setZoom(zoom + 2);
  };
  // 地图信息
  panTo = () => {
    let { map } = this.state;
    //获取地图视图
    var view = map.getView();
    var wh = fromLonLat([105, 35]);
    //平移地图
    view.setCenter(wh);
    view.setZoom(10);
  };
  // 复位 
  goback = () => {
    let { view } = this.state;
    var wh = fromLonLat([113.8, 34.6]);
    //平移地图
    view.setCenter(wh);
    view.setZoom(5);
  };
  render() {
    return (
      <div>
        <div onClick={this.zoomin}>
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.zoomin}>
            缩小
          </Button>
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.zoomout}>
            放大
          </Button>
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.panTo}>
            平移
          </Button>
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.goback}>
            复位
          </Button>
        </div>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }} />;
      </div>
    );
  }
}

export default MapOperation;
