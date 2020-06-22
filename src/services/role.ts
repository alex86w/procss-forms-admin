import { get, post } from '@/utils/request';

export async function query(params: any) {
    return get(`/api/role/list`, params)
}
export async function create(params: any) {
    return post(`/api/role/create`, params)
}
export async function modify(params: any) {
    return post(`/api/role/update`, params)
}
export async function remove(params: string) {
    return get(`/api/role/delete/${params}`)
}
export async function addUserTo(params: any) {
    return get(`/api/role/addUserTo/${params.roleId}/${params.userIds}`)
}
export async function queryUser({ id, ...rest }: any) {
    return get(`/api/role/listUser/${id}`, rest)
}
export async function removeUser(params: any) {
    return get(`/api/role/delete/${params.roleId}/${params.userId}`)
}