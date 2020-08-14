/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification, message } from 'antd';
import { stringify } from 'qs';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
export const isString = (str: any) => typeof str === 'string';
import FileDownLoad from './js-download-file';
import { isMobile } from './isMobile';
import { history } from 'umi';

const codeMessage: { [key: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: any) => {
  const { response = {} } = error;
  const errortext =
    codeMessage[response.status as number] || response.statusText;
  const { status, url } = response;

  notification.error({
    message: `请求错误 ${status}: ${url}`,
    description: errortext,
  });
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});
export function deleteObjNullOp(obj: any) {
  for (let key in obj) {
    if (obj[key] === null || strEmpty(obj[key] + '')) {
      delete obj[key];
    }
  }
}
function dealErro(err: any, api: string) {
  const redirect = localStorage.href
  console.log(redirect)
  const res = err.response || {};
  if (res.status === 401) {
    notification.error({
      message: '账户错误',
      description: '权限错误，请重新登录。',
    });
  } else if (res.status === 406) {
    notification.error({ message: '操作错误', description: '请先进行搜索。' });
  } else if (res.status === 417) {
    notification.error({ message: '错误', description: '导出失败。' });
  } else if (res.status === 402) {
    message.error('已超过登陆时效，请重新登陆', 2);
    localStorage.clear();
    if (isMobile()) {
      history.push(`/mobile/login?redirect=${location.pathname + location.search}`);
    } else {
      history.push(`/user/login`);
    }
  } else {
    console.log(err, api);
    notification.error({ message: '网络错误' + api, description: err.message });
  }
  return { success: false };
}
export function strEmpty(str: string) {
  return !isString(str) || str.trim().length < 1;
}

function config() {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getToken(),
    },
    timeout: 15000,
  };
}

export function getToken(file?: boolean) {
  let token = localStorage.getItem('token');
  if (file) {
    return `FileBearer${token}`;
  }
  return token ? `Bearer ${token}` : '';
}

export async function get<T>(api: string, data?: any): Promise<T> {
  deleteObjNullOp(data);
  const params = stringify(data, { arrayFormat: 'repeat' });
  const url = data && !strEmpty(params) ? `${api}?${params}` : api;
  return axios
    .get(url, {
      ...config(),
    })
    .then(response => response.data)
    .catch(error => dealErro(error, api));
}

export const remove = (api: string, id: string) => {
  if (!strEmpty(id)) {
    notification.error({ message: '参数错误' });
    return;
  }
  const url = `${api}/${id}`;
  return axios
    .delete(url, {
      ...config(),
    })
    .then(response => response.data)
    .catch(error => dealErro(error, api));
};
export async function post<T>(
  api: string,
  data?: any,
  params?: any,
): Promise<T> {
  deleteObjNullOp(data);
  return axios
    .post(api, data, { ...config(), params })
    .then(response => {
      if (response.headers.token) {
        return { ...response.data, token: response.headers.token };
      }
      return response.data;
    })
    .catch(error => dealErro(error, api));
}

export const put = (api: string, data: any, params: any) => {
  return axios
    .put(api, data, { ...config(), params })
    .then(response => {
      if (response.headers.token) {
        return { ...response.data, token: response.headers.token };
      }
      return response.data;
    })
    .catch(error => dealErro(error, api));
};
function fileConfig() {
  return {
    responseType: 'arraybuffer',
    headers: {
      Accept: 'application/json',
      Authorization: getToken(),
    },
    type: 'application/vnd.ms-excel;charset=utf-8',
    // timeout: 15000
  };
}
interface DataBase {
  success: boolean;
  data?: any;
  message?: string;
}
interface DownLoadResponse {
  data: string | ArrayBuffer | ArrayBufferView | Blob | DataBase
}
export const downloadFiles = async ({ api, data, fileName }: any) => {
  //add loading status
  const response = await new Promise<DownLoadResponse>(function (resolve, reject) {
    axios.post<any, PromiseLike<DownLoadResponse>>(api, data, { ...(fileConfig() as AxiosRequestConfig) })
      .then(response => resolve(response))
      .catch(err => dealErro(err, api))
  })
  if (response && ((response as { data: DataBase }).data?.success !== false)) {
    FileDownLoad(response.data as Blob, fileName)
  }

};

export default request;
