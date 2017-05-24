/**
 * Created by dixu on 2017/5/10.
 */
import React, { Component, PropTypes } from 'react';
import style from './Login.css';
import fetch from 'dva/fetch';
import {message,button} from 'antd';
import { get,post } from '../utils/request';



var Login = React.createClass({

  getInitialState: function () {//登陆初始化
    return {
      Number:[],
      Name:[],
      Password:[]
    }


  },

  componentDidMount() {//记住密码

    var userIf =localStorage.getItem("user");
    if(localStorage.getItem("JZpassword")=="1" && userIf!=null){

      //this.setState({Number: userIf.en});
      this.setState({Name: userIf});
      this.setState({Password: localStorage.getItem("Password")});
      var items = document.getElementsByName("Password");
      items[0].checked=true;
    }




  },


  dataall(){

    this.querystar();
    this.querystar1();
    this.querystar2();

    this.queryhot();
    this.queryhot1();
    this.queryhot2();

    this.querybuy();
    this.querybuy1();

    this.querypay();
    this.querypay1();
    this.querypay2();

    this.queryAll();

    /*setTimeout(function () {
      this.context.router.push('/itemplay');
    }.bind(this), 1000);*/


  },


  //查询首页基本数据
  queryAll(){


    get('/yyzzs')
      .then((res) => {
        if (res) {
          var data1=JSON.stringify(res.data);
          localStorage.setItem("datato",data1);

          this.context.router.push('/itemplay');

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



  handleChangeNumber(event) {
    this.setState({Number: event.target.value});
  },

  handleChangeName(event) {
    this.setState({Name: event.target.value});
  },

  handleChangeNamePassword(event) {
    this.setState({Password: event.target.value});
  },

  JZpassword(event){//清除密码

    var items = document.getElementsByName("Password");
    if (items[0].checked) {
      localStorage.setItem("JZpassword",'1');
    }else{
      localStorage.setItem("JZpassword",'0');
      this.setState({Number: ""});
      this.setState({Name: ""});
      this.setState({Password: ""});
    }
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  handleSubmit(event) {//登陆

    /*  alert('A name was submitted: ' + this.state.Number + this.state.Name +this.state.Password);*/


    if(this.state.Name==""){
      message.error('请输入用户名');
      return false;
    }else if(this.state.Password==""){
      message.error('请输入密码');
      return false;
    }else{


        post('/login', {


       "username":this.state.Name,

       "password":this.state.Password,


       })

       .then((res) => {

       if (res) {
         const token = res.data.token;
         if (token) {
           sessionStorage.setItem('Access_Token', token);
         }

         var data1=JSON.stringify(res.data);
         localStorage.setItem("shop-content",data1);

         this.dataall();

         sessionStorage.setItem('Select_code', '1');
         localStorage.setItem("user",this.state.Name);
         localStorage.setItem("Password",this.state.Password);

       } else {
       message.error('登录失败，账号或密码错误');
       }
       });


    }



  },

  render: function() {
    return (
      <div className={style.container}>
        <div className={style.contentio} >

          <div className={style.logo_box}>
            <h3 >i运营欢迎你</h3>

            <div className={style.lgBody}>
              <div className={style.input_outer}>
                <span className={style.u_user}></span>
                <label>
                  <input  className={style.text} value={this.state.Name} onChange={this.handleChangeName} placeholder="请输入用户名" type="text"/>

                </label>
              </div>
              <div className={style.input_outer}>
                <span className={style.us_uer}></span>
                <label>
                  <input  className={style.text} placeholder="请输入密码" type="password" value={this.state.Password} onChange={this.handleChangeNamePassword} />
                </label>
              </div>
              <div className={style.lgbody} >

                <button  className={style.loginQuery} type="primary" onClick={this.handleSubmit} ><span className={style.newLogin}>登录</span></button>

              </div>

              <div >
                <form className={style.JZpassword}>
                  <p><input onClick={this.JZpassword} type="checkbox"  name="Password" />记住账号密码</p>
                </form>
              </div>

            </div>

          </div>
        </div>
      </div>



    )
  }

});

export default Login;

