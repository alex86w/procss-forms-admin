import { get, post } from '@/utils/request';
export function query<T>(params: any): Promise<T> {
  return get<T>('/api/user/list', params);
}
export function modify<T>(params: any): Promise<T> {
  return post<T>('/api/user/update', params);
}
export function remove<T>(params: any): Promise<T> {
  return get<T>(`/api/user/delete/${params}`);
}
export function create<T>(params: any): Promise<T> {
  return post<T>('/api/user/add', params);
}
