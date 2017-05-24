/**
 * Created by dixu on 2017/3/16.
 */
/**
 * Created by dixu on 2017/3/16.
 */
import React ,{map} from 'react';

import createReactClass from 'create-react-class';
import  Slider from 'react-slick';

import { Layout, Menu, Icon,Dropdown,Carousel, Row, Col } from 'antd';


var Swiper = require('react-swiper');

import echarts from 'echarts';
import itemicon from '../assets/item2.png';
import itemicon3 from '../assets/item3.png';
import itemicon4 from '../assets/itembg.png';
import $ from 'jquery';



//插件可用
import style from './Holiday.css';
import fetch from 'dva/fetch';
import Layouty from '../components/Layouty';

const { Header, Sider, Content } = Layout;



var Holiday = createReactClass({

  getInitialState: function () {

    return {
      Name:['1'],
      Time:[],
      shop:[],
      warning:[],
      tip:[],
      yshop:[],
      addydate:[],
      addydata:[],
    }

  },


  newData:function () {



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




    setTimeout(function () {


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

    }.bind(this), 500);


  },


  componentDidMount() {

    this.queryAll();


    this.newData();



  },





  //解析数据
  alexdata:function (e) {
    var data = e;
    this.setState({Name:data.data.chainName});
    this.setState({Time:data.data.date});
    this.setState({shop:data.data.businessCount});
    this.setState({yujing:data.data.businessCount});
    this.setState({warning:data.data.warning});
    this.setState({tip:data.data.tip});
    this.setState({yshop:data.data.storeSaleList});

    var ydate = [];
    var ydata = [];

    for(var i = 0 ;i<data.data.storeTrendList.length;i++){
      ydate.push(data.data.storeTrendList[i].time);
      ydata.push(data.data.storeTrendList[i].count+50+i);
    }


    this.setState({addydata:ydata});
    this.setState({addydate:ydate});


  },


  demodata:function (e) {

    var data = e.data;

    var data1=JSON.stringify(data);

    localStorage.setItem("datato",data1);




  },


  //查询首页基本数据
  queryAll(){
    //var url = localStorage.getItem("url");
    //var url = 'http://120.76.194.221:8080/lyy/'
    console.info(url);
    var url = 'http://120.76.194.221:8080/Iyy/yyzzs'
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {

        res.json().then(function (json) {
          console.info(json);



          (function($){
            $.fn.myScroll = function(options){
              //默认配置
              var defaults = {
                speed:40,  //滚动速度,值越大速度越慢
                rowHeight:24 //每行的高度
              };

              var opts = $.extend({}, defaults, options),intId = [];

              function marquee(obj, step){

                obj.find("ol").animate({
                  marginTop: '-=1'
                },0,function(){
                  var s = Math.abs(parseInt($(this).css("margin-top")));
                  if(s >= step){
                    $(this).find("li").slice(0, 1).appendTo($(this));
                    $(this).css("margin-top", 0);
                  }
                });
              }

              this.each(function(i){
                var sh = opts["rowHeight"],speed = opts["speed"],_this = $(this);
                intId[i] = setInterval(function(){
                  if(_this.find("ol").height()<=_this.height()){
                    clearInterval(intId[i]);
                  }else{
                    marquee(_this, sh);
                  }
                }, speed);

                _this.hover(function(){
                  clearInterval(intId[i]);
                },function(){
                  intId[i] = setInterval(function(){
                    if(_this.find("ol").height()<=_this.height()){
                      clearInterval(intId[i]);
                    }else{
                      marquee(_this, sh);
                    }
                  }, speed);
                });

              });

            }

          })($);

          $(document).ready(function(){



            $(".list_lh").myScroll({
              speed:40, //数值越大，速度越慢
              rowHeight:68 //li的高度
            });
          });


      this.demodata(json);

        }.bind(this));
      } else {

      }

    }.bind(this)).catch(function (e) {
      console.log("fetch fail");
    });

  },

  render: function() {

    var setting = {
      dots: true,
      autoplay:true,
      arrows:false,

    };

    var newsettings = {
      dots: true,
      autoplay:true,
      arrows:false,
    };



    var data =  localStorage.getItem("datato");

    data = JSON.parse(data);

    console.log(data)



    return (



      <div id="itemBody" >


      <div className={style.right}>


        <div className={style.rone}>
          <div style={{'marginTop':'24px'}}>
            <Icon type="exclamation-circle" className={style.ricon}/>
            <span className={style.riconOne}>
                预警：昨日营业门店{data.businessCount}家，较上周同期有{data.warning.asc}家为增长 占比{data.warning.ascPer}，{data.warning.desc}家为降低 占比{data.warning.descPer}
              </span>
          </div>
          <div style={{'marginTop':'24px'}}>
            <Icon type="bell" className={style.ricon}/>
            <span className={style.riconOne}>
                提示：{data.tip.holiday}马上就要来了，去年同期单店营收 ¥{data.tip.amount}，还有{data.tip.remainingDay}天，请做好准备吧
              </span>
          </div>
        </div>



        <div className={style.itemImg}>
          <div className={style.itemImg1}>
            <span className={style.itemimghead}>明星店铺</span>
            <div className={style.itemusel} style={{'position':'absolute'}} >
              <Slider {...setting} autoplay>
                <div className={style.shopDop} >
                  <Row >
                    <Col span={4}>排序</Col>
                    <Col span={4}>门店</Col>
                    <Col span={12}>销售额</Col>
                    <Col span={4}>贡献率</Col>{/**/}
                  </Row>
                  <Row>
                    <Col span={4}>1</Col>
                    <Col span={4}>门店1</Col>
                    <Col span={12}>
                      <span className={style.shopM}>销售额</span>
                      <div className={style.shopRadius}></div>
                      <div className={style.shopRadiustwo}></div>
                    </Col>
                    <Col span={4}>4%</Col>
                  </Row>
                  <Row>
                    <Col span={4}>1</Col>
                    <Col span={4}>门店1</Col>
                    <Col span={12}>销售额</Col>
                    <Col span={4}>4%</Col>
                  </Row>
                  <Row>
                    <Col span={4}>1</Col>
                    <Col span={4}>门店1</Col>
                    <Col span={12}>销售额</Col>
                    <Col span={4}>4%</Col>
                  </Row>
                  <Row>
                    <Col span={4}>1</Col>
                    <Col span={4}>门店1</Col>
                    <Col span={12}>销售额</Col>
                    <Col span={4}>4%</Col>
                  </Row>
                  <Row>
                    <Col span={4}>1</Col>
                    <Col span={4}>门店1</Col>
                    <Col span={12}>销售额</Col>
                    <Col span={4}>4%</Col>
                  </Row>
                  <Row>
                    <Col span={4}>1</Col>
                    <Col span={4}>门店1</Col>
                    <Col span={12}>销售额</Col>
                    <Col span={4}>4%</Col>
                  </Row>
                </div>
                <div className={style.shopDop} >
                  <Row>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                  </Row>
                </div>
                <div className={style.shopDop} >
                  <Row>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                  </Row>
                </div>
              </Slider>
              <div className={style.shopDate}>
                <span >昨日</span>
                <span style={{'marginLeft':'8px'}}>本周</span>
                <span style={{'marginLeft':'10px'}}>本月</span>
              </div>

            </div>
            <img src={itemicon} className={style.itemimg1}/>

          </div>

          <div>

            <img src={itemicon} className={style.itemimg2}/>
            <span className={style.itemimghead1}>热销榜单</span>
            <div className={style.itemusel1} style={{'position':'absolute'}}>
              <Slider {...setting}>
                <div className={style.shopDop}>
                  <Row >
                    <Col span={4}>排序</Col>
                    <Col span={4}>门店</Col>
                    <Col span={12}>销售额</Col>
                    <Col span={4}>贡献率</Col>
                  </Row>
                  <Row>
                    <Col span={4}>1</Col>
                    <Col span={4}>门店1</Col>
                    <Col span={12}>
                      <span className={style.shopM}>销售额</span>
                      <div className={style.shopRadius}></div>
                      <div className={style.shopRadiustwo}></div>
                    </Col>
                    <Col span={4}>4%</Col>
                  </Row>
                  <Row>
                    <Col span={4}>1</Col>
                    <Col span={4}>门店1</Col>
                    <Col span={12}>销售额</Col>
                    <Col span={4}>4%</Col>
                  </Row>
                  <Row>
                    <Col span={4}>1</Col>
                    <Col span={4}>门店1</Col>
                    <Col span={12}>销售额</Col>
                    <Col span={4}>4%</Col>
                  </Row>
                  <Row>
                    <Col span={4}>1</Col>
                    <Col span={4}>门店1</Col>
                    <Col span={12}>销售额</Col>
                    <Col span={4}>4%</Col>
                  </Row>
                  <Row>
                    <Col span={4}>1</Col>
                    <Col span={4}>门店1</Col>
                    <Col span={12}>销售额</Col>
                    <Col span={4}>4%</Col>
                  </Row>
                  <Row>
                    <Col span={4}>1</Col>
                    <Col span={4}>门店1</Col>
                    <Col span={12}>销售额</Col>
                    <Col span={4}>4%</Col>
                  </Row>
                </div>
                <div className={style.shopDop} id="newsliderr">
                  <Row>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                  </Row>
                </div>
                <div className={style.shopDop} id="newsliderr">
                  <Row>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                  </Row>
                </div>
              </Slider>
              <div className={style.shopDate}>
                <span >昨日</span>
                <span style={{'marginLeft':'8px'}}>本周</span>
                <span style={{'marginLeft':'10px'}}>本月</span>
              </div>

            </div>

          </div>

        </div>







      </div>


      </div>


    )


  }


});


export default Holiday;
