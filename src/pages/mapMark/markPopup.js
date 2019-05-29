// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
// 数据源
import { Vector as VectorSource } from 'ol/source';
// 图层
import { Vector } from 'ol/layer';
// 要素
import Feature from 'ol/Feature';
//
import { Point } from 'ol/geom';
// 坐标系转化
import { fromLonLat } from 'ol/proj';

import Overlay from 'ol/Overlay.js';

// 样式
import { Icon, Style, Text, Fill, Stroke } from 'ol/style';
// mark标注图片
import markImage from '../../assets/Marker.png';
class AddMarker extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    let { map } = this.refs.map;
    let that = this
    //创建标注要素
    let markFeature = new Feature({
      geometry: new Point(fromLonLat([116.28, 39.54])),
      name: '郑州',
    });
    //设置图标的样式
    markFeature.setStyle(this.setMakerStyle(markFeature));
    // 创建标注的数据源
    var vectorSource = new VectorSource({
      features: [markFeature],
    });
    // 创建标注图层
    var vectorLayer = new Vector({
      source: vectorSource,
    });
    // 将标注图层添加到地图上
    map.addLayer(vectorLayer);

    this.setState({
      vectorSource,
    });
    /**
    * 实现popup的html元素
    */
    var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    /**
     * 在地图容器中创建一个Overlay
     */
    var popup = new Overlay({
      //要转换成overlay的HTML元素
      element: container,
      //当前窗口可见
      autoPan: true,
      //Popup放置的位置
      positioning: 'bottom-center',
      //是否应该停止事件传播到地图窗口
      stopEvent: false,
      autoPanAnimation: {
        //当Popup超出地图边界时，为了Popup全部可见，地图移动的速度
        duration: 250,
      },
    });
    map.addOverlay(popup);
    var featuerInfo = {
        geo:  fromLonLat([116.28, 39.54]),
        att: {
            //标注信息的标题内容
            title: "北京市(中华人民共和国首都)",
            //标注详细信息链接
            titleURL: "http://www.openlayers.org/",
            //标注内容简介
            text: "北京（Beijing），简称京，中华人民共和国首都、直辖市，中国的政治、文化和国际交往中心……",
            //标注的图片
            // imgURL: "../../images/label/bj.png"
        }
    }
    // map.on('singleclick', function(e) {
    //     console.log(e);
    //     // alert("鼠标被单击了"+e.coordinate);
    //     that.addMakerOn(e.coordinate);
    // });
    // 添加点击事件
    map.on('click', function(evt) {
        console.log(evt)
      //判断当前单击处是否有要素，捕获到要素时弹出popup
      var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature, layer) {
        return feature;
      });
      console.log(content)
      if (feature) {
          console.log("点击了marker点")
        //清空popup的内容容器
        // content.innerHTML = '';
        //在popup中加载当前要素的具体信息
        // that.addFeatrueInfo(featuerInfo,content);
        // if (popup.getPosition() == undefined) {
        //     console.log("++++++")
          //设置popup的位置
        //   popup.setPosition(fromLonLat([116.28, 39.54]));
        // }
      }
    });
  }

    /**
    * 动态创建popup的具体内容
    * @param {string} title
    */
    addFeatrueInfo = (info,content)=> {
        //新增a元素
        var elementA = document.createElement('a');
        elementA.className = "markerInfo";
        elementA.href = info.att.titleURL;
        //elementA.innerText = info.att.title;
        this.setInnerText(elementA, info.att.title);
        // 新建的div元素添加a子节点
        content.appendChild(elementA);
        //新增div元素
        var elementDiv = document.createElement('div');
        elementDiv.className = "markerText";
        //elementDiv.innerText = info.att.text;
        this.setInnerText(elementDiv, info.att.text);
        // 为content添加div子节点
        content.appendChild(elementDiv);
        //新增img元素
        var elementImg = document.createElement('img');
        elementImg.className = "markerImg";
        elementImg.src = info.att.imgURL;
        // 为content添加img子节点
        content.appendChild(elementImg);
    }
    /**
    * 动态设置元素文本内容（兼容）
    */
    setInnerText = (element, text) =>{
        if (typeof element.textContent == "string") {
            element.textContent = text;
        } else {
            element.innerText = text;
        }
    }

  addMarker = () => {
    let { map } = this.refs.map;
    let that = this;
    //鼠标单击事件
    map.on('singleclick', function(e) {
      console.log(e);
      // alert("鼠标被单击了"+e.coordinate);
      that.addMakerOn(e.coordinate);
    });
  };

  addMakerOn = coordinate => {
    //创建标注要素
    let markFeature = new Feature({
      geometry: new Point(coordinate),
      name: '标注',
    });
    //设置图标的样式
    markFeature.setStyle(this.setMakerStyle(markFeature));
    // 图标要素添加到数据源上
    this.state.vectorSource.addFeature(markFeature);
  };

  setMakerStyle = feature => {
    return new Style({
      /**{olx.style.IconOptions}类型*/
      image: new Icon({
        //   设置图标点
        anchor: [0.5, 40],
        // 图标起点
        anchorOrigin: 'top-right',
        // 指定x值为图标点的x的值
        anchorXUnits: 'fraction',
        // 指定y值为像素的值
        anchorYUnits: 'pixels',
        // 偏移
        offsetOrigin: 'top-right',
        // offset:[0,10],
        //图标缩放比例
        scale: 0.6,
        //透明度
        opacity: 0.75,
        //图标的url
        src: markImage,
      }),
      text: new Text({
        //位置
        textAlign: 'center',
        //基准线
        textBaseline: 'middle',
        //文字样式
        font: 'normal 14px 微软雅黑',
        //文本内容
        text: feature.get('name'),
        //文本填充样式（即文字颜色）
        fill: new Fill({ color: '#aa3300' }),
        stroke: new Stroke({ color: '#ffcc33', width: 2 }),
      }),
    });
  };

  render() {
    return (
      <div>
        {/* <img src={bg}></img> */}
        <button onClick={this.addMarker}>点击开始添加标注</button>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }}>
          <div id="popup" class="ol-popup">
            <a href="#" id="popup-closer" class="ol-popup-closer" />
            <div id="popup-content" />
          </div>
        </Map>
        ;
      </div>
    );
  }
}

export default AddMarker;
