// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
// import style from './map.css'
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Feature from 'ol/Feature';
import { Point, LineString, Circle as circle, Polygon } from 'ol/geom';
import { fromExtent, fromCircle } from 'ol/geom/Polygon';
import { Vector as vec } from 'ol/source';
import { Vector } from 'ol/layer';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import { Draw, Modify as modify, Snap,Select} from 'ol/interaction';

class EditGraph extends Component {
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

    // 加载数据
    map.addLayer(TiandiMap_vec);
    map.addLayer(TiandiMap_cva);

    //定义修改几何图形功能控件
    var Modify = {
        init: function () {
            //初始化一个交互选择控件,并添加到地图容器中
            this.select = new Select();
            map.addInteraction(this.select);
            //初始化一个交互编辑控件，并添加到地图容器中
            this.modify = new modify({
                //选中的要素
                features: this.select.getFeatures()
            });
            map.addInteraction(this.modify);
            //设置几何图形变更的处理
            this.setEvents();
        },
        setEvents: function () {
            //选中的要素
            var selectedFeatures = this.select.getFeatures();
            //添加选中要素变更事件
            this.select.on('change:active', function () {
                selectedFeatures.forEach(selectedFeatures.remove, selectedFeatures);
            });
        },
        setActive: function (active) {
            //激活选择要素控件
            this.select.setActive(active);
            //激活修改要素控件
            this.modify.setActive(active);
        }
    };

    //初始化几何图形修改控件
    Modify.init();
    //激活几何图形修改控件;
    Modify.setActive(true);


    this.setState({
      TiandiMap_vec,
      TiandiMap_cva,
    });
  }

  addGraph = type => {
    console.log('图层', type);
    let graph = '';
    let { map } = this.refs.map;
    switch (type) {
      case 1:
        graph = this.addPoint();
        break;
      case 2:
        graph = this.addLine();
        break;
      case 3:
        graph = this.addCricle();
        break;
      case 4:
        graph = this.addSquare();
        break;
      case 5:
        graph = this.addRectangle();
        break;
      case 6:
        graph = this.addPolygon();
        break;
      default:
        break;
    }
    //实例化一个矢量图层Vector作为绘制层
    var source = new vec({
      features: [graph],
    });
    //创建一个图层
    var vector = new Vector({
      source: source,
    });
    map.addLayer(vector);
    
  };
  //添加点
  addPoint = () => {
    let point = new Feature({
      geometry: new Point([11505912.0, 4011415.0]),
    });
    //设置点1的样式信息
    point.setStyle(
      new Style({
        //填充色
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        //边线颜色
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        //形状
        image: new Circle({
          radius: 17,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    );
    return point;
  };
  //   添加线
  addLine = () => {
    var Line = new Feature({
      geometry: new LineString([[8208725.0, 3835304.0], [16055444.0, 4578883.0]]),
    });

    //设置线的样式
    Line.setStyle(
      new Style({
        //填充色
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)',
        }),
        //边线颜色
        stroke: new Stroke({
          color: '#ffcc33',
          width: 5,
        }),
        //形状
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    );
    return Line;
  };

  //   添加圆形
  addCricle = () => {
    var Cir = new Feature({
      geometry: new circle([9871995.0, 4344069.0], 1000000),
    });

    Cir.setStyle(
      new Style({
        //填充色
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.5)',
        }),
        //边线颜色
        stroke: new Stroke({
          color: '#ffcc33',
          width: 6,
        }),
        //形状
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    );
    return Cir;
  };

  //   添加正方形
  addSquare = () => {
    //创建一个圆
    var Cir = new circle([9871995.0, 4344069.0], 1000000);

    //根据圆获取多边形
    var Square = new Feature({
      geometry: new fromCircle(Cir, 4, 150),
    });

    Square.setStyle(
      new Style({
        //填充色
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.8)',
        }),
        //边线颜色
        stroke: new Stroke({
          color: 'red',
          width: 2,
        }),
        //形状
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    );
    return Square;
  };
  //   添加矩形
  addRectangle = () => {
    var Rectangle = new Feature({
      geometry: new fromExtent([8208725.0, 2035304.0, 12841418.0, 4068487.0]),
    });

    Rectangle.setStyle(
      new Style({
        fill: new Fill({
          color: 'rgba(33,33,33,0.5)',
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 4,
        }),
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    );
    return Rectangle;
  };

  // 添加多边形
  addPolygon = () => {
    var polygon = new Feature({
      geometry: new Polygon([
        [[9871995.0, 4344069.0], [12689769.0, 5107216.0], [13002855.0, 3522218.0]],
      ]),
    });
    //设置区样式信息
    polygon.setStyle(
      new Style({
        //填充色
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.5)',
        }),
        //边线颜色
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2,
        }),
        //形状
        image: new Circle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
        }),
      }),
    );
    return polygon;
  };

  render() {
    return (
      <div>
        <button onClick={this.addGraph.bind(this, 1)}>添加点</button>
        <button onClick={this.addGraph.bind(this, 2)}>添加线</button>
        <button onClick={this.addGraph.bind(this, 3)}>添加圆形</button>
        <button onClick={this.addGraph.bind(this, 4)}>添加正方形</button>
        <button onClick={this.addGraph.bind(this, 5)}>添加矩形</button>
        <button onClick={this.addGraph.bind(this, 6)}>添加多边形</button>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }} />;
      </div>
    );
  }
}

export default EditGraph;
