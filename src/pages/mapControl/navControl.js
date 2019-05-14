import React, { Component } from 'react';
import Map from '../../component/map/map';
// import {defaults as defaultControls, ZoomToExtent} from 'ol/control.js';

class NavControl extends Component {

  componentDidMount(){
      console.log(this.refs)
      let {map} = this.refs.map
    //   map.addNavControl()
    // let layrs =   map.getOverlays()
    // console.log("图层信息",layrs)
    // // 缩小
    // var view = map.getView();
    // var zoom = view.getZoom();
    // view.setZoom(zoom - 1);
    // map.addControl(defaultControls().extend([
    //     new ZoomToExtent({
    //     extent: [
    //         813079.7791264898, 5929220.284081122,
    //         848966.9639063801, 5936863.986909639
    //     ]
    //     })
    //  ]))
  }  

  zoomin = () =>{
    let {map} = this.refs.map
    //   map.addNavControl()
    let layrs =   map.getOverlays()
    console.log("图层信息",layrs)
    // 缩小
    var view = map.getView();
    console.log("地图",view)
    var zoom = view.getZoom();
    console.log("当前级别",zoom)
    view.setZoom(zoom - 1);
  }
  render() {
    return (
        <div>
            <div onClick={this.zoomin}>点击缩小</div>
            <Map ref="map" center={{ lon: 113.8, lat: 34.6 }} />;
        </div>
    )
 
  }
}

export default NavControl
