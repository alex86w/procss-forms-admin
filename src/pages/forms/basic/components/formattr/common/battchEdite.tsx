import React, { useContext, useState } from 'react'
import Modal from 'antd/lib/modal/Modal'
import { Input } from 'antd'
import { useModel } from 'umi'


function BattchEdite({ setVisible, visible }: any) {
    const { selectItem, updateItem } = useModel('forms')

    const [batchValue, setbatch] = useState(selectItem.items?.map(it => it.value).join('\n'))
    function onBatchOk() {
        const values = batchValue?.split('\n');
        updateItem(values?.map((x, index) => ({
            value: x,
            //@ts-ignore
        })), 'items')
        setVisible(false)
    }

    function onBattchCacnel() {
        setbatch(selectItem.items?.map(it => it.value).join('\n'));
        setVisible(false);
    }

    return (
        <Modal destroyOnClose onOk={onBatchOk} onCancel={onBattchCacnel} cancelText="取消" okText="确定" width={500} visible={visible} title='批量编辑'>
            <div>
                <span>每一行对应一个选项</span>
                <Input.TextArea style={{ height: 400 }} value={batchValue} onChange={e => setbatch(e.target.value)} />
            </div>
        </Modal>
    )
}

export default BattchEdite
