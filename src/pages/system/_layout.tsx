import React, { ReactElement, ReactNode, ReactChildren } from 'react';
import ProLayout, { MenuDataItem } from '@ant-design/pro-layout';
import * as Icons from '@ant-design/icons';
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon';
import zhCN from 'antd/es/locale/zh_CN';
import '../index.less';
import { Link } from 'umi';
import './index.less';
import { ConfigProvider } from 'antd';
import { RightContent } from './component/rigthContent';


const loop: string[] = ['用户管理', '字典管理']

function toHump(name: string): string {
  return name.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}

const IconFormatter: (
  str: string,
) => ReactElement | ReactNode | null = function (str) {
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
const renderMenuName = function (menu: any) {
  let user: any = localStorage.getItem('user');
  try {
    user = JSON.parse(user);
  } catch (error) {
    user = {}
  }
  const isAdmin = !!user.sysRole;
  const { title: name } = menu;
  if (loop.includes(name)) {
    return isAdmin ? name : ''
  }
  return name
}

const loopMenuData = (routes: Route[]): Route[] => {
  return routes
    .map(item => ({
      ...item,
      name: renderMenuName(item),
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
    <>
      <div style={{ width: "100%", height: 70, paddingLeft: 20, paddingTop: 10, textAlign: 'center', alignItems: 'center', userSelect: 'none', background: '#1890ff' }}>
        <img src={require('../../asserts/img/logo.png')} style={{ width: 50, height: 50, float: 'left', marginTop: 2.5 }} />
        <span style={{ float: 'left', marginLeft: 20, letterSpacing: 2 }}><h3 style={{ color: 'white', fontSize: '22px', lineHeight: '50px' }}>攀枝花市花城外国语智慧校园管理系统</h3></span>
        <span style={{ float: 'right', lineHeight: '60px', paddingRight: 100 }}><RightContent /></span>
      </div>
      <ProLayout
        title={undefined}
        menuDataRender={() => loopMenuData(route.routes)}
        navTheme="light"
        headerRender={false}
        iconfontUrl=""
        logo={undefined}
        menuItemRender={menuItemRender}
        rightContentRender={false}
        menuHeaderRender={false}
        style={{ height: 'calc(100vh - 70px )' }}
      >
        <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
      </ProLayout>
    </>
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
