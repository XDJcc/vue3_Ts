import Axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
} from "axios";

import Qs from "qs";

import { ElMessage } from "element-plus";

const message = (msg: string, type?: string) => {
  ElMessage({
    message: msg,
    type: type || "warning",
    duration: 1500,
  });
};

const defaultConfig: AxiosRequestConfig = {
  baseURL: "",
  timeout: 10000, //10秒超时
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    responseType: "json",
  },
};
const getConfig = (config?: AxiosRequestConfig): AxiosRequestConfig => {
  if (!config) return defaultConfig;
  return defaultConfig;
};

class EnclosureHttp {
  //存储 Axios 的实例
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  private static axiosInstance: AxiosInstance = Axios.create(getConfig());

  //请求拦截
  private httpInterceptorsRequest(): void {
    EnclosureHttp.axiosInstance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        /*
         * 在请求发出去之前作出一下处理
         * */
        // console.log("config=>:", config);
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );
  }

  //响应拦截
  private httpInterceptorsResponse(): void {
    EnclosureHttp.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        /*
         *   对响应的数据作出一些处理
         * */
        +response.status === 200
          ? Promise.resolve(response)
          : Promise.reject(response);
      },
      (error: AxiosError) => {
        //请求出错的验证
        const { response } = error;
        if (response) {
          // 请求已发出，但是不在2xx的范围
          this.errorHandle(response.status, response.data.message);
          return Promise.reject(response);
        } else {
          // 处理断网的情况
          // eg:请求超时或断网时，更新state的network状态
          // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
          // 后续增加断网情况下做的一些操作
          return Promise.reject(error);
        }
      }
    );
  }

  /**
   * 请求失败后的错误统一处理
   * @param {Number} status 请求失败的状态码
   */
  private errorHandle = (status: number, other: string) => {
    // 状态码判断
    switch (status) {
      case -1: // -1: 未登录状态，跳转登录页
        message("未登录状态");
        break;
      case 403: // 403 token过期
        message("登录过期，请重新登录");
        break;
      case 404: // 404请求不存在
        message("请求错误！！！");
        break;
      default:
        message(other);
    }
  };

  /**
   * get方法
   * @param {string} url 路径
   * @param {object} params 参数
   */
  public reqGet = (url: string, params?: unknown) => {
    return new Promise((resolve, reject) => {
      EnclosureHttp.axiosInstance
        .get(url, { params })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  /**
   * post 方法
   * @param {string} url 路径
   * @param {object} params 参数
   * @param config
   */
  public reqPost = (
    url: string,
    params: unknown = {},
    config?: AxiosRequestConfig
  ) => {
    return new Promise((resolve, reject) => {
      EnclosureHttp.axiosInstance
        .post(url, { data: params }, config)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  //Axios init GET
  public get = (url: string, params?: unknown) => {
    return new Promise((resolve, reject) => {
      Axios.get(url, { params })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log("err=>:", err);
          reject(err);
        });
    });
  };

  //Axios init POST
  public post = (
    url: string,
    params: unknown = {},
    config?: AxiosRequestConfig
  ) => {
    return new Promise((resolve, reject) => {
      Axios.post(url, { data: params }, config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
}

interface GetMusic<T> {
  data: T;
}
// interface GET {
//   <T>(url: string, params?: unknown, config?: AxiosRequestConfig): Promise<
//     GetMusic<T>
//   >;
// }
export default EnclosureHttp;
