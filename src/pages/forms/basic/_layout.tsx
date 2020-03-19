import React, { useEffect } from 'react'
import { Tabs, Layout, Button, PageHeader, Menu } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio'
import { history } from 'umi'
import { SelectParam } from 'antd/lib/menu'

const Basic: React.FC<any> = (props) => {

    const onHeaderChange = (e: SelectParam) => {
        switch (e.key) {
            case 'design':
                history.replace('/forms/basic/formdes');
                break;
            case 'process':
                history.replace('/forms/basic/process');
                break;
            case 'c':
                history.replace('/forms/datas');
                break;
        }
    };
    return (<div>
        <PageHeader style={{ backgroundColor: 'white', padding: 10 }} title={
            <Menu mode="horizontal" onSelect={onHeaderChange} defaultSelectedKeys={['design']}>
                <Menu.Item key="design">表单设计</Menu.Item>
                <Menu.Item key='process'>流程设计</Menu.Item>
                <Menu.Item key='public'>表单发布</Menu.Item>
                <Menu.Item key='permission'>数据权限</Menu.Item>
            </Menu>}
            extra={[<Button key='preview1' size="large">预览</Button>,
            <Button key='save1' size="large">保存</Button>,
            <Button key='next1' size="large" type="primary">下一步</Button>
            ]}
        />
        {props.children}

    </div>
    )
}


export default Basic;
