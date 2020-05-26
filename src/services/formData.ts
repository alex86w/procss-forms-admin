import { get, post } from '@/utils/request';
import { Response } from './base';

export const query = function ({ formId, ...rest }: any): Promise<Response<any>> {
    return post(`/api/formData/list/${formId}`, rest)
}
export const remove = function (params: any): Promise<Response<any>> {
    return get(`/api/formData/delete/${params}`)
}
export const querySelfFinish = function (params: any): Promise<Response<any>> {
    return get(`/api/formData/finishedByUser/list`, params)
}
export const querySelfFinishDetial = function (params: any): Promise<Promise<any>> {
    return get(`/api/formData/finishedByUser/detail/${params}`)
}
export const queryTemplate = function (params: any) {
    return get(`/api/form/excelExportTemplate/${params}`)
} 
