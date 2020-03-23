import React, { useContext, useState } from 'react'
import { Checkbox, InputNumber } from 'antd'
import { useModel } from 'umi';


function VerifyNumber() {
    const { selectItem, updateItem } = useModel('forms')
    const [rangeCheck, setRangeCheck] = useState(false);
    function changeRange(checked: boolean) {
        if (!checked) {
            updateItem(undefined, 'maxNumber')
            updateItem(undefined, 'minNumber')
        }
        setRangeCheck(checked)
    }
    return (
        <>
            <span className="title">校验</span>
            <div>
                <Checkbox checked={selectItem.required} onChange={e => updateItem(e.target.checked, 'required')}>必填</Checkbox>
                <Checkbox checked={selectItem.onlyInteger} onChange={e => updateItem(e.target.checked, 'onlyInteger')}>仅允许填写整数</Checkbox>
            </div>
            <div>
                <Checkbox checked={rangeCheck} onChange={e => changeRange(e.target.checked)}>限定数值范围</Checkbox>
            </div>
            {rangeCheck && <div>
                <InputNumber placeholder='不限' value={selectItem.maxNumber} onChange={e => updateItem(e, 'maxNumber')} />
                <span>~</span>
                <InputNumber placeholder='不限' value={selectItem.minNumber} onChange={e => updateItem(e, 'minNumber')} /> </div>}
        </>
    )
}

export default VerifyNumber

