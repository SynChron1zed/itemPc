/**
 * Created by lenovo on 2017-03-14.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './BestSell.css';
import { Row,Col,BackTop,Select } from 'antd';
import $ from 'jquery';
import bestSale1 from '../assets/image/bestSale_1.png';

import createReactClass from 'create-react-class';
import { post } from '../utils/request';

var Home = createReactClass({

  getInitialState: function () {
    return {
      AllData:[],
      barWidth:[],
      shopData:[],
      shopSelect:[],
      bestdate:[0],
      maxdata:[]
    }
  },
  //选择维度
  chooseTarget(a){

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



    if(a == 0){
      this.selectAll(a,shopId);
      this.setState({bestdate:a});
      $("#li1").addClass(styles.li_focus).siblings().removeClass(styles.li_focus);
    }else{
      this.selectAll(a,shopId);
      this.setState({bestdate:a});
      $("#li2").addClass(styles.li_focus).siblings().removeClass(styles.li_focus);
    }
  },

  //查询所有
  selectAll(y,id){


    post('/zjxs', {

      entityId:id,
      target:y

    })

      .then((res) => {

        if (res) {

          console.info(res);
          var Alldata =res.data;

          this.setState({AllData:Alldata});

          console.log(Alldata);

          var ele = []
          for(var i = 0 ;i<Alldata.length;i++){
            ele.push(Alldata[i].amount)
          }

          console.log(ele);

          this.setState({maxdata:Math.max.apply(null,ele)})


        } else {
          message.error('数据错误');
        }
      });



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
    this.selectAll(this.state.bestdate,e);

  },

  //获取店铺详情
  getShop(){
    var data =  localStorage.getItem("shop-content");
    data = JSON.parse(data);
    //console.log(data);
    this.setState({shopData:data.entityList});
    //console.log(this.state.shopData)

  },

  componentDidMount() {
    $(window).scrollTop(0);
    this.chooseTarget(0);
    $("#li1").addClass(styles.li_focus);
    this.getShop();
  },

  render: function() {
    var ele = this.state.maxdata;
    return (
        <div className={styles.bestSale}>
          <BackTop className={styles.backTop}/>
          <div className={styles.title}>
            <span className={styles.title_span}>最佳销售</span>
            <div className={styles.span_choose}>
              <span className={styles.choose1}>门店选择：</span>
              <Select showSearch optionFilterProp="children" defaultValue="全部门店"  className={styles.select1}  onSelect={this.clickshop}>
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
              <p>维度选择：</p>
            </div>
            <div className={styles.chooseContent}>
              <ul>
                <li id="li1" onClick={()=>{this.chooseTarget(0)}}>日新高</li>
                <li id="li2" onClick={()=>{this.chooseTarget(1)}}>月新高</li>
              </ul>
              <span>(仅选一项)</span>
            </div>
          </div>

          <div className={styles.content2}>
            <p>最佳销售排行榜</p>
            <Row className={styles.content2_row_title}>
              <Col span={4} className={styles.content2_col}>排名</Col>
              <Col span={4} className={styles.content2_col}>门店</Col>
              <Col span={4} className={styles.content2_col}>日期</Col>
              <Col span={8} className={styles.content2_col}>销售额（元）</Col>
              <Col span={4}>较上期同期</Col>
            </Row>
            {
              this.state.AllData.map(function (newdata) {
                return(
                  <ol className={styles.checkColor} key={newdata.rank}>
                    <div>
                      <Row className={styles.content2_row_odd}>
                        <Col span={4} className={styles.besttext1}><img src={bestSale1} className={styles.content2_img}/>{newdata.rank}</Col>
                        <Col span={4} className={styles.besttext}>{newdata.name}</Col>
                        <Col span={4} className={styles.besttext}>{newdata.date}</Col>
                        <Col span={8}>
                          <div className={styles.content2_bar}>
                            <div className={styles.sale} style={{width:newdata.amount==0?0+'%':(newdata.amount/ele)*100-15+'%'}}></div>

                            <span>{newdata.amount}</span>
                          </div>
                        </Col>
                        <Col span={4} className={newdata.rate.indexOf("-")==0 ? styles.minusNum:styles.plusNum}>{newdata.rate}</Col>
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
