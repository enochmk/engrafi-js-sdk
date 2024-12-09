import dayjs from 'dayjs';
import createHttpError from 'http-errors';

export function formatPhoneNumber(msisdn: string): string {
  // validate if number is 9, 10 or 12 digits
  if (!/^\d{9,12}$/.test(msisdn)) {
    throw createHttpError(400, 'Invalid phone number length');
  }

  // validate if it's a strng of numbers
  if (!/^\d+$/.test(msisdn)) {
    throw createHttpError(400, 'Invalid phone number format');
  }
  const phoneNumber = msisdn.slice(-9);
  return phoneNumber;
}

export function formatDateOfBirth(date: string): string {
  const targetFormat = 'YYYY-MM-DD';
  const supportedFormats = ['YYYY-MM-DD', 'DD/MM/YYYY', 'DD-MM-YYYY', 'YYYY/MM/DD', 'YYYY-MM-DD'];
  const parsedDate = dayjs(date, supportedFormats, true);
  if (!parsedDate.isValid()) {
    throw createHttpError(400, 'Invalid date format');
  }
  return parsedDate.format(targetFormat);
}
