import axios from './index'
import { AxiosError, AxiosResponse } from 'axios';
import { status } from 'nprogress';

export default class Request {
  static get(url: string, params?: Record<string, any>): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      axios.get(url, { params }).then(
        (response: AxiosResponse) => {
          resolve(response);
        },
        (error: AxiosError) => {
          reject(error)
        }
      );
    });
  }

  static post(url: string, data?: Record<string, any> | FormData, params?: any): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      axios({
        url,
        method: "POST",
        data,
        params
      }).then(
        (response: AxiosResponse) => {
          resolve(response.data);
        },
        (error: AxiosError) => {
          reject(error)
        }
      );
    });
  }
}