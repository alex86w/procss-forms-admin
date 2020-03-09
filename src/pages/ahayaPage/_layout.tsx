import React, { ReactElement, ReactNode, ReactChildren } from 'react';
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout';
import * as Icons from '@ant-design/icons/lib/icons';
import { Link } from 'umi';

import './index.less';

function toHump(name: string): string {
  return name.replace(/\-(\w)/g, function(all, letter) {
    return letter.toUpperCase();
  });
}

const IconFormatter: (
  str: string,
) => ReactElement | ReactNode | null = function(str) {
  if (!str) {
    return null;
  }

  const newStr = str.replace(str[0], str[0].toUpperCase());
  const v4IconName = toHump(newStr);

  //获取对应Icon

  const NewIcon =
    //@ts-ignore
    Icons[str] ||
    //@ts-ignore
    Icons[`${v4IconName}Outlined`] ||
    //@ts-ignore
    Icons[`${v4IconName}Filled`] ||
    //@ts-ignore
    Icons[`${v4IconName}TwoTone`];
  if (NewIcon) {
    let IconCP: ReactElement | null;
    try {
      IconCP = React.createElement(NewIcon);
    } catch (error) {
      console.error(error);
      IconCP = null;
    }
    return IconCP;
  }
};

const loopMenuData = (routes: Route[]): Route[] => {
  return routes.map(item => ({
    ...item,
    name: item.title,
    icon: IconFormatter(item.icon),
    routes:
      item.routes && item.routes.length > 0 ? loopMenuData(item.routes) : [],
  }));
};

interface Route {
  [key: string]: any;
  routes: Array<Route> | [];
}
export default function(props: { route: Route; children: ReactChildren }) {
  const { route, children } = props;
  return (
    <ProLayout
      title="JTINFO"
      menuDataRender={() => loopMenuData(route.routes)}
      navTheme="light"
      menuItemRender={menuItemRender}
    >
      {children}
    </ProLayout>
  );
}
function menuItemRender(
  menuItemProps: MenuDataItem & { isUrl: boolean },
  defaultDom: React.ReactNode,
): React.ReactNode {
  return menuItemProps.isUrl ? (
    defaultDom
  ) : (
    <Link className="qixian-menuItem" to={menuItemProps.path || '/'}>
      {defaultDom}
    </Link>
  );
}
