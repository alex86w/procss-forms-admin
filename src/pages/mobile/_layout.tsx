import React from 'react'
import { getToken } from '@/utils/request';
import Login from './login';
import { history } from 'umi';

const Layout: React.FC = (props: any) => {
    const { tosubid } = props.location.query || {}
    const { pathname } = location;
    if (
        !getToken()
        && !tosubid
        && !pathname.includes('/mobile/login')
        && !pathname.includes('/mobile/register')
    ) {
        history.push(`/mobile/login?redirect=${pathname}`)
    }
    return <div>{props.children}</div>
}

export default Layout;
