import React, { Component } from 'react';

import styles from './style.js';
import APP_IMG from '../../assets/img/index'
class LoginPage extends Component {
  render() {
    return (
      <div style={styles.page}>
        <div style={styles.box}>
          <img
            style={styles.layer}
            // src={'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/8e837a30b1f011ea9c71073eab279e95.png'}
            src={APP_IMG.BG_IMG}
          />
          <div style={styles.primary}>
            <div style={styles.color} />
            <span style={styles.title} lines={undefined}>
              吴忠市智慧农业监测预警平台
            </span>
            <div style={styles.wrap}>
              <img
                style={styles.icon}
                src={'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/8efe4f80b1f011ea82f97d9a281d4566.png'}
              />
            </div>
            <div style={styles.block}>
              <img
                style={styles.icon_2}
                src={'https://ai-sample.oss-cn-hangzhou.aliyuncs.com/test/8f403a80b1f011eaa96d7161cebac85b.png'}
              />
            </div>
            <div style={styles.group}>
              <span style={styles.word} lines={undefined}>
                登 录
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginPage;