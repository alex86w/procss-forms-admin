//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { Button, PageHeader, Menu, Modal, Select } from 'antd'
import { history, useModel, useHistory } from 'umi'
import { SelectParam } from 'antd/lib/menu'
import { FormItems } from '@/services/interface/forms.interface'
import Mobile from '../mobile'
import './index.less'
export const ITEMs: Array<FormItems> = [];
const { Option } = Select
const Basic: React.FC = (props) => {
    const [visible, setVisble] = useState(false)
    const { saveForm, forms } = useModel('forms')
    const { query } = history.location
    const getDefaultSelectKey = () => {
        switch (history.location.pathname) {
            case '/forms/basic/formdes':
                return ['design'];
            case '/forms/basic/process':
                return ['process'];
            case '/forms/basic/publish':
                return ['publish'];
            case '/forms/basic/permission':
                return ['permission'];
        }
    }
    const onHeaderChange = (e: SelectParam) => {
        switch (e.key) {
            case 'design':
                history.replace({ pathname: '/forms/basic/formdes', query });
                break;
            case 'process':
                history.replace({ pathname: '/forms/basic/process', query });
                break;
            case 'publish':
                history.replace({ pathname: '/forms/basic/publish', query });
                break;
            case 'permission':
                history.replace({ pathname: '/forms/basic/permission', query });
                break;
        }
    };



    return (<div>
        <PageHeader style={{ backgroundColor: 'white', padding: 10 }} title={
            <Menu mode="horizontal" onSelect={onHeaderChange} defaultSelectedKeys={getDefaultSelectKey()}>
                <Menu.Item key="design">表单设计</Menu.Item>
                <Menu.Item key='process'>流程设计</Menu.Item>
                <Menu.Item key='publish'>表单发布</Menu.Item>
                <Menu.Item key='permission'>数据权限</Menu.Item>
            </Menu>}
            extra={[<Button key='preview1' onClick={() => setVisble(true)} size="large">预览</Button>,
            location.pathname === '/forms/basic/process' ? <Fragment/> : <Button key='save1' size="large" onClick={saveForm} >保存</Button>,
            <Button key='next1' size="large" type="primary">下一步</Button>
            ]}
        />
        {props.children}

        <Modal footer={null} width='90%' destroyOnClose visible={visible} onCancel={() => setVisble(false)}>
            <div style={{ display: 'flex', backgroundColor: 'blue', width: '100%', flexDirection: 'row' }}>
                <div style={{ background: '#c2c2c2', textAlign: 'center', padding: 10, width: '100%' }}>
                    <iframe className="mobile_view" src={`/forms/mobile?formid=${forms.id}`} />
                </div>
                <div style={{ width: '200px', height: '50vh', backgroundColor: 'yellow' }}>

                </div>
            </div>
        </Modal>

    </div>
    )
}


export default Basic;
