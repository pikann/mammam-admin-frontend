import axios, {AxiosInstance} from 'axios';
import {isEmpty} from 'lodash';

import Urls from '../constants/Urls';

const singletonEnforcer = Symbol();

class AxiosClient {
  axiosClient: AxiosInstance;
  static axiosClientInstance: AxiosClient;

  constructor(enforcer: any) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot initialize Axios client single instance');
    }
    this.axiosClient = axios.create({
      baseURL: Urls.API,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  static get instance() {
    if (!this.axiosClientInstance) {
      this.axiosClientInstance = new AxiosClient(singletonEnforcer);
    }

    return this.axiosClientInstance;
  }

  setHeader(userToken: string = '') {
    const jwt =
      /^([A-Za-z0-9\-_~+]+[=]{0,2})\.([A-Za-z0-9\-_~+]+[=]{0,2})(?:\.([A-Za-z0-9\-_~+]+[=]{0,2}))?$/;

    if (jwt.test(userToken)) {
      this.axiosClient.defaults.headers.common.Authorization = `Bearer ${userToken}`;
    }
  }

  get(resource: string, slug = '') {
    const requestURL = isEmpty(slug) ? `${resource}` : `${resource}/${slug}`;
    return this.axiosClient.get(requestURL);
  }

  post(resource: string, data: object) {
    return this.axiosClient.post(`${resource}`, data);
  }

  update(resource: string, data: object) {
    return this.axiosClient.put(`${resource}`, data);
  }

  put(resource: string, data: object) {
    return this.axiosClient.put(`${resource}`, data);
  }

  patch(resource: string, data: object) {
    return this.axiosClient.patch(`${resource}`, data);
  }

  delete(resource: string, data: object) {
    return this.axiosClient.delete(`${resource}`, {
      params: data,
    });
  }
}

export default AxiosClient.instance;
