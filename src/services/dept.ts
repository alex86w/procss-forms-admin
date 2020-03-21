import { get, post } from '@/utils/request';
import { stringify } from 'qs';
export function query<T>(params: any): Promise<T> {
  console.log(params);
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
export function queryUsers<T>(params: any): Promise<T> {
  return get<T>('/api/user/dept/list', params);
}
export function removeUser<T>(ids: any[]): Promise<T> {
  return get<T>(`/api/user/dept/bulkDelete?ids=${ids.join(',')}`);
}
export function addusers<T>({ userIds, targetDeptIds }: any): Promise<T> {
  console.log(userIds, targetDeptIds);
  return get<T>(
    `/api/user/dept/bulkAddAssociation?userIds=${userIds.join(
      ',',
    )}&targetDeptId=${targetDeptIds}`,
  );
}
