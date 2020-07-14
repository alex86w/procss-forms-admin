import React, { useState, useEffect } from 'react'
import Form, { useForm } from 'antd/lib/form/Form'
import { FormItems } from '@/services/interface/forms.interface'
import { Tag, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import FormItem from './FormItem'

function SubFileds(props: { items?: any, enable?: boolean, show: boolean, onChange(i: number, v: any): void, value: any, index: number }) {
    const [form] = useForm();
    useEffect(() => {
        form.setFieldsValue(props.value)
    }, [props.value])

    return <Form form={form} style={{ display: props.show ? 'none' : 'block' }} onValuesChange={v => props.onChange(props.index, v)} >
        {props.items?.map(it => <FormItem it={{ ...it, enable: props.enable }} noDes />)}
    </Form>
}

const SubForm = ({ item, value, onChange }: { item: FormItems, value?: Array<any>, onChange?(value: any): void }) => {
    value = value || [{}]
    const [cl, $cl] = useState([] as Array<boolean>)
    const [values,$values] = useState(value as any);

    function handleChange(i: number, v: any) {

        if (item.enable) {
            value![i] = { ...value![i], ...v };
            onChange && onChange(value)
        }
    }

    function handleAdd() {
        if (item.enable) {
            value?.push({});
            $values([...value])
            onChange && onChange(value)
        }
    }

    function handleCl(i: number) {
        cl[i] = !cl[i];
        $cl([...cl])
    }

    function handleDel(i: number) {
        if (i > 0 && item.enable) {
            const res = value?.splice(i, 1)
            onChange && onChange(res)
        }
    }

    return (

        <div key={item.id} className="item_warper">
            <span className="item_title">  {item.title}</span>
            {value.map((it, i) => <div key={i + 'subform'} style={{ background: 'white', borderRadius: 5, padding: '10px 0 10px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '10px' }}>
                    <div style={{ width: 20, height: 20, borderRadius: 10, textAlign: 'center', background: '#1890ff', color: '#fff', fontWeight: 'bold' }}><span>{i + 1}</span></div>
                    <div>
                        <Button size='small' type='primary' onClick={() => handleCl(i)} style={{ borderRadius: 15, marginRight: 10 }}>{cl[i] ? '展开' : '收起'}</Button>
                        {item.enable && <Button size='small' type='primary' onClick={() => handleDel(i)} style={{ borderRadius: 15 }}>删除</Button>}
                    </div>
                </div>
                <SubFileds {...{ value: it, onChange: handleChange, index: i, items: item.items, show: cl[i], enable: item.enable }} />
                {/* <Form style={{ display: cl[i] ? 'none' : 'block' }} onValuesChange={v => handleChange(i, v)} initialValues={value![i]}>
                    {item.items?.map(it => <FormItem it={{ ...it, enable: item.enable }} noDes />)}
                </Form> */}
            </div>)}

            {item.enable && <Button size='small' onClick={handleAdd} style={{ background: '#fff', color: '#1890ff', width: '100%', marginTop: 10 }} type='dashed'><PlusOutlined />添加记录</Button>}
        </div>
    )
}

export default SubForm
