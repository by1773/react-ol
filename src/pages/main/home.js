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
                  <Link to="/map/map1" />
                  地图初始化
                  {/* <Redirect to={'/map/map1'}/>option1 */}
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to="/mapControl/navControl" />
                  地图控件
                </Menu.Item>
                <Menu.Item key="1002">缩放控件</Menu.Item>
                <Menu.Item key="1003">鼠标位置</Menu.Item>
                <Menu.Item key="1004">比例尺</Menu.Item>
                <Menu.Item key="1005">鹰眼</Menu.Item>
                <Menu.Item key="1006">图层选择</Menu.Item>
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
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
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
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
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
                <Menu.Item key="13">option9</Menu.Item>
                <Menu.Item key="14">option10</Menu.Item>
                <Menu.Item key="15">option11</Menu.Item>
                <Menu.Item key="16">option12</Menu.Item>
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
                <Menu.Item key="17">option9</Menu.Item>
                <Menu.Item key="18">option10</Menu.Item>
                <Menu.Item key="19">option11</Menu.Item>
                <Menu.Item key="20">option12</Menu.Item>
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
                <Menu.Item key="21">option9</Menu.Item>
                <Menu.Item key="22">option10</Menu.Item>
                <Menu.Item key="23">option11</Menu.Item>
                <Menu.Item key="24">option12</Menu.Item>
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
                <Menu.Item key="25">option9</Menu.Item>
                <Menu.Item key="26">option10</Menu.Item>
                <Menu.Item key="27">option11</Menu.Item>
                <Menu.Item key="28">option12</Menu.Item>
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
                <Menu.Item key="29">option9</Menu.Item>
                <Menu.Item key="30">option10</Menu.Item>
                <Menu.Item key="31">option11</Menu.Item>
                <Menu.Item key="32">option12</Menu.Item>
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
                <Menu.Item key="33">option9</Menu.Item>
                <Menu.Item key="34">option10</Menu.Item>
                <Menu.Item key="35">option11</Menu.Item>
                <Menu.Item key="36">option12</Menu.Item>
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
                <Menu.Item key="37">option9</Menu.Item>
                <Menu.Item key="38">option10</Menu.Item>
                <Menu.Item key="39">option11</Menu.Item>
                <Menu.Item key="40">option12</Menu.Item>
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
                <Menu.Item key="41">option9</Menu.Item>
                <Menu.Item key="42">option10</Menu.Item>
                <Menu.Item key="43">option11</Menu.Item>
                <Menu.Item key="44">option12</Menu.Item>
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
                <Menu.Item key="45">option9</Menu.Item>
                <Menu.Item key="46">option10</Menu.Item>
                <Menu.Item key="47">option11</Menu.Item>
                <Menu.Item key="48">option12</Menu.Item>
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
