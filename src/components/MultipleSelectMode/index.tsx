import React, { useState, ReactNode } from 'react';
import { Tree, Modal, Col, Row, Tabs, Input } from 'antd';
import styles from './index.less';
import { UserOutlined, ApartmentOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons';

const TabPlane = Tabs.TabPane;
const TreeNode = Tree.TreeNode;


interface MouseEvent extends React.MouseEvent {
    target: any
}


interface MultipleSelectModeProps { }

export const MultipleSelectMode = function (props: MultipleSelectModeProps) {
    const [selected, $selected] = useState<any[]>([]);
    const [active, $active] = useState<boolean>(false)
    return <Modal visible={true} width="600px" title="成员列表">
        <Col span={24}>
            <Row><ul className={styles.cardbox}>
                <li className={styles.boxItem}><UserOutlined style={{ color: '#1890ff' }} /><span>123</span>&nbsp;&nbsp;&nbsp; <CloseOutlined style={{ fontSize: 10 }} /></li>
                <li className={styles.boxItem}><UserOutlined style={{ color: '#1890ff' }} /><span>123</span>&nbsp;&nbsp;&nbsp; <CloseOutlined style={{ fontSize: 10 }} /></li>
            </ul></Row>
            <Row>
                <div className={styles.Tabs}>
                    <div className={styles.search}><SearchOutlined className={styles.searchIcon} onClick={() => $active(!active)} /></div>
                    <div className={styles[active ? "searchActive" : "searchBase"]}><Input prefix={<SearchOutlined className={styles.searchIcon} />} suffix={<CloseOutlined className={styles.searchIcon} onClick={() => $active(!active)} />} /></div>
                    <Tabs >
                        <TabPlane tab={<div className={styles.title}>部门</div>} key="0">
                            <div className={styles.content}>
                                <Tree checkable blockNode defaultExpandAll checkStrictly>
                                    <TreeNode title={<span><ApartmentOutlined />&nbsp;&nbsp;tree</span>} key="1">
                                        <TreeNode title={<span><ApartmentOutlined />&nbsp;&nbsp;tree</span>} key="2">
                                        </TreeNode>
                                    </TreeNode>
                                </Tree>
                            </div>
                        </TabPlane>
                        <TabPlane tab={<div className={styles.title}>人员</div>} key="1">
                            <div className={styles.content}>
                                <Row style={{ height: "100%" }}>
                                    <Col span={12}>
                                        <Tree blockNode defaultExpandAll onClick={(e: MouseEvent, r) => console.log(e.target?.getAttribute('data-item'), r)}>
                                            <TreeNode title={<span data-item={JSON.stringify({ id: 1, value: 2 })}><UserOutlined />&nbsp;&nbsp;tree</span>} key="1">
                                                <TreeNode title={<span><UserOutlined />&nbsp;&nbsp;tree</span>} key="2">
                                                </TreeNode>
                                            </TreeNode>
                                        </Tree>
                                    </Col>
                                    <Col span={12}>
                                        <div style={{ height: "100%", width: 1, background: '#e0e0e0' }}></div>
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