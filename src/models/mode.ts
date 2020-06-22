import { useEffect, useReducer, Dispatch } from 'react';
import { Response } from '@/services/base';
import { message } from 'antd';
import { query as queryUsers } from '@/services/user';
import { queryUserDepts as queryTree, queryUsers as queryDeptUsers, queryAlldept } from '@/services/dept';
import { query as queryRoleTree } from '@/services/role';



type stringType = string | null;

export interface User {
    id: string;
    pwd: string;
    account: string;
    name: stringType;
    eMail: stringType;
    weChartId: stringType;
    status: stringType;
    createdAt: string;
    updateAt: string;
    sysRoleId: string
}
export interface Dept {
    id: string;
    name: string;
    hasChildren: boolean;
    appId: null;
}
interface TreeDept extends Dept {
    children: TreeDept[]
}
export interface Role {
    id: string;
    name: string;
}
interface TreeRole extends Role {
    children: TreeRole[]
}


const FetchAsync = async function (method: (params: any) => Promise<Response<any>>, params: any, setter: Dispatch<any>) {

    const res = await method(params);
    if (res.success) {
        setter(res.data)
    } else {
        message.warning('获取数据失败', 2)
    }
}
const cfg = {
    depts: [] as Dept[],
    users: [] as User[],
    roles: [] as Role[],
    deptTree: [] as TreeDept[],
    deptUser: [] as User[],
    roleTree: [] as TreeRole[],

    selectDept: '' as string,
}
const reduce = function (store: typeof cfg, action: { type: string, payload: any }) {
    return { ...store, [action.type]: action.payload };
}

export default () => {
    const [store, dispatch] = useReducer(reduce, cfg)
    const $depts = (data: Dept[]) => dispatch({ type: 'depts', payload: data });
    const $deptTree = (data: TreeDept[]) => dispatch({ type: 'deptTree', payload: data });
    const $users = (data: User[]) => dispatch({ type: 'users', payload: data });
    const $deptsUser = (data: User[]) => dispatch({ type: 'deptUser', payload: data });
    const $selectDept = (data: string) => dispatch({ type: 'selectDept', payload: data });
    const $roleTree = (data: TreeRole[]) => dispatch({ type: 'roleTree', payload: data });
    const $roles = (data: Role[]) => dispatch({ type: 'roles', payload: data });


    function AsyncFetch() {
        const params = { page: 0, size: 1000 };
        FetchAsync(queryAlldept, params, $depts);
        FetchAsync(queryUsers, params, $users);
        FetchAsync(queryTree, params, $deptTree);
        FetchAsync(queryRoleTree as any, params, $roleTree);
        FetchAsync(queryRoleTree as any, { ...params, noBuildTree: true }, $roles);
    }
    useEffect(() => {
        if (store.selectDept) {
            FetchAsync(queryDeptUsers, { deptId: store.selectDept }, $deptsUser);
        }
    }, [store.selectDept])
    return {
        ...store,
        $selectDept,
        AsyncFetch
    };

}