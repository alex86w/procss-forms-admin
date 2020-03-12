import { Response } from './base';
export function loginFetch<T>(param: any): Response<T> {
  return { success: true, data: param };
}
