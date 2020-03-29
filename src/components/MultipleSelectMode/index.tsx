import React, { useState, useEffect } from 'react';
import { Tree, Modal, Col, Row, Tabs, Input, message, Checkbox } from 'antd';
import styles from './index.less';
import { UserOutlined, ApartmentOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import { User, Dept } from '@/models/multipleSelectMode';

const TabPlane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
interface SelectType {
    name: string;
    id: string;
    type: 'dept' | 'user';
}
interface MultipleSelectModeProps {
    visible: boolean;
    onOk: (selected: SelectType[]) => void;
    onCancel: () => void;
    value: any[]
}

const renderCheckBoxGroup = function (data: any[], value: any[], type: string, onChange: (type: string, value: any[]) => void) {
    return <Checkbox.Group style={{ width: "100%" }} onChange={value => onChange(type, value)} value={value.map(it => JSON.stringify(it))}>
        <Row>
            {data.map((user: any) => (<Col key={user.id} span={24}><span>{!!user.account ? <UserOutlined /> : <ApartmentOutlined />}&nbsp;{user.name}</span><Checkbox style={{ float: "right" }} value={JSON.stringify({ name: user.name, id: user.id, type: !!user.account ? 'user' : 'dept' })} /></Col>))}
        </Row>
    </Checkbox.Group>
}

export const renderTree = function (tree: any[]) {
    return tree.map(tr => {
        return <TreeNode title={<span><ApartmentOutlined />&nbsp;&nbsp;{tr.name}</span>} key={JSON.stringify({ name: tr.name, id: tr.id, type: !!tr.account ? 'user' : 'dept' })}>
            {tr.children && Array.isArray(tr.children) && renderTree(tr.children)}
        </TreeNode>
    })
}

export const MultipleSelectMode = function (props: MultipleSelectModeProps) {
    const { visible, onOk, onCancel, value } = props;

    const { users, depts, deptTree, $selectDept, deptUser, AsyncFetch } = useModel('multipleSelectMode');
    const [selected, $selected] = useState<SelectType[]>([]);
    const [search, $search] = useState<string>('');
    const [active, $active] = useState<boolean>(false);
    const userValue = selected.filter(it => it.type === 'user');
    const deptValue = selected.filter(it => it.type === 'dept');
    const handleSelect = function (type: string, payload: string[]) {
        payload = payload.map((it: string) => JSON.parse(it))
        if (type === 'user') {
            $selected([...deptValue, ...payload] as SelectType[])
        } else {
            $selected([...userValue, ...payload] as SelectType[])
        }
    }
    const handleDelete = function (id: string, type: string) {
        const next = selected.filter(it => it.type === type && it.id !== id);
        $selected(next);
    }

    const filterUser = !!search ? users.filter((item: User) => (item.name || "").includes(search)) : [];
    const filterDept = !!search ? depts.filter((item: Dept) => item.name.includes(search)) : [];

    useEffect(() => {
        $selected(value || []);
    }, [value])
    useEffect(() => {
        AsyncFetch();
    }, [])

    return <Modal
        visible={visible}
        width="600px"
        title="部门成员列表"
        onOk={() => onOk(selected)}
        onCancel={onCancel}
    >
        <Col span={24}>
            <Row><ul className={styles.cardbox}>
                {selected.map((item, index) => (
                    <li className={styles.boxItem} key={item.type + item.id}>
                        {item.type === 'user'
                            ? <UserOutlined style={{ color: '#1890ff' }} />
                            : <ApartmentOutlined />}
                        <span>{item.name}</span>&nbsp;&nbsp;&nbsp;
                        <CloseOutlined style={{ fontSize: 10 }} onClick={() => handleDelete(item.id, item.type)} />
                    </li>))}

            </ul></Row>
            <Row>
                <div className={styles.Tabs}>
                    <div className={styles.search}><SearchOutlined className={styles.searchIcon} onClick={() => $active(!active)} /></div>
                    <div className={styles[active ? "searchActive" : "searchBase"]}>
                        <Input
                            onChange={e => $search(e.target.value)}
                            prefix={<SearchOutlined className={styles.searchIcon} />}
                            suffix={<CloseOutlined className={styles.searchIcon} onClick={() => $active(!active)} />} />
                    </div>
                    <div className={styles[active ? 'searchResult-active' : 'searchResult-default']}>
                        <div>
                            <span>部门</span>
                            {renderCheckBoxGroup(filterDept, deptValue, 'dept', handleSelect)}
                        </div>
                        <div>
                            <span>人员</span>
                            {renderCheckBoxGroup(filterUser, userValue, 'user', handleSelect)}
                        </div>
                    </div>
                    <Tabs >
                        <TabPlane tab={<div className={styles.title}>部门</div>} key="0">
                            <div className={styles.content}>
                                <Tree
                                    checkable
                                    blockNode
                                    defaultExpandAll
                                    checkStrictly
                                    onCheck={({ checked }: any) => { handleSelect('dept', checked) }}
                                    checkedKeys={deptValue.map(it => JSON.stringify(it))} >
                                    {renderTree(deptTree)}
                                </Tree>
                            </div>
                        </TabPlane>
                        <TabPlane tab={<div className={styles.title}>人员</div>} key="1">
                            <div className={styles.content}>
                                <Row style={{ height: "100%" }}>
                                    <Col span={11}>
                                        <Tree blockNode defaultExpandAll onClick={(_: any, r: any) => {
                                            let clicked;
                                            try {
                                                clicked = JSON.parse(r.key)
                                                $selectDept(clicked.id)
                                            } catch (error) {
                                                clicked = {};
                                                message.error('操作失败,未获取到部门信息', 2000)
                                            }
                                        }}>
                                            {renderTree(deptTree)}
                                        </Tree>
                                    </Col>
                                    <Col span={2}><div style={{ height: "100%", width: 1, background: "#e0e0e0" }} /></Col>
                                    <Col span={11}>
                                        {renderCheckBoxGroup(deptUser, userValue, 'user', handleSelect)}
                                    </Col>
                                </Row>
                            </div>
                        </TabPlane>
                    </Tabs>
                </div>
            </Row>

        </Col>
    </Modal>

}