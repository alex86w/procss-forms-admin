import { get } from '@/utils/request';
import { Response } from './base';

export const query = function ({ formId, ...rest }: any): Promise<Response<any>> {
    return get(`/api/formData/list/${formId}`, rest)
}
export const remove = function (params: any): Promise<Response<any>> {
    return get(`/api/formData/delete/${params}`)
}
