/**
 * Created by lenovo on 2017-03-14.
 */
import React from 'react';
import { connect } from 'dva';
import styles from './ParamSet.css';
import { Row,Col,InputNumber,BackTop,Input,Icon,Modal,Button,Tooltip,message } from 'antd';
import $ from 'jquery';

import createReactClass from 'create-react-class';
import { get,post } from '../utils/request';

var Home = createReactClass({

  getInitialState: function () {
    return {
      kdprice:[],
      shopone:[],
      shop:[],
      shopadd:[],
      ref:true,
      ref1:true,
      ref2:true,
      ref3:true,

    }
  },


  componentDidMount() {
    $(window).scrollTop(0);
    this.querySet();
  },

  querySet(){


    get('/cssz')
      .then((res) => {
        if (res) {

         this.setState({kdprice:res.data.orderPriceList});
         this.setState({shopone:res.data.storeAmountList});
         this.setState({shop:res.data.storeTypeList});
         this.setState({shopadd:res.data.storeTrendList});


        } else {
          console.log("fetch fail");
        }
      });


  },




  //客单价区间设置
  edit1(){

    this.setstyle('a','b');
    this.setState({ref:false});

  },
  clickOK1(){

    if(this.state.ref){
      return false
    }else {
    this.disstyle('a','b');
    var kdall = []

    for(var i = 1;i<this.state.kdprice.length+1;i++){
      kdall.push($('#a'+i).val());
      kdall.push($('#b'+i).val());
    }
    post('/cssz/xgkdj', {
      data:kdall,
    })

      .then((res) => {

        if (res) {

          this.setState({ref:true});

          message.success('修改成功！');

        } else {
          message.error('修改失败！');
        }
      });

    }

  },
  cancleOK1(){

    this.disstyle('a','b');
    this.setState({ref:true});

  },



  //单店营收区间设置
  edit2(){
    this.setstyle('c','d');
    this.setState({ref1:false});

  },
  clickOK2(){

    if(this.state.ref1){
      return false
    }else {
      this.disstyle('c','d');
      var kdall = []

      for(var i = 1;i<this.state.shopone.length+1;i++){
        kdall.push($('#c'+i).val());
        kdall.push($('#d'+i).val());
      }
      post('/cssz/xgDdys', {
        data:kdall,
      })

        .then((res) => {

          if (res) {

            this.setState({ref1:true});

            message.success('修改成功！');

          } else {
            message.error('修改失败！');
          }
        });

    }
  },
  cancleOK2(){
    this.disstyle('c','d');
    this.setState({ref1:true});
  },





  //门店类型设置
  edit3(){
    this.setstyle('e','f');
    this.setState({ref2:false});
  },
  clickOK3(){
    if(this.state.ref2){
      return false
    }else {
      this.disstyle('e','f');
      var kdall = []

      for(var i = 1;i<this.state.shop.length+1;i++){
        kdall.push($('#e'+i).val());
        kdall.push($('#f'+i).val());
      }
      post('/cssz/xgMdlx', {
        data:kdall,
      })

        .then((res) => {

          if (res) {

            this.setState({ref2:true});

            message.success('修改成功！');

          } else {
            message.error('修改失败！');
          }
        });

    }
  },
  cancleOK3(){
    this.disstyle('e','f');
    this.setState({ref2:true});
  },

  //门店增长趋势
  edit4(){

    this.setstyle('h','i');
    this.setState({ref3:false});

  },
  clickOK4(){

    if(this.state.ref3){
      return false
    }else {
      this.disstyle('h','i');
      var kdall = []

      for(var i = 1;i<this.state.shopadd.length+1;i++){
        kdall.push($('#h'+i).val());
        kdall.push($('#i'+i).val());
      }
      post('/cssz/xgMdzzqs', {
        data:kdall,
      })

        .then((res) => {

          if (res) {

            this.setState({ref3:true});

            message.success('修改成功！');

          } else {
            message.error('修改失败！');
          }
        });

    }

  },
  cancleOK4(){
    this.disstyle('h','i');
    this.setState({ref3:true});

  },


  disstyle(e1,e2){

    $("input[id^="+e1+"]").css({"background-color":"transparent","color":"#ffffff"});
    $("input[id^="+e1+"]").attr("disabled",true);

    $("input[id^="+e2+"]").css({"background-color":"transparent","color":"#ffffff"});
    $("input[id^="+e2+"]").attr("disabled",true);

  },

  setstyle(e1,e2){

    $("input[id^="+e1+"]").css({"background-color":"#ffffff","color":"#000000"});
    $("input[id^="+e1+"]").attr("disabled",false);

    $("input[id^="+e2+"]").css({"background-color":"#ffffff","color":"#000000"});
    $("input[id^="+e2+"]").attr("disabled",false);

  },




  render: function() {



    return (

        <div className={styles.paramSet}>
          <BackTop className={styles.backTop}/>
          <div className={styles.title}>
            <span className={styles.title_span}>参数设置</span>
          </div>

          <div className={styles.content1}>
            <Row className={styles.row_title}>
              <Col span={22}>客单价区间设置</Col>
              <Col span={2}>
                <Tooltip title="编辑"><Icon type="edit" className={styles.edit} onClick={this.edit1}/></Tooltip>
                <Tooltip title="取消"><Icon type="close" className={styles.close} onClick={this.cancleOK1}/></Tooltip>
                <Tooltip title="确定"><Icon type="check" className={styles.check} onClick={this.clickOK1}/></Tooltip>
              </Col>
            </Row>

            {/* <Modal title="添加客单价区间"
                   visible={this.state.addVisible1}
                   onOk={this.handleAddOk1}
                   onCancel={this.handleAddCancel1}
            >
              <p>等级名称： <Input type="text" className={styles.input2} placeholder="如：25-30"/></p>
              <br/>
              <p>下限值： <Input type="text" className={styles.input2} placeholder="任意数字字符"/></p>
              <br/>
              <p>上限值： <Input type="text" className={styles.input2} placeholder="任意数字字符"/></p>
            </Modal>*/}

            <div className={styles.setPrice}>
              <Row className={styles.content1_row_title}>
                <Col span={6} className={styles.content1_col}>等级</Col>
                <Col span={6} className={styles.content1_col}>等级名称</Col>
                <Col span={6} className={styles.content1_col}>下限值</Col>
                <Col span={6}>上限值</Col>
              </Row>

              {
                this.state.kdprice.map(function (newdata) {
                  return(
                    <ol className={styles.checkColor} key={newdata.level}>
                      <div>
                        <Row className={styles.content2_row_odd}>
                          <Col span={6} className={styles.besttext1}>{newdata.level}</Col>
                          <Col span={6} className={styles.besttext}>{newdata.min}-{newdata.max}</Col>
                          <Col span={6}><Input type="text" id={'a'+newdata.level} className={styles.inputNumber} disabled defaultValue={newdata.min} style={{ "backgroundColor": "transparent",'color':'#ffffff'}}/></Col>
                          <Col span={6}><Input type="text" id={'b'+newdata.level} className={styles.inputNumber} disabled defaultValue={newdata.max} style={{ "backgroundColor": "transparent",'color':'#ffffff'}}/></Col>
                        </Row>
                      </div>
                    </ol>
                  )
                })
              }


            </div>

          </div>

          <div className={styles.content2}>
            <Row className={styles.row_title}>
              <Col span={22}>单店营收区间设置</Col>
              <Col span={2}>
                <Tooltip title="编辑"><Icon type="edit" className={styles.edit} onClick={this.edit2}/></Tooltip>
                <Tooltip title="取消"><Icon type="close" className={styles.close} onClick={this.cancleOK2}/></Tooltip>
                <Tooltip title="确定"><Icon type="check" className={styles.check} onClick={this.clickOK2}/></Tooltip>
              </Col>            </Row>
            {/* <Modal title="添加单店营收区间"
                   visible={this.state.addVisible2}
                   onOk={this.handleAddOk2}
                   onCancel={this.handleAddCancel2}
            >
              <p>等级名称： <Input type="text" className={styles.input2} placeholder="如：25-30"/></p>
              <br/>
              <p>下限值： <Input type="text" className={styles.input2} placeholder="任意数字字符"/></p>
              <br/>
              <p>上限值： <Input type="text" className={styles.input2} placeholder="任意数字字符"/></p>
            </Modal> */}
            <div className={styles.setPrice}>
              <Row className={styles.content1_row_title}>
                <Col span={6} className={styles.content1_col}>等级</Col>
                <Col span={6} className={styles.content1_col}>等级名称</Col>
                <Col span={6} className={styles.content1_col}>下限值</Col>
                <Col span={6}>上限值</Col>
              </Row>

              {
                this.state.shopone.map(function (newdata) {
                  return(
                    <ol className={styles.checkColor} key={newdata.level}>
                      <div>
                        <Row className={styles.content2_row_odd}>
                          <Col span={6} className={styles.besttext1}>{newdata.level}</Col>
                          <Col span={6} className={styles.besttext}>{newdata.min}-{newdata.max}</Col>
                          <Col span={6}><Input type="text" id={'c'+newdata.level} className={styles.inputNumber} disabled defaultValue={newdata.min} style={{ "backgroundColor": "transparent",'color':'#ffffff'}}/></Col>
                          <Col span={6}><Input type="text" id={'d'+newdata.level} className={styles.inputNumber} disabled defaultValue={newdata.max} style={{ "backgroundColor": "transparent",'color':'#ffffff'}}/></Col>
                        </Row>
                      </div>
                    </ol>
                  )
                })
              }

            </div>
          </div>

          <div className={styles.content3}>
            <Row className={styles.row_title}>
              <Col span={22}>门店类型设置</Col>
              <Col span={2}>
                <Tooltip title="编辑"><Icon type="edit" className={styles.edit} onClick={this.edit3}/></Tooltip>
                <Tooltip title="取消"><Icon type="close" className={styles.close} onClick={this.cancleOK3}/></Tooltip>
                <Tooltip title="确定"><Icon type="check" className={styles.check} onClick={this.clickOK3}/></Tooltip>
              </Col>            </Row>
            {/* <Modal title="添加门店类型"
                   visible={this.state.addVisible3}
                   onOk={this.handleAddOk3}
                   onCancel={this.handleAddCancel3}
            >
              <p>门店类型： <Input type="text" className={styles.input2} placeholder="如：直营店、加盟店"/></p>
              <br/>
              <p>门店数量： <Input type="text" className={styles.input2} placeholder="任意数字字符"/></p>
            </Modal> */}
            <div className={styles.setPrice}>
              <Row className={styles.content1_row_title}>
                <Col span={8} className={styles.content1_col}>序列</Col>
                <Col span={8} className={styles.content1_col}>门店类型</Col>
                <Col span={8}>门店数量</Col>
              </Row>

              {
                this.state.shop.map(function (newdata) {
                  return(
                    <ol className={styles.checkColor} key={newdata.id}>
                      <div>
                        <Row className={styles.content2_row_odd}>
                          <Col span={8} className={styles.besttext1}>{newdata.id}</Col>
                          <Col span={8}><Input type="text" id={'e'+newdata.id} className={styles.inputNumber} disabled defaultValue={newdata.type} style={{ "backgroundColor": "transparent",'color':'#ffffff'}}/></Col>
                          <Col span={8}><Input type="text" id={'f'+newdata.id} className={styles.inputNumber} disabled defaultValue={newdata.count} style={{ "backgroundColor": "transparent",'color':'#ffffff'}}/></Col>
                        </Row>
                      </div>
                    </ol>
                  )
                })
              }


            </div>
          </div>

          <div className={styles.content4}>
            <Row className={styles.row_title}>
              <Col span={22}>门店增长趋势（默认10个时间节点）</Col>
              <Col span={2}>
                <Tooltip title="编辑"><Icon type="edit" className={styles.edit} onClick={this.edit4}/></Tooltip>
                <Tooltip title="取消"><Icon type="close" className={styles.close} onClick={this.cancleOK4}/></Tooltip>
                <Tooltip title="确定"><Icon type="check" className={styles.check} onClick={this.clickOK4}/></Tooltip>
              </Col>            </Row>
            {/* <Modal title="添加门店增长趋势"
                   visible={this.state.addVisible4}
                   onOk={this.handleAddOk4}
                   onCancel={this.handleAddCancel4}
            >
              <p>时间节点： <Input type="text" className={styles.input2} placeholder="如：2016.12"/></p>
              <br/>
              <p>门店数量： <Input type="text" className={styles.input2} placeholder="任意数字字符"/></p>
            </Modal> */}


            <div className={styles.setPrice}>
              <Row className={styles.content1_row_title}>
                <Col span={8} className={styles.content1_col}>序列</Col>
                <Col span={8} className={styles.content1_col}>时间节点</Col>
                <Col span={8}>门店数量</Col>
              </Row>

            {
              this.state.shopadd.map(function (newdata) {
                return(
                  <ol className={styles.checkColor} key={newdata.id}>
                    <div>
                      <Row className={styles.content2_row_odd}>
                        <Col span={8} className={styles.besttext1}>{newdata.id}</Col>
                        <Col span={8}><Input type="text" id={'h'+newdata.id} className={styles.inputNumber} disabled defaultValue={newdata.time} style={{ "backgroundColor": "transparent",'color':'#ffffff'}}/></Col>
                        <Col span={8}><Input type="text" id={'i'+newdata.id} className={styles.inputNumber} disabled defaultValue={newdata.count} style={{ "backgroundColor": "transparent",'color':'#ffffff'}}/></Col>
                      </Row>
                    </div>
                  </ol>
                )
              })
            }
            </div>


          </div>
        </div>

    )
  }

});

export default Home;
