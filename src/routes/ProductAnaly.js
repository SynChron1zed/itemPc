/**
 * Created by lenovo on 2017-03-14.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './ProductAnaly.css';
import { Select,Row,Col,Icon,BackTop } from 'antd';
import echarts from 'echarts';
import $ from 'jquery';
import analy1 from '../assets/image/analy_1.png';
import analy2 from '../assets/image/analy_2.png';
import analy3 from '../assets/image/analy_3.png';
import color1 from '../assets/image/color_1.png';
import color2 from '../assets/image/color_2.png';
import color3 from '../assets/image/color_3.png';
import color4 from '../assets/image/color_4.png';

import createReactClass from 'create-react-class';
import { post } from '../utils/request';

var Home = createReactClass({


  getInitialState: function () {
    return {
      AllData:[],
      kMenuCount:[],
      mCount:[],
      sAvgMenuCount:[],
      kMenuList:[],
      mList:[],
      cpqsAmPer:[],
      cpqsCotPer:[],
      cpqsDate:[],
      cpqsName:[],
      param1:[],
      param2:[],
      param3:[],

      shopData:['全部门店'],
      shopSelect:[],
      startDay:'开始时间',
      endDay:'结束时间',
    }
  },

  //查询所有
  selectAll(d1,d2,shopId){


    post('/cpfx', {
      'entityId':shopId,
      'bDate':d1,
      'eDate':d2
    })

      .then((res) => {

        if (res) {

          var Alldata =res.data;
          this.setState({AllData:Alldata});
          this.setState({kMenuCount:Alldata.kindMenuCount});
          this.setState({mCount:Alldata.menuCount});
          this.setState({sAvgMenuCount:Alldata.singleAvgMenuCount});
          this.setState({mList:Alldata.menuList});
          this.setState({kMenuList:Alldata.kindMenuList});

          var a = Alldata.kindMenuList;
          var arr1 = [];
          var arr2 = [];
          for( var i = 0;i< a.length;i++){
            arr1.push(Alldata.kindMenuList[i].amount);
            arr2.push(Alldata.kindMenuList[i].name);
          }
          var arr3 = [];
          var arr4 = [];
          var arr5 = [];
          var am = Alldata.menuList;
          var amStart10 = am.slice(0,10);
          var amEnd10 = am.slice(-10);

          for(var t1 = 0;t1<amStart10.length;t1++){
            var amount = amStart10[t1].amountPer;
            var str_before1 = amount.split('%')[0];
            arr3.push(str_before1);
            arr4.push(amStart10[t1].name);
            var rate = amStart10[t1].rate;
            var str_before2 = rate.split('%')[0];
            arr5.push(str_before2);
          }

          var arr6 = [];
          var arr7 = [];
          var arr8 = [];
          for(var t2 = 0;t2<amEnd10.length;t2++){
            var amountEnd = amEnd10[t2].amountPer;
            var str_before3 = amountEnd.split('%')[0];
            arr6.push(str_before3);
            arr7.push(amEnd10[t2].name);
            var rateEnd = amEnd10[t2].rate;
            var str_before4 = rateEnd.split('%')[0];
            arr8.push(str_before4);
          }
          this.setState({param1:arr6});
          this.setState({param2:arr7});
          this.setState({param3:arr8});
          this.getshape(arr1,arr2,arr3.reverse(),arr4.reverse(),arr5.reverse());
          //this.showBottom(1,arr6,arr7,arr8);


        } else {
          message.error('数据错误');
        }
      });



  },

  //产品趋势
  selectTrend(name){


    var data =  localStorage.getItem("shop-content");
    data = JSON.parse(data);

    var shopId = [];
    if(this.state.shopSelect.length==0){
      shopId= data.entityId
    }else if(this.state.shopSelect=='全部门店'){
      shopId = data.entityId
    }else {
      shopId = this.state.shopSelect
    }


    var sd = this.state.startDay.replace(/\//g,'');
    var ed = this.state.endDay.replace(/\//g,'');



    post('/cpfx/cpqs', {
      entityId:shopId,
      bDate:sd,
      eDate:ed,
      menuName:name

    })

      .then((res) => {

        if (res) {
          var Alldata =res.data;

          this.setState({AllData:Alldata});
          var cpqsAmPer = Alldata.amountPer;
          var cpqsCotPer = Alldata.saleCountPer;
          var cpqsDate = Alldata.date;
          var arr9 = [];
          var arr10 = [];
          for(var e = 0; e<cpqsAmPer.length;e++){
            var param1 = cpqsAmPer[e].split('%')[0];
            arr9.push(param1);
            var param2 = cpqsCotPer[e].split('%')[0];
            arr10.push(param2);
          }
          this.cpqsGetShape(arr9,arr10,cpqsDate);


        } else {
          message.error('登录失败，账号或密码错误');
        }
      });



    $('#bg').show();
    $('#content5').show();
    var bg_width = window.innerWidth;
    var bg_height = window.innerHeight;
    var content5_top=( window.innerHeight-$('#content5').height())/2; //计算弹出的框距离页面顶部的距离
    var content5_left=(window.innerWidth-$("#content5").width())/2;
    $('#bg').css({
      'width':bg_width,
      'height':bg_height
    });
    $('#content5').css({
      'top':content5_top,
      'left':content5_left
    });
  },

  getshape:function (a1,a2,a3,a4,a5){

    var myChart1 = echarts.init(document.getElementById('typeAnaly'));
    var maxdata = Math.max.apply(null,a1);
    var mindata = Math.min.apply(null,a1);
    var option1 = ({
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },


      visualMap: {
        show: false,
        min: mindata,
        max: maxdata,
        inRange: {
          colorLightness: [0.8, 0.6]
        }
      },
      series: [
        {
          name:'品类销售额占比',
          type:'pie',
          radius: ['65%', '85%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle:{
            normal:{
              color:'#00b0d9'
            }
          },
          data:[
            {name:a2[0],value:a1[0]},
            {name:a2[1],value:a1[1]},
            {name:a2[2],value:a1[2]},
            {name:a2[3],value:a1[3]},
            {name:a2[4],value:a1[4]},
            {name:a2[5],value:a1[5]},
            {name:a2[6],value:a1[6]},
            {name:a2[7],value:a1[7]},
            {name:a2[8],value:a1[8]},
            {name:a2[9],value:a1[9]},
            {name:a2[10],value:a1[10]}
          ]
        }
      ],

    });
    myChart1.setOption(option1);
    window.onresize = myChart1.resize;

    var myChart2 = echarts.init(document.getElementById('top_left'));
    var option2 = ({
      title:{
        text:'销售额占比排行（%）',
        left:'center',
        top:15,
        textStyle:{
          fontWeight:'normal',
          fontSize:14,
          color:'#ffffff'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: " {a}<br/>{b}:{c}%"
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
       show:false
      },
      yAxis: {
        type: 'category',
        axisTick:{
          show:false
        },
        axisLabel:{
          textStyle:{
            color:'#b1b1b1'
          }
        },
        axisLine:{
          lineStyle:{
            color:'#b1b1b1'
          }
        },
        data:a4
      },
      series: [
        {
          name:'销售额占比',
          type: 'bar',
          barWidth:18,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: 'rgb(0, 215, 255)'
              }, {
                offset: 1,
                color: 'rgba(0, 52, 161, 0)'
              }]),
              label: {
                show: true,
                position: 'right',
                formatter:'{c}%'
              }
            }
          },
          data:a3
        },
      ]
    });
    myChart2.setOption(option2);
    window.onresize = myChart2.resize;

    var myChart4 = echarts.init(document.getElementById('top_right'));
    var option4= ({
      title:{
        text:'较上周同期（%）',
        left:'center',
        top:15,
        textStyle:{
          fontWeight:'normal',
          fontSize:14,
          color:'#ffffff'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: " {a}<br/>{b}:{c}%"
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        show:false
      },
      yAxis: {
        type: 'category',
        axisLine:{
          lineStyle:{
            color:'#b1b1b1'
          }
        },
        axisTick:{
          show:false
        },
        axisLabel:{
          show:false
        },
        data:a4
      },
      series: [
        {
          name:'较上期同期',
          type: 'bar',
          barWidth:18,
          itemStyle: {
            normal: {
              color: function (params){
                var index_color = params.value;
                var colorList = [
                  new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: 'rgb(0, 215, 255)'
                  }, {
                    offset: 1,
                    color: 'rgba(0, 52, 161, 0)'
                  }]),
                  new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: 'rgba(243, 41, 53, 0)'
                  }, {
                    offset: 1,
                    color: 'rgb(235, 60, 53)'
                  }])
                ];
                if(index_color>=0){
                  return colorList[0];
                }else {
                  return colorList[1];
                }
              },
              label:{
                show: true,
                position: 'right',
                formatter:'{c}%'
              }

              }
          },
          data:a5
        },
      ],

    });
    myChart4.setOption(option4);
    window.onresize = myChart4.resize;

  },

  cpqsGetShape(a1,a2,a3){

    var myChart6 = echarts.init(document.getElementById('topDiv'));
    var option6 = ({
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        textStyle:{
          color:'#b1b1b1'
        },
        data:['销售额占比','销售笔数占比']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        },
        iconStyle:{
          normal:{
            borderColor:'#b1b1b1'
          },
          emphasis:{
            borderColor:'#4a9ff2'
          }
        }
      },
      xAxis: {
        type: 'category',
        margin:10,
        boundaryGap: false,
        axisTick:false,
        axisLine:{
          lineStyle:{
            color:'#b1b1b1'
          }
        },
        axisLabel:{
          textStyle:{
            color:'#b1b1b1'
          }
        },
        data: a3
      },
      yAxis: {
        type: 'value',
        margin:12,
        axisTick:false,
        axisLine:false,
        axisLabel:{
          formatter: '{value} %',
          textStyle:{
            color:'#b1b1b1'
          }
        }

      },
      series: [
        {
          name:'销售额占比',
          type:'line',
          symbol:'circle',
          symbolSize:8,
          itemStyle:{
            normal:{
              color:'#eb3c35'
            }
          },
          lineStyle:{
            normal:{
              color:'#eb3c35'
            }
          },
          data:a1
        },
        {
          name:'销售笔数占比',
          type:'line',
          symbol:'circle',
          symbolSize:6,
          itemStyle:{
            normal:{
              color:'#69b4ff'
            }
          },
          lineStyle:{
            normal:{
              color:'#69b4ff'
            }
          },
          data:a2
        },

      ]
    });
    myChart6.setOption(option6);
    window.onresize = myChart6.resize;
  },

  showBottom (a1,a2,a3) {

    $("#top").css("display","none");
    $("#bottom").css("display","block");
    $("#bottom_title").css( {"background-color":"#4b5357","color":"#ffffff","border-bottom":'none'});
    $("#top_title").css( {"background-color": "#424b4f","color":"#b1b1b1","border-bottom":'solid 1px #2f3638'});
    var myChart3 = echarts.init(document.getElementById('bottom_left'));
    var option3 = ({
      title:{
        text:'销售额占比排行（%）',
        left:'center',
        top:15,
        textStyle:{
          fontWeight:'normal',
          fontSize:14,
          color:'#ffffff'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: " {b}<br/>销售占比:{c}%"
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        show:false
      },
      yAxis: {
        type: 'category',
        axisTick:{
          show:false
        },
        axisLabel:{
          textStyle:{
            color:'#b1b1b1'
          }
        },
        axisLine:{
          lineStyle:{
            color:'#b1b1b1'
          }
        },
        data:a2
      },
      series: [
        {
          type: 'bar',
          barWidth:18,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                offset: 0,
                color: 'rgb(0, 215, 255)'
              }, {
                offset: 1,
                color: 'rgba(0, 52, 161, 0)'
              }]),
              label: {
                show: true,
                position: 'right',
                formatter:'{c}%'
              }
            }
          },
          data:a1
        },
      ]
    });
    myChart3.setOption(option3);
    window.onresize = myChart3.resize;

    var myChart5 = echarts.init(document.getElementById('bottom_right'));
    var option5= ({
      title:{
        text:'较上周同期（%）',
        left:'center',
        top:15,
        textStyle:{
          fontWeight:'normal',
          fontSize:14,
          color:'#ffffff'
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter:"{b}<br/>较上周同期:{c}%"
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        show:false
      },
      yAxis: {
        type: 'category',
        axisLine:{
          lineStyle:{
            color:'#b1b1b1'
          }
        },
        axisTick:{
          show:false
        },
        axisLabel:{
          show:false
        },
        data:a2
      },
      series: [
        {
          type: 'bar',
          barWidth:18,
          itemStyle: {
            normal: {
              color: function (params){
                var index_color = params.value;
                var colorList = [
                  new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: 'rgb(0, 215, 255)'
                  }, {
                    offset: 1,
                    color: 'rgba(0, 52, 161, 0)'
                  }]),
                  new echarts.graphic.LinearGradient(1, 0, 0, 0, [{
                    offset: 0,
                    color: 'rgba(243, 41, 53, 0)'
                  }, {
                    offset: 1,
                    color: 'rgb(235, 60, 53)'
                  }])
                ];
                if(index_color>=0){
                  return colorList[0];
                }else {
                  return colorList[1];
                }
              },
              label:{
                show: true,
                position: 'right',
                formatter:'{c}%'
              }

            }
          },
          data:a3
        },
      ],

    });
    myChart5.setOption(option5);
    window.onresize = myChart5.resize;
  },

  showTop () {
    $("#top").css("display","block");
    $("#bottom").css("display","none");
    $("#bottom_title").css( {"background-color":"#424b4f","color":"#b1b1b1","border-bottom":'solid 1px #2f3638'});
    $("#top_title").css( {"background-color": "#4b5357","color":"#ffffff","border-bottom":'none'});
  },

  showDiv(){
    $('#bg').show();
    $('#content5').show();
    var bg_width = window.innerWidth;
    var bg_height = window.innerHeight;
    var content5_top=( window.innerHeight-$('#content5').height())/2; //计算弹出的框距离页面顶部的距离
    var content5_left=(window.innerWidth-$("#content5").width())/2;
    $('#bg').css({
      'width':bg_width,
      'height':bg_height
    });
    $('#content5').css({
      'top':content5_top,
      'left':content5_left
    });
  },

  closeDiv(){
    $('#content5').hide();
    $('#bg').hide();
  },
  closeDiv2(){
    $('#content5').hide();
    $('#bg').hide();
  },

  //获取店铺详情
  getShop(){
    var data =  localStorage.getItem("shop-content");
    data = JSON.parse(data);
    console.log(data);
    this.setState({shopData:data.entityList});

    console.log(this.state.shopData)

  },

  //获取某年某月有多少天
  getDaysInOneMonth(year, month){
    month = parseInt(month, 10);
    var d= new Date(year, month, 0);
    return d.getDate();
  },

  //显示时间
  showDate(a){


    var data =  localStorage.getItem("shop-content");
    data = JSON.parse(data);

    var shopId = [];
    if(this.state.shopSelect.length==0){
      shopId= data.entityId
    }else if(this.state.shopSelect=='全部门店'){
      shopId = data.entityId
    }else {
      shopId = this.state.shopSelect
    }

    var myDate = new Date();
    if (a == 'thisWeek' && myDate.getDay() == 1) {
      message.warning("本周暂无数据");
    } else if (a == 'thisMonth' && myDate.getDate() == 1) {
      message.warning("本月暂无数据");
    }


    var now = new Date(); //当前日期
    var nowDayOfWeek = now.getDay(); //今天本周的第几天
    var nowDay = now.getDate(); //当前日
    var nowMonth = now.getMonth()+1; //当前月
    nowMonth =(nowMonth<10 ? "0"+nowMonth:nowMonth);
    var nowYear = now.getFullYear(); //当前年

    //昨天
    var date = nowYear+'/'+nowMonth+'/'+(nowDay -1);
    //本周开始日期
    var thisWeekStart = nowYear+'/'+nowMonth+'/'+ (nowDay - nowDayOfWeek + 1);
    //上周开始日期
    var lastWeekStart = nowYear+'/'+nowMonth+'/'+ (nowDay - nowDayOfWeek - 6);
    //上周结束日期
    var lastWeekEnd = nowYear+'/'+nowMonth+'/'+ (nowDay - nowDayOfWeek);
    //本月开始日期（1号）
    var thisMonthStart = nowYear+'/'+nowMonth+'/'+ '1';

    //上月开始日期（1号）
    if(nowMonth-1<10){
      var lastMonthStart = nowYear+'/0'+(nowMonth-1)+'/'+ '1';
    }else{
      var lastMonthStart = nowYear+'/'+(nowMonth-1)+'/'+ '1';
    }


    //上月天数
    var lastMonthDays = this.getDaysInOneMonth(nowYear,nowMonth-1);
    //上月结束日期
    if(nowMonth-1<10){
      var lastMonthEnd = nowYear+'/0'+(nowMonth-1)+'/'+ lastMonthDays;
    }else{
      var lastMonthEnd = nowYear+'/'+(nowMonth-1)+'/'+ lastMonthDays;
    }


    if(a == 'thisWeek'){
      this.setState({startDay:thisWeekStart});
      this.setState({endDay:date});
      var sd = thisWeekStart.replace(/\//g,'');
      var ed = date.replace(/\//g,'');
      this.selectAll(sd,ed,shopId);
    }else if(a == 'lastWeek'){
      this.setState({startDay:lastWeekStart});
      this.setState({endDay:lastWeekEnd});
      sd = lastWeekStart.replace(/\//g,'');
      ed = lastWeekEnd.replace(/\//g,'');
      this.selectAll(sd,ed,shopId);
    }else if(a == 'thisMonth'){
      this.setState({startDay:thisMonthStart});
      this.setState({endDay:date});
      sd = thisMonthStart.replace(/\//g,'');
      ed = date.replace(/\//g,'');
      this.selectAll(sd,ed,shopId);
    }else if(a == 'lastMonth'){
      this.setState({startDay:lastMonthStart});
      this.setState({endDay:lastMonthEnd});
      sd = lastMonthStart.replace(/\//g,'');
      ed = lastMonthEnd.replace(/\//g,'');
      this.selectAll(sd,ed,shopId);
    }else if(a == "custom"){
      //this.showCalendar();
    } else if(a == '0'){

      this.setState({startDay:lastWeekStart});
      this.setState({endDay:lastWeekEnd});
      sd = lastWeekStart.replace(/\//g,'');
      ed = lastWeekEnd.replace(/\//g,'');
      this.selectAll(sd,ed,shopId);

    }

  },

  clickshop(value){

    var data =  localStorage.getItem("shop-content");
    data = JSON.parse(data);

    var e;
    if(value=="全部门店"){
      e = data.entityId;
    }else{
      e = [value]
    }


    this.setState({shopSelect:e})

    var sd = this.state.startDay.replace(/\//g,'');
    var ed = this.state.endDay.replace(/\//g,'');

    this.selectAll(sd,ed,e);



  },

  componentDidMount() {
    this.showDate('0');
    $(window).scrollTop(0);
    this.getShop();
  },

  render: function() {
    return (

          <div className={styles.productAnaly}>
            <BackTop className={styles.backTop}/>
            <div className={styles.title}>
              <span className={styles.title_span}>产品分析</span>
              <div className={styles.span_choose}>
                <span className={styles.choose1}>门店选择：</span>
                <Select  key='1' showSearch optionFilterProp="children" defaultValue="全部门店" className={styles.select1} onSelect={this.clickshop} >
                  <Select.Option value="全部门店">全部门店</Select.Option>

                  {
                    this.state.shopData.map(function (newdata) {
                      return(

                        <Select.Option key={newdata.entityId} value={newdata.entityId}>{newdata.entityName}</Select.Option>

                      )
                    })
                  }

                </Select>
                <span className={styles.choose2}>时间：</span>
                <Select  showSearch optionFilterProp="children" defaultValue="lastWeek"  onSelect={this.showDate} onChange={this.checkDate} className={styles.select2}  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                  <Select.Option value="thisWeek">本周</Select.Option>
                  <Select.Option value="lastWeek">上周</Select.Option>
                  <Select.Option value="thisMonth">本月</Select.Option>
                  <Select.Option value="lastMonth">上月</Select.Option>
                  <Select.Option value="custom">自定义</Select.Option>
                </Select>
                <span className={styles.showDateRange}>( {this.state.startDay} ~ {this.state.endDay} )</span>
              </div>
            </div>

            <div className={styles.content1}>
              <Row gutter={40}>
                <Col  span={8}>
                  <div className={styles.sale}>
                    <div className={styles.img1}>
                      <img src={analy1}/>
                      <span></span>
                    </div>
                    <div className={styles.img1_content}>
                      <p className={styles.p1}>{this.state.kMenuCount}</p>
                      <p>品类数</p>
                    </div>
                  </div>
                </Col>
                <Col  span={8}>
                  <div className={styles.sale}>
                    <div className={styles.img1}>
                      <img src={analy2}/>
                      <span></span>
                    </div>
                    <div className={styles.img1_content}>
                      <p className={styles.p1}>{this.state.mCount}</p>
                      <p>产品数</p>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div className={styles.sale}>
                    <div className={styles.img1}>
                      <img src={analy3}/>
                      <span></span>
                    </div>
                    <div className={styles.img1_content}>
                      <p className={styles.p1}>{this.state.sAvgMenuCount}</p>
                      <p>单均品种数</p>
                    </div>
                  </div>
                </Col>

              </Row>
            </div>

            <div className={styles.content2}>
              <p>品类分析</p>
                <Row>
                  <Col span={9}>
                    <div className={styles.typeAnaly} id="typeAnaly"></div>
                  </Col>
                  <Col span={1}>
                    <ul className={styles.content2_ul}>
                      <li><img src={color1}/></li>
                      <li><img src={color2}/></li>
                      <li><img src={color3}/></li>
                      <li><img src={color4}/></li>
                    </ul>
                  </Col>
                  <Col span={14}>
                    <div className={styles.typeContent}>
                      <Row className={styles.content2_row}>
                        <Col span={4} className={styles.analytext}>品类名称</Col>
                        <Col span={5} className={styles.analytext}>销售额（元）</Col>
                        <Col span={4} className={styles.analytext}>品种数</Col>
                        <Col span={4} className={styles.analytext}>销售额占比</Col>
                        <Col span={4} className={styles.analytext}>较上周同期</Col>
                      </Row>
                      {
                        this.state.kMenuList.map(function (newdata) {
                          return(
                            <ol key={newdata.rank}>
                              <div>
                                <Row className={styles.content2_row}>
                                  <Col span={4} className={styles.analytext}>{newdata.name}</Col>
                                  <Col span={5}>{newdata.amount}</Col>
                                  <Col span={3}>{newdata.count}</Col>
                                  <Col span={4}>{newdata.per}</Col>
                                  <Col span={5} className={newdata.rate.indexOf("-")==0 ? styles.minusNum:styles.plusNum}>{newdata.rate}</Col>
                                </Row>
                              </div>
                            </ol>
                          )
                        })
                      }

                    </div>

                  </Col>
                </Row>
            </div>

            <div className={styles.content3}>
              <div className={styles.content3_title}>
                <a onClick={this.showTop} className={styles.top_title} id="top_title">人气热销榜</a>
                <a onClick={()=>{this.showBottom((this.state.param1),(this.state.param2),(this.state.param3))}} className={styles.bottom_title} id="bottom_title">打酱油榜</a>
              </div>
              <div className={styles.top} id="top">
                <div className={styles.top_left} id="top_left"></div>
                <div className={styles.top_right} id="top_right"></div>
              </div>
              <div className={styles.bottom} id="bottom">
                <div className={styles.top_left} id="bottom_left"></div>
                <div className={styles.top_right} id="bottom_right"></div>
              </div>
            </div>

            <div className={styles.content4}>
              <p>商品排行情况</p>
              <Row className={styles.content4_row_title}>
                <Col span={4} className={styles.content4_col}>排名</Col>
                <Col span={4} className={styles.content4_col}>商品名称</Col>
                <Col span={4} className={styles.content4_col}>销售额（元）</Col>
                <Col span={4} className={styles.content4_col}>销售笔数</Col>
                <Col span={4} className={styles.content4_col}>销售额较上周同期</Col>
                <Col span={4}>操作</Col>
              </Row>
              {
                this.state.mList.map(function (newdata) {
                  return(
                    <ol className={styles.checkColor} key={newdata.rank}>
                      <div>
                        <Row className={styles.content4_row_odd}>
                          <Col span={4} className={styles.analytext}>{newdata.rank}</Col>
                          <Col span={4} className={styles.analytext1}>{newdata.name}</Col>
                          <Col span={4} className={styles.analytext1}>{newdata.amount}</Col>
                          <Col span={4} className={styles.analytext1}>{newdata.count}</Col>
                          <Col span={4}  className={newdata.rate.indexOf("-")==0 ? styles.minusNum:styles.plusNum}>{newdata.rate}</Col>
                          <Col span={4} onClick={this.selectTrend.bind(this,newdata.name)}><a>产品趋势</a></Col>
                        </Row>
                      </div>
                    </ol>
                  )
                }.bind(this))
              }
            </div>

            <div className={styles.bg} id="bg" onClick={this.closeDiv2}></div>
            <div className={styles.content5} id="content5">
              <p>{this.state.cpqsName}销售趋势<Icon type="close" className={styles.closeDiv} onClick={this.closeDiv}/></p>
              <div className={styles.topDiv} id="topDiv">

              </div>
            </div>
          </div>

    )
  }

});

export default Home;
