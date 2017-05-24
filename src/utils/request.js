import { hashHistory } from 'react-router';
import { message } from 'antd';

export default function request (method, url, body) {
  method = method.toUpperCase();
  if (method === 'GET') {

    // fetch的GET不允许有body，参数只能放在url中
    body = undefined;
  } else {
    body = body && JSON.stringify(body);
  }

  var cs ;
  if(url.indexOf("?")==-1){
    cs = '?token='
  }else{
    cs= '&token='
  }
  return fetch('http://120.76.194.221:8080/iyy'+url+cs+sessionStorage.getItem('Access_Token'),{//192.168.88.239   120.76.194.221
    method,
    mode: "cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body
  })
    .then((res) => {

      if (res.status === 500) {
        message.error('数据错误！');
      } else {

        const token = res.headers.get('Access-Token');
        return res.json();

      }
    });
}

export const get = url => request('GET', url);
export const post = (url, body) => request('POST', url, body);
export const put = (url, body) => request('PUT', url, body);
export const del = (url, body) => request('DELETE', url, body);
