import React from 'react';
import { Redirect } from 'umi';
import './index.less';

export default (props: any) => {
  return <Redirect to={`/system/user?redirect=${props.location.pathname}`} />;
};
