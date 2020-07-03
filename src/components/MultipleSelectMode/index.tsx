import React, { useState, useEffect } from 'react';
import { Tree, 
    Modal, 
    Col, 
    Row, 
    Tabs, 
    Input, 
    Checkbox, 
    Button } from 'antd';
import styles from './index.less';
import {
    UserOutlined,
    ApartmentOutlined,
    CloseOutlined,
    SearchOutlined,
    UsergroupAddOutlined,
    PlusOutlined
} from '@ant-design/icons';
import { useModel } from 'umi';
import { User, Dept } from '@/models/mode';

const TabPlane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
export interface SelectType {
    name: string;
    id: string;
    type: 'dept' | 'user' | 'role' | 'dynamicRole' | 'dynamicUser';
    rootDeptId: string,
    deptId?: string
}
interface MultipleSelectModeProps {
    visible: boolean;
    onOk: (selected: SelectType[]) => void;
    onCancel: () => void;
    value: any[],
    useDynamic?: boolean
}

const IconUser = UserOutlined;
const IconDept = ApartmentOutlined;
const IconClose = CloseOutlined;
const IconRole = UsergroupAddOutlined;

const SelectedList = function ({ selected, close }: { selected: any[], close: (id: string, type: string) => void }) {
    return <Row>
        <ul className={styles.cardbox}>
            {selected.map((item, index) => (
                <li className={styles.boxItem} key={item.type + item.id}>
                    {item.type === 'user'
                        ? <IconUser />
                        : item.type === 'dept'
                            ? <IconDept />
                            : <IconRole />}
                    <span>{item.name}</span>&nbsp;&nbsp;&nbsp;
                    <IconClose style={{ fontSize: 10 }} onClick={() => close(item.id, item.type)} />
                </li>))}
        </ul>
    </Row>

}
const renderCheckBoxGroup = function (data: any[], value: any[], type: string, onChange: (type: string, value: any[], rootDeptId?: string) => void, deptId?: string) {
    return (
        <Checkbox.Group style={{ width: "100%" }} onChange={value => onChange(type, value.map(it => {
            const e = data.find(item => item.id === it);
            if (e) {
                return { name: e.name, id: e.id, type: !!e.account ? 'user' : 'dept', deptId }
            }
        }), data[0]?.rootDeptId)} value={value.map(it => it.id)}>
            <Row>
                {data.map((user: any) => (<Col key={user.id} span={24}><span>{!!user.account ? <UserOutlined /> : <ApartmentOutlined />}&nbsp;{user.name}</span><Checkbox style={{ float: "right" }} value={
                    user.id
                } /></Col>))}
            </Row>
        </Checkbox.Group>
    )
}
export const renderTree = function (tree: any[]) {
    return tree.map(tr => {
        return <TreeNode title={<span><ApartmentOutlined />&nbsp;&nbsp;{tr.name}</span>} key={
            tr.id
        }>
            {tr.children && Array.isArray(tr.children) && renderTree(tr.children)}
        </TreeNode>
    })
}

export const SelectModal = function (props: MultipleSelectModeProps) {
    const { visible, onOk, onCancel, value } = props;

    const {
        users = [],
        depts = [],
        deptTree = [],
        $selectDept,
        deptUser = [],
        roles = [],
        roleTree = []
    } = useModel('mode') || {};
    const [selected, $selected] = useState<SelectType[]>([]);
    const [search, $search] = useState<string>('');
    const [active, $active] = useState<boolean>(false);
    const [deptId, $deptId] = useState<string>('')
    const userValue = selected.filter(it => it.type === 'user');
    const deptValue = selected.filter(it => it.type === 'dept');
    const roleValue = selected.filter(it => it.type === 'role');
    const dynamicRole = selected.filter(it => it.type === 'dynamicRole');
    const dynamicUser = selected.filter(it => it.type === 'dynamicUser')
    const [dynamicType, $dynamicType] = React.useState<string>('user');
    const AsyncSelected = function (r: any) {
        $deptId(r.key);
        $selectDept(r.key)
    }
    const handleSelect = function (type: string, payload: any[]) {
        if (type === 'user') {
            const next = userValue.filter(it => it.deptId !== deptId);
            $selected([...roleValue, ...deptValue, ...dynamicRole, ...dynamicUser, ...next, ...payload])
        }
        if (type === 'dept') {
            $selected([...userValue, ...roleValue, ...dynamicRole, ...dynamicUser, ...payload])
        }
        if (type === 'role') {
            $selected([...deptValue, ...userValue, ...dynamicRole, ...dynamicUser, ...payload])
        }
        if (type === 'dynamicRole') {
            $selected([...deptValue, ...userValue, ...roleValue, ...dynamicUser, ...payload])
        }
        if (type === 'dynamicUser') {
            $selected([...deptValue, ...userValue, ...roleValue, ...dynamicRole, ...payload])
        }

    }
    const handleChecked = function (e: any) {
        const isChecked = e.target.checked;
        if (isChecked) {
            handleSelect('dynamicUser', [{ id: '-1', type: 'dynamicUser', name: '业务发起人' }])
        } else {
            handleSelect('dynamicUser', [])
        }

    }
    const handleDelete = function (id: string, type: string) {
        const next = selected.filter(it => it.type !== type || it.id !== id);
        $selected(next);
    }

    const filterUser = !!search ? users.filter((item: User) => (item.name || "").includes(search)) : [];
    const filterDept = !!search ? depts.filter((item: Dept) => item.name.includes(search)) : [];

    useEffect(() => {
        $selected(value || []);
    }, [JSON.stringify(value)])

    return <Modal
        visible={visible}
        width="600px"
        title="部门成员列表"
        onOk={() => onOk(selected)}
        onCancel={onCancel}
    >
        <Col span={24}>
            <SelectedList selected={selected} close={handleDelete} />
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
                            {RenderTree(depts, handleSelect, deptValue, deptTree, 'dept')}
                        </TabPlane>
                        <TabPlane tab={<div className={styles.title}>角色</div>} key="3+role">
                            {RenderTree(roles, handleSelect, roleValue, roleTree, 'role')}
                        </TabPlane>
                        <TabPlane tab={<div className={styles.title}>人员</div>} key="1">
                            <div className={styles.content}>
                                <Row style={{ height: "100%" }}>
                                    <Col span={11}>
                                        <Tree blockNode defaultExpandAll onClick={(_: any, r: any) => AsyncSelected(r)
                                        }>
                                            {renderTree(deptTree)}
                                        </Tree>
                                    </Col>
                                    <Col span={2}><div style={{ height: "100%", width: 1, background: "#e0e0e0" }} /></Col>
                                    <Col span={11}>
                                        {renderCheckBoxGroup(deptUser, userValue, 'user', handleSelect, deptId)}
                                    </Col>
                                </Row>
                            </div>
                        </TabPlane>
                        {props.useDynamic && <TabPlane tab={<div className={styles.title}>动态负责人</div>} key="4">
                            <div className={styles.content}>
                                <Row style={{ height: "100%", borderRight: '1px solid #e0e0e0' }}>
                                    <Col span={8} >
                                        <li className={styles.simple_list} onClick={() => $dynamicType('user')}>流程发起人</li>
                                        <li className={styles.simple_list} onClick={() => $dynamicType('role')}>发起人所在部门角色</li>
                                    </Col>
                                    <Col span={2}><div style={{ height: "100%", width: 1, background: "#e0e0e0" }} /></Col>
                                    <Col span={14}>

                                        {dynamicType === 'user'
                                            ? <Row style={{ padding: 15 }}><Col span={20}> 业务发起人 </Col><Col span={4}><Checkbox onChange={handleChecked} checked={dynamicUser.length > 0} /></Col> </Row>
                                            : RenderTree(roles, handleSelect, dynamicRole, roleTree, 'dynamicRole')}
                                    </Col>
                                </Row>
                            </div>
                        </TabPlane>}
                    </Tabs>
                </div>
            </Row>

        </Col>
    </Modal>

}

function RenderTree(depts: any[], handleSelect: (type: string, payload: any[], rootDeptId?: string | undefined) => void, deptValue: SelectType[], deptTree: any[], type?: string) {
    return <div className={styles.content}>
        <Tree checkable blockNode defaultExpandAll checkStrictly onCheck={({ checked }: any) => {
            checked = (checked || []).map((it: string) => {
                const res: any = depts.find(item => item.id === it);
                if (res) {
                    return { name: res.name, id: res.id, type: type };
                }
            });
            handleSelect(type!, checked);
        }} checkedKeys={deptValue.map(it => it.id)}>
            {renderTree(deptTree)}
        </Tree>
    </div>;
}


export function MultipleSelectMode(props: any) {
    const [visible, $visible] = React.useState<boolean>(false);
    const [selectMode, $selectMode] = React.useState<any[]>([])
    const handleChange = function (v: any) {
        $selectMode(v)
        $visible(false);
        props.onChange && props.onChange(v)
    }
    React.useEffect(() => {
        $selectMode(props.value)
    }, [JSON.stringify(props.value)])
    return <>
        <div className={styles.body}>
            {selectMode.length <= 0 && <Button type='link' icon={<PlusOutlined />} onClick={() => $visible(true)}>点击选择成员</Button>}<br />
            <ul>
                {selectMode.map((item: SelectType, index) => (
                    <li className={styles.boxItem} key={item.type + item.id}>
                        {item.type === 'user'
                            ? <UserOutlined style={{ color: '#1890ff' }} />
                            : item.type === 'dept'
                                ? <ApartmentOutlined />
                                : <UsergroupAddOutlined />
                        }
                        <span>{item.name}</span>
                    </li>))}
                {selectMode.length > 0 && <li className={styles.boxItem} key={'link'} style={{ background: "transparent" }}><Button type='link' onClick={() => $visible(true)}>编辑</Button></li>}

            </ul>
            {/* {} */}
        </div>
        <SelectModal visible={visible} onCancel={() => $visible(false)} value={props.value} onOk={(v) => handleChange(v)} useDynamic={props.useDynamic} />

    </>
}
