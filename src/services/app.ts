import { get, post } from '@/utils/request';

export function query(params: string) {
  return get('/api/app/list', params);
}
export function create(params: string) {
  return post('/api/app/create', params);
}
