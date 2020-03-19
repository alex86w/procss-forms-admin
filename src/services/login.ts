import { post } from '@/utils/request';
export function loginFetch<T>(param: any): Promise<T> {
  return post<T>('/api/auth/login', param);
}
