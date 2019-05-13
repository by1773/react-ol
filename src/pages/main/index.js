import React, { Component } from 'react';
import Map from '../../component/map/map';


class Main extends Component {
  // 2.dom渲染成功后进行map对象的创建
  componentDidMount() {
    // var map = new Map({
    //   view: new View({
    //     center: [0, 0],
    //     zoom: 1,
    //   }),
    //   layers: [
    //     new TileLayer({
    //       source: new OSM(),
    //     }),
    //   ],
    //   target: 'map',
    // });
  }

  render() {
    // 1.创建地图容器
    return <Map center={{lon:113.8,lat:34.6}}></Map>;
  }
}

export default Main;
