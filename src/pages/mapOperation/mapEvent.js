// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
import style from './map.css'

class MapOverviewMap extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
  componentDidMount() {
    // console.log(bg)
    let {map} = this.refs.map
     //鼠标单击事件
    map.on('singleclick', function (e) {
        console.log(e)
        alert("鼠标被单击了"+e.coordinate);
    });

    map.on('dblclick', function (e) {
        console.log(e)
        alert("鼠标被双击了"+e.coordinate);
    });

    
    map.on('pointermove', function (e) {
        console.log(e)
        alert("鼠标移动"+e.coordinate);
    });


    
    map.on('pointerdrag', function (e) {
        console.log(e)
        alert("鼠标拖动"+e.coordinate);
    });
  }
  
  render() {
    return (
      <div className={style.mapBg} >
        {/* <img src={bg}></img> */}
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }}  />;
      </div>
    );
  }
}

export default MapOverviewMap;