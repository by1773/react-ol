import React, { Component } from 'react';
import Map from '../../component/map/map';
import { Checkbox,Radio } from 'antd';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';
import style from './mapcontrol.css'

class MapOverviewMap extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
  componentDidMount() {
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

    // 图层的显示与隐藏主要是依靠
    //    var layers = map.getLayers();
    //    layer.setVisible(false);
   // 加载数据
    map.addLayer(TiandiMap_vec);
    map.addLayer(TiandiMap_cva);
    map.addLayer(TiandiMap_img);
    map.addLayer(TiandiMap_cia);
    // console.log("图层显示",TiandiMap_cia.getVisible())
    // TiandiMap_cia.setVisible(false)
    this.setState({
      map,TiandiMap_vec,TiandiMap_cva,TiandiMap_img,TiandiMap_cia
    })
  }
  onChange = (e)=>{
   let {name,checked} = e.target
   let {TiandiMap_vec,TiandiMap_cva,TiandiMap_img,TiandiMap_cia}= this.state
   switch(name){
      case "1":
        TiandiMap_vec.setVisible(checked)
        break;
      case "2":
        TiandiMap_cva.setVisible(checked)
        break;
      case "3":
        TiandiMap_img.setVisible(checked)
        break;
      case "4":
        TiandiMap_cia.setVisible(checked)
        break;
      default:
        break
   }
   
  }
  render() {
    return (
      <div>
        <div className={style.changLayers}>
          <div>图层选择</div>
          <Checkbox className={style.checkBox} onChange={this.onChange} defaultChecked  name="1" style={{marginLeft:"8px"}}>天地图矢量图层</Checkbox>
          <Checkbox className={style.checkBox} onChange={this.onChange} defaultChecked  name="2" >天地图矢量注记图层</Checkbox>
          <Checkbox className={style.checkBox} onChange={this.onChange} defaultChecked  name="3" >天地图影像图层</Checkbox>
          <Checkbox className={style.checkBox} onChange={this.onChange} defaultChecked  name="4" >天地图影像注记图层</Checkbox>
        </div>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }}  />;
      </div>
    );
  }
}

export default MapOverviewMap;