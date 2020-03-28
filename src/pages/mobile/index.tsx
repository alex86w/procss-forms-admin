import React, { useState, useEffect } from 'react'
import { useModel, useHistory } from 'umi'
import { Form, Button, notification, Divider } from 'antd'
import _ from 'lodash'
import './index.less'
import { useForm } from 'antd/lib/form/util'
import FormItem from './components/FormItem'
import { FormItems } from '@/services/interface/forms.interface'
import { Tabs } from 'antd-mobile'
import { postFormData } from '@/services/form'
import { FormType } from '@/services/constants'
interface Props {
    noSubmit?: false
}

const Mobile: React.FC<Props> = (props) => {
    const { forms, asyncFetch } = useModel('forms')
    const { todos } = useModel('todoForm')
    const { location } = useHistory();
    const [loading, $loading] = useState(false);
    const [form] = useForm();
    const { items: formItems, theme: { custom }, tabs } = forms
    const { title, background, banner } = custom
    const backgroundImage = background?.image && `url(/api/file/get/${background.image})`
    const tabDatas: Array<any> = [];
    const { submit, suggest, handWritten } = todos.node || {}

    useEffect(() => {
        if (!forms.id) {
            asyncFetch(location);
        }
        setFileds();
    }, [forms.id]);
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
                    } else {
                        return [it.id, checkeds[0].value]
                    }
                }
                return [it.id, it.value]
            }));
        }
        form.setFieldsValue(obj)
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
        console.log(data)
        if (data) {
            const result = await postFormData(forms.id || '', { data })
            console.log(result)
            if (!result.success) {
                notification.error({ message: result.message })
            }
        }
        $loading(false)
        //const result = await postFormData(forms.id, {form.})
    }



    // console.log('getInitValues', initValue)
    console.log(banner)

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
                <Form scrollToFirstError form={form} style={{ background: 'transparent(rgb(0,0,0.2))' }}>
                    {/**渲染正常item */}
                    {items.map(it => <FormItem key={`${it.id}`} it={it} />)}
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
                        suggest && <FormItem it={{ id: 'suggest', type: FormType[FormType.mutileText], title: '审批意见', enable: true }} />
                    }
                    {handWritten && <FormItem it={{ id: 'handWritten', type: FormType[FormType.mutileText], title: '手写签名', enable: true }} />}
                </Form>

            </div>
            <div>

                {
                    //代办事项没有提交权限无法提交
                    !(todos.node && !submit) && < Button loading={loading} onClick={onSubmit} style={{ width: '80%', marginBottom: '20px' }} type='primary'>提交</Button>
                }
            </div>

        </div >
    )
}

export default Mobile

