import React from 'react'
import { Checkbox } from 'antd'

const FiledPermission = () => {

    return <>
        <span className="title">字段权限</span>
        <div>
            <Checkbox>可见</Checkbox>
            <Checkbox>可编辑</Checkbox>
        </div>
    </>
}

export default FiledPermission;