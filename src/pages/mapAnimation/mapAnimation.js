import React, { Component } from 'react';
import Map from '../../component/map/map';
import { defaults as defaultControls, ZoomToExtent, ZoomSlider } from 'ol/control.js';
import { easeIn, easeOut } from 'ol/easing.js';
import { fromLonLat } from 'ol/proj';

class MapAnimation extends Component {
  componentDidMount() {
    let { map } = this.refs.map;
  }
  letfRotate = () => {
    let { map } = this.refs.map;
    let view = map.getView();
    view.animate({
      rotation: view.getRotation() + Math.PI / 2,
    });
    //定位
    // view.setCenter(shenyang);
  };

  ringthRotate = () => {
    let { map } = this.refs.map;
    let view = map.getView();
    view.animate({
      rotation: view.getRotation() - Math.PI / 2,
    });
  };

  pan = () => {
    let { map } = this.refs.map;
    let view = map.getView();
    var shenyang = fromLonLat([123.24, 41.5]);
    view.animate({
      center: shenyang,
      duration: 2000,
    });
  };

  elastic = () => {
    let { map } = this.refs.map;
    let view = map.getView();
    let that = this;
    var beijing = fromLonLat([116.28, 39.54]);
    view.animate({
      center: beijing,
      duration: 2000,
      easing: that.elastic_,
    });
  };

  //弹性值
  elastic_ = t => {
    return Math.pow(2, -10 * t) * Math.sin(((t - 0.075) * (2 * Math.PI)) / 0.3) + 1;
  };

  bounce = () => {
    let { map } = this.refs.map;
    let view = map.getView();
    let that = this;
    var shanghai = fromLonLat([121.29, 31.14]);
    var start = +new Date();
    view.animate({
      center: shanghai,
      duration: 2000,
      easing: this.bounce_,
    });
  };

  //反弹值
  bounce_ = t => {
    var s = 7.5625,
      p = 2.75,
      l;
    if (t < 1 / p) {
      l = s * t * t;
    } else {
      if (t < 2 / p) {
        t -= 1.5 / p;
        l = s * t * t + 0.75;
      } else {
        if (t < 2.5 / p) {
          t -= 2.25 / p;
          l = s * t * t + 0.9375;
        } else {
          t -= 2.625 / p;
          l = s * t * t + 0.984375;
        }
      }
    }
    return l;
  };

  spin = () => {
    let { map } = this.refs.map;
    let view = map.getView();
    var shenyang = fromLonLat([123.24, 41.5]);
    var center = view.getCenter();
    view.animate(
      {
        center: [
          center[0] + (shenyang[0] - center[0]) / 2,
          center[1] + (shenyang[1] - center[1]) / 2,
        ],
        rotation: Math.PI,
        easing: easeIn,
      },
      {
        center: shenyang,
        rotation: 2 * Math.PI,
        easing: easeOut,
      },
    );
  };

  fly = () => {
    var xian = fromLonLat([108.93, 34.28]);
    this.flyTo(xian, function() {});
  };

  flyTo = (location, done) => {
    let { map } = this.refs.map;
    let view = map.getView();
    var duration = 2000;
    var zoom = view.getZoom();
    var parts = 2;
    var called = false;
    function callback(complete) {
      --parts;
      if (called) {
        return;
      }
      if (parts === 0 || !complete) {
        called = true;
        done(complete);
      }
    }
    view.animate(
      {
        center: location,
        duration: duration,
      },
      callback,
    );
    view.animate(
      {
        zoom: zoom - 1,
        duration: duration / 2,
      },
      {
        zoom: zoom,
        duration: duration / 2,
      },
      callback,
    );
  };

  spiral = () => {
    var shenyang = fromLonLat([123.24, 41.5]);
    var beijing = fromLonLat([116.28, 39.54]);
    var shanghai = fromLonLat([121.29, 31.14]);
    var wuhan = fromLonLat([114.21, 30.37]);
    var guangzhou = fromLonLat([113.15, 23.08]);
    var haikou = fromLonLat([110.2, 20.02]);
    var xian = fromLonLat([108.93, 34.28]);
    var locations = [shenyang, beijing, shanghai, wuhan, guangzhou, haikou, xian];
    var index = -1;
    let that = this;
    function next(more) {
      if (more) {
        ++index;
        if (index < locations.length) {
          var delay = index === 0 ? 0 : 750;
          setTimeout(function() {
            that.flyTo(locations[index], next);
          }, delay);
        } else {
          alert('Tour complete');
        }
      } else {
        alert('Tour cancelled');
      }
    }
    next(true);
  };

  rotate = () => {
    let { map } = this.refs.map;
    let view = map.getView();
    var rotation = view.getRotation();
    var shenyang = fromLonLat([123.24, 41.5]);
    view.animate(
      {
        rotation: rotation + Math.PI,
        anchor: shenyang,
        easing: easeIn,
      },
      {
        rotation: rotation + 2 * Math.PI,
        anchor: shenyang,
        easing: easeOut,
      },
    );
  };

  render() {
    return (
      <div>
        <button onClick={this.letfRotate}>向左旋转</button>
        <button onClick={this.ringthRotate}>向右旋转</button>
        <button onClick={this.pan}>平移到沈阳</button>
        <button onClick={this.rotate}>旋转到沈阳</button>
        <button onClick={this.elastic}> 弹性定位到北京</button>
        <button onClick={this.bounce}>反弹定位到上海</button>
        <button onClick={this.spin}>自旋转武汉</button>
        <button onClick={this.fly}>飞行到广州</button>
        <button onClick={this.spiral}>路线动画到海口</button>
        <Map ref="map" center={{ lon: 113.8, lat: 34.6 }} />;
      </div>
    );
  }
}

export default MapAnimation;
