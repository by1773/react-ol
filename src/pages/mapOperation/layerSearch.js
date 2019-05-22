import React, { Component } from 'react';
import Map from '../../component/map/map';
import { Checkbox,Radio } from 'antd';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ.js';
// import style from './mapcontrol.css'

class LayerSearch extends Component {
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

   // 加载数据
    map.addLayer(TiandiMap_vec);
    map.addLayer(TiandiMap_cva);
    map.addLayer(TiandiMap_img);
    map.addLayer(TiandiMap_cia);
    let radius = 75;
    let mousePosition = null;
    map.on('pointermove', function (e) {
        // console.log(e)
        mousePosition = map.getEventPixel(e);
        // console.log(mousePosition)
        map.render();
    });
    // 在渲染层之前,做剪裁
    TiandiMap_vec.on('precompose', function (event) {
        var ctx = event.context;
        var pixelRatio = event.frameState.pixelRatio;
        // console.log(event)
        ctx.save();
        ctx.beginPath();
        if (mousePosition) {
            //只显示一个围绕着鼠标的圆圈
            ctx.arc(mousePosition[0] * pixelRatio, mousePosition[1] * pixelRatio, radius * pixelRatio, 0, 2 * Math.PI);
            ctx.lineWidth = 5 * pixelRatio;
            ctx.strokeStyle = 'rgba(0,0,0,0.5)';
            ctx.stroke();
        }
        ctx.clip();
    });

    // 呈现层后,恢复画布的背景
    TiandiMap_vec.on('postcompose', function (event) {
        var ctx = event.context;
        ctx.restore();
    });
  }

  onmouseenter=(e)=>{
    console.log("dom鼠标移动了")
  }
 
  move=(e)=>{
    console.log("鼠标",e)
  }
  render() {
    return (
      <div>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }}  onMouseEnter={this.onmouseenter} onTouchMove={this.move}/>;
      </div>
    );
  }
}

export default LayerSearch;