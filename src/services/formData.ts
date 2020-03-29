import { get } from '@/utils/request';
import { Response } from './base';

export const query = function (params: any): Promise<Response<any>> {
    return get(`/api/formData/list/${params}`)
}
export const remove = function (params: any): Promise<Response<any>> {
    return get(`/api/formData/delete/${params}`)
}
