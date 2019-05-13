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
      ],
     
    },
    // {
    //   path:'/map',
    //   component:'./main/test.js',
  
    // },
    // {
    //   path:'/test',
    //   component:'./main/test2.js',
    // },
  
    
   
  ]
}