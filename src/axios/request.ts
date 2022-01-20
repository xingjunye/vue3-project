import axios from './index'
import qs from 'qs'
import { AxiosError, AxiosResponse } from 'axios';

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

  static post(url: string, params?: Record<string, any>): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => {
      axios.post(url, qs.stringify(params)).then(
        (response: AxiosResponse) => {
          resolve(response);
        },
        (error: AxiosError) => {
          reject(error)
        }
      );
    });
  }
}