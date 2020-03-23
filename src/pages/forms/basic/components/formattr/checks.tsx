import React, { useContext, useState, useEffect } from 'react'

import { Radio, Input, Button, Divider, Select, Modal, Checkbox } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import BattchEdite from './common/battchEdite';
import { useModel } from 'umi';


function ChecksForms() {

    const { selectItem, updateItem } = useModel('forms');
    const [mVisible, setVisible] = useState(false)

    function updateItems({ checkeds, updateValue, index: updateIndex }: any) {
        //@ts-ignore
        const items = selectItem.items?.map((it, index) => {
            //@ts-ignore
            if (checkeds && checkeds.findIndex(x => index === x) >= 0) {
                it.checked = true;
            } else {
                it.checked = false;
            }
            if (updateValue && updateIndex === index) {
                it.value = updateValue;
            }
            return it;
        });
        updateItem(items, 'items')
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
                <Checkbox.Group onChange={checkeds => updateItems({ checkeds })}>
                    {selectItem.items?.map((it, index) => <CheckboxEdite key={index} {...{ updateItems, index, it, onDelete }} />)}
                </Checkbox.Group>
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

function CheckboxEdite({ it, updateItems, index, onDelete }: any) {
    return <div>
        <Checkbox value={index} />
        <Input onChange={e => updateItems({ updateValue: e.target.value, index })} value={it.value} size='small' style={{ width: '70%', marginLeft: 10 }} />
        <Button type='link' onClick={() => onDelete(index)} icon={<DeleteFilled style={{ color: 'gray' }} />} />
    </div>
}

export default ChecksForms
