// import styles from './index.css';


// export default function() {
//   return (
//     <div className={styles.normal}>
//       <div className={styles.welcome} />
//       <ul className={styles.list}>
//         <li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>
//         <li>
//           <a href="https://umijs.org/guide/getting-started.html">
//             Getting Started
//           </a>
//         </li>
//       </ul>
//     </div>
//   );
// }



module.exports = {
  routes:[
   
    {
      path:'/',
      component:'./main/home.js',
      // redirect:"/map/map1",
      routes: [
        // { path: '/map/map1', component: './main/index.js' },
        { path: '/', component: './main/index.js' },
        // 地图空间
        { path: '/mapControl/navControl', component: './mapControl/navControl.js' },
        { path: '/mapControl/mousePosition', component: './mapControl/mousePosition.js' },
        { path: '/mapControl/mapScaleLineControl', component: './mapControl/mapScaleLineControl.js' },
        { path: '/mapControl/overviewMap', component: './mapControl/mapOverviewMap.js' },
        { path: '/mapControl/mapLayers', component: './mapControl/mapLayers.js' },
        // 地图操作
        { path: '/mapOperation/mapOperation', component: './mapOperation/mapOperation.js' },  //地图操作
        { path: '/mapOperation/mapBackground', component: './mapOperation/mapBackground.js' },  //设置地图背景
        { path: '/mapOperation/MapCurrentInfo', component: './mapOperation/MapCurrentInfo.js' },  //地图域当前的信息
        { path: '/mapOperation/mapSavePng', component: './mapOperation/mapSavePng.js' },  //地图导出png
        { path: '/mapOperation/mapEvent', component: './mapOperation/mapEvent.js' },  //地图事件
        { path: '/mapOperation/layerSearch', component: './mapOperation/layerSearch.js' },  //图层探查
        { path: '/mapOperation/layerIndex', component: './mapOperation/layerIndex.js' },  //设置图层显示级别
        { path: '/mapOperation/layerVisible', component: './mapOperation/layerVisible.js' },  //设置图层的透明度

        // 图形操作
        { path: '/mapGraph/addGraph', component: './mapGraph/addGraph.js' },  //设置图层的透明度
        { path: '/mapGraph/drawGeometry', component: './mapGraph/drawGeometry.js' },  //绘制图形
        { path: '/mapGraph/drawGraphMove', component: './mapGraph/drawGraphMove.js' },  //绘制任意图形，即鼠标移动绘制图形
        { path: '/mapGraph/drawEditGraph', component: './mapGraph/drawEditGraph.js' },  //绘制编辑图形
        { path: '/mapGraph/editGraph', component: './mapGraph/editGraph.js' },  //绘制编辑图形
        { path: '/mapGraph/drawLinearrow', component: './mapGraph/drawLinearrow.js' },  //绘制箭头线

        // 地图标注
        { path: '/mapMark/addImgeMark', component: './mapMark/addImgeMark.js' },  //图片标注
        { path: '/mapMark/addMarkerLable', component: './mapMark/addMarkerLable.js' },  //图片标注
        { path: '/mapMark/addmarker', component: './mapMark/addmarker.js' },  //图文标注
        { path: '/mapMark/markPopup', component: './mapMark/markPopup.js' },  //popup弹窗
        { path: '/mapMark/maekerCluster', component: './mapMark/maekerCluster.js' },  //聚合

        // 动画
        { path: '/animate/customAnimation', component: './animate/customAnimation.js' },  //自定义动画
        { path: '/animate/featureMove', component: './animate/featureMove.js' },  //估计运动
        { path: '/animate/fight', component: './animate/fight.js' },  //飞行动画

        // 第三方的地图显示
        { path: '/mapServer/tianDiTu', component: './mapServer/tianDiTu.js' },  //加载WGS84坐标系的天地图
        { path: '/mapServer/aMap', component: './mapServer/aMap.js' },  //加载高德地图
        { path: '/mapServer/bMap', component: './mapServer/bMap.js' },  //加载百度地图
      ],
    }
    
   
  ]
}