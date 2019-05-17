// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
import bg from '../../assets/yay.jpg'

class MapOverviewMap extends Component {
    constructor(props){
        super(props)
        this.state={
            
        }
    }
  componentDidMount() {
    console.log(bg)
  }
  
   
  
  render() {
    return (
      <div className="++++++++" style={{backgroundImage:{bg},background:"red"}}>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }}  />;
      </div>
    );
  }
}

export default MapOverviewMap;