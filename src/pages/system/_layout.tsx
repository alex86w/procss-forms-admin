import React, { ReactElement, ReactNode, ReactChildren } from 'react';
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout';
import * as Icons from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import zhCN from 'antd/es/locale/zh_CN';

import { Link } from 'umi';

import './index.less';
import { ConfigProvider } from 'antd';

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
  const AnyIcons = Icons as any;
  const newStr = str.replace(str[0], str[0].toUpperCase());
  const v4IconName = toHump(newStr);

  //获取对应Icon

  const NewIcon: React.ForwardRefExoticComponent<AntdIconProps &
    React.RefAttributes<HTMLSpanElement>> =
    AnyIcons[str] ||
    AnyIcons[`${v4IconName}Outlined`] ||
    AnyIcons[`${v4IconName}Filled`] ||
    AnyIcons[`${v4IconName}TwoTone`];

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
  return routes
    .map(item => ({
      ...item,
      name: item.title,
      icon: IconFormatter(item.icon),
      routes:
        item.routes && item.routes.length > 0 ? loopMenuData(item.routes) : [],
    }))
    .sort((a: any, b: any) => a.sort - b.sort);
};

interface Route {
  [key: string]: any;
  routes: Array<Route> | [];
}
export default function BasicLayout(props: {
  route: Route;
  children: ReactChildren;
}) {
  const { route, children } = props;
  return (
    <ProLayout
      title="JTINFO"
      menuDataRender={() => loopMenuData(route.routes)}
      navTheme="light"
      menuItemRender={menuItemRender}
    >
      <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
    </ProLayout>
  );
}
BasicLayout.title = '系统管理';
BasicLayout.icon = 'setting';
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
