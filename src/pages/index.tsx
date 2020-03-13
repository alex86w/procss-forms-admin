import React from 'react';
import { Redirect } from 'umi';

export default (props: any) => {
  return <Redirect to={`/ahayaPage?redirect=${props.location.pathname}`} />;
};
