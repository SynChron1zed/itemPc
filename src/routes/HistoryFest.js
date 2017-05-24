/**
 * Created by lenovo on 2017-03-14.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './HistoryFest.css';
import { Row,Col,BackTop,Select } from 'antd';
import $ from 'jquery';
import fest1 from '../assets/image/fest_1.png';

import createReactClass from 'create-react-class';
import { post } from '../utils/request';

var Home = createReactClass({

  getInitialState: function () {
    return {
      yearAllData:[],
      AllData:[],
      yearEnd:[],
      ccc:[],
      shopData:[],
      shopSelect:[],
      maxdata:[]
    }
  },

  //显示所有年份
  showYear(){

    var data =  localStorage.getItem("shop-content");
    data = JSON.parse(data);



    post('/lsjr/synf', {
      entityId:data.entityId,

    })

      .then((res) => {

        if (res) {
          var yearAlldata =res.data;
          this.setState({yearAllData:yearAlldata.reverse()});
          var ye = yearAlldata[0];
          this.setState({yearEnd:ye});
          var yeEnd = this.state.yearEnd;

          this.setState({ccc:ye});

          this.chooseYear(yeEnd)



        } else {
          message.error('数据错误');
        }
      });




  },

  //选择年份
  chooseYear(a){


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



    this.selectAll(a,shopId);
    this.setState({ccc:a});



  },

  //查询所有
  selectAll(y,id){


    post('/lsjr', {
      entityId:id,
      year:y

    })

      .then((res) => {

        if (res) {
          var Alldata =res.data;
          this.setState({AllData:Alldata});



          var ele = []
          for(var i = 0 ;i<Alldata.length;i++){
            ele.push(Alldata[i].amount)
          }

          console.log(ele);

         this.setState({maxdata:Math.max.apply(null,ele)})

        } else {
          message.error('数据错误！');
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


    this.selectAll(this.state.ccc,e);

  },

  //获取店铺详情
  getShop(){
    var data =  localStorage.getItem("shop-content");
    data = JSON.parse(data);
    console.log(data);
    this.setState({shopData:data.entityList});

    console.log(this.state.shopData)

  },

  componentDidMount() {
    $(window).scrollTop(0);
    this.showYear();
    this.getShop();

  },

  render: function() {

    var ele = this.state.maxdata;
    return (


        <div className={styles.historyFest}>
          <BackTop className={styles.backTop}/>
          <div className={styles.title}>
            <span className={styles.title_span}>历史节日</span>
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
              <p>时间选择：</p>
            </div>
            <div className={styles.chooseContent}>
              <ul>
                {
                  this.state.yearAllData.map(function (newdata) {
                    return(
                      <div key={newdata}>
                        <li className={newdata==this.state.ccc?styles.li_focus:styles.eee} onClick={this.chooseYear.bind(this,newdata)}>{newdata}</li>
                      </div>

                    )
                  }.bind(this))
                }
              </ul>
              <span>(仅选一项)</span>
            </div>
          </div>


          <div className={styles.content2}>
            <p>历史节日销售情况</p>
            <Row className={styles.content2_row_title}>
              <Col span={5} className={styles.content2_col}>节日类型</Col>
              <Col span={4} className={styles.content2_col}>日期</Col>
              <Col span={11} className={styles.content2_col}>销售额（元）</Col>
              <Col span={4}>较上期同期</Col>
            </Row>
            {
              this.state.AllData.map(function (newdata) {
                return(
                  <ol className={styles.checkColor} key={newdata.index}>
                    <div>
                      <Row className={styles.content2_row_odd}>
                        <Col span={5} className={styles.festtext1}><img src={fest1} className={styles.content2_img}/>{newdata.type}</Col>
                        <Col span={4} className={styles.festtext}>{newdata.date}</Col>
                        <Col span={11}>
                          <div className={styles.content2_bar}>
                            <div className={styles.sale} style={{width:newdata.amount==0?0+'%':(newdata.amount/ele)*100-15+'%'}}></div>
                            <span > {newdata.amount}</span>
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
