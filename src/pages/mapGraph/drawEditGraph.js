// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
// import style from './map.css'
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { Vector as VectorSource } from 'ol/source';
import { Vector } from 'ol/layer';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import { Draw, Modify , Snap,Select} from 'ol/interaction';


class DrawEditGraph extends Component {
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
    // 添加绘制图层
    var source = new VectorSource({ wrapX: false });
    var vector = new Vector({
        source: source,
        style: new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new Circle({
                radius: 7,
                fill: new Fill({
                    color: '#ffcc33'
                })
            })
        })
    });
    //将绘制层添加到地图容器中

    // 加载数据
    map.addLayer(TiandiMap_vec);
    map.addLayer(TiandiMap_cva);
    map.addLayer(vector);

    var modify = new Modify({source: source});
    map.addInteraction(modify);

   

    this.setState({
      TiandiMap_vec,
      TiandiMap_cva,
      vector,
      source
    });
  }

  

  addGraph = type => {
    let { map } = this.refs.map;
    let that = this
    let drawType = "None"
    switch (type) {
      case 1:
            drawType="Point"
        break;
      case 2:
           drawType="LineString"
        break;
      case 3:
            drawType="Polygon"
        break;
      case 4:
            drawType="Circle"
        break;
      case 5:
        break;
      case 6:
        break;
      default:
        break;
    }


    var draw = new Draw({
        //绘制层数据源
        source:that.state.source ,
        /** @type {ol.geom.GeometryType}几何图形类型 */
        type:drawType,
        // //几何信息变更时调用函数
        // geometryFunction: geometryFunction,
        //最大点数
        // maxPoints: 2
        //  设置后移动鼠标绘制图形
        // freehand: true
    });
    map.addInteraction(draw);
    let snap = new Snap({source: that.state.source});
    map.addInteraction(snap);

  };
  //添加点


  render() {
    return (
      <div>
        <button onClick={this.addGraph.bind(this, 1)}>绘制点</button>
        <button onClick={this.addGraph.bind(this, 2)}>绘制线</button>
        <button onClick={this.addGraph.bind(this, 3)}>绘制多边形</button>
        <button onClick={this.addGraph.bind(this, 4)}>绘制圆</button>
        {/* <button onClick={this.addGraph.bind(this, 5)}>添加矩形</button>
        <button onClick={this.addGraph.bind(this, 6)}>添加多边形</button> */}
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }} />;
      </div>
    );
  }
}

export default DrawEditGraph;
