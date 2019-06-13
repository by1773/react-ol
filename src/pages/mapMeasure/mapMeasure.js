// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
import XYZ from 'ol/source/XYZ';
import { unByKey } from 'ol/Observable';
import Overlay from 'ol/Overlay';
import { getArea, getLength, Sphere } from 'ol/sphere';
import { LineString, Polygon } from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

class LayerIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // console.log(bg)
    let { map } = this.refs.map;
    let { mapkey } = window.config;
    // var TiandiMap_vec = new TileLayer({
    //   name: '天地图矢量图层',
    //   source: new XYZ({
    //     url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=' + mapkey, //mapkey为天地图密钥
    //     wrapX: false,
    //   }),
    // });
    // var TiandiMap_cva = new TileLayer({
    //   name: '天地图矢量注记图层',
    //   source: new XYZ({
    //     url: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=' + mapkey, //mapkey为天地图密钥
    //     wrapX: false,
    //   }),
    // });
    // 加载绘制图层
    var source = new VectorSource();
    // 创建绘制图层
    var vector = new VectorLayer({
      source: source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    });
    // 绘制图层添加到地图上
    map.addLayer(vector);
    //定义一个球对象
    // var wgs84Sphere = new Sphere(6378137);
    // 当前绘制的要素
    var sketch;
    // 帮助提示框对象
    var helpTooltipElement;
    // 帮助提示框显示的信息
    var helpTooltip;
    // 测量工具提示框对象
    var measureTooltipElement;
    // 测量工具中显示的测量值
    var measureTooltip;
    //
    var continuePolygonMsg = '继续点击绘制多边形';

    var continueLineMsg = '继续点击绘制线';
    let that = this;

    var pointerMoveHandler = function(evt) {
      let { helpTooltipElement, helpTooltip } = that.state;
      if (evt.dragging) {
        return;
      }
      var helpMsg = '点击绘制'; //当前默认提示信息
      //判断绘制几何类型设置相应的帮助提示信息
      if (sketch) {
        var geom = sketch.getGeometry();
        if (geom instanceof Polygon) {
          helpMsg = continuePolygonMsg; //绘制多边形时提示相应内容
        } else if (geom instanceof LineString) {
          helpMsg = continueLineMsg; //绘制线时提示相应内容
        }
      }
      helpTooltipElement.innerHTML = helpMsg; //将提示信息设置到对话框中显示
      helpTooltip.setPosition(evt.coordinate); //设置帮助提示框的位置
      //   $(helpTooltipElement).removeClass('hidden');

      helpTooltipElement.classList.remove('hidden'); //移除帮助提示框的隐藏样式进行显
    };

    // 加载数据
    // map.addLayer(TiandiMap_vec);
    // map.addLayer(TiandiMap_cva);
    this.setState({
      //   TiandiMap_vec,
      //   TiandiMap_cva,
      source,
      sketch,
      helpTooltipElement,
      helpTooltip,
      measureTooltipElement,
      measureTooltip,
      continuePolygonMsg,
      continueLineMsg,
    });
    //地图容器绑定鼠标移动事件，动态显示帮助提示框内容
    map.on('pointermove', pointerMoveHandler);
    //地图绑定鼠标移出事件，鼠标移出时为帮助提示框设置隐藏样式
    map.getViewport().addEventListener('mouseout', function() {
      let { helpTooltipElement } = that.state;
      helpTooltipElement.classList.add('hidden');
    });
    this.addInteraction();
  }
  //    测量长度输出
  formatLength = line => {
    var length = getLength(line);
    var output;
    if (length > 100) {
      output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
      output = Math.round(length * 100) / 100 + ' ' + 'm';
    }
    return output;
  };
  //    测量面积输出
  formatArea = polygon => {
    var area = getArea(polygon);
    var output;
    if (area > 10000) {
      output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
      output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }
    return output;
  };

  addInteraction = () => {
    // var type = (typeSelect.value == 'area' ? 'Polygon' : 'LineString');
    var type = 'Polygon';
    let { map } = this.refs.map;
    let { sketch } = this.state;
    let that = this;
    let draw = new Draw({
      source: that.state.source,
      type: type,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2,
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)',
          }),
        }),
      }),
    });
    map.addInteraction(draw);
    that.createMeasureTooltip();
    that.createHelpTooltip();

    var listener;
    // 绑定交互绘制工具开始绘制的事件
    draw.on(
      'drawstart',
      function(evt) {
        let { measureTooltipElement, measureTooltip } = that.state;
        // //绘制的要素
        sketch = evt.feature;

        /*绘制的坐标*/
        var tooltipCoord = evt.coordinate;
        //绑定change事件，根据绘制几何类型得到测量长度值或面积值，并将其设置到测量工具提示框中显示
        listener = sketch.getGeometry().on('change', function(evt) {
          var geom = evt.target; //绘制几何要素
          var output;
          if (geom instanceof Polygon) {
            output = that.formatArea(geom); //面积值
            tooltipCoord = geom.getInteriorPoint().getCoordinates(); //坐标
          } else if (geom instanceof LineString) {
            output = that.formatLength(geom); //长度值
            tooltipCoord = geom.getLastCoordinate(); //坐标
          }
          //将测量值设置到测量工具提示框中显示
          measureTooltipElement.innerHTML = output;
          //设置测量工具提示框的显示位置
          measureTooltip.setPosition(tooltipCoord);
        });
      },
      window,
    );
    //绑定交互绘制工具结束绘制的事件
    draw.on(
      'drawend',
      function() {
        let { measureTooltipElement, measureTooltip } = that.state;
        //设置测量提示框的样式
        measureTooltipElement.className = 'tooltip tooltip-static';

        measureTooltip.setOffset([0, -7]);
        // //置空当前绘制的要素对象
        sketch = null;
        //置空测量工具提示框对象
        measureTooltipElement = null;
        //重新创建一个测试工具提示框显示结果
        that.createMeasureTooltip();
        unByKey(listener);
      },
      window,
    );
  };

  /**
   * 创建一个新的帮助提示框
   */
  createHelpTooltip = () => {
    let { helpTooltipElement, helpTooltip } = this.state;
    let { map } = this.refs.map;
    if (helpTooltipElement) {
      helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'tooltip hidden';
    helpTooltip = new Overlay({
      element: helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left',
    });
    this.setState({
      helpTooltipElement,
      helpTooltip,
    });
    map.addOverlay(helpTooltip);
  };

  /**
   * 创建一个新的测量工具提示框
   */
  createMeasureTooltip = () => {
    let { measureTooltipElement, measureTooltip } = this.state;
    let { map } = this.refs.map;
    if (measureTooltipElement) {
      measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'tooltip tooltip-measure';
    measureTooltip = new Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
    });
    this.setState({
      measureTooltipElement,
      measureTooltip,
    });
    map.addOverlay(measureTooltip);
  };

  //   /**
  //    * Let user change the geometry type.
  //    */
  //   typeSelect.onchange = function() {
  //     map.removeInteraction(draw);
  //     addInteraction();
  //   };

  //   addInteraction();

  render() {
    return (
      <div>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }} />;
      </div>
    );
  }
}

export default LayerIndex;
