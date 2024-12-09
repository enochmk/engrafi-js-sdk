import axios, { AxiosInstance } from 'axios';
import createHttpError from 'http-errors';
import { EngrafiConfig, ChurnResponse, EngrafiSubscriber, RegisterResponse } from './types/types';
import { formatDateOfBirth, formatPhoneNumber } from './utils';

export default class Engrafi {
  private axiosInstance: AxiosInstance;

  constructor(private urlConfig: EngrafiConfig) {
    this.axiosInstance = axios.create({
      timeout: 10000,
    });
  }

  async register(subscriber: EngrafiSubscriber): Promise<RegisterResponse> {
    subscriber.msisdn = formatPhoneNumber(subscriber.msisdn);
    subscriber.dateOfBirth = formatDateOfBirth(subscriber.dateOfBirth);
    try {
      const endpoint = `${this.urlConfig.registerBaseUrl}/mnp-registration`;
      const response = await this.axiosInstance.post(endpoint, subscriber);
      if (response?.data?.message !== 'Success') {
        throw createHttpError(response.status, 'Something went wrong');
      }
      return response.data as RegisterResponse;
    } catch (error: any) {
      if (error?.response) {
        const message = error.response.data?.message ?? 'Something went wrong';
        throw createHttpError(error.response.status, message);
      }
      throw error;
    }
  }

  async getDetails(msisdn: string): Promise<EngrafiSubscriber> {
    msisdn = formatPhoneNumber(msisdn);
    try {
      const endpoint = `${this.urlConfig.detailsBaseUrl}/get-customer-details`;
      const response = await this.axiosInstance.post(endpoint, { msisdn });
      if (response?.data?.statusCode !== 'SC0000') {
        const errorMessage = response?.data?.message ?? 'Something went wrong';
        throw createHttpError(response.status || 500, errorMessage);
      }
      return response.data as EngrafiSubscriber;
    } catch (error: any) {
      if (error.response) {
        const message =
          error.response.data.statusCode === 'FL0009' ? 'Number not registered' : 'Something went wrong';
        const status = error.response.data.statusCode === 'FL0009' ? 404 : error.response.status;
        throw createHttpError(status, message);
      }
      throw error;
    }
  }

  async isRegistered(msisdn: string): Promise<boolean> {
    msisdn = formatPhoneNumber(msisdn);
    try {
      const details = await this.getDetails(msisdn);
      return !!details;
    } catch (error) {
      return false;
    }
  }

  async churn(msisdn: string): Promise<ChurnResponse> {
    msisdn = formatPhoneNumber(msisdn);
    try {
      const endpoint = `${this.urlConfig.churnBaseUrl}/Middleware/api/adapter/v2/engrafi/recycle`;
      const response = await this.axiosInstance.post(endpoint, { msisdn });
      if (response?.data?.statusCode !== 'SC0000') {
        const errorMessage = response?.data?.message ?? 'Something went wrong when churning';
        throw createHttpError(response.status || 500, errorMessage);
      }
      return response.data as ChurnResponse;
    } catch (error: any) {
      if (error.response) {
        const message = error.response.data.message ?? 'Something went wrong when churning';
        throw createHttpError(error.response.status, message);
      }
      throw error;
    }
  }
}
