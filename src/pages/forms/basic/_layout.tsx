//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { Button, PageHeader, Menu, Modal } from 'antd'
import { history, useModel, useHistory } from 'umi'
import { SelectParam } from 'antd/lib/menu'
import { FormItems } from '@/services/interface/forms.interface'
import Mobile from '../mobile'
export const ITEMs: Array<FormItems> = [];
const Basic: React.FC = (props) => {
    const [visible, setVisble] = useState(false)
    const { saveForm } = useModel('forms')
    const { query } = history.location

    const onHeaderChange = (e: SelectParam) => {
        switch (e.key) {
            case 'design':
                history.replace({ pathname: '/forms/basic/formdes', query });
                break;
            case 'process':
                history.replace({ pathname: '/forms/basic/process', query });
                break;
            case 'c':
                history.replace({ pathname: '/forms/datas', query });
                break;
        }
    };



    return (<div>
        <PageHeader style={{ backgroundColor: 'white', padding: 10 }} title={
            <Menu mode="horizontal" onSelect={onHeaderChange} defaultSelectedKeys={['design']}>
                <Menu.Item key="design">表单设计</Menu.Item>
                <Menu.Item key='process'>流程设计</Menu.Item>
                <Menu.Item key='publish'>表单发布</Menu.Item>
                <Menu.Item key='permission'>数据权限</Menu.Item>
            </Menu>}
            extra={[<Button key='preview1' onClick={() => setVisble(true)} size="large">预览</Button>,
            <Button key='save1' size="large" onClick={saveForm} >保存</Button>,
            <Button key='next1' size="large" type="primary">下一步</Button>
            ]}
        />
        {props.children}

        <Modal destroyOnClose visible={visible} onCancel={() => setVisble(false)}>
            <Mobile />
        </Modal>

    </div>
    )
}


export default Basic;
