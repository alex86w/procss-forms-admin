import { post, get } from '@/utils/request';
export function loginFetch<T>(param: any): Promise<T> {
  return post<T>('/api/auth/login', param);
}
export function query<T>(params: any): Promise<T> {
  return get<T>('/api/user/dept/userWhitRoot', params);
}
export function modify<T>(params: any): Promise<T> {
  return post<T>('/api/user/update', params);
}
export function remove<T>(params: any): Promise<T> {
  return get<T>(`/api/user/delete/${params}`);
}
export function create<T>(params: any): Promise<T> {
  return post<T>('/api/user/dept/createWithDept', params);
}
export function queryAll<T>(params: any): Promise<T> {
  return get<T>('/api/user/all', params);
}
