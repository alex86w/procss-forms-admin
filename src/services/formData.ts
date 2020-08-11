import { get, post } from '@/utils/request';
import { Response } from './base';

export const query = function ({ formId, ...rest }: any): Promise<Response<any>> {
    return post(`/api/formData/list/${formId}`, rest)
}
export const remove = function (params: any): Promise<Response<any>> {
    return get(`/api/formData/deleteFlowData/${params}`)
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
export const queryCheckList = function ({ formId, ...rest }: any) {
    return post(`/api/formData/checkList/${formId}`, rest)
}
export const querySignGroup = function (formId: any) {
    return get(`/api/formData/signGroup/${formId}`)
}
export const createFormData = function ({ id, ...rest }: any) {
    return post(`/api/formData/add/${id}`, rest)
}
export const modifyFormData = function (data: any) {
    return post(`/api/formData/updateFlowData`, data)
}

export const removeFormData = function (id: string) {
    return get(`/api/formData/deleteFlowData/${id}`)
}
export const deleteFlowData = function (id: string) {
    return
}

