import React, { Component, useContext } from 'react'
import { Menu, Radio } from 'antd'
import { useModel } from 'umi'


export function DividerType() {
    const { updateItem, selectItem } = useModel('forms')
    return (
        <>
            <span className="title">线型</span>
            <Radio.Group
                buttonStyle="solid"
                onChange={v => updateItem(v.target.value, 'value')}
                value={selectItem.value}
                style={{ width: '100%', }}
            >
                <Radio.Button value="none">无线框</Radio.Button>
                <Radio.Button style={{ padding: '0 10px' }} value="dashed">
                    <div style={{ borderBottom: 'dashed 1px #1F2D3D', height: 15, width: '30px' }} /></Radio.Button>
                <Radio.Button style={{ padding: '0 10px' }} value="solid1">
                    <div style={{ borderBottom: 'solid 1px #1F2D3D', height: 15, width: '30px' }} /></Radio.Button>
                <Radio.Button style={{ padding: '0 10px' }} value="solid2">
                    <div style={{ borderBottom: 'solid 2px #1F2D3D', height: 15, width: '30px' }} /></Radio.Button>
            </Radio.Group>
        </>
    )

}

export default DividerType
