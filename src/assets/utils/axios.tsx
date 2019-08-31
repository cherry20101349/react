import axios from 'axios'
// import getEnv from './env'
import { message } from 'antd';
let instance = axios.create({
    headers: {
        // 'content-Type': 'application/json;charset=UTF-8'
    },
    // baseURL: getEnv,
    timeout: 30000,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    // withCredentials: true,
    // `adapter` 允许自定义处理请求，以使测试更轻松
    // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
    // adapter: function (config) {
    //     /* ... */
    // },
    // // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
    // // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
    // auth: {
    //     username: 'janedoe',
    //     password: 's00pers3cret'
    // },
    // // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
    // xsrfCookieName: 'XSRF-TOKEN', // default
    // // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
    // xsrfHeaderName: 'X-XSRF-TOKEN', // 默认的
    // proxy: {
    //     host: '127.0.0.1',
    //     port: 3031
    //     // auth: : {
    //     //   username: 'mikeymike',
    //     //   password: 'rapunz3l'
    //     // }
    //   },
    transformRequest: [function (data) {
        if (!data)
            return;
        if (data instanceof FormData) 
            return data;
        var params: Array<any> = [];
        Object.keys(data).forEach(function (item) {
            params.push(item + "=" + data[item]);
        });
        return params.join('&');
    }]
})
instance.interceptors.request.use((config) => {
    return config
}, (err) => {
    return Promise.reject(err)
})
instance.interceptors.response.use((res) => {
    if (res === null) {
        message.error('网络或服务器错误');
    } else {
        // return Promise.resolve(res)
    }
    return Promise.resolve(res)
}, (err: any) => {
    // message.error(err);
    return Promise.reject(err)
})
export default instance