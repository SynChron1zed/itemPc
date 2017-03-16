/**
 * Created by Administrator on 2016/12/27.
 */
import React from 'react';
import { Link } from 'dva/router';
import styles from './Layouty.less';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;



var Layouty =React.createClass({


  getInitialState(){
    return {
      collapsed: false,
    }

  },

  conponentDidMount(){


  },

  handColor(e) {
    var vue = e;
    localStorage.setItem("select",vue);
},
  toggle(){

      this.setState({
        collapsed: !this.state.collapsed,
      });

  },


  render() {
    const {children} = this.props;
    return (
      <Layout style={{height:100+'%'}}>

        <Header className={styles.headItem}>
          <div className="logo" />

        </Header>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          collapsedWidth={0}
          className={styles.leftitem}

        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/itemplay">
              <Icon type="user" />
              <span className="nav-text">nav 1</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/holiday">
              <Icon type="video-camera" />
              <span className="nav-text">nav 2</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/itemplay">
              <Icon type="upload" />
              <span className="nav-text">nav 3</span>
            </Link>
            </Menu.Item>
          </Menu>

        </Sider>
        <div style={{width:'20px'}}>
          <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
            style={{'marginTop': '400px','fontSize': '16px'}}
          />
        </div>

          <Layout style={{'marginTop': '64px'}}>

            <Content style={{ background: '#fff', minHeight: 280 }}>
              { children }
            </Content>
          </Layout>

      </Layout>
    );
  }


});



export default Layouty;
