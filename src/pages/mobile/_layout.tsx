import React from 'react'
import { getToken } from '@/utils/request';
import Login from './login';

const Layout: React.FC = (props: any) => {
    const { tosubid } = props.location.query || {}
    if (!getToken() && !tosubid) {
        return <Login />
    }
    return <div>{props.children}</div>
}

export default Layout;
