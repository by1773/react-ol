// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
// import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { unByKey } from 'ol/Observable';
import Overlay from 'ol/Overlay';
import { getArea, getLength, Sphere } from 'ol/sphere';
import View from 'ol/View';
import { LineString, Polygon } from 'ol/geom';
import Draw from 'ol/interaction/Draw';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
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
    var TiandiMap_vec = new TileLayer({
      name: '天地图矢量图层',
      source: new XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=' + mapkey, //mapkey为天地图密钥
        wrapX: false,
      }),
    });
    var TiandiMap_cva = new TileLayer({
      name: '天地图矢量注记图层',
      source: new XYZ({
        url: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=' + mapkey, //mapkey为天地图密钥
        wrapX: false,
      }),
    });
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

    var pointerMoveHandler = function(evt) {
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
      // $(helpTooltipElement).removeClass('hidden');

      helpTooltipElement.classList.remove('hidden'); //移除帮助提示框的隐藏样式进行显
    };

    // 加载数据
    map.addLayer(TiandiMap_vec);
    map.addLayer(TiandiMap_cva);
    this.setState({
      TiandiMap_vec,
      TiandiMap_cva,
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
      helpTooltipElement.classList.add('hidden');
    });
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
    var type = 'LineString';
    let { map } = this.refs.map;
    let { sketch, measureTooltipElement, measureTooltip } = this.state;
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
    draw.on(
      'drawstart',
      function(evt) {
        // set sketch
        sketch = evt.feature;

        /** @type {module:ol/coordinate~Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on('change', function(evt) {
          var geom = evt.target;
          var output;
          if (geom instanceof Polygon) {
            output = that.formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = that.formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      },
      this,
    );

    draw.on(
      'drawend',
      function() {
        measureTooltipElement.className = 'tooltip tooltip-static';
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        that.createMeasureTooltip();
        unByKey(listener);
      },
      this,
    );
  };

  /**
   * Creates a new help tooltip
   */
  createHelpTooltip = () => {
    let { helpTooltipElement, helpTooltip } = this.state;
    let that = this;
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
    map.addOverlay(helpTooltip);
  };

  /**
   * Creates a new measure tooltip
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
