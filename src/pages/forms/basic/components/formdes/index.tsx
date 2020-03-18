
import { Layout, Tabs } from "antd"
import React, { useRef, useCallback, useEffect, useState, createContext, createElement } from 'react';
import { FileTextOutlined, NumberOutlined, FieldTimeOutlined } from '@ant-design/icons'
import DndTile from '../baiscdnd/dndTile';
import Html5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd'
import './index.css'
import FormContent, { VIRKEY } from '../baiscdnd/content';
import update from 'immutability-helper'
import { FormItems } from '@/services/interface/forms.interface';
import ContentObj from '../formattr/filedData';
import { Formattr } from '../letterattr';
const { Sider, Content } = Layout;
const { TabPane } = Tabs

const ITEMs: Array<FormItems> = [];
const SELECT: FormItems = { id: "" };
import { generate } from 'shortid'

export const ContentContext = createContext({
    moveItems: (dId: any, hId: any) => { },
    addItems: (data: any) => { },
    contentItems: ITEMs,
    moveVirBox: (toId: any) => { },
    deleById: (id: any) => { },
    selectItem: SELECT,
    setSelect: (data: any) => { },
    copyItem: (id: any) => { },
    deleItem: (id: any) => { },
    updateItem: (value: string, key: string) => { }
})
const FormsDes: React.FC<any> = () => {

    const [contentItems, setItmes] = useState(ITEMs);
    const [selectItem, setSelectItem] = useState(SELECT)
    const [virBoxIndex, setVirBoxIndex] = useState(0);

    const [attr, $attr] = useState({});


    function moveItems(dId: any, hId: any) {
        const dIndex = contentItems.findIndex(it => it.id === dId);
        const hIndex = contentItems.findIndex(it => it.id == hId);
        setItmes(update(contentItems, {
            $splice: [
                [dIndex, 1],
                [hIndex, 0, contentItems[dIndex]]
            ]
        }))
    }

    function addItems(data: any) {
        if (data.id !== VIRKEY) {
            setItmes(update(contentItems, {
                $splice: [[virBoxIndex, 0, data]]
            }))
        } else {
            setItmes(update(contentItems, {
                $push: [data]
            }))
        }
    }
    function moveVirBox(toId: any) {
        const idIndex = contentItems.findIndex(x => x.id === VIRKEY);
        const toIdIndex = contentItems.findIndex(x => x.id === toId);
        if (idIndex >= 0) {
            setItmes(update(contentItems, {
                $splice: [
                    [idIndex, 1],
                    [toIdIndex, 0, { id: VIRKEY }]
                ]
            }))
        } else {
            setItmes(update(contentItems, {
                //@ts-ignore
                $push: [[{ id: VIRKEY }]]
            }))
        }
    }
    function deleById(id: any) {
        const delteIndex = contentItems.findIndex(x => x.id == id);
        if (id === selectItem.id) {
            setSelectItem(SELECT);
        }
        if (delteIndex >= 0) {
            id === VIRKEY && setVirBoxIndex(delteIndex)
            setItmes(update(contentItems, { $splice: [[delteIndex, 1]] }))
        }
    }

    function copyItem(id: any) {
        const index = contentItems.findIndex(x => x.id == id);
        const copy = { ...contentItems[index], id: generate(), };
        setItmes(update(contentItems, {
            //@ts-ignore
            $splice: [
                [index, 0, copy]
            ]
        }))
    }

    function deleItem(id: any) {
        const index = contentItems.findIndex(x => x.id == id);
        if (id === selectItem.id) {
            console.log(id, selectItem)
            setSelectItem(SELECT);
        }
        setItmes(update(contentItems, {
            $splice: [
                [index, 1]
            ]
        }))
    }

    function setSelect(id: any) {
        //@ts-ignore
        setSelectItem(contentItems.find(x => x.id == id))
    }
    function updateItem(value: string, key: string) {
        const index = contentItems.findIndex(x => x.id === selectItem.id)
        const temp: any = { ...selectItem };
        temp[key] = value;
        setItmes(update(contentItems, {
            $splice: [
                [index, 1, temp]
            ]
        }));
        setSelectItem(temp)
    }
    const filedAttr = selectItem.type && ContentObj[selectItem.type] && ContentObj[selectItem.type];

    return (
        <ContentContext.Provider value={{ updateItem, selectItem, setSelect, copyItem, deleItem, moveVirBox, addItems, contentItems, deleById, moveItems, }}>
            <DndProvider backend={Html5Backend}>
                <Layout style={{ padding: 0, marginTop: 0 }}>
                    <Sider width={220} theme='light' style={{ border: '1px solid #f5f5f5' }} >
                        <div className="sliderContent" >
                            <div style={{ width: '100%', margin: '5px', fontSize: '16px', fontWeight: 'bold' }}>基础字段</div>
                            <DndTile type={"singText"} title='单行文本' icon={<FileTextOutlined />} />
                            <DndTile type={"mutileText"} title='多行文本' icon={<FileTextOutlined />} />
                            <DndTile type="numberText" title="数字" icon={<NumberOutlined />} />
                            <DndTile type='inputDate' title="日期" icon={<FieldTimeOutlined />} />
                        </div>
                    </Sider>
                    <Content style={{ backgroundColor: 'white' }}>
                        <FormContent />
                    </Content>
                    <Sider width={250} theme="light" style={{ border: '1px solid #f5f5f5' }}>
                        <Tabs tabBarStyle={{ display: "flex", justifyContent: 'center', alignItems: 'center' }} >
                            <TabPane key="filed_atrr" tab="字段属性" style={{ padding: '10px', }}>
                                <div>
                                    {
                                        filedAttr && filedAttr.map((It: any, index: number) => <It key={index} />)
                                    }
                                </div>
                            </TabPane>
                            <TabPane key="tab_atrr" tab="表单属性">
                                <Formattr attr={attr} $attr={$attr} />
                            </TabPane>
                        </Tabs>
                    </Sider>
                </Layout>
            </DndProvider>
        </ContentContext.Provider >
    )
}

export default FormsDes;