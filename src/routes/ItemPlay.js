/**
 * Created by dixu on 2017/3/16.
 */
import React ,{map} from 'react';
import { Layout, Menu, Icon,Dropdown,Carousel, Row, Col } from 'antd';

import  Slider from 'react-slick';

import createReactClass from 'create-react-class';

//插件可用
import style from './ItemPlay.css';
import fetch from 'dva/fetch';
import $ from 'jquery';
import echarts from 'echarts';
import itemicon from '../assets/item2.png';
import itemicon3 from '../assets/item3.png';
import itemicon4 from '../assets/itembg.png';
import { get} from '../utils/request';




var ItemPlay = createReactClass({

  getInitialState: function () {



    return {
      Name:[],
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
   /* this.querystar();
    this.querystar1();
    this.querystar2();

    this.queryhot();
    this.queryhot1();
    this.queryhot2();

    this.querybuy();
    this.querybuy1();

    this.querypay();
    this.querypay1();
    this.querypay2();*/


    this.demodata();
    this.newData();
    setTimeout(function () {
      this.getshop();
    }.bind(this), 500);

    setTimeout(function () {

      this.getshoptwo();
    }.bind(this), 500);





  },

  getshoptwo:function () {

    var buydata1 =  localStorage.getItem("buy1");
    buydata1 = JSON.parse(buydata1);


    var maxdataY = Math.max.apply(null,buydata1.amounts);

    var maxdata1 =[];


    for(var i = 0 ;i<buydata1.amounts.length;i++){
      maxdata1.push(maxdataY)
    }







    var option2 = ({
      tooltip: {
        show: false,},

      grid: {
        top: '0',
        left: '0%',
        right: '3%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: {
        data: buydata1.dates,
        axisLabel: {
          textStyle: {
            color: '#9e9e9e',
            fontWeight: 'lighter',
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#2c6681',
            width: 2,
          },
        },
        z: 10
      },
      yAxis: {
        show: false,
        splitLine: {
          show: false,
        },
        name: '亿',
        nameLocation: 'end',
        nameTextStyle: {
          color: '#9e9e9e',

        },
        splitNumber: 4,
        nameGap: 1,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#113561',
            width: 1,
          },
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e',
            fontWeight: 'lighter',
          }
        }
      },


      series: [
        { // For shadow

          type: 'bar',
          itemStyle: {
            normal: {color: 'rgba(64, 64, 64, 0.88)'}
          },
          barWidth:'15',
          barGap:'-100%',
          barCategoryGap:'70%',
          data: maxdata1,
          animation: false,
          label: {
            normal: {
              show: false,

            },

          },
          legendHoverLink: false,

        },

        {
          barWidth:'15',
          type: 'bar',
          label: {emphasis: {
            show: true,
            formatter: '{c}',
          },},
          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00d7ff'
              }, {
                offset: 1,
                color: '#0034a1'
              }]),
              shadowColor: 'rgba(0, 0, 0, 0.4)',
              shadowBlur: 20
            },
            emphasis: {
              color:'#2378f7'
            }
          },
          data: buydata1.amounts

        }
      ]

    });

    const myChart2 = document.querySelectorAll('.Imain2');

    myChart2.forEach(node => {
      echarts.init(node).setOption(option2);
    });


  },

  getshop:function () {

    var buydata =  localStorage.getItem("buy");
    buydata = JSON.parse(buydata);



    var maxdataY = Math.max.apply(null,buydata.amounts);

    var maxdata =[];


    for(var i = 0 ;i<buydata.amounts.length;i++){
      maxdata.push(maxdataY)
    }









    var option1 = ({



      tooltip: {
        show: false,},

      grid: {
        top: '0',
        left: '0%',
        right: '3%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: {
        data: buydata.dates,
        axisLabel: {
          textStyle: {
            color: '#9e9e9e',
            fontWeight: 'lighter',
          }
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#2c6681',
            width: 2,
          },
        },
        z: 10
      },
      yAxis: {
        show: false,
        splitLine: {
          show: false,
        },
        name: '亿',
        nameLocation: 'end',
        nameTextStyle: {
          color: '#9e9e9e',

        },
        splitNumber: 4,
        nameGap: 1,
        axisLine: {
          show: true,
          lineStyle: {
            color: '#113561',
            width: 1,
          },
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: '#9e9e9e',
            fontWeight: 'lighter',
          }
        }
      },

      series: [
        { // For shadow

          type: 'bar',
          itemStyle: {
            normal: {color:'rgba(64, 64, 64, 0.88)'}
          },
          barWidth:'10',
          barGap:'-100%',
          barCategoryGap:'70%',
          data: maxdata,
          animation: false,
          label: {
            normal: {
              show: false,

            },

          },
          legendHoverLink: false,

        },

        {
          barWidth:'10',
          type: 'bar',
          label: {emphasis: {
            show: true,
            formatter: '{c}',
          },},

          itemStyle: {
            normal: {
              barBorderRadius: 20,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#00d7ff'
              }, {
                offset: 1,
                color: '#0034a1'
              }]),
              shadowColor: 'rgba(0, 0, 0, 0.4)',
              shadowBlur: 20
            },
            emphasis: {
              color:'#2378f7'
            }
          },
          data: buydata.amounts

        }
      ]

    });

    const myChart1 = document.querySelectorAll('.Imain1');

    myChart1.forEach(node => {
      echarts.init(node).setOption(option1);
    });



  },

  payShop:function (e) {



    var paydata =  localStorage.getItem("pay");
    paydata = JSON.parse(paydata);


    var paydata1 =  localStorage.getItem("pay1");
    paydata1 = JSON.parse(paydata1);


    var paydata2 =  localStorage.getItem("pay2");
    paydata2 = JSON.parse(paydata2);




    var per  =e;
    var paycolor = ['#00b0e6','#0090e7','#0077e4','#005cdd','#0043d3','#002FC1'];
    var paycolorlist ;
    var paydatalist = [];

    //console.log(per);

    if(per==0){
      paycolorlist = paydata.length;
      for(var i = 0;i<paycolorlist;i++){
        paydatalist.push({value:paydata[i].data.payAmount,name:paydata[i].data.payKindName})
      }
      paycolor = paycolor.slice(0,paycolorlist)

    }else if(per==1){
      paycolorlist = paydata1.length;
      for(var i = 0;i<paycolorlist;i++){
        paydatalist.push({value:paydata1[i].data.payAmount,name:paydata1[i].data.payKindName})
      }
      paycolor = paycolor.slice(0,paycolorlist)

    }else if (per==2){
      paycolorlist = paydata2.length;
      for(var i = 0;i<paycolorlist;i++){
        paydatalist.push({value:paydata2[i].data.payAmount,name:paydata2[i].data.payKindName})
      }
      paycolor = paycolor.slice(0,paycolorlist)

    }else{

      paycolorlist = paydata.length;
      for(var i = 0;i<paycolorlist;i++){
        paydatalist.push({value:paydata[i].data.payAmount,name:paydata[i].data.payKindName})
      }
      paycolor = paycolor.slice(0,paycolorlist)


    }

 /*   console.log(paycolorlist);
    console.log(paydatalist);
    console.log(paycolor);*/


    var myChart4 = echarts.init(document.getElementById('Imain4'));
    var option4 = ({


      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },

      series: [
        {
          name:'支付分析',
          type:'pie',
          selectedMode: false,
          radius: [0, '100%'],

          label: {
            normal: {
              show:false
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },

          itemStyle: {
            normal: {
              color:function (params) {
                var colorlist = paycolor;

                return colorlist[params.dataIndex]

              } ,

            }
          },
          data:paydatalist
        }

      ]

    });


    myChart4.setOption(option4);


  },

  Ggetshop:function () {


    var shopdata =  localStorage.getItem("datato");
    shopdata = JSON.parse(shopdata);


    var newshop = shopdata.storeTypeList;

    var addshop = shopdata.storeTrendList


    var adddate = [];
    var adddata = [];

    for(var i = 0 ; i<addshop.length;i++){

      adddate.push(addshop[i].time);
      adddata.push(addshop[i].count+100);

    }



    //console.log(newshop);




    var myChart9 = echarts.init(document.getElementById('Imainleft'));




    var option9 = ({

      grid: {
        left: '3%',
        right: '4%',
        bottom: '9%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          boundaryGap : false,
          axisTick:false,
          axisLine:false,
          axisLabel:{
            textStyle:{
              color: '#b1b1b1'
            },
            margin:12
          },
          data:adddate

        }
      ],

      yAxis :
        {
          show :false

        },





      series : [
        {
          name:'销售额',
          type:'line',
          itemStyle: {
            normal: {
              color: '#ffffff'
            }
          },
          lineStyle:{
            normal: {
              color: '#69b4ff'
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(0, 215, 255)'
              }, {
                offset: 1,
                color: 'rgba(0, 52, 161, 0)'
              }])
            }
          },
          symbol:'circle',
          symbolSize:6,
          showAllSymbol:true,
          data:adddata,
        },

      ]
    });
    myChart9.setOption(option9);
    window.onresize = myChart9.resize;








    var myChart3 = echarts.init(document.getElementById('Imain3'));
    var option3 = ({


      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },

      series: [
        {
          name:'访问来源',
          type:'pie',
          selectedMode: 'single',
          radius: [0, '50%'],

          label: {
            normal: {
              position: 'inside',
              formatter: "{b}: {c} "
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },

          itemStyle: {
            normal: {
              color:function (params) {
                var colorlist = ['#009bda','#00c7f2']

                return colorlist[params.dataIndex]

              } ,

            }
          },
          data:[
            {value:newshop[0].count, name:newshop[0].type, selected:true},
            {value:newshop[1].count, name:newshop[1].type},

          ]
        },
        {
          name:'访问来源',
          type:'pie',
          radius: ['70%', '98%'],
          labelLine: {
            normal: {
              show: false
            }
          },
          label: {
            normal: {
              position: 'inside',
              formatter: "{b}: {c} "
            }
          },
          itemStyle: {
            normal: {
              color: '#005ad1',

            }
          },

          data:[
            {value:newshop[2].count, name:newshop[2].type},

          ]
        }
      ]

    });


    myChart3.setOption({
      tooltip: {

      },

      series: [

      ]
    });

    myChart3.setOption(option3);
    window.onresize = myChart3.resize;







/*
    var geoCoordMap = {

      '湖南省': [112.982279,28.19409],

    };*/



   /* var BJData = this.state.AllBjDATA;

    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord]
          });
        }
      }
      return res;
    };



    var color = [ '#ffb400'];
    var series = [];
    [['长沙市', BJData],].forEach(function (item, i) {
      series.push({
          name: item[0] + ' Top10',
          type: 'lines',
          zlevel: 1,

          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 0,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        },

        {
          name: item[0] + ' Top10',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: function (val) {

              return 50;


          },
          itemStyle: {
            normal: {
              color: color[i]
            }
          },
          data: item[1].map(function (dataItem) {
            return {
              name: dataItem[1].name,
              value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
            };
          })
        });
    });
*/



/*
     var chart = echarts.init(document.getElementById('Imain5'));
        chart.setOption({
          series: [{
            type: 'map',
            map: 'china'
          }]
        });

    $(window).resize(function(){
      chart.resize();
    })*/



    var geoCoordMap = {
      '河北':[114.502461,38.045474],
      '山西':[112.549248,37.857014],
      '内蒙古':[111.670801,40.818311],
      '辽宁':[123.429096,41.796767],
      '吉林':[125.3245,43.886841],
      '黑龙江':[126.642464,45.756967],
      '江苏':[118.767413,32.041544],
      '浙江':[120.153576,30.287459],
      '安徽':[117.283042,31.86119],
      '福建':[119.306239,26.075302],
      '江西省鹰潭市':[115.892151,28.676493],
      '山东':[117.000923,36.675807],
      '河南':[113.665412,34.757975],
      '湖北':[114.298572,30.584355],
      '广东':[113.280637,23.125178],
      '海南':[110.33119,20.031971],
      '四川':[104.065735,30.659462],
      '贵州':[106.713478,26.578343],
      '云南':[102.712251,25.040609],
      '西藏':[91.132212,29.660361],
      '陕西':[108.948024,34.263161],
      '甘肃':[103.823557,36.058039],
      '青海':[101.778916,36.623178],
      '宁夏':[106.278179,38.46637],
      '湖南':[112.982279,28.19409],
      '新疆':[87.617733,43.792818],
    };

    var BJData = [
      [{name:'江西省鹰潭市'}, {name:'河北',value:40}],
      [{name:'江西省鹰潭市'}, {name:'山西',value:50}],
      [{name:'江西省鹰潭市'}, {name:'内蒙古',value:45}],
      [{name:'江西省鹰潭市'}, {name:'辽宁',value:40}],
      [{name:'江西省鹰潭市'}, {name:'吉林',value:40}],
      [{name:'江西省鹰潭市'}, {name:'黑龙江',value:40}],
      [{name:'江西省鹰潭市'}, {name:'江苏',value:40}],
      [{name:'江西省鹰潭市'}, {name:'浙江',value:40}],
      [{name:'江西省鹰潭市'}, {name:'安徽',value:40}],
      [{name:'江西省鹰潭市'}, {name:'福建',value:40}],
      [{name:'江西省鹰潭市'}, {name:'江西省鹰潭市',value:80}],
      [{name:'江西省鹰潭市'}, {name:'山东',value:40}],
      [{name:'江西省鹰潭市'}, {name:'河南',value:40}],
      [{name:'江西省鹰潭市'}, {name:'湖北',value:40}],
      [{name:'江西省鹰潭市'}, {name:'广东',value:40}],
      [{name:'江西省鹰潭市'}, {name:'四川',value:40}],
      [{name:'江西省鹰潭市'}, {name:'海南',value:40}],
      [{name:'江西省鹰潭市'}, {name:'贵州',value:40}],
      [{name:'江西省鹰潭市'}, {name:'云南',value:40}],
      [{name:'江西省鹰潭市'}, {name:'西藏',value:40}],
      [{name:'江西省鹰潭市'}, {name:'陕西',value:40}],
      [{name:'江西省鹰潭市'}, {name:'甘肃',value:40}],
      [{name:'江西省鹰潭市'}, {name:'青海',value:40}],
      [{name:'江西省鹰潭市'}, {name:'宁夏',value:40}],
      [{name:'江西省鹰潭市'}, {name:'湖南',value:70}],
      [{name:'江西省鹰潭市'}, {name:'新疆',value:90}],
    ];


    /* var geoCoordMap ={
     '江西省鹰潭市':[116.0046,28.6633],
     '新疆省':[87.617733,43.792818],
     '江西省':[115.892151,28.676493],
     '广东省':[113.280637,23.125178],
     '湖北省':[114.298572,30.584355],
     '江苏省':[118.767413,32.041544],
     '浙江省':[120.153576,30.287459],
     '北京市':[116.4551,40.2539],
     '重庆市':[107.7539,30.1904],
     '上海市':[121.4648,31.2891],
     '湖南省':[112.982279,28.19409]
     };
     */

    //var BJData = this.state.AllBjDATA;

    var convertData = function (data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord]
          });
        }
      }
      return res;
    };


    var color = [ '#ffb400'];
    var series = [];

    [['江西省鹰潭市', BJData],].forEach(function (item, i) {
      series.push({
          name: item[0] + ' Top10',
          type: 'lines',
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: '#fff',
            symbolSize: 4
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 0,
              curveness: 0.2
            }
          },
          data: convertData(item[1])
        },

        {
          name: item[0] + ' Top10',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: {
            brushType: 'stroke'
          },
          label: {
            normal: {
              show: true,
              position: 'right',
              formatter: '{b}'
            }
          },
          symbolSize: function (val) {

            return val[2]/3;


          },
          itemStyle: {
            normal: {
              color: color[i]
            }
          },
          data: item[1].map(function (dataItem) {

            return {
              name: dataItem[1].name,
              value: geoCoordMap[dataItem[1].name].concat(dataItem[1].value)

            };
          })
        });
    });




    $.getJSON('china.json', function (chinaJson) {
      echarts.registerMap('china', chinaJson);
      var chart = echarts.init(document.getElementById('Imain5'));

      chart.setOption({

        tooltip : {
          trigger: 'item'
        },
        formatter:
          function (params) {

            return "地址："+params.name+'<br />'+'机房总数：'+ params.value[2]+'个'
          },

        geo: {

          label: {
            emphasis: {
              show: false
            }
          },
          roam: false,
          zoom:1.05,


          type: 'map',
          map: 'china',
          left: '10',
          right:'10',
          top:'10',
          bottom:'10',


          itemStyle: {
            normal: {
              areaColor: 'white',
              borderColor: 'white',
              borderType: 'solid',
              borderWidth: 2,
              opacity: 0.1,
            },
          }

        },
        series: series




      });


    });

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

    this.Ggetshop();


  },


  demodata:function (e) {

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


    this.Ggetshop();
    this.payShop();



  },

  //查询首页基本数据
  queryAll(){

    get('/yyzzs')
      .then((res) => {
        if (res) {
          var data1=JSON.stringify(res.data);
          localStorage.setItem("datato",data1);

        } else {
          console.log("fetch fail");
        }
      });



  },


  //查询star昨日
  querystar(){

    get('/yyzzs/mxdp?target=0')
      .then((res) => {
        if (res) {
          var data1=JSON.stringify(res.data);

          localStorage.setItem("star",data1);


        } else {
          console.log("fetch fail");
        }
      });

  },

  //查询star本周
  querystar1(){


    get('/yyzzs/mxdp?target=1')
      .then((res) => {
        if (res) {
          var data1=JSON.stringify(res.data);

          localStorage.setItem("star1",data1);

        } else {
          console.log("fetch fail");
        }
      });


  },

  //查询star本月
  querystar2(){

    get('/yyzzs/mxdp?target=2')
      .then((res) => {
        if (res) {
          var data1=JSON.stringify(res.data);

          localStorage.setItem("star2",data1);

        } else {
          console.log("fetch fail");
        }
      });


  },


  //查询hot昨日
  queryhot(){

    get('/yyzzs/rxbd?target=0')
      .then((res) => {
        if (res) {
          var data1=JSON.stringify(res.data);

          localStorage.setItem("hot",data1);


        } else {
          console.log("fetch fail");
        }
      });


  },

  //查询hot本周
  queryhot1(){

    get('/yyzzs/rxbd?target=1')
      .then((res) => {
        if (res) {
          var data1=JSON.stringify(res.data);

          localStorage.setItem("hot1",data1);

        } else {
          console.log("fetch fail");
        }
      });

  },

  //查询hot本月
  queryhot2(){
    get('/yyzzs/rxbd?target=2')
      .then((res) => {
        if (res) {
          var data1=JSON.stringify(res.data);

          localStorage.setItem("hot2",data1);

        } else {
          console.log("fetch fail");
        }
      });


  },


  //查询buy本月
  querybuy(){

    get('/yyzzs/xseqs?target=0')
      .then((res) => {
        if (res) {
          var data1=JSON.stringify(res.data);
          localStorage.setItem("buy",data1);
        } else {
          console.log("fetch fail");
        }
      });


  },

  //查询buy今年
  querybuy1(){

    get('/yyzzs/xseqs?target=1')
      .then((res) => {
        if (res) {
          var data1=JSON.stringify(res.data);
          localStorage.setItem("buy1",data1);
        } else {
          console.log("fetch fail");
        }
      });


  },


  //查询pay昨日
  querypay(){

    get('/yyzzs/zffx?target=0')
      .then((res) => {
        if (res) {
          var payColor = ['#00b0e6','#0090e7','#0077e4','#005cdd','#0043d3','#002FC1'];
          var paydata = [];

          for(var i = 0;i<res.data.length;i++){
            paydata.push({color:payColor[i],data:res.data[i]})

          }

          var data1=JSON.stringify(paydata);

          //console.log(paydata);

          localStorage.setItem("pay",data1);

        } else {
          console.log("fetch fail");
        }
      });



  },

  //查询pay本周
  querypay1(){

    get('/yyzzs/zffx?target=1')
      .then((res) => {
        if (res) {
          var payColor = ['#00b0e6','#0090e7','#0077e4','#005cdd','#0043d3','#002FC1'];
          var paydata = [];

          for(var i = 0;i<res.data.length;i++){
            paydata.push({color:payColor[i],data:res.data[i]})

          }

          var data1=JSON.stringify(paydata);

          //console.log(paydata);

          localStorage.setItem("pay1",data1);

        } else {
          console.log("fetch fail");
        }
      });


  },

  //查询pay本月
  querypay2(){

    get('/yyzzs/zffx?target=2')
      .then((res) => {
        if (res) {
          var payColor = ['#00b0e6','#0090e7','#0077e4','#005cdd','#0043d3','#002FC1'];
          var paydata = [];

          for(var i = 0;i<res.data.length;i++){
            paydata.push({color:payColor[i],data:res.data[i]})

          }

          var data1=JSON.stringify(paydata);

          //console.log(paydata);

          localStorage.setItem("pay2",data1);

        } else {
          console.log("fetch fail");
        }
      });


  },



  newshop(e){
    this.payShop(e);
  },


  render: function() {



    var setting= {
      dots: true,
      //autoplay:true,
      arrows:false,
      speed: 3000,

    };

    var settingpay= {
      dots: true,
      //autoplay:true,
      arrows:false,
      speed: 3000,

    };

    var newsettings = {
      dots: true,
      //autoplay:true,
      arrows:false,
      speed: 3000,


    };


    var data =  localStorage.getItem("datato");
    data = JSON.parse(data);
    console.log(data)



    var stardata =  localStorage.getItem("star");
    stardata = JSON.parse(stardata);


    var stardata1 =  localStorage.getItem("star1");
    stardata1 = JSON.parse(stardata1);


    var stardata2 =  localStorage.getItem("star2");
    stardata2 = JSON.parse(stardata2);



    var hotdata =  localStorage.getItem("hot");
    hotdata = JSON.parse(hotdata);


    var hotdata1 =  localStorage.getItem("hot1");
    hotdata1 = JSON.parse(hotdata1);


    var hotdata2 =  localStorage.getItem("hot2");
    hotdata2 = JSON.parse(hotdata2);



    var paydata =  localStorage.getItem("pay");
    paydata = JSON.parse(paydata);


    var paydata1 =  localStorage.getItem("pay1");
    paydata1 = JSON.parse(paydata1);


    var paydata2 =  localStorage.getItem("pay2");
    paydata2 = JSON.parse(paydata2);





    return (

        <div id="itemBody" >
          <div className={style.left}>
            <div className={style.leftmap}>
              <div id="Imain5" style={{width: 100+'%', height:100+'%'}}>


              </div>

            </div>

            <div className={style.lefthead}>
              <ul>
                <li>
                  <span className={style.leftheadname}>{data.chainName}运营作战室|数据大屏</span>
                </li>
                <li className={style.lefttime}>
                  <span className={style.lefttheadtime}>采集时间：</span>
                </li>
                <li >
                  <span className={style.leftheadtime1}>{data.date}</span>
                </li>
                <li className={style.lefttime}>
                  <span className={style.lefttheadtime}>昨日销售额：</span>
                </li>
                <li >
                  <span className={style.leftheadtime1}>{data.amount}</span>
                </li>
                <li className={style.lefttime}>
                  <span className={style.lefttheadtime}>营业门店数：</span>
                </li>
                <li >
                  <span className={style.leftheadtime1}>{data.businessCount}</span>
                </li>
              </ul>
            </div>

            <div className={style.leftxs}>
              <div className="bcon">
                <h3 className={style.lefth3}>采集日销售额</h3>
                <div className="list_lh">
                  <ul   >
                  {
                  data.storeSaleList.map(function (newdata) {
                    return(

                        <li key={newdata.rank}>
                          <Row className={style.yshoptext}>
                            <Col span={7}><span>{newdata.name}</span> </Col>
                            <Col span={5}><span>¥{newdata.amount} </span> </Col>
                            <Col span={6}> <span>客单量{newdata.orderCount}</span> </Col>
                            <Col span={6}><span> 客单价{newdata.orderPrice}</span> </Col>
                          </Row>
                        </li>

                    )
                  })
                }
                </ul>
                </div>
              </div>
            </div>


            <div className={style.itemlast}>
              <h3 className={style.lefth4}>门店增长趋势</h3>
              <div id="Imainleft" style={{width: 100+'%', height:100+'%'}}>

              </div>


            </div>



          </div>
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
                  <Slider {...setting} >
                    <div className={style.shopDop} >
                      <Row >
                        <Col span={4}>排序</Col>
                        <Col span={6}>门店</Col>
                        <Col span={10}>销售额</Col>
                        <Col span={4}>贡献率</Col>{/**/}
                      </Row>


                      {
                        stardata.map(function (newdata) {
                          return(

                              <Row key={newdata.rank}>
                                <Col span={4}>{newdata.rank}</Col>
                                <Col span={6}>{newdata.name}</Col>
                                <Col span={10}>
                                  <span className={style.shopM}>{newdata.amount}</span>
                                  <div className={style.shopRadius}></div>
                                  <div className={style.shopRadiustwo} style={{width:(95-parseInt((newdata.rank).substring(2,3))*10)+'%'}}></div>
                                </Col>
                                <Col span={4}>{newdata.per}</Col>
                              </Row>

                          )
                        })
                      }

                    </div>



                    <div className={style.shopDop} >
                      <Row >
                        <Col span={4}>排序</Col>
                        <Col span={6}>门店</Col>
                        <Col span={10}>销售额</Col>
                        <Col span={4}>贡献率</Col>{/**/}
                      </Row>
                      {
                        stardata1.map(function (newdata) {
                          return(


                            <Row key={newdata.rank}>
                              <Col span={4}>{newdata.rank}</Col>
                              <Col span={6}>{newdata.name}</Col>
                              <Col span={10}>
                                <span className={style.shopM}>{newdata.amount}</span>
                                <div className={style.shopRadius}></div>
                                <div className={style.shopRadiustwo} style={{width:(95-parseInt((newdata.rank).substring(2,3))*10)+'%'}}></div>
                              </Col>
                              <Col span={4}>{newdata.per}</Col>
                            </Row>

                          )
                        })
                      }
                    </div>



                    <div className={style.shopDop} >
                      <Row >
                        <Col span={4}>排序</Col>
                        <Col span={6}>门店</Col>
                        <Col span={10}>销售额</Col>
                        <Col span={4}>贡献率</Col>{/**/}
                      </Row>



                      {
                        stardata2.map(function (newdata) {
                          return(


                            <Row key={newdata.rank}>
                              <Col span={4}>{newdata.rank}</Col>
                              <Col span={6}>{newdata.name}</Col>
                              <Col span={10}>
                                <span className={style.shopM}>{newdata.amount}</span>
                                <div className={style.shopRadius}></div>
                                <div className={style.shopRadiustwo} style={{width:(95-parseInt((newdata.rank).substring(2,3))*10)+'%'}}></div>
                              </Col>
                              <Col span={4}>{newdata.per}</Col>
                            </Row>

                          )
                        })
                      }
                    </div>
                  </Slider>


                </div>
                <div className={style.shopDate}>
                  <span >昨日</span>
                  <span style={{'marginLeft':'8px'}}>本周</span>
                  <span style={{'marginLeft':'10px'}}>本月</span>
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

                      {
                        hotdata.map(function (newdata) {
                          return(

                            <Row key={newdata.rank}>
                              <Col span={4}>{newdata.rank}</Col>
                              <Col span={6}>{newdata.name}</Col>
                              <Col span={10}>
                                <span className={style.shopM}>{newdata.amount}</span>
                                <div className={style.shopRadius}></div>
                                <div className={style.shopRadiustwo} style={{width:(95-parseInt((newdata.rank).substring(2,3))*10)+'%'}}></div>
                              </Col>
                              <Col span={4}>{newdata.per}</Col>
                            </Row>

                          )
                        })
                      }


                    </div>
                    <div className={style.shopDop} >
                      <Row >
                        <Col span={4}>排序</Col>
                        <Col span={4}>门店</Col>
                        <Col span={12}>销售额</Col>
                        <Col span={4}>贡献率</Col>
                      </Row>

                      {
                        hotdata1.map(function (newdata) {
                          return(

                            <Row key={newdata.rank}>
                              <Col span={4}>{newdata.rank}</Col>
                              <Col span={6}>{newdata.name}</Col>
                              <Col span={10}>
                                <span className={style.shopM}>{newdata.amount}</span>
                                <div className={style.shopRadius}></div>
                                <div className={style.shopRadiustwo} style={{width:(95-parseInt((newdata.rank).substring(2,3))*10)+'%'}}></div>
                              </Col>
                              <Col span={4}>{newdata.per}</Col>
                            </Row>

                          )
                        })
                      }
                    </div>
                    <div className={style.shopDop} >
                      <Row >
                        <Col span={4}>排序</Col>
                        <Col span={4}>门店</Col>
                        <Col span={12}>销售额</Col>
                        <Col span={4}>贡献率</Col>
                      </Row>

                      {
                        hotdata2.map(function (newdata) {
                          return(

                            <Row key={newdata.rank}>
                              <Col span={4}>{newdata.rank}</Col>
                              <Col span={6}>{newdata.name}</Col>
                              <Col span={10}>
                                <span className={style.shopM}>{newdata.amount}</span>
                                <div className={style.shopRadius}></div>
                                <div className={style.shopRadiustwo} style={{width:(95-parseInt((newdata.rank).substring(2,3))*10)+'%'}}></div>
                              </Col>
                              <Col span={4}>{newdata.per}</Col>
                            </Row>

                          )
                        })
                      }
                    </div>
                  </Slider>


                </div>
                <div className={style.shopDate1}>
                  <span >昨日</span>
                  <span style={{'marginLeft':'8px'}}>本周</span>
                  <span style={{'marginLeft':'10px'}}>本月</span>
                </div>

              </div>

            </div>

            <div className={style.rtwo}>
              <span className={style.rtreeimghead}>销售额趋势</span>
              <img src={itemicon3} className={style.rtwoimg}/>


              <div  className={style.xiaoshou}>

                <Slider {...newsettings} >


                  <div className="Imain1" key='1' style={{width:'940px', height:250+'px'}}>

                  </div>



                  <div className="Imain2" key='2'  style={{width:'940px', height:250+'px'}}>



                  </div>

                </Slider>

              </div>




            </div>
            <div className={style.xsshopDate}>
              <span style={{'marginRight':'10px'}}>本月</span>
              <span style={{'marginRight':'15px'}}>今年</span>
            </div>


            <div className={style.rtree}>
              <div className={style.rtreeimg}>
                <span className={style.rtreeimghead}>门店类型</span>
                <div className={style.rtreeusel} style={{'position':'absolute'}}>
                  <div className={style.rtreefirst} >
                    <div id="Imain3" style={{width: 100+'%', height:230+'px'}}>

                    </div>
                  </div>

                </div>
                <img src={itemicon} className={style.rtreeimg}/>

              </div>


              <div>
                <img className={style.rtreenumtwo} src={itemicon3}/>
                <span className={style.rtreenumtext}>支付分析</span>
                <div style={{'position':'absolute'}}>

                  <div className={style.rtreeseccond} >
                    <div id="Imain4" style={{width: 100+'%', height:230+'px'}}>


                    </div>

                  </div>

                </div>


                <div className={style.lastrtree}>

                  <Slider {...settingpay} afterChange={this.newshop}>

                    <div>
                  <Row className={style.lastrtree1}>
                    <Col span={9}>支付方式</Col>
                    <Col span={8}>销售额</Col>
                    <Col span={7}>贡献率</Col>
                  </Row>

                      {
                        paydata.map(function (newdata) {
                          return(

                            <Row key={newdata.data.rank} className={style.paytoday}>
                              <Col span={9}><div className={style.paytodayone} style={{background:newdata.color}}></div><span className={style.paymoney} >{newdata.data.payKindName}</span></Col>
                              <Col span={8}>{newdata.data.payAmount}</Col>
                              <Col span={7}>{newdata.data.per}</Col>
                            </Row>

                          )
                        })
                      }

                    </div>
                    <div>
                      <Row className={style.lastrtree1}>
                        <Col span={9}>支付方式</Col>
                        <Col span={8}>销售额</Col>
                        <Col span={7}>贡献率</Col>
                      </Row>

                      {
                        paydata1.map(function (newdata) {
                          return(

                            <Row key={newdata.data.rank} className={style.paytoday}>
                              <Col span={9}><div className={style.paytodayone} style={{background:newdata.color}}></div><span className={style.paymoney} >{newdata.data.payKindName}</span></Col>
                              <Col span={8}>{newdata.data.payAmount}</Col>
                              <Col span={7}>{newdata.data.per}</Col>
                            </Row>

                          )
                        })
                      }
                    </div>


                    <div>
                      <Row className={style.lastrtree1}>
                        <Col span={9}>支付方式</Col>
                        <Col span={8}>销售额</Col>
                        <Col span={7}>贡献率</Col>
                      </Row>

                      {
                        paydata2.map(function (newdata) {
                          return(

                            <Row key={newdata.data.rank} className={style.paytoday}>
                              <Col span={9}><div className={style.paytodayone} style={{background:newdata.color}}></div><span className={style.paymoney} >{newdata.data.payKindName}</span></Col>
                              <Col span={8}>{newdata.data.payAmount}</Col>
                              <Col span={7}>{newdata.data.per}</Col>
                            </Row>

                          )
                        })
                      }
                    </div>

                  </Slider>



                </div>

                <div className={style.paydate}>
                  <span >昨日</span>
                  <span style={{'marginLeft':'8px'}}>本周</span>
                  <span style={{'marginLeft':'10px'}}>本月</span>
                </div>



              </div>

            </div>

          </div>

        </div>

    )


  }


});


export default ItemPlay;
