import React, { Component } from 'react';
import Tile from 'ol/layer/Tile';
import TileImage from 'ol/source/TileImage';
import Map from 'ol/Map';
import View from 'ol/View';
import { get } from 'ol/proj';
import TileGrid from 'ol/tilegrid/TileGrid';

class MapOverviewMap extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    var projection = get('EPSG:3857'); //加载百度地图采用3857坐标系
    let resolutions = [];
    for (var i = 0; i < 19; i++) {
      resolutions[i] = Math.pow(2, 18 - i);
    }
    var tilegrid = new TileGrid({
      origin: [0, 0],
      resolutions: resolutions,
    });
    //拼接百度地图出图地址
    var baidu_source = new TileImage({
      //设置坐标参考系
      projection: projection,
      //设置分辨率
      tileGrid: tilegrid,
      //出图基地址
      tileUrlFunction: function(tileCoord, pixelRatio, proj) {
        console.log(tileCoord);
        if (!tileCoord) {
          return '';
        }
        var z = tileCoord[0];
        var x = tileCoord[1];
        var y = tileCoord[2];

        if (x < 0) {
          x = 'M' + -x;
        }
        if (y < 0) {
          y = 'M' + -y;
        }
        return (
          'http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=' +
          x +
          '&y=' +
          y +
          '&z=' +
          z +
          '&styles=pl&udt=20151021&scaler=1&p=1'
        );
       
      },
    });
    console.log(baidu_source);

    //百度地图
    var baidu_layer = new Tile({
      source: baidu_source,
    });

    this.map = new Map({
      view: new View({
        // center: [113.4, 34.5], //将WGS8坐标转化为web墨卡托坐标
        zoom: 10,
        // projection: 'EPSG:3857',
      }),
      layers: [baidu_layer],
      target: 'map', //绑定地图容器
    });
  }

  render() {
    return (
      <div>
        <div id="map" className="map" style={{ height: '100%' }} />
      </div>
    );
  }
}

export default MapOverviewMap;
