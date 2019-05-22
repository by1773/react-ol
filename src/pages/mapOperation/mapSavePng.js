// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
import { Button } from 'antd';
import style from './map.css';

class MapOverviewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // console.log(bg)
  }
  //  地图保存成png
  savePng =()=>{
    let {map} = this.refs.map
    let that = this
    // 实现canvas转化成图片
    map.once('postcompose', function (event) {
        var canvas = event.context.canvas;
        var MIME_TYPE = "image/png";

        var imgURL = canvas.toDataURL(MIME_TYPE);

        var dlLink = document.createElement('a');
        dlLink.download = 'map.png';
        dlLink.href = imgURL;
        dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

        document.body.appendChild(dlLink);
        dlLink.click();
        document.body.removeChild(dlLink);
        });
        map.renderSync();
   }

  
  render() {
    return (
      <div className={style.mapBg}>
        <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.savePng}>
          导出png
        </Button>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }} />;
      </div>
    );
  }
}

export default MapOverviewMap;
