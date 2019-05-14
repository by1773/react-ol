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
        { path: '/map/map1', component: './main/index.js' },
        // 地图空间
        { path: '/mapControl/navControl', component: './mapControl/navControl.js' },
        // 地图操作
        { path: '/mapOperation/mapOperation', component: './mapOperation/mapOperation.js' },
      ],
    
     
    }
    
   
  ]
}