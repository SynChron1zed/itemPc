/**
 * Created by lenovo on 2017-03-14.
 */
import React from 'react';
import { connect } from 'dva';
import fetch from 'dva/fetch';
import { Link } from 'dva/router';
import styles from './Process.css';
import { Select,Row,Col,DatePicker,BackTop,Icon,message } from 'antd';
const Option = Select.Option;
import echarts from 'echarts';
import $ from 'jquery';
import process1 from '../assets/image/process_1.png';
import process2 from '../assets/image/process_2.png';
import process3 from '../assets/image/process_3.png';
import process4 from '../assets/image/process_4.png';
import process5 from '../assets/image/process_5.png';
import process6 from '../assets/image/process_6.png';
import process7 from '../assets/image/process_7.png';
import process8 from '../assets/image/process_8.png';
import process9 from '../assets/image/process_9.png';
import top from '../assets/image/top.png';
import drop from '../assets/image/drop.png';
import top1 from '../assets/image/top1.png';
import drop1 from '../assets/image/drop1.png';
import color1 from '../assets/image/color_1.png';
import color2 from '../assets/image/color_2.png';
import color3 from '../assets/image/color_3.png';
import color4 from '../assets/image/color_4.png';
const { RangePicker } = DatePicker;
import moment from 'moment';

import createReactClass from 'create-react-class';
import { post } from '../utils/request';


var Home = createReactClass({

  getInitialState: function () {
    return {
      AllData:[],
      startDay:'开始时间',
      endDay:'结束时间',
      avgOrderCount:[],
      avgOrderPrice:[],
      storeAmount:[],
      totalSale:[],
      storeSaleTrend:[],
      xData:[],
      yData:[],
      storeAmountPer:[],
      storeOrderPricePer:[],
      payAlyList:[],
      shopData:['全部门店'],
      shopSelect:[]
    }
  },

  //查询所有
  selectAll(d1,d2,shopId){


    post('/jylc', {

      'entityId':shopId,
      'bDate':d1,
      'eDate':d2

    })

      .then((res) => {

        if (res) {

          console.info(res);
          var Alldata =res.data;
          this.setState({AllData:Alldata});
          this.setState({avgOrderCount:Alldata.avgOrderCount});
          this.setState({avgOrderPrice:Alldata.avgOrderPrice});
          this.setState({storeAmount:Alldata.storeAmount});
          this.setState({totalSale:Alldata.totalSale});
          this.setState({storeSaleTrend:Alldata.storeSaleTrend});
          this.setState({payAlyList:Alldata.payAnalysisList});
          this.setState({xData:Alldata.x});
          this.setState({yData:Alldata.y});
          this.setState({storeAmountPer:Alldata.storeAmountPer});
          this.setState({storeOrderPricePer:Alldata.storeOrderPricePer});
          var a = Alldata.storeAmountPer;
          var arr1 = [];
          var arr2 = [];
          for( var i = 0;i< a.length;i++){
            arr1.push(Alldata.storeAmountPer[i].count);
            //arr2.push(Alldata.storeAmountPer[i].min);
            arr2.push(Alldata.storeOrderPricePer[i].count);
          }

          this.getshape(arr1,arr2);

        } else {
          message.error('数据错误！');
        }
      });



  },

  //Echarts
  getshape:function (a1,a2) {
      //门店销售额趋势
    var myChart1 = echarts.init(document.getElementById('sale_line'));
    var data1 = this.state.yData;
    var data2 = this.state.xData;
    var maxdataY = Math.max.apply(null,data1);
    var mindataY = Math.min.apply(null,data1);
    var maxIndexX = data1.indexOf(Math.max.apply(Math, data1));
    var minIndexX = data1.indexOf(Math.min.apply(Math, data1));
    //var maxValueX = data2[maxIndexX];
    //var minValueX = data2[minIndexX];

    var option1 = ({
        tooltip : {
          /*trigger: 'axis',*/
        },
        toolbox: {
          right:30,
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
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
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
                color: function (value, index) {
                  return value >= 0 ? '#b1b1b1' : '#eb3c35';
                }
              },
              margin:12
            },
            data :data2

          }
        ],
        yAxis : [
          {
            type : 'value',
            axisTick:false,
            axisLine:false,
            splitLine:{
              lineStyle:{
                color:'#b1b1b1'
              }
            },
            axisLabel:{
              textStyle:{
                color:'#b1b1b1'
              },
              margin:12
            }

          }
        ],
        series : [
          {
            name:'销售额',
            type:'line',
            itemStyle: {
              normal: {
                color: function (param) {
                  var name = param.name;
                  if (name == '周六' || name == "周日") {
                    return '#eb3c35';
                  } else {
                    return '#ffffff';
                  }
                }
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
            data:data1,
          },
          {
            name: '销售额(最大值)',
            type: 'effectScatter',
            data:[
              [maxIndexX,maxdataY]
            ],
            itemStyle:{
              normal:{
                color:'#faf529'
              }
            },
            label:{
              normal:{
                show:true,
                position:'top',
                offset:[0,-10]
              }
            }
          },
          {
            name: '销售额(最小值)',
            type: 'effectScatter',
            data:[
              [minIndexX,mindataY]
            ],
            itemStyle:{
              normal:{
                color:'#faf529'
              }
            },
            label:{
              normal:{
                show:true,
                position:'top',
                offset:[0,-10]
              }
            }
          }
        ]
      });
    myChart1.setOption(option1);
    window.onresize = myChart1.resize;



    //单店营收区间占比
    var myChart2 = echarts.init(document.getElementById('rescueOccupy'));
    var data3 = a1;
    var option2 = ({
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name:'单店营收区间占比',
          type:'pie',
          radius: ['45%', '58%'],
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
          data:data3
        }
      ],
      color:[ '#00b0d9','#2dc1e8','#54cef3','#83e3ff']
    });
    myChart2.setOption(option2);
    window.onresize = myChart2.resize;

    //客单价区间占比
    var myChart3 = echarts.init(document.getElementById('priceOccupy'));
    var data4 = a2;
    var option3 = ({
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      series: [
        {
          name:'单店营收区间占比',
          type:'pie',
          radius: ['45%', '58%'],
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
          data:data4
        }
      ],
      color:[ '#00b0d9','#2dc1e8','#54cef3','#83e3ff']
    });
    myChart3.setOption(option3);
    window.onresize = myChart3.resize;

    //支付分析
    var myChart4 = echarts.init(document.getElementById('payAnaly'));
    var option4 =({
      tooltip: {
        textStyle:{
          color:'#a2a4a5'
        }
      },
      legend: {
        show:false,
        data: ['几大收银APP占比']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '支付宝', max: 35000},
          { name: '微信支付', max: 35000},
          { name: '现金', max: 35000},
          { name: '外卖', max: 35000},
          { name: '其他', max: 35000},
        ],
      },
      series: [{
        type: 'radar',
        lineStyle:{
          normal:{
            color:'#00b0d9'
          }
        },
        itemStyle:{
          normal:{
            color:'#00b0d9'
          }
        },
        data : [
          {
            value : [30000, 16000, 8000, 6000, 5000],
            name : '几大收银APP占比'
          }
        ]
      }]
    });
    myChart4.setOption(option4);
    window.onresize = myChart4.resize;
  },



  //检测选项有无数据
  checkDate(a){

  },

  top1(){
    $("#img_top").attr("src","{top1}");
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

    $(window).scrollTop(0);
    this.getshape();
    this.showDate('0');
    this.getShop();
  },

  //获取店铺详情
  getShop(){
    var data =  localStorage.getItem("shop-content");
    data = JSON.parse(data);
    console.log(data);
    this.setState({shopData:data.entityList});

    console.log(this.state.shopData)

  },

  render: function() {
    return (

        <div className={styles.process}>
          <BackTop className={styles.backTop}/>
          <div className={styles.title}>
            <span className={styles.title_span}>经营历程</span>
            <div className={styles.span_choose}>
              <span className={styles.choose1}>门店选择：</span>
              <Select  key='1' showSearch optionFilterProp="children" defaultValue="全部门店" className={styles.select1} onSelect={this.clickshop} >
                <Option value="全部门店">全部门店</Option>

                {
                  this.state.shopData.map(function (newdata) {
                    return(

                      <Option key={newdata.entityId} value={newdata.entityId}>{newdata.entityName}</Option>

                    )
                  })
                }

              </Select>
              <span className={styles.choose2}>时间：</span>
              <Select showSearch optionFilterProp="children" defaultValue="lastWeek"  onSelect={this.showDate} onChange={this.checkDate} className={styles.select2}  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                <Option value="thisWeek">本周</Option>
                <Option value="lastWeek">上周</Option>
                <Option value="thisMonth">本月</Option>
                <Option value="lastMonth">上月</Option>
                <Option value="custom">自定义</Option>
              </Select>
              <span className={styles.showDateRange}>( {this.state.startDay} ~ {this.state.endDay} )</span>

            </div>
          </div>

          <div className={styles.content1}>
            <Row gutter={30}>
              <Col  span={6}>
                <div className={styles.sale}>
                  <div className={styles.img1}>
                    <img src={process1}/>
                    <span></span>
                  </div>
                  <div className={styles.img1_content}>
                    <p className={styles.p1}>{this.state.totalSale}</p>
                    <p className={styles.p2}>销售额（元）</p>
                  </div>
                </div>
              </Col>
              <Col  span={6}>
                <div className={styles.sale}>
                  <div className={styles.img1}>
                    <img src={process2}/>
                    <span></span>
                  </div>
                  <div className={styles.img1_content}>
                    <p className={styles.p1}>{this.state.avgOrderCount}</p>
                    <p>平均客单量</p>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.sale}>
                  <div className={styles.img1}>
                    <img src={process3}/>
                    <span></span>
                  </div>
                  <div className={styles.img1_content}>
                    <p className={styles.p1}>{this.state.avgOrderPrice}</p>
                    <p>平均客单价（元）</p>
                  </div>
                </div>
              </Col>
              <Col span={6}>
                <div className={styles.sale}>
                  <div className={styles.img1}>
                    <img src={process4}/>
                    <span></span>
                  </div>
                  <div className={styles.img1_content}>
                    <p className={styles.p1}>{this.state.storeAmount}</p>
                    <p>单店营收</p>
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className={styles.content2}>
            <p>门店销售额趋势</p>
              <div className={styles.sale_line} id="sale_line">

              </div>
          </div>

          <div className={styles.content3}>
            <Row className={styles.content3_row_title}>
              <Col span={5} className={styles.content3_col}>
                日期
                  <img src={top1} className={styles.img_top} id="img_top" onClick={this.top1}/>
                  <img src={drop} className={styles.img_drop} id="img_drop" onClick={this.drop1}/>
              </Col>
              <Col span={3} className={styles.content3_col}>销售额（元）</Col>
              <Col span={3} className={styles.content3_col}>较上周同期</Col>
              <Col span={3} className={styles.content3_col}>客单量</Col>
              <Col span={3} className={styles.content3_col}>较上周同期</Col>
              <Col span={3} className={styles.content3_col}>客单价（元）</Col>
              <Col span={4}>较上周同期</Col>
            </Row>

            {
              this.state.storeSaleTrend.map(function (newdata) {
                return(
                <ol className={styles.checkColor} key={newdata.index}>
                  <div>
                    <Row className={styles.content3_row_odd}>
                      <Col span={5} className={newdata.dayOfWeek == '周六' ||  newdata.dayOfWeek == '周日' ? styles.minusNum:styles.content3_col_time} id="content3_date" >{newdata.date}（{newdata.dayOfWeek}）</Col>
                      <Col  span={3} className={styles.textcolor}>{newdata.sale}</Col>
                      <Col   span={3} className={newdata.saleRate.indexOf("-")==0 ? styles.minusNum:styles.plusNum}>{newdata.saleRate}</Col>
                      <Col  span={3} className={styles.textcolor}>{newdata.orderCount}</Col>
                      <Col  span={3} className={newdata.orderCountRate.indexOf("-")==0 ? styles.minusNum:styles.plusNum}>{newdata.orderCountRate}</Col>
                      <Col   span={3} className={styles.textcolor}>{newdata.orderPrice}</Col>
                      <Col   span={4} className={newdata.orderPriceRate.indexOf("-")==0 ? styles.minusNum:styles.plusNum}>{newdata.orderPriceRate}</Col>
                    </Row>
                  </div>
                </ol>
                )
              })
            }
            {/*  <Icon type="caret-down" onClick={this.showRest}/>  */}
          </div>

          <div className={styles.content4}>
            <Row gutter={16}>
              <Col  span={12}>
                <div className={styles.content4_1}>
                  <p>门店区间占比分析——单店营收（元）区间占比</p>
                  <div className={styles.rescueOccupy} id="rescueOccupy"></div>
                  <div className={styles.colorDiv}>
                    <ul>
                      <li><img src={color1}/></li>
                      <li><img src={color2}/></li>
                      <li><img src={color3}/></li>
                      <li><img src={color4}/></li>
                    </ul>
                  </div>
                  <div className={styles.rescueTable}>
                    <Row className={styles.content4_1_row}>
                      <Col span={10}>区间范围（元）</Col>
                      <Col span={7}>门店数</Col>
                      <Col span={7}>占比</Col>
                    </Row>

                    {
                      this.state.storeAmountPer.map(function (newdata) {
                        return(
                          <div  key={newdata.index}>
                            <Row className={styles.content4_1_row}>
                              <Col span={10}>{newdata.min}-{newdata.max}</Col>
                              <Col span={7} className={styles.textcolor}>{newdata.count}</Col>
                              <Col span={7} className={styles.textcolor}>{newdata.per}</Col>
                            </Row>
                          </div>
                        )
                      })
                    }

                  </div>
                </div>
              </Col>
              <Col  span={12}>
                <div className={styles.content4_2}>
                  <p>门店区间占比分析——客单价（元）区间占比</p>
                  <div className={styles.priceOccupy} id="priceOccupy"></div>
                  <div className={styles.colorDiv}>
                    <ul>
                      <li><img src={color1}/></li>
                      <li><img src={color2}/></li>
                      <li><img src={color3}/></li>
                      <li><img src={color4}/></li>
                    </ul>
                  </div>
                  <div className={styles.priceTable}>
                    <Row className={styles.content4_1_row}>
                      <Col span={10}>区间范围（元）</Col>
                      <Col span={7}>门店数</Col>
                      <Col span={7}>占比</Col>
                    </Row>
                    {
                      this.state.storeOrderPricePer.map(function (newdata) {
                        return(
                          <div   key={newdata.index}>
                            <Row  className={styles.content4_1_row}>
                              <Col  span={10}>{newdata.min}-{newdata.max}</Col>
                              <Col  span={7} className={styles.textcolor}>{newdata.count}</Col>
                              <Col span={7} className={styles.textcolor}>{newdata.per}</Col>
                            </Row>
                          </div>
                        )
                      })
                    }

                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <div className={styles.content5}>
            <p>支付分析</p>
            <Row className={styles.content5_row1}>
              <Col span={12}>
                <div className={styles.payAnaly} id="payAnaly"></div>
              </Col>
              <Col span={12}>
                <div className={styles.payTable}>
                  <Row className={styles.content5_row_title}>
                    <Col span={4}>&nbsp;</Col>
                    <Col span={7}>金额（元）</Col>
                    <Col span={6}>占比</Col>
                    <Col span={6}>较上周同期</Col>
                  </Row>
                  {
                    this.state.payAlyList.map(function (newdata) {
                      var imgsrc;
                      if(newdata.payKindName=='现金'){
                        imgsrc = process5
                      }else if(newdata.payKindName=='[支付宝]'){
                        imgsrc = process7
                      }else if(newdata.payKindName=='[微信]'){
                        imgsrc = process6
                      }else if(newdata.payKindName=='[QQ钱包]'){
                        imgsrc = process1
                      }else if(newdata.payKindName=='美团外卖'){
                        imgsrc = process9
                      }else if(newdata.payKindName=='储值卡'){
                        imgsrc = process8
                      }
                      return(
                          <div key={newdata.rank}>
                            <Row className={styles.content5_row}>
                              <Col span={4} className={styles.content5_col} ><img src={imgsrc} className={styles.content5_img}/>{newdata.payKindName}</Col>
                              <Col span={7}>{newdata.payAmount}</Col>
                              <Col span={6}>{newdata.per}</Col>
                              <Col span={6} className={newdata.rate.indexOf("-")==0 ? styles.minusNum:styles.plusNum}>{newdata.rate}</Col>
                            </Row>
                          </div>
                      )
                    })
                  }

                </div>
              </Col>
            </Row>
          </div>

        </div>

    )
  }

});

export default Home;
