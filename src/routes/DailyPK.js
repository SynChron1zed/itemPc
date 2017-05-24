/**
 * Created by lenovo on 2017-03-14.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './DailyPK.css';
import { Select,Row,Col,BackTop } from 'antd';
import echarts from 'echarts';
import $ from 'jquery';

import createReactClass from 'create-react-class';
import { post } from '../utils/request';



var Home = createReactClass({

  getInitialState: function () {
    return {
      AllData:[],
      amAscCount:[],
      amDescCount:[],
      amRateAsc:[],
      amRateDesc:[],
      ordCtAscCount:[],
      ordCtDescCount:[],
      ordCtRateAsc:[],
      ordCtRateDesc:[],
      ordPrcAscCount:[],
      ordPrcDescCount:[],
      ordPrcRateAsc:[],
      ordPrcRateDesc:[],
      xData:[],
      yData:[],
      saleTrendList:[],
      week:1,
      cWeek:'周一',
      param1:[],
      param2:[],





      shopData:['全部门店'],
      shopSelect:[],
      selectK:['客单量'],
      kdDate:[],
      kdPer:[],
      kdDateAdd:[],
      kdPerAdd:[],



    }
  },

  //查询所有
  selectAll(i,i2,e){



    post('/ttpk', {
      entityId:e,
      week:i

    })

      .then((res) => {

        if (res) {
          var Alldata =res.data;
          this.setState({AllData:Alldata});


          this.setState({amAscCount:Alldata.amountAscCount});
          this.setState({amDescCount:Alldata.amountDescCount});
          this.setState({amRateAsc:Alldata.amountRateAsc});
          this.setState({amRateDesc:Alldata.amountRateDesc});






          this.setState({xData:Alldata.x.reverse()});
          this.setState({yData:Alldata.y.reverse()});
          this.setState({saleTrendList:Alldata.allWeekSaleTrendList.reverse()});
          var a = Alldata.allWeekSaleTrendList;
          var arr1 = [];
          var arr2 = [];
          for( var i = 0;i< a.length;i++){
            arr1.push(Alldata.allWeekSaleTrendList[i].orderCount);
            arr2.push(Alldata.allWeekSaleTrendList[i].orderPrice);
          }


          if(i2==1){//客单量
            this.setState({kdDate:Alldata.orderCountDescCount});
            this.setState({kdPer:Alldata.orderCountRateDesc});

            this.setState({kdDateAdd:Alldata.orderCountAscCount});
            this.setState({kdPerAdd:Alldata.orderCountRateAsc});

            this.getshape(i2,arr1);

          }else{//客单价
            this.setState({kdDate:Alldata.orderPriceDescCount});
            this.setState({kdPer:Alldata.orderPriceRateDesc});

            this.setState({kdDateAdd:Alldata.orderPriceAscCount});
            this.setState({kdPerAdd:Alldata.orderPriceRateAsc});

            this.getshape(i2,arr2);
          }



        } else {
          message.error('数据错误！');
        }
      });


  },

  add(){
  },

  chooseWeek(e){



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



    let week = e;
   if(week == 1){
     this.selectAll(1,1,shopId);
     this.setState({cWeek:'周一'});
     $("#li1").addClass(styles.li_focus).siblings().removeClass(styles.li_focus);
   }else if(week == 2){
     this.selectAll(2,1,shopId);
     this.setState({cWeek:'周二'});
     $("#li2").addClass(styles.li_focus).siblings().removeClass(styles.li_focus);
   }else if(week == 3){
     this.selectAll(3,1,shopId);
     this.setState({cWeek:'周三'});
     $("#li3").addClass(styles.li_focus).siblings().removeClass(styles.li_focus);
   }else if(week == 4){
     this.selectAll(4,1,shopId);
     this.setState({cWeek:'周四'});
     $("#li4").addClass(styles.li_focus).siblings().removeClass(styles.li_focus);
   }else if(week == 5){
     this.selectAll(5,1,shopId);
     this.setState({cWeek:'周五'});
     $("#li5").addClass(styles.li_focus).siblings().removeClass(styles.li_focus);
   }else if(week == 6){
     this.selectAll(6,1,shopId);
     this.setState({cWeek:'周六'});
     $("#li6").addClass(styles.li_focus).siblings().removeClass(styles.li_focus);
   }else if(week == 7){
     this.selectAll(0,1,shopId);
     this.setState({cWeek:'周日'});
     $("#li7").addClass(styles.li_focus).siblings().removeClass(styles.li_focus);
   }else{

   }

  },

  chooseCount(e){


    var i1;
    var i2;

    if(this.state.cWeek=='周一'){
      i1 =1
    }else if(this.state.cWeek=='周二'){
      i1 =2
    }else if(this.state.cWeek=='周三'){
      i1 =3
    }else if(this.state.cWeek=='周四'){
      i1 =4
    }else if(this.state.cWeek=='周五'){
      i1 =5
    }else if(this.state.cWeek=='周六'){
      i1 =6
    }else if(this.state.cWeek=='周日'){
      i1 =0
    }


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


    if(e==1){
      $("#li_count").addClass(styles.li_focus).siblings().removeClass(styles.li_focus);
      this.setState({selectK:'客单量'});
      this.selectAll(i1,1,shopId);

    }else{
      $("#li_price").addClass(styles.li_focus).siblings().removeClass(styles.li_focus);
      this.setState({selectK:'客单价'});
      this.selectAll(i1,2,shopId);
    }


  },

 /* choosePrice(i,a2){
    $("#count").css('display','none');
    $("#price").css('display','block');
    $("#saleTrend2").css('display','block');
    $("#saleTrend1").css('display','none');
    $("#li_price").addClass(styles.li_focus).siblings().removeClass(styles.li_focus);
    var data3 = this.state.xData;
    var data4 = this.state.yData;
    console.log(data3);
    var myChart2 = echarts.init(document.getElementById('saleTrend2'));
    var option2 = ({
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
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
      legend: {
        textStyle:{
          color:'#b1b1b1'
        },
        data:['销售额','客单价']
      },
      xAxis: [
        {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel:{
            textStyle:{
              color:'#b1b1b1'
            },
            margin:12
          },
          data: data3
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '销售额',
          nameTextStyle:{
            color:'#b1b1b1'
          },

          splitLine: {
            lineStyle: {
              color:'#b1b1b1'
            }
          },
          axisLabel:{
            formatter: '{value}',
            textStyle:{
              color:'#b1b1b1'
            },
            margin:12
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
        },
        {
          type: 'value',
          name: '客单价',
          nameTextStyle:{
            color:'#b1b1b1'
          },

          axisLabel:{
            formatter: '{value}',
            textStyle:{
              color:'#b1b1b1'
            },
            margin:12
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show:false
          },

        }
      ],
      series: [
        {
          name:'销售额',
          type:'bar',
          barWidth:30,
          itemStyle: {
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
          data:data4
        },
        {
          name:'客单价',
          type:'line',
          itemStyle: {
            normal: {
              color:'#4788c8',
              borderColor: '#4788c8'
            }
          },
          symbolSize:8,
          yAxisIndex: 1,
          data:a2
        }
      ]
    });
    myChart2.setOption(option2);
    window.onresize = myChart2.resize;
  },*/

  getshape:function (i,a1){

    var kd ;
    if(i==1){
      kd='客单量'
    }else{
      kd='客单价'
    }

    var data1 = this.state.xData;
    var data2 = this.state.yData;
    var myChart1 = echarts.init(document.getElementById('saleTrend1'));
    var option1 = ({
      tooltip: {
        trigger: 'axis'
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
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
      legend: {
        textStyle:{
          color:'#b1b1b1'
        },
        data:['销售额',kd]
      },
      xAxis: [
        {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel:{
            textStyle:{
              color:'#b1b1b1'
            },
            margin:12
          },
          data: data1
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '销售额',
          nameTextStyle:{
            color:'#b1b1b1'
          },

          splitLine: {
            lineStyle: {
              color:'#b1b1b1'
            }
          },
          axisLabel:{
            formatter: '{value}',
            textStyle:{
              color:'#b1b1b1'
            },
            margin:12
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
        },
        {
          type: 'value',
          name: kd,
          nameTextStyle:{
            color:'#b1b1b1'
          },

          axisLabel:{
            formatter: '{value}',
            textStyle:{
              color:'#b1b1b1'
            },
            margin:12
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show:false
          },
        }

      ],
      series: [
        {
          name:'销售额',
          type:'bar',
          barWidth:30,
          itemStyle: {
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
          data:data2
        },
        {
          name:kd,
          type:'line',
          itemStyle: {
            normal: {
              color:'#4788c8',
              borderColor: '#4788c8'
            }
          },
          symbolSize:8,
          yAxisIndex: 1,
          data:a1
        },
      ]
    });
    myChart1.setOption(option1);
    window.onresize = myChart1.resize;
  },

  //获取店铺详情
  getShop(){
    var data =  localStorage.getItem("shop-content");
    data = JSON.parse(data);
    console.log(data);
    this.setState({shopData:data.entityList});
    console.log(this.state.shopData)

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

    this.setState({shopSelect:e});

    var i1;
    var i2;

    if(this.state.cWeek=='周一'){
      i1 =1
    }else if(this.state.cWeek=='周二'){
      i1 =2
    }else if(this.state.cWeek=='周三'){
      i1 =3
    }else if(this.state.cWeek=='周四'){
      i1 =4
    }else if(this.state.cWeek=='周五'){
      i1 =5
    }else if(this.state.cWeek=='周六'){
      i1 =6
    }else if(this.state.cWeek=='周日'){
      i1 =0
    }

    this.selectAll(i1,i2,e);

  },


  componentDidMount() {
    this.chooseWeek(1);
    $(window).scrollTop(0);
    $("#li1").addClass(styles.li_focus);
    $("#li_count").addClass(styles.li_focus);
    this.getShop();
  },

  render: function() {
    return (

        <div className={styles.dailyPK}>
          <BackTop className={styles.backTop}/>
          <div className={styles.title}>
            <span className={styles.title_span}>天天PK</span>
            <div className={styles.span_choose}>
              <span className={styles.choose1}>门店选择：</span>
              <Select showSearch optionFilterProp="children" key="1" defaultValue="全部门店"  className={styles.select1}  onSelect={this.clickshop}>
                <Select.Option value="全部门店" key="1">全部门店</Select.Option>

                {
                  this.state.shopData.map(function (newdata) {
                    return(

                      <Select.Option key={newdata.entityId} value={newdata.entityId}>{newdata.entityName}</Select.Option>

                    )
                  })
                }

              </Select>

            </div>
          </div>

          <div className={styles.content1}>
            <div className={styles.chooseTitle}>
              <p onClick={this.add} id="add">指标选择：</p>
              <p>时间选择：</p>
            </div>
            <div className={styles.chooseContent}>
              <div className={styles.targetChoose}>
                <ul>
                  <li id="li_count" onClick={()=>{this.chooseCount(1)}}>销售额-客单量</li>
                  <li id="li_price" onClick={()=>{this.chooseCount(2)}}>销售额-客单价</li>
                </ul>
                <span>(仅选一项)</span>
              </div>
              <div className={styles.timeChoose} id="timeChoose">
                <ul>
                  <li id="li1" onClick={()=>{this.chooseWeek(1)}}>周一</li>
                  <li id="li2" onClick={()=>{this.chooseWeek(2)}}>周二</li>
                  <li id="li3" onClick={()=>{this.chooseWeek(3)}}>周三</li>
                  <li id="li4" onClick={()=>{this.chooseWeek(4)}}>周四</li>
                  <li id="li5" onClick={()=>{this.chooseWeek(5)}}>周五</li>
                  <li id="li6" onClick={()=>{this.chooseWeek(6)}}>周六</li>
                  <li id="li7" onClick={()=>{this.chooseWeek(7)}}>周日</li>
                </ul>
                <span>(仅选一项)</span>
              </div>

            </div>
          </div>

          <div className={styles.content2}>
            <p id="content2_p">近三月所有{this.state.cWeek}增降幅占比</p>
            <div className={styles.content2_content}>
              <div  className={styles.content2_1}>
                <span className={styles.span1}>销售额：</span>
                <div className={styles.bar1}>
                  <div className={styles.add1} style={{width:(this.state.amRateAsc)}}></div>
                  <div className={styles.drop1} style={{width:(this.state.amRateDesc)}}></div>
                </div>
                <div className={styles.text1}>
                  <span className={styles.spanAdd} id="spanAdd">近三个月有{this.state.amAscCount}个{this.state.cWeek}为增长 {this.state.amRateAsc}</span><span className={styles.spanDrop}>近三个月有{this.state.amDescCount}个{this.state.cWeek}为下降 {this.state.amRateDesc}</span>
                </div>
              </div>


              <div  className={styles.content2_1} id="count">
                <span className={styles.span1}>{this.state.selectK}：</span>
                <div className={styles.bar1}>
                  <div className={styles.add1} style={{width:(this.state.kdPerAdd)}}></div>
                  <div className={styles.drop2} style={{width:(this.state.kdPer)}}></div>
                </div>
                <div className={styles.text1}>
                  <span className={styles.spanAdd}>近三个月有{this.state.kdDateAdd}个{this.state.cWeek}为增长 {this.state.kdPerAdd}</span><span className={styles.spanDrop}>近三个月有{this.state.kdDate}个{this.state.cWeek}为下降 {this.state.kdPer}</span>
                </div>
              </div>

            </div>

          </div>

          <div className={styles.content3}>
            <p id="content3_p">近三月所有{this.state.cWeek}销售额趋势</p>
            <div className={styles.saleTrend1} id="saleTrend1"></div>
          </div>

          <div className={styles.content4}>
            <Row className={styles.content4_row_title}>
              <Col className={styles.content4_col} span={5}>日期</Col>
              <Col className={styles.content4_col} span={3}>销售额（元）</Col>
              <Col className={styles.content4_col} span={3}>较上周同期</Col>
              <Col className={styles.content4_col} span={3}>客单量</Col>
              <Col className={styles.content4_col} span={3}>较上周同期</Col>
              <Col className={styles.content4_col} span={3}>客单价（元）</Col>
              <Col span={4}>较上周同期</Col>
            </Row>
            {
              this.state.saleTrendList.map(function (newdata) {
                return(
                  <ol className={styles.checkColor} key={newdata.index}>
                    <div>
                      <Row className={styles.content4_row_odd}>
                        <Col span={5} className={styles.content4_col_time} >{newdata.date}</Col>
                        <Col span={3} className={styles.besttext}>{newdata.sale}</Col>
                        <Col span={3} className={newdata.saleRate.indexOf("-")==0 ? styles.minusNum:styles.plusNum}>{newdata.saleRate}</Col>
                        <Col span={3} className={styles.besttext}>{newdata.orderCount}</Col>
                        <Col span={3} className={newdata.orderCountRate.indexOf("-")==0 ? styles.minusNum:styles.plusNum}>{newdata.orderCountRate}</Col>
                        <Col span={3} className={styles.besttext}>{newdata.orderPrice}</Col>
                        <Col span={4} className={newdata.orderPriceRate.indexOf("-")==0 ? styles.minusNum:styles.plusNum}>{newdata.orderPriceRate}</Col>
                      </Row>
                    </div>
                  </ol>
                )
              })
            }
          </div>

        </div>

    )
  }

});

export default Home;
