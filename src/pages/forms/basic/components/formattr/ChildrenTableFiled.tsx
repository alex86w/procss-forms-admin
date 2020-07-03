import React from 'react'
import { useModel } from 'umi'
import { Divider, Button, Dropdown, Menu } from 'antd'
import { FileAddOutlined, PlusOutlined, FileTextOutlined, NumberOutlined, FieldTimeOutlined, CheckCircleOutlined, CheckSquareOutlined, CopyOutlined, FundOutlined, EditOutlined, DeleteFilled } from '@ant-design/icons'
import { FormType, FormTypeTitle } from '@/services/constants'
import { generateFormItem } from '@/utils'

const ChildrenTableFiled = () => {
    const { selectItem, updateItem, addSubItem } = useModel('forms')

    function handleAddItem({ key }: any) {
        const item = generateFormItem(key, FormTypeTitle[FormType[key]], selectItem.id);
        addSubItem(item)
    }

    return (
        <>
            <span className='title'>字段</span>
            <div>
                {selectItem.items && selectItem.items.map(it => <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: '10px 10px 5px 5px',
                    alignItems: 'center'
                }} key={it.id}>
                    <span style={{ padding: '5px', border: '1px solid #d9d9d9', width: '81%' }}>{it.title}</span>
                    <div>
                        <CopyOutlined style={{ fontSize: 20 }} />
                        <DeleteFilled style={{ fontSize: 20 }} />
                    </div>
                </div>)}
            </div>
            <div>
                <Dropdown overlay={<Menu onClick={handleAddItem}>
                    <Menu.Item
                        key={FormType[FormType.singText]} >
                        <FileTextOutlined />{FormTypeTitle[FormType.singText]}
                    </Menu.Item>
                    <Menu.Item
                        key={FormType[FormType.mutileText]} >
                        <FileTextOutlined />{FormTypeTitle[FormType.mutileText]}
                    </Menu.Item>
                    <Menu.Item
                        key={FormType[FormType.numberText]} >
                        <NumberOutlined />{FormTypeTitle[FormType.numberText]}
                    </Menu.Item>
                    <Menu.Item
                        key={FormType[FormType.inputDate]} >
                        <FieldTimeOutlined />{FormTypeTitle[FormType.inputDate]}
                    </Menu.Item>
                    {/* <Menu.Item
                        key={FormType[FormType.radios]} >
                        <CheckCircleOutlined />{FormTypeTitle[FormType.radios]}
                    </Menu.Item>
                    <Menu.Item
                        key={FormType[FormType.checks]} >
                        <CheckSquareOutlined />{FormTypeTitle[FormType.checks]}
                    </Menu.Item> */}
                    <Menu.Item
                        key={FormType[FormType.select]} >
                        <CheckSquareOutlined />{FormTypeTitle[FormType.select]}
                    </Menu.Item>
                    <Menu.Item
                        key={FormType[FormType.selectCheck]} >
                        <CopyOutlined />{FormTypeTitle[FormType.selectCheck]}
                    </Menu.Item>
                    <Menu.Item
                        key={FormType[FormType.image]} >
                        <FundOutlined />{FormTypeTitle[FormType.image]}
                    </Menu.Item>
                    <Menu.Item
                        key={FormType[FormType.attchment]} >
                        <FundOutlined />{FormTypeTitle[FormType.attchment]}
                    </Menu.Item>
                    <Menu.Item
                        key={FormType[FormType.signName]} >
                        <EditOutlined />{FormTypeTitle[FormType.signName]}
                    </Menu.Item>

                </Menu>}>
                    <Button type='link'>
                        <PlusOutlined />请添加字段
                   </Button>
                </Dropdown>
            </div>
        </>
    )
}

export default ChildrenTableFiled
