import { get, post } from '@/utils/request';
export function query<T>(params: any): Promise<T> {
  return get<T>('/api/dept/list/deptTree', params);
}
export function modify<T>(params: any): Promise<T> {
  return post<T>('/api/dept/update', params);
}
export function remove<T>(params: any): Promise<T> {
  return get<T>(`/api/dept/delete/${params}`);
}
export function create<T>(params: any): Promise<T> {
  return post<T>('/api/dept/addDept', params);
}
