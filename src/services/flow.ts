import { get, post } from '@/utils/request';
export const query = function (params: any) {
    return get(`/api/procedure/detail/${params.formId}`, { isFormId: true })
}
export const remove = function (params: any) {
    return get(`/api/procedure/delete/${params.formId}`, { isFormId: true })
}

export const update = function ({ formId, ...rest }: { formId: string, rest: any[] }) {
   console.log(rest)
    return post(`/api/procedure/updateOrAdd/${formId}`, { ...rest })
}