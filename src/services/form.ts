import { get, post } from '@/utils/request';
import { Response } from './base';

export function query<T>(params: any): Promise<T> {
  return get<T>('/api/form/list', params);
}

export function modify(params: any): Promise<Response<any>> {
  return post<Response<any>>(`/api/form/update/${params.id}`, params);
}

export function create<T>(params: any): Promise<T> {
  return post<T>('/api/form/add', params);
}

export function remove<T>(params: any): Promise<T> {
  return get<T>(`/api/form/delete/${params}`);
}

export function querFormDeail(formId: string) {
  return get<Response<any>>(`/api/form/detail/${formId}`);
}

export function querSubmitFormDeail(formId: string) {
  return get<Response<any>>(`/api/form/toSubmit/${formId}`);
}

export function postFormData(formId: string, data: any) {
  return post<Response<any>>(`/api/formdata/submit/${formId}`, data);
}

export function getTodoForms(todoId: string) {
  return get<Response<any>>(`/api/formdata/tosubmit/${todoId}`);
}

export function getTodoHistory(todoId: string) {
  return get<Response<any>>(`/api/formdata/tohistory/${todoId}`);
}


