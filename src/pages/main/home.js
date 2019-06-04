import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class SiderDemo extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ height: '100%' }}>
        <Header className="header">
          <div
            className="logo"
            style={{ color: 'white', display: 'inline-block', clear: 'both', fontSize: '30px' }}
          >
            智慧地图
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{
              lineHeight: '64px',
              display: 'inline-block',
              marginLeft: '20px',
              clear: 'both',
              verticalAlign: '7px',
            }}
          >
            <Menu.Item key="top1">nav 1</Menu.Item>
            <Menu.Item key="top2">nav 2</Menu.Item>
            <Menu.Item key="top3">nav 3</Menu.Item>
          </Menu>
        </Header>
        <Layout style={{ height: '100%' }}>
          <Sider
            width={200}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              backgroundColor: '#fff',
              left: 0,
              overflowY: 'visible',
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    地图控件
                  </span>
                }
              >
                <Menu.Item key="1001">
                  <Link to="/" />
                  地图初始化
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/mapControl/navControl" />
                  地图控件
                </Menu.Item>
                <Menu.Item key="1002">缩放控件</Menu.Item>
                <Menu.Item key="1003">
                  <Link to="/mapControl/mousePosition" />
                  鼠标位置
                </Menu.Item>
                <Menu.Item key="1004">
                  <Link to="/mapControl/mapScaleLineControl" />
                  比例尺
                </Menu.Item>
                <Menu.Item key="1005">
                  <Link to="/mapControl/overviewMap" />
                  鹰眼
                </Menu.Item>
                <Menu.Item key="1006">
                  <Link to="/mapControl/mapLayers" />
                  图层选择
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    地图操作
                  </span>
                }
              >
                <Menu.Item key="2001">
                  <Link to="/mapOperation/mapOperation" />
                  地图操作
                </Menu.Item>
                <Menu.Item key="2002">
                  <Link to="/mapOperation/mapBackground" />
                  设置地图背景
                </Menu.Item>
                <Menu.Item key="2003">地图定位(设置地图中心)</Menu.Item>
                <Menu.Item key="2004">显示级别（设置显示地图显示级别）</Menu.Item>
                {/* <Menu.Item key="2005">视窗逻辑坐标</Menu.Item> */}
                <Menu.Item key="2006">
                  <Link to="/mapOperation/MapCurrentInfo" />
                  地图域当前的信息
                </Menu.Item>
                <Menu.Item key="2007">
                  <Link to="/mapOperation/mapSavePng" />
                  导出成图片
                </Menu.Item>
                <Menu.Item key="2008">导出成pdf</Menu.Item>
                <Menu.Item key="2009">
                  <Link to="/mapOperation/mapEvent" />
                  地图事件
                </Menu.Item>
                <Menu.Item key="2010">
                  <Link to="/mapOperation/layerSearch" />
                  图层探查
                </Menu.Item>
                <Menu.Item key="2011">
                  <Link to="/mapOperation/layerIndex" />
                  图层层级控制
                </Menu.Item>
                <Menu.Item key="2012">
                  <Link to="/mapOperation/layerVisible" />
                  图层组控制
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="notification" />
                    图形操作
                  </span>
                }
              >
                <Menu.Item key="3001">
                  <Link to="/mapGraph/addGraph" />
                  坐标添加点线面
                </Menu.Item>
                {/* <Menu.Item key="3002">坐标添加线</Menu.Item>
                <Menu.Item key="3003">坐标添加面</Menu.Item>
                <Menu.Item key="3004">坐标添加正方形</Menu.Item>
                <Menu.Item key="3005">坐标添加矩形</Menu.Item>
                <Menu.Item key="3006">坐标添加多边形·</Menu.Item> */}
                <Menu.Item key="3007">
                  <Link to="/mapGraph/drawGeometry" />
                  绘制几何图形
                </Menu.Item>
                <Menu.Item key="3008">
                  <Link to="/mapGraph/drawGraphMove" />
                  绘制任意图形
                </Menu.Item>
                <Menu.Item key="3009">图形样式编辑</Menu.Item>
                <Menu.Item key="3010">
                  <Link to="/mapGraph/drawEditGraph" />
                  图形交互编辑（选择可编辑）
                </Menu.Item>
                <Menu.Item key="3013">
                  <Link to="/mapGraph/editGraph" />
                  图形激活与编辑
                </Menu.Item>
                {/* <Menu.Item key="3011">获取几何信息</Menu.Item> */}
                <Menu.Item key="3012">
                  <Link to="/mapGraph/drawLinearrow" />
                  绘制箭头线
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="notification" />
                    地图标注
                  </span>
                }
              >
                <Menu.Item key="4001">
                  <Link to="/mapMark/addImgeMark" />
                  图片标注
                </Menu.Item>
                <Menu.Item key="4002">
                  <Link to="/mapMark/addMarkerLable" />
                  文字标注
                </Menu.Item>
                <Menu.Item key="4003">
                  <Link to="/mapMark/addmarker" />
                  图文标注
                </Menu.Item>
                <Menu.Item key="4004">
                  <Link to="/mapMark/maekerCluster" />
                  聚合标注
                </Menu.Item>
                <Menu.Item key="4005">
                  <Link to="/mapMark/markPopup" />
                  popup弹出框
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub5"
                title={
                  <span>
                    <Icon type="notification" />
                    要素动画
                  </span>
                }
              >
                <Menu.Item key="5001">
                  <Link to="/animate/customAnimation" />
                  要素动画
                </Menu.Item>
                <Menu.Item key="5002">
                  <Link to="/animate/featureMove" />
                  要素移动
                </Menu.Item>
                <Menu.Item key="5003">
                  <Link to="/animate/fight" />
                  航线动画
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub6"
                title={
                  <span>
                    <Icon type="notification" />
                    第三方地图显示
                  </span>
                }
              >
                <Menu.Item key="6001">
                  <Link to="/mapServer/tianDiTu" />
                  天地图
                </Menu.Item>
                <Menu.Item key="6002">
                  <Link to="/mapServer/bMap" />
                  百度地图
                </Menu.Item>
                <Menu.Item key="6003">
                  <Link to="/mapServer/aMap" />
                  高德地图
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub7"
                title={
                  <span>
                    <Icon type="notification" />
                    OGC资源
                  </span>
                }
              >
                <Menu.Item key="7001">加载WMTS</Menu.Item>
                <Menu.Item key="7002">加载WMS</Menu.Item>
                <Menu.Item key="7003">加载WFS</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub8"
                title={
                  <span>
                    <Icon type="notification" />
                    地图动画
                  </span>
                }
              >
                <Menu.Item key="8001">地图动画</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub9"
                title={
                  <span>
                    <Icon type="notification" />
                    测量
                  </span>
                }
              >
                <Menu.Item key="9001">测量</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub10"
                title={
                  <span>
                    <Icon type="notification" />
                    热力图
                  </span>
                }
              >
                <Menu.Item key="1001">热力图</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub11"
                title={
                  <span>
                    <Icon type="notification" />
                    地图显示
                  </span>
                }
              >
                <Menu.Item key="1101">瓦片地图</Menu.Item>
                <Menu.Item key="1102">矢量地图文档</Menu.Item>
                <Menu.Item key="1103">矢量图层</Menu.Item>
                <Menu.Item key="1104">动态截图</Menu.Item>
                <Menu.Item key="1105">天地图</Menu.Item>
                <Menu.Item key="1106">Google地图</Menu.Item>
                <Menu.Item key="1107">Arcgis(经纬度)</Menu.Item>
                <Menu.Item key="1108">OGC的WMS(地图文档)</Menu.Item>
                <Menu.Item key="1109">OGC的WMS(矢量图层)</Menu.Item>
                <Menu.Item key="1110">OGC的WFS</Menu.Item>
                <Menu.Item key="1111">OGC的WMTS</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub12"
                title={
                  <span>
                    <Icon type="notification" />
                    地图显示控件
                  </span>
                }
              >
                <Menu.Item key="1201">矢量地图文档动态标记</Menu.Item>
                <Menu.Item key="1202">矢量图层显示样式</Menu.Item>
                <Menu.Item key="1203">矢量图层显示过滤</Menu.Item>
                <Menu.Item key="1204">矢量地图文档过滤显示</Menu.Item>
                <Menu.Item key="1205">地图文档图层控制显示</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub13"
                title={
                  <span>
                    <Icon type="notification" />
                    目录服务
                  </span>
                }
              >
                <Menu.Item key="49">option9</Menu.Item>
                <Menu.Item key="50">option10</Menu.Item>
                <Menu.Item key="51">option11</Menu.Item>
                <Menu.Item key="52">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub14"
                title={
                  <span>
                    <Icon type="notification" />
                    矢量图层查询
                  </span>
                }
              >
                <Menu.Item key="53">option9</Menu.Item>
                <Menu.Item key="54">option10</Menu.Item>
                <Menu.Item key="55">option11</Menu.Item>
                <Menu.Item key="56">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub15"
                title={
                  <span>
                    <Icon type="notification" />
                    地图文档查询
                  </span>
                }
              >
                <Menu.Item key="57">option9</Menu.Item>
                <Menu.Item key="58">option10</Menu.Item>
                <Menu.Item key="59">option11</Menu.Item>
                <Menu.Item key="60">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub16"
                title={
                  <span>
                    <Icon type="notification" />
                    图层要素编辑
                  </span>
                }
              >
                <Menu.Item key="61">option9</Menu.Item>
                <Menu.Item key="62">option10</Menu.Item>
                <Menu.Item key="63">option11</Menu.Item>
                <Menu.Item key="64">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub17"
                title={
                  <span>
                    <Icon type="notification" />
                    地图文档要素编辑
                  </span>
                }
              >
                <Menu.Item key="65">option9</Menu.Item>
                <Menu.Item key="66">option10</Menu.Item>
                <Menu.Item key="67">option11</Menu.Item>
                <Menu.Item key="68">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub18"
                title={
                  <span>
                    <Icon type="notification" />
                    几何分析服务
                  </span>
                }
              >
                <Menu.Item key="69">option9</Menu.Item>
                <Menu.Item key="70">option10</Menu.Item>
                <Menu.Item key="71">option11</Menu.Item>
                <Menu.Item key="72">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub19"
                title={
                  <span>
                    <Icon type="notification" />
                    图层投影转
                  </span>
                }
              >
                <Menu.Item key="73">option9</Menu.Item>
                <Menu.Item key="74">option10</Menu.Item>
                <Menu.Item key="75">option11</Menu.Item>
                <Menu.Item key="76">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub20"
                title={
                  <span>
                    <Icon type="notification" />
                    空间分析服务
                  </span>
                }
              >
                <Menu.Item key="77">option9</Menu.Item>
                <Menu.Item key="78">option10</Menu.Item>
                <Menu.Item key="79">option11</Menu.Item>
                <Menu.Item key="80">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub21"
                title={
                  <span>
                    <Icon type="notification" />
                    网络分析
                  </span>
                }
              >
                <Menu.Item key="81">option9</Menu.Item>
                <Menu.Item key="82">option10</Menu.Item>
                <Menu.Item key="83">option11</Menu.Item>
                <Menu.Item key="84">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub22"
                title={
                  <span>
                    <Icon type="notification" />
                    等值线分析
                  </span>
                }
              >
                <Menu.Item key="85">option9</Menu.Item>
                <Menu.Item key="86">option10</Menu.Item>
                <Menu.Item key="87">option11</Menu.Item>
                <Menu.Item key="88">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub23"
                title={
                  <span>
                    <Icon type="notification" />
                    空间分析服务
                  </span>
                }
              >
                <Menu.Item key="89">option9</Menu.Item>
                <Menu.Item key="90">option10</Menu.Item>
                <Menu.Item key="91">option11</Menu.Item>
                <Menu.Item key="92">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub24"
                title={
                  <span>
                    <Icon type="notification" />
                    统计图
                  </span>
                }
              >
                <Menu.Item key="93">option9</Menu.Item>
                <Menu.Item key="94">option10</Menu.Item>
                <Menu.Item key="95">option11</Menu.Item>
                <Menu.Item key="96">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub25"
                title={
                  <span>
                    <Icon type="notification" />
                    军标绘制
                  </span>
                }
              >
                <Menu.Item key="97">option9</Menu.Item>
                <Menu.Item key="98">option10</Menu.Item>
                <Menu.Item key="99">option11</Menu.Item>
                <Menu.Item key="100">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub26"
                title={
                  <span>
                    <Icon type="notification" />
                    客户端专题图
                  </span>
                }
              >
                <Menu.Item key="101">option9</Menu.Item>
                <Menu.Item key="102">option10</Menu.Item>
                <Menu.Item key="103">option11</Menu.Item>
                <Menu.Item key="104">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub27"
                title={
                  <span>
                    <Icon type="notification" />
                    几何查询
                  </span>
                }
              >
                <Menu.Item key="105">option9</Menu.Item>
                <Menu.Item key="106">option10</Menu.Item>
                <Menu.Item key="107">option11</Menu.Item>
                <Menu.Item key="108">option12</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub28"
                title={
                  <span>
                    <Icon type="notification" />
                    对象类查询
                  </span>
                }
              >
                <Menu.Item key="109">option9</Menu.Item>
                <Menu.Item key="110">option10</Menu.Item>
                <Menu.Item key="111">option11</Menu.Item>
                <Menu.Item key="112">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px', marginLeft: '185px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <Content
              style={{
                background: '#fff',
                // padding: 24,
                margin: 0,
                minHeight: 280,
                marginTop: 15,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      //   mountNode
    );
  }
}

export default SiderDemo;
