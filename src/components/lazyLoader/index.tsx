import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Spin, message } from 'antd';


type LazyType = 'delay' | 'force';

interface LazyOpts {
    type?: LazyType;
    loader: Array<() => Promise<any>>;
    component: string;
}

const AsyncFC = ($loading: (bool: boolean) => void, loader: Array<() => Promise<any>>, $state: (a: any) => void) => {
    $loading(true)//loading start;
    let status;
    try {
        status = loader.map(async load => {
            const res = await load()//loadData
            if (res.success) {
                return res.data;
            } else {
                message.error('获取数据失败')//loader error networkErr
            }
        })
        $loading(false);//loading end
        return status;
    } catch (e) {
        console.log(e) //other err
    }
    $state(status)
}
export const LazyLoader = function (props: LazyOpts) {
    const [loading, $loading] = useState<boolean>(false);//loading
    const [state, $state] = useState<any>({})// store
    const { type, loader, component } = props;
    const LazyComponent = lazy(() => import(component));//component
    useEffect(() => {
        AsyncFC($loading, loader, $state)
    }, [])

    return <Suspense fallback={<Spin spinning={loading} />}>
        <LazyComponent loading={loading} state={state} />
    </Suspense>
}
