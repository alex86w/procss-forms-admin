import React, { useState } from 'react'
import Form, { useForm } from 'antd/lib/form/Form'
import { FormItems } from '@/services/interface/forms.interface'
import { Tag, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import FormItem from './FormItem'

const SubForm = ({ item, value, onChange }: { item: FormItems, value?: Array<any>, onChange?(value: any): void }) => {
    value = value || [{}]
    function handleChange(i: number, v: any) {
        value![i] = v;
        onChange && onChange(value)
    }

    function handleAdd() {
        value?.push({});
        onChange && onChange(value)
    }

    return (
        
        <div key={item.id} className="item_warper">
            <span className="item_title">  {item.title}</span>

            {value.map((it, i) => <div key={i + 'subform'} style={{ background: 'white', borderRadius: 5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button type='link'>1</Button>
                    <div>
                        <Button size='small' type='primary' style={{ borderRadius: 15, marginRight: 10 }}>收起</Button>
                        <Button size='small' type='primary' style={{ borderRadius: 15 }}>删除</Button>
                    </div>
                </div>

                <Form onValuesChange={v => handleChange(i, v)} initialValues={value![i]}>
                    {item.items?.map(it => <FormItem it={it} noDes />)}
                </Form>
            </div>)}

            <Button size='small' onClick={handleAdd} style={{ background: '#fff', color: '#1890ff', width: '100%', marginTop: 10 }} type='dashed'><PlusOutlined />添加记录</Button>
        </div>
    )
}

export default SubForm
