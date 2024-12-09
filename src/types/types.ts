export interface EngrafiConfig {
  registerBaseUrl: string;
  detailsBaseUrl: string;
  churnBaseUrl: string;
}

export interface EngrafiSubscriber {
  action: string;
  msisdn: string;
  iccid: string;
  firstName: string;
  lastName: string;
  nationality: string;
  dateOfBirth: string;
  docType: 'National ID' | 'Passport' | 'Driving License' | 'Voter ID' | 'Unknown';
  docNumber: string;
  gender: 'Male' | 'Female';
  address: string;
  city: string;
  region: string;
  userName: string;
  middleName?: string;
  ismfsRequired?: string;
  updateDate?: string;
  kycStatus?: string;
  channel?: string;
  imsi?: string;
  mfscreated?: string;
  registrationCount?: string;
  workItemTaskName?: string;
  customerId?: string;
  transactionId?: string;
  accountId?: string;
  doAudit?: string;
  mfsStatus?: string;
  operation?: string;
  status?: string;
  fullname?: string;
  createDate?: string;
  alternateContactNumber?: string;
  kinFirstName?: string;
  kinLastName?: string;
}

export interface RegisterResponse {
  message: string;
  respTime: string;
  statusCode: string;
  responseMap: {
    accountId: string;
    registrationId: string;
    customerId: string;
  };
}

export interface ChurnResponse {
  message: string;
  respTime: string;
  statusCode: string;
  responseMap: any;
}

export interface EngrafiDetails {
  message: string;
  respTime: string;
  statusCode: string;
  responseMap: ResponseMap;
}

export interface ResponseMap {
  totalNumberOfRecords: number;
  pageNumber: number;
  perPageCount: number;
  totalPages: number;
  customerDetails: EngrafiSubscriber[];
}
