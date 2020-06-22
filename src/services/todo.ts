import { get, post } from '@/utils/request';
import { ReactText } from 'react';

export const query = function ({ state, ...rest }: any) {
    return get(`/api/formTodo/list/${state}`, rest)
}
export const queryAll = function (state: number) {
    return get(`/api/formTodo/listAll`)
}
export const queryGroup = function (state: ReactText) {
    return get(`/api/formTodo/formGroup/${state}`)

}