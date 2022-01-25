import axios from "axios";
import qs from 'qs'
import { AxiosError, AxiosResponse } from "axios";

export const loginRequest = (params: any): Promise<any> => {
  return new Promise((resolve: Function, reject: Function) => {
    axios({
      method: "POST",
      url: "/auth/oauth/token",
      data: qs.stringify(params),
      headers: {
        "content-type": "application/x-www-form-urlencoded; chartset=utf-8",
        "Authorization": `Basic ${btoa('dt-id:dt-secret')}`
      }
    }).then((response: AxiosResponse) => {
      if(response.status === 200) {
        resolve(response.data);
      } else {
        resolve(response);
      }
    }).catch((error: AxiosError) => {
      reject(error);
    });
  })
}