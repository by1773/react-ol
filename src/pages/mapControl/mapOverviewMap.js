import React, { Component } from 'react';
import Map from '../../component/map/map';

import {OverviewMap} from 'ol/control.js';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';

class MapOverviewMap extends Component {
    constructor(props){
        super(props)
        this.state = {
            x:0,
            y:0
        }
    }
  componentDidMount() {
    let {map} = this.refs.map

    var scaleLineControl = new OverviewMap({
        //鹰眼控件样式（see in overviewmap-custom.html to see the custom CSS used）
        className: 'ol-overviewmap ol-custom-overviewmap',
        //鹰眼中加载同坐标系下不同数据源的图层
        layers: [ new TileLayer({
            source: new OSM(),
          })],
        //鹰眼控件展开时功能按钮上的标识（网页的JS的字符编码）
        collapseLabel: '\u00BB',
        //鹰眼控件折叠时功能按钮上的标识（网页的JS的字符编码）
        label: '\u00AB',
        //初始为展开显示方式
        collapsed: false
    });
    map.addControl(scaleLineControl)

  }

  render() {
    return (
      <div>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }}  />;
      </div>
    );
  }
}

export default MapOverviewMap;