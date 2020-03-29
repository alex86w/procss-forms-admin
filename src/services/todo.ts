import { get, } from '@/utils/request';

export const query = function ({ state, ...rest }: any) {
    return get(`/api/formTodo/list/${state}`, rest)
}
export const queryAll = function (state: number) {
    return get(`/api/formTodo/listAll`)
}

