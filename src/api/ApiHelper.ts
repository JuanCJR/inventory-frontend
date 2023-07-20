import { config } from "@/config";
import axios, { AxiosRequestConfig, Method } from "axios";

export const instance = axios.create({
  timeout: 15000,
  //   withCredentials: true,
});

// export const interceptor = instance.interceptors.response.use(
//   onSuccessCall,
//   onRejectedCall
// );

interface ParamsInterface {
  [key: string]: any;
}
export default class ApiHelper<T> {
  private url: string;
  private method: Method;
  private params: { [key: string]: string | number } = {};
  private header: { [key: string]: string | number } = {};
  private body: any;

  constructor(method: Method, url: string) {
    this.url = url;
    this.method = method;
  }

  addBaseUrl(url: string) {
    instance.defaults.baseURL = url;
  }
  addUrlParam(urlParam?: string | number) {
    this.url = `${this.url}/${urlParam}`;
  }

  addQueryParams(params: ParamsInterface) {
    const paramNames = Object.keys(params);
    paramNames.forEach((name) => {
      if (params[name] !== "" && params[name] !== 0)
        this.params[name] = params[name];
    });
  }

  addHeaderParams(params: ParamsInterface) {
    const paramNames = Object.keys(params);
    paramNames.forEach((name) => {
      if (params[name] !== "" && params[name] !== 0)
        this.header[name] = params[name];
    });
  }

  addBody(data: any) {
    this.body = data;
  }

  async do() {
    const axiosRequestConfig: AxiosRequestConfig = {
      method: this.method,
      url: this.url,
      params: this.params,
      headers: this.header,
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
      data: this.body,
    };
    const response = await axios<T>(axiosRequestConfig);
    return { data: response.data, status: response.status };
  }
}
