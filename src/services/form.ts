import { get, post } from '@/utils/request';

export function query<T>(params: any): Promise<T> {
  return get<T>('/api/form/list', params);
}

export function modify<T>(params: any): Promise<T> {
  return post<T>(`/api/form/update/${params.id}`, params);
}

export function create<T>(params: any): Promise<T> {
  return post<T>('/api/form/add', params);
}

export function remove<T>(params: any): Promise<T> {
  return get<T>(`/api/form/delete/${params}`);
}
