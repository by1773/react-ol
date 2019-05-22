import React, { Component } from 'react';
import Map from '../../component/map/map';
import { Button } from 'antd';
import { fromLonLat } from 'ol/proj.js';

// import {defaults as defaultControls, ZoomToExtent} from './node_modules/ol/control.js.js';

class MapCurrentInfo extends Component {
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
  //  当前分辨率
  zoomin = () => {
    let { view } = this.state;
    var curResolution = view.getResolution();
    //弹框显示
    alert("当前分辨率:" + curResolution);
  };
  // 当前显示范围
  zoomout = () => {
      let view = this.state.map.getView();
      //获取地图范围
      var ex = view.calculateExtent(this.state.map.getSize());
      var str = ex[0] + "," + ex[1] + "," + ex[2] + "," + ex[3];
      //弹框显示
      alert("当前范围为：" + str);
  };
  //  当前视口范围
  panTo = () => {
    let viewSize = this.state.map.getSize();
     //弹框显示
     alert("当前div高：" + viewSize[1] + " 宽：" + viewSize[0]);
  };
  render() {
    return (
      <div>
        <div onClick={this.zoomin}>
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.zoomin}>
            当前分辨率
          </Button>
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.zoomout}>
            当前显示范围
          </Button>
          <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.panTo}>
            当前视口范围
          </Button>
        </div>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }} />;
      </div>
    );
  }
}

export default MapCurrentInfo;
