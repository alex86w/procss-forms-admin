import { get, post } from '@/utils/request';

export async function query(params: any) {
    return get(`/api/role/list`, params)
}
export async function create(params: any) {
    return post(`/api/role/update`, params)
}
export async function modify(params: any) {
    return post(`/api/role/update`, params)
}
export async function remove(params: string) {
    return get(`/api/role/delete/${params}`)
}
export async function addUserTo(params: any) {
    return get(`/api/role/addUserTo/${params.roleId}/${params.userId}`)
}
export async function queryUser(params: string) {
    return get(`/api/listUser/${params}`)
}
export async function removeUser(params: any) {
    return get(`/api/delete/${params.roleId}/${params.userId}`)
}