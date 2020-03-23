import React, { useContext } from 'react'
import { Checkbox, Divider } from 'antd'
import { useModel } from 'umi';


const Images = () => {
    const { selectItem, updateItem } = useModel('forms');
    return (
        <>
            <span className="title">校验</span>
            <div>
                <Checkbox checked={selectItem.required} onChange={e => updateItem(e.target.checked, 'required')}>必填</Checkbox>
                <Checkbox checked={selectItem.onlyOneImage} onChange={e => updateItem(e.target.checked, 'onlyOneImage')}>仅允许上传一张图片</Checkbox>
                <Checkbox checked={selectItem.onlyCamera} onChange={e => updateItem(e.target.checked, 'onlyCamera')} style={{ marginLeft: 0 }}>仅允许拍照上传</Checkbox>
            </div>
            <Divider />
            <Checkbox checked={selectItem.autoCompress} onChange={e => updateItem(e.target.checked, 'autoCompress')} >自动压缩图片</Checkbox>
        </>
    )
}

export default Images
