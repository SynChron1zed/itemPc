/**
 * Created by Administrator on 2016/12/27.
 */
import React from 'react';
import { Link } from 'dva/router';
import styles from './Layouty.less';
import { Layout,  Menu, Icon,Dropdown } from 'antd';
const { Header, Sider, Content } = Layout;
import $ from 'jquery';
import itemicon4 from '../assets/itembg.png';
import layicon1 from '../assets/icon1.png';
import layicon2 from '../assets/icon2.png';
import layicon3 from '../assets/icon3.png';
import layicon4 from '../assets/icon4.png';
import layicon5 from '../assets/icon5.png';
import layicon6 from '../assets/icon6.png';
import layicon7 from '../assets/icon7.png';
import layicon8 from '../assets/icon8.png';
import newlaylogo from '../assets/itemlogo.png';

import createReactClass from 'create-react-class';




var Layouty = createReactClass ({


  getInitialState(){



    return {
      collapsed: false,
      select:1,
      trigger:true,
      user:[]
    }

  },


  newData:function () {


    $(document).ready(function(){
      $('body').css({
        background:'#0D2A5E'
      });
      var ratio = $(window).width()/(1920||$('body').width());

      $('#root').css({
        transform: "scale("+ratio+")",
        transformOrigin: "left top",
        width: '1920px',
        height: '1080px',
        background: 'url('+itemicon4+') no-repeat center 0',
        backgroundSize: '100% 100%'
      });
      $(window).resize(function() {
        var ratio = $(window).width()/(1920||$('body').width());
        $('#root').css({
          transform: "scale("+ratio+")",
          transformOrigin: "left top",
          width: '1920px',
          height: '1080px',
          background: 'url('+itemicon4+') no-repeat center 0',
          backgroundSize: '100% 100%'
        });

        $('body').css({
          background:'#0D2A5E'
        });
      });

    });

    $(document).ready(function(){

      var ratio = (screen.width-200)/(1920||$('body').width());
      $('#itemBody').css({
        transform: "scale("+1+")",
        transformOrigin: "left top",
        width: '1920px',
        height: '1080px',
        background: 'url('+itemicon4+') no-repeat center 0',
        backgroundSize: '100% 100%'

      });
      $(window).resize(function() {
        var ratio = (screen.width-200)/(1920||$('body').width());
        $('#itemBody').css({
          transform: "scale("+1+")",
          transformOrigin: "left top",
          width: '1920px',
          height: '1080px',
          background: 'url('+itemicon4+') no-repeat center 0',
          backgroundSize: '100% 100%'
        });


      });

    });

  },


  oldData:function () {

    $(document).ready(function(){
      $('body').css({
        background:'#0D2A5E'
      });
      var ratio = $(window).width()/(1920||$('body').width());
      $('#root').css({
        transform: "scale("+1+")",
        transformOrigin: "left top",
        width: $(window).width(),
        height: $(window).height(),

      });
      $(window).resize(function() {
        var ratio = $(window).width()/(1920||$('body').width());
        $('#root').css({
          transform: "scale("+1+")",
          transformOrigin: "left top",
          width: $(window).width(),
          height: $(window).height(),

        });

        $('body').css({
          background:'#0D2A5E'
        });
      });



    });


  },


  leftData:function () {

    $('#leftlay').css({
      display:'none'
    });

    $(document).ready(function(){

      var ratio = (screen.width-200)/(1920||$('body').width());
      $('#itemBody').css({

        transform: "scale(0.75,"+ratio+")",
        transformOrigin: "left top",
        width: '1920px',
        height: '1080px',
        background: 'url('+itemicon4+') no-repeat center 0',
        backgroundSize: '100% 100%'
      });
      $(window).resize(function() {
        var ratio = (screen.width-200)/(1920||$('body').width());
        $('#itemBody').css({
          transform: "scale(0.75,"+ratio+")",
          transformOrigin: "left top",
          width: '1920px',
          height: '1080px',
          background: 'url('+itemicon4+') no-repeat center 0',
          backgroundSize: '100% 100%'
        });


      });



    });




  },

  rightData:function () {
    $('#leftlay').css({
      display:'block'
    });
    $(document).ready(function(){

      var ratio = (screen.width-200)/(1920||$('body').width());
      $('#itemBody').css({

        transform: "scale("+ratio+")",
        transformOrigin: "left top",
        width: '1920px',
        height: '1080px',
        background: 'url('+itemicon4+') no-repeat center 0',
        backgroundSize: '100% 100%'
      });
      $(window).resize(function() {
        var ratio = (screen.width-200)/(1920||$('body').width());
        $('#itemBody').css({
          transform: "scale("+ratio+")",
          transformOrigin: "left top",
          width: '1920px',
          height: '1080px',
          background: 'url('+itemicon4+') no-repeat center 0',
          backgroundSize: '100% 100%'
        });


      });

    });


  },

  conponentDidMount(){





  },



  handColor(e) {

    var vue = e;

    sessionStorage.setItem('Select_code', vue);

},

  userexit(){

    this.context.router.push('/login');
    sessionStorage.removeItem('Access_Token');

  },

  toggle(){


    if(!this.state.collapsed){
      this.leftData();
    }else {
      this.rightData()

    }

      this.setState({
        collapsed: !this.state.collapsed,
      });

  },

  Fullscreen(){

    $('#headerone').css({
      display:'block'
    });



    if(!this.state.trigger){
    $('#triggerlay').css({
      display:'none'
    })
    }

  },

  //全屏
  fullscreen:function () {

    this.state.trigger=false;



    $('#content').css({
      marginTop:'0px'
    });
    $('#header').css({
      display:'none'
    });
    $('#leftlayout').css({
      display:'none'
    });
    $('#headerone').css({
      display:'none'
    });
    this.newData();



  },

  //退出全屏
  exitscreen:function () {
    debugger;

    this.state.trigger=true;
    $('#triggerlay').css({
      display:'flex'
    })
    $('#content').css({
      marginTop:'80.5px'
    });
    $('#header').css({
      display:'block'
    });
    $('#leftlayout').css({
      display:'block'
    });
    this.oldData();
    if(!this.state.collapsed){
      this.rightData()

    }else {
      this.leftData();

    }

  },


  contextTypes: {
    router: React.PropTypes.object
  },

  render() {

    var data =  localStorage.getItem("datato");
    data = JSON.parse(data);





    const {children} = this.props;
    const menu = (
      <Menu >
        <Menu.Item >
          <a onClick={this.fullscreen} >全屏</a>
        </Menu.Item>
        <Menu.Item>
          <a onClick={this.exitscreen} >退出全屏</a>
        </Menu.Item>
      </Menu>
    );
    return (
      <Layout style={{height:100+'%'}}>

        <Header id="header" className={styles.headItem}>
          <img src={newlaylogo} className={styles.newlogo}/>

          <span className={styles.headlay}> <Icon className={styles.headicon} type="user" />{data.chainName} | <span className={styles.layexit} onClick={ () => {this.userexit() } }>退出</span></span>

        </Header>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
          collapsedWidth={0}
          className={styles.leftitem}
          id="leftlayout"
        >



          <div id="leftlay" className={styles.layselect}>
            <ul>
           <Link to="/itemplay" className={styles.gg}>
            <li  className={sessionStorage.getItem("Select_code")==1? styles.todata:styles.newtodata} onClick={ () => {this.handColor(1);} }>
              <div className={sessionStorage.getItem("Select_code")==1? styles.layshu:styles.newlayshu}></div>
              <img src={layicon1} className={styles.layicon}/>
              <span className={sessionStorage.getItem("Select_code")==1? styles.laytext:styles.newlaytext}>运营作战室</span>
            </li>
           </Link>
              <Link to="/process" >
              <li  className={sessionStorage.getItem("Select_code")==2? styles.todata:styles.newtodata} onClick={ () => {this.handColor(2);} }>
                <div className={sessionStorage.getItem("Select_code")==2? styles.layshu:styles.newlayshu}></div>
                <img src={layicon2} className={styles.layicon}/>
                <span className={sessionStorage.getItem("Select_code")==2? styles.laytext:styles.newlaytext}>经营历程</span>
              </li>
            </Link>
              <Link to="/dailyPK" >
              <li  className={sessionStorage.getItem("Select_code")==3? styles.todata:styles.newtodata} onClick={ () => {this.handColor(3);} }>
                <div className={sessionStorage.getItem("Select_code")==3? styles.layshu:styles.newlayshu}></div>
                <img src={layicon3} className={styles.layicon}/>
                <span className={sessionStorage.getItem("Select_code")==3? styles.laytext:styles.newlaytext}>天天PK</span>
              </li>
              </Link>

              <Link to="/productAnaly" >
                <li  className={sessionStorage.getItem("Select_code")==5? styles.todata:styles.newtodata} onClick={ () => {this.handColor(5);} }>
                  <div className={sessionStorage.getItem("Select_code")==5? styles.layshu:styles.newlayshu}></div>
                  <img src={layicon5} className={styles.layicon}/>
                  <span className={sessionStorage.getItem("Select_code")==5? styles.laytext:styles.newlaytext}>产品分析</span>
                </li>
              </Link>
              <Link to="/historyFest" >
                <li  className={sessionStorage.getItem("Select_code")==6? styles.todata:styles.newtodata} onClick={ () => {this.handColor(6);} }>
                  <div className={sessionStorage.getItem("Select_code")==6? styles.layshu:styles.newlayshu}></div>
                  <img src={layicon6} className={styles.layicon}/>
                  <span className={sessionStorage.getItem("Select_code")==6? styles.laytext:styles.newlaytext}>历史节日</span>
                </li>
              </Link>
              <Link to="/bestSell" >
                <li  className={sessionStorage.getItem("Select_code")==7? styles.todata:styles.newtodata} onClick={ () => {this.handColor(7);} }>
                  <div className={sessionStorage.getItem("Select_code")==7? styles.layshu:styles.newlayshu}></div>
                  <img src={layicon7} className={styles.layicon}/>
                  <span className={sessionStorage.getItem("Select_code")==7? styles.laytext:styles.newlaytext}>最佳销售</span>
                </li>
              </Link>
              <Link to="/paramSet" >
                <li  className={sessionStorage.getItem("Select_code")==8? styles.todata:styles.newtodata} onClick={ () => {this.handColor(8);} }>
                  <div className={sessionStorage.getItem("Select_code")==8? styles.layshu:styles.newlayshu}></div>
                  <img src={layicon8} className={styles.layicon}/>
                  <span className={sessionStorage.getItem("Select_code")==8? styles.laytext:styles.newlaytext}>参数设置</span>
                </li>
              </Link>

            </ul>
          </div>

        </Sider>


          <Layout id="content" style={{'marginTop':'80.5px',background: '#363c3f'}} onClick={this.Fullscreen}>

            <Content style={{'height':100+'%'}}>

              <header id="headerone" className={styles.playhead}>
                <a>
                  <Icon
                    id="triggerlay"
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                    style={{'fontSize': '20px','lineHeight':'25px','color':'white','position':'absolute',}}
                  />
                </a>
                <Dropdown overlay={menu} >
                  <a className={styles.pleydown} >
                    <Icon type="bars"   style={{'fontSize': '20px','lineHeight':'25px','color':'white'}}/>
                  </a>
                </Dropdown>
              </header>
              { children }
            </Content>
          </Layout>


      </Layout>
    );
  }


});



export default Layouty;
