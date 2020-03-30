import React from 'react'
import { getToken } from '@/utils/request';
import Login from './login';

const Layout: React.FC = (props: any) => {
    if (!getToken()) {
        <Login/>
    }
    return <div>{ props.children}</div>
}

export default Layout;
