import React from 'react';
import ProLayout from '@ant-design/pro-layout';

import './index.less';
import { Link } from 'umi';
export default function(props: any) {
  return (
    <ProLayout
      title="JTINFO"
      rightContentRender={() => <div />}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      navTheme="light"
      {...props}
    />
  );
}
