import React from 'react'
import { useModel } from 'umi'
import { Form, Button } from 'antd'

import './index.less'
import { useForm } from 'antd/lib/form/util'
import FormItem from './components/FormItem'
import { FormItems } from '@/services/interface/forms.interface'
import { Tabs } from 'antd-mobile'

const Mobile = () => {
    const { forms } = useModel('forms')
    const [form] = useForm();
    const { items: formItems, theme: { custom }, tabs } = forms
    const { title, background, banner } = custom
    const backgroundImage = background?.image && `url(/api/file/get/${background.image})`
    const tabDatas: Array<any> = [];
    //将tab的item项过滤掉
    const items = formItems.filter(x => !x.tabId);
    if (tabs) {
        for (let tab of tabs) {
            const items = formItems.filter(x => x.tabId === tab.tabId);
            items.length > 0 && tabDatas.push({ title: tab.title, sub: tab.tabId, items })
        }
    }

    console.log(tabDatas)


    return (
        <div style={{ width: '100%', height: '100%', textAlign: 'center', background: background?.mode === 'image' ? backgroundImage : background?.color || "#f5f7fa" }}>
            <div style={{ height: 100, width: '100%', background: banner?.mode === 'color' ? banner.color : `url(/api/file/get/${banner?.image})` }}>
            </div>
            <div style={{
                //@ts-ignore
                textAlign: title?.textAlign || 'left', width: '100%', marginTop: 10
            }}>
                <span style={{ fontStyle: title?.fontStyle, fontSize: title?.fontSize, color: title?.color }}> {forms.name}</span>
            </div>
            <div style={{ textAlign: 'left' }}>
                <Form onValuesChange={(_v,allv) => console.log(allv)} form={form} style={{ background: 'transparent(rgb(0,0,0.2))' }}>
                    {/**渲染正常item */}
                    {items.map(it => <FormItem key={`${it.id}_form_item`} it={it} />)}
                    {/**渲染tabs  */}
                    {tabDatas.length > 0 && <Tabs tabs={tabDatas} initialPage={tabDatas[0].sub}>
                        {
                            tabDatas.map(data => <div key={data.sub}>
                                {data.items.map((it: FormItems) => <FormItem key={`${it}_tab_item`} it={it} />)}
                            </div>)
                        }
                    </Tabs>}
                </Form>
            </div>
            <Button onClick={() => {
                form.validateFields().then(e => console.log(e))
            }} style={{ width: '80%', marginBottom: '20px' }} type='primary'>提交</Button>
        </div >
    )
}

export default Mobile

