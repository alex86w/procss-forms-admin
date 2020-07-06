import React, { useState, useEffect } from 'react'
import { useModel, useHistory, history } from 'umi'
import { Form, Button, notification, Divider, Modal, } from 'antd'
import _ from 'lodash'
import './index.less'
import FormItem from './components/FormItem'
import { FormItems } from '@/services/interface/forms.interface'
import { Tabs } from 'antd-mobile'
import { postFormData, checkAssets, postUpdateComplete } from '@/services/form'
import { FormType } from '@/services/constants'
import SubForm from './components/SubForm'
interface Props {
    istodo?: boolean,
    refresh?: () => void;
}

const { Item } = Form;
const useForm = Form.useForm;

const Mobile: React.FC<Props> = ({ istodo }) => {
    const { forms, asyncFetch } = useModel('forms');
    const { todos } = useModel('todoForm');
    const { location } = useHistory();
    const [loading, $loading] = useState(false);
    const [form] = useForm();
    const [sucessVisible, $sucessVisible] = useState(false);
    const { items: formItems, theme: { custom }, tabs } = forms;
    const { title, background, banner } = custom;
    const backgroundImage = background?.image && `url(/api/file/get/${background.image})`;
    const tabDatas: Array<any> = [];
    const { submit, suggest, handWritten } = todos.node || {};

    useEffect(() => {
        if (!forms.id && !istodo) {
            asyncFetch(location);
        }
        setFileds();
    }, [forms.id, todos.data]);

    function setFileds() {
        let obj;
        if (todos.data) {
            obj = todos.data
        } else {
            obj = _.fromPairs(formItems.map(it => {
                if (it.items) {
                    const checkeds = it.items.filter(it => it.checked);
                    if (checkeds.length > 0
                        && (it.type === FormType[FormType.checks]
                            || it.type === FormType[FormType.selectCheck])) {
                        return [it.id, checkeds.map(it => it.value)]
                    } else if (checkeds.length > 0) {
                        return [it.id, checkeds[0].value]
                    }
                }
                return [it.id, it.value]
            }));
        }
        form.setFieldsValue(obj);
    }

    //将tab的item项过滤掉
    const items = formItems.filter(x => !x.tabId);
    if (tabs) {
        for (let tab of tabs) {
            const items = formItems.filter(x => x.tabId === tab.tabId);
            items.length > 0 && tabDatas.push({ title: tab.title, sub: tab.tabId, items })
        }
    }

    async function onSubmit() {
        $loading(true)
        const data = await form.validateFields().catch(e => notification.error({ message: '请填写红色项', top: 200 }));
        if (data) {
            let submitData: any;
            if (istodo) {
                submitData = { suggest: data['suggest'], handWritten: data['handWritten'], todoId: todos.todoId };
                delete data['suggest'];
                delete data['handWritten'];
                submitData['data'] = data;
            } else {
                submitData = { data }
            }
            let result
            if (todos.status === '4' && todos.formDataId) {
                result = await postUpdateComplete(todos.formDataId, submitData)
            } else {
                result = await postFormData(forms.id || '', submitData)
            }
            if (!result.success) {
                notification.error({ message: result.message })
            } else {
                setFileds();
                $sucessVisible(true);
            }
        }
        $loading(false)
    }


    async function handlAssetCheck() {
        if (todos.formDataId) {
            $loading(true)
            const result = await checkAssets(todos.formDataId);
            if (result.success) {
                notification.success({
                    message: '资产盘点成功'
                })
            } else {
                notification.error({
                    message: result.message
                })
            }
            $loading(false)
        }
    }

    let canSubmit = false;

    if (todos.status === '1' && submit) {
        canSubmit = true
    } else if (forms.type === 'flow' || todos.status === '4') {
        canSubmit = true
    } else if (location.query.tosubid) {
        canSubmit = true
    } else {
        canSubmit = false
    }


    return (
        <div style={{ width: '100%', height: '100%', textAlign: 'center', background: background?.mode === 'image' ? backgroundImage : background?.color || "#f5f7fa" }}>
            <div style={{ height: banner?.mode === 'color' ? 20 : 100, width: '100%', background: banner?.mode === 'color' ? banner.color : `url(/api/file/get/${banner?.image})` }}>
            </div>
            <div style={{
                //@ts-ignore
                textAlign: title?.textAlign || 'left', width: '100%', marginTop: 10
            }}>
                <span style={{ fontStyle: title?.fontStyle, fontSize: title?.fontSize, color: title?.color }}> {forms.name}</span>
            </div>
            <div style={{ textAlign: 'left' }}>
                <Form scrollToFirstError form={form}  >
                    {/**渲染正常item */}
                    {items.map(it => {
                        if (it.type === FormType[FormType.ChildrenTable])
                            return <Item name={it.id} key={it.id}><SubForm item={it} /></Item>
                        else
                            return <FormItem key={`${it.id}`} it={it} />
                    })}

                    {/**渲染tabs  */}
                    {tabDatas.length > 0 && <Tabs tabs={tabDatas} initialPage={tabDatas[0].sub}>
                        {
                            tabDatas.map(data => <div key={data.sub}>
                                {data.items.map((it: FormItems) => <FormItem key={`${it.id}_tab_item`} it={it} />)}
                            </div>)
                        }
                    </Tabs>}
                    <Divider />
                    {
                        todos.status === '1' && suggest && <FormItem it={{ id: 'suggest', type: FormType[FormType.mutileText], title: '审批意见', enable: true }} />
                    }
                    {todos.status === '1' && handWritten && <FormItem it={{ id: 'handWritten', type: FormType[FormType.signName], title: '手写签名', enable: true }} />}
                </Form>

            </div>
            <div>
                {
                    //代办事项没有提交权限无法提交
                    canSubmit && < Button loading={loading} onClick={onSubmit} style={{ width: '80%', marginBottom: '20px' }} type='primary'>提交</Button>
                }
                {location.query.check && <Button loading={loading} onClick={handlAssetCheck} style={{ width: '80%', marginBottom: '20px' }} type='primary'>盘点资产</Button>}

            </div>
            <Modal visible={sucessVisible} closable={false} footer={false} width='90%'>
                <div style={{ textAlign: 'center', padding: 20 }}>
                    <div>
                        <span style={{ width: '100%' }} className="title">提交成功</span>
                    </div>
                    {istodo ? <span>点击确定返上一页面</span> : <span>请关闭页面</span>}
                    <Button type='primary' style={{ width: '80%', marginTop: 20 }} onClick={() => { history.goBack(); $sucessVisible(false) }}>确定</Button>
                </div>
            </Modal>
        </div >
    )
}

export default Mobile

