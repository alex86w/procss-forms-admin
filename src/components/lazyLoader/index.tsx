// import React, { lazy, Suspense, useState, useEffect } from 'react';
// import { Spin, message } from 'antd';
// // import { query } from '@/services/user';
// // import { Response } from '@/services/base';


// type LazyType = 'delay' | 'force';

// interface LazyOpts {
//     type?: LazyType;
//     loader: Array<() => Promise<any>>;
//     component: string;
// }

// export const LazyLoader = function (props: LazyOpts) {
//     const [loading, $loading] = useState<boolean>(true);//loading
//     const [state, $state] = useState<any>({})// store
//     const { type, loader, component } = props;
//     const LazyComponent = lazy(() => import("../../pages/system/auth"));//component
//     useEffect(() => {
//         let status;
//         try {
//             status = loader.map(async (load, index) => {
//                 !loading && $loading(true)//loading start;

//                 // const res = await query({ page: 0, size: 10 }) as Response<any>;
//                 // if (res.success) {
//                 //     if (index === loader.length - 1) {
//                 //         $loading(false)
//                 //     }
//                 //     return res.data;
//                 // } else {
//                 //     message.error('获取数据失败',2)//loader error networkErr
//                 //     return {}
//                 // }

//             })
//         } catch (e) {
//         }
//         $state(status)
//     }, [])

//     return <Suspense fallback={<Spin spinning={loading} style={{ zIndex: 100, height: 100, width: 100 }} />}>
//         {
//             //@ts-ignore
//             <LazyComponent loading={loading} state={state} />
//         }
//     </Suspense>
// }
