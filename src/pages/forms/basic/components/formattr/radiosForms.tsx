import React, { useContext, useState, useEffect } from 'react'

import { Radio, Input, Button, Divider, Select, Modal } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import BattchEdite from './common/battchEdite';
import { useModel } from 'umi';


function RadiosForms() {

    const { selectItem, updateItem } = useModel('forms');
    const [mVisible, setVisible] = useState(false)
    function updateChecked({ checkedIndex }: any) {
        //@ts-ignore
        const items = selectItem.items?.map((it, index) => {
            if (checkedIndex || checkedIndex === 0) {
                it.checked = checkedIndex === index;
            }
            return it;
        });
        updateItem(items, 'items')
    }

    function updateValue({ value, index }: any) {
        selectItem.items && (selectItem.items[index].value = value)
        updateItem(selectItem.items, 'items');
    }

    function addItemItem() {
        selectItem.items?.push({ value: `选项${selectItem.items.length + 1}` });
        updateItem(selectItem.items, 'items')
    }

    function onDelete(index: number) {
        selectItem.items?.splice(index, 1);
        updateItem(selectItem.items, 'items');
    }

    return (
        <>
            <span className="title">选项</span>
            <div style={{ marginLeft: '10px' }}>
                <Radio.Group value={selectItem.items?.findIndex(x => x.checked === true)} onChange={e => updateChecked({ checkedIndex: e.target.value })}>
                    {selectItem.items?.map((it, index) => <RadioEdite key={index} {...{ updateValue, index, it, onDelete }} />)}
                </Radio.Group>
            </div>
            <div>
                <Button size='small' onClick={addItemItem} type='link'>添加选项</Button>
                <Divider type='vertical' orientation='center' />
                <Button size='small' onClick={() => setVisible(true)} type='link'>批量编辑</Button>
            </div>
            <BattchEdite {...{ visible: mVisible, setVisible }} />
        </>
    )


}

function RadioEdite({ it, index, updateValue, onDelete }: any) {
    return <div>
        <Radio value={index} checked={it.checked} />
        <Input onChange={e => updateValue({ value: e.target.value, index })} value={it.value} size='small' style={{ width: '80%' }} />
        <Button type='link' onClick={() => onDelete(index)} icon={<DeleteFilled style={{ color: 'gray' }} />} />
    </div>
}


export default RadiosForms
