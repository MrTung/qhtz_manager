import axios from 'axios'

const TIME_OUT = 30000; // 超时时间30秒

// 请求数据拦截处理
axios.interceptors.request.use(config => {
    if (getToken()) {
        //将token放到请求头发送给服务器,将tokenkey放在请求头中
        config.headers.Authorization = 'Bearer ' + getToken();
        //也可以这种写法
        // config.headers['accessToken'] = Token;
        return config;
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 返回数据拦截处理
axios.interceptors.response.use(response => {
    if (response.data) {
        if (response.data.code == '0000' && response.data.data) {
            return response.data.data;
        } else {
            return response.data;
        }
    } else {
        return response.data;
    }
}, error => Promise.reject(error.response))

/*
* 封装一个私有的请求方法
*/
const _request = (method, url, data) => {
    const headers = {};
    const configData = {
        url, // 请求的地址
        timeout: TIME_OUT, // 超时时间, 单位毫秒
        headers
    };
    let Data; // 设置默认source
    if (data instanceof FormData) {
        Data = data;
        // Data.append('source', SOURCE)
    } else {
        Data = data;
        // Data = {...data, source: SOURCE}
    }

    if (method === 'get') {
        configData.method = 'get';
        configData.headers['Access-Control-Allow-Origin'] = '*';
        configData.params = Data; // get 请求的数据
    } else if (method === 'postForm') {
        configData.method = 'post';
        if (Data instanceof FormData) {
            configData.headers['Access-Control-Allow-Origin'] = '*';
            configData.headers['Content-Type'] = 'multipart/form-data; charset=UTF-8';
            configData.data = Data;
        } else {
            configData.headers['Access-Control-Allow-Origin'] = '*';
            configData.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            configData.data = qs.stringify(Data);
        }
    } else if (method === 'postJson') {
        configData.method = 'post';
        configData.headers['Access-Control-Allow-Origin'] = '*';
        configData.headers['Content-Type'] = 'application/json; charset=UTF-8';
        configData.data = Data;
    }

    return axios(configData);
}

export function GET(url, data) {
    return _request('get', url, data);
}

export function POST(url, data) {
    return _request('postForm', url, data);
}

export function JPOST(url, data) {
    return _request('postJson', url, data);
}

