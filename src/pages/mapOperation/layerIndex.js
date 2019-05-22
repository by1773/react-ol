// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
import style from './map.css'
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';

class LayerIndex extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
  componentDidMount() {
    // console.log(bg)
    let {map} = this.refs.map
    let {mapkey} = window.config
    var TiandiMap_vec = new TileLayer({
        name: "天地图矢量图层",
        source: new XYZ({
            url: "http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=" + mapkey,//mapkey为天地图密钥
            wrapX: false
        })
    });
    var TiandiMap_cva = new TileLayer({
        name: "天地图矢量注记图层",
        source: new XYZ({
            url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=" + mapkey,//mapkey为天地图密钥
            wrapX: false
        })
    });
    var TiandiMap_img = new TileLayer({
        name: "天地图影像图层",
        source: new XYZ({
            url: "http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=" + mapkey,//mapkey为天地图密钥
            wrapX: false
        })
    });
    var TiandiMap_cia = new TileLayer({
        name: "天地图影像注记图层",
        source: new XYZ({
            url: "http://t0.tianditu.com/DataServer?T=cia_w&x={x}&y={y}&l={z}&tk=" +mapkey,//mapkey为天地图密钥
            wrapX: false
        })
    });

   // 加载数据
    map.addLayer(TiandiMap_vec);
    map.addLayer(TiandiMap_cva);
    map.addLayer(TiandiMap_img);
    map.addLayer(TiandiMap_cia);
    this.setState({
        TiandiMap_vec,TiandiMap_cva,TiandiMap_img,TiandiMap_cia
    })
  }

  show=(type)=>{
    console.log("图层",type)
    console.log(this.state.TiandiMap_vec)
    this.state.TiandiMap_vec.setZIndex(10)
  }
  
  render() {
    return (
      <div className={style.mapBg} >
        <button onClick={this.show.bind(this,"TiandiMap_vec")}>矢量图</button>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }}  />;
      </div>
    );
  }
}

export default LayerIndex;