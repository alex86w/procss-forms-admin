import React, { useState, ReactNode } from 'react';
import { Tree, Modal, Col, Row, Tabs, Input, message, Checkbox } from 'antd';
import styles from './index.less';
import { UserOutlined, ApartmentOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

const TabPlane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;
interface MultipleSelectModeProps { }

const renderCheckBoxGroup = function (data: any[], value: any[], type: string, onChange: (type: string, value: any[]) => void) {
    return <Checkbox.Group style={{ width: "100%" }} onChange={value => onChange(type, value)}>
        <Row>
            {data.map((user: any) => (<Col key={user.id} span={24}><span><UserOutlined />&nbsp;{user.name}</span><Checkbox style={{ float: "right" }} value={user} /></Col>))}
        </Row>

    </Checkbox.Group>
}

export const renderTree = function (tree: any[]) {
    return tree.map(tr => {
        return <TreeNode title={<span><ApartmentOutlined />&nbsp;&nbsp;{tr.name}</span>} key={JSON.stringify(tr)}>
            {tr.children && Array.isArray(tr.children) && renderTree(tr.children)}
        </TreeNode>
    })
}

export const MultipleSelectMode = function (props: MultipleSelectModeProps) {
    //@ts-ignore
    const { users, depts, deptTree, $selectDept, deptUser } = useModel('multipleSelectMode');
    const [selected, $selected] = useState<any[]>([]);
    const [search, $search] = useState<string>('');
    const searchExp = new RegExp(search);
    const [active, $active] = useState<boolean>(false);
    const handleSelect = function (type: string, payload: any) {
        if (type === 'user') {
            $selected([...selected.filter(it => !it.account), ...payload])
        } else {
            $selected([...selected.filter(it => !!it.account), ...payload])
        }
    }
    return <Modal visible={true} width="600px" title="部门成员列表">
        <Col span={24}>
            <Row><ul className={styles.cardbox}>
                {selected.map((item, index) => (<li className={styles.boxItem} key={item.id}>{item.account ? <UserOutlined style={{ color: '#1890ff' }} /> : <ApartmentOutlined />}<span>123</span>&nbsp;&nbsp;&nbsp; <CloseOutlined style={{ fontSize: 10 }} onClick={() => console.log({ 123: '123' })} /></li>))}

            </ul></Row>
            <Row>
                <div className={styles.Tabs}>
                    <div className={styles.search}><SearchOutlined className={styles.searchIcon} onClick={() => $active(!active)} /></div>
                    <div className={styles[active ? "searchActive" : "searchBase"]}><Input onChange={e => $search(e.target.value)} prefix={<SearchOutlined className={styles.searchIcon} />} suffix={<CloseOutlined className={styles.searchIcon} onClick={() => $active(!active)} />} /></div>
                    <div className={styles[active ? 'searchResult-active' : 'searchResult-default']}>
                        <div>
                            <span>部门</span>
                            {renderCheckBoxGroup(depts.filter((it: any) => searchExp.test(it.name)), [], 'dept', handleSelect)}
                        </div>
                        <div>
                            <span>人员</span>
                            {renderCheckBoxGroup(depts.filter((it: any) => searchExp.test(it.name)), [], 'user', handleSelect)}
                        </div>
                    </div>
                    <Tabs >
                        <TabPlane tab={<div className={styles.title}>部门</div>} key="0">
                            <div className={styles.content}>
                                <Tree checkable blockNode defaultExpandAll checkStrictly onCheck={({ checked }: any) => { handleSelect('dept', checked.map((it: string) => JSON.parse(it))) }}>
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
                                        <Checkbox.Group style={{ width: "100%" }} onChange={value => handleSelect('user', value)}>
                                            <Row>
                                                {deptUser.map((user: any) => (<Col key={user.id} span={24}><span><UserOutlined />&nbsp;{user.name}</span><Checkbox style={{ float: "right" }} value={user} /></Col>))}
                                            </Row>

                                        </Checkbox.Group>
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