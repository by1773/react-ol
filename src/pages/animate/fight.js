/**
 * 说明：地图要素自定义动画
 */
// 设置地图背景色
import React, { Component } from 'react';
import Map from '../../component/map/map';
// 数据源
import { Vector as VectorSource, Cluster } from 'ol/source';
// 图层
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
// 要素
import Feature from 'ol/Feature';
//
import { Point } from 'ol/geom';
// 坐标系转化
import { fromLonLat } from 'ol/proj';
// 样式
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';
import LineString from 'ol/geom/LineString.js';
// mark标注图片
import AddMarkerpng from '../../assets/Marker.png';

import { unByKey } from 'ol/Observable';

import { easeOut } from 'ol/easing';

class Fight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointsPerMs: 0.1,
    };
  }
  componentDidMount() {
    let { map } = this.refs.map;
    let {arc} = window.config
    let that = this
    // 创建数据源
    var source = new VectorSource({
      wrapX: false,
      attributions:
        'Flight data by ' + '<a href="http://openflights.org/data.html">OpenFlights</a>,',
      loader: function() {
        var url = 'flights.json';
        fetch(url)
          .then(function(response) {
            return response.json();
          })
          .then(function(json) {
            var flightsData = json.flights;
            for (var i = 0; i < flightsData.length; i++) {
              var flight = flightsData[i];
              var from = flight[0];
              var to = flight[1];

              // create an arc circle between the two locations
              var arcGenerator = new arc.GreatCircle(
                { x: from[1], y: from[0] },
                { x: to[1], y: to[0] },
              );

              var arcLine = arcGenerator.Arc(100, { offset: 10 });
              if (arcLine.geometries.length === 1) {
                var line = new LineString(arcLine.geometries[0].coords);
                line.transform('EPSG:4326', 'EPSG:3857');

                var feature = new Feature({
                  geometry: line,
                  finished: false,
                });
                // add the feature with a delay so that the animation
                // for all features does not start at the same time
                that.addLater(feature, i * 50,source);
              }
            }
            map.on('postcompose', that.animateFlights);
          });
      },
    });

    var style = new Style({
        stroke: new Stroke({
          color: '#EAE911',
          width: 2
        })
      });
    //创建图层
    var vector = new VectorLayer({
      source: source,
      style: function(feature) {
        // if the animation is still active for a feature, do not
        // render the feature with the layer style
        if (feature.get('finished')) {
          return style;
        } else {
          return null;
        }
      },
    });
    // 将图层添加到地图上
    map.addLayer(vector);
    this.setState({
        source
    })
    
  }

  animateFlights = (event) => {
      console.log(event)
      let flightsSource = this.state.source;
    let { map } = this.refs.map;
    var style = new Style({
        stroke: new Stroke({
            color: '#EAE911',
            width: 2
        })
    });
    var vectorContext = event.vectorContext;
    var frameState = event.frameState;
    vectorContext.setStyle(style);

    var features = flightsSource.getFeatures();
    for (var i = 0; i < features.length; i++) {
      var feature = features[i];
      if (!feature.get('finished')) {
        // only draw the lines for which the animation has not finished yet
        var coords = feature.getGeometry().getCoordinates();
        var elapsedTime = frameState.time - feature.get('start');
        var elapsedPoints = elapsedTime * this.state.pointsPerMs;

        if (elapsedPoints >= coords.length) {
          feature.set('finished', true);
        }

        var maxIndex = Math.min(elapsedPoints, coords.length);
        var currentLine = new LineString(coords.slice(0, maxIndex));

        // directly draw the line with the vector context
        vectorContext.drawGeometry(currentLine);
      }
    }
    // tell OpenLayers to continue the animation
    map.render();
  };

  addLater = (feature, timeout,flightsSource) => {
    window.setTimeout(function() {
      feature.set('start', new Date().getTime());
      flightsSource.addFeature(feature);
    }, timeout);
  };

  render() {
    return (
      <div>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }} />;
      </div>
    );
  }
}

export default Fight;
