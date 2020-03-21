import { get, post } from '@/utils/request';

export function query(params: any): Promise<any> {
  return get(`/api/dict/list`, params);
}
export function queryDetail(name: any): Promise<any> {
  return get(`/api/dict/listDetails?dictId=${name}`);
}
export function modify(params: any): Promise<any> {
  return post('/api/dict/update', params);
}
export function modifyDetail(params: any): Promise<any> {
  return post('/api/dict/updateDetails', params);
}
export function create(params: any): Promise<any> {
  return post('/api/dict/add', params);
}
export function createDetail(params: any): Promise<any> {
  return post(`/api/dict/addDetails`, params);
}
export function $remove(id: string): Promise<any> {
  return get(`/api/dict/delete/${id}`);
}
export function removeDetail(id: string): Promise<any> {
  return get(`/api/dict/deleteDetails/${id}`);
}
