import React, { useContext } from 'react'
import { ContentContext } from '../formdes'
import './attr.css'
import { Select, Input } from 'antd';
const { Option } = Select
const Pattern = () => {
    const { selectItem, updateItem } = useContext(ContentContext);
    return <>
        <div>
            <span className="title">格式</span>
            <Select style={{ width: '100%' }} defaultValue={selectItem.regex} onChange={v => updateItem(v, "regex")} >
                <Option value="">无</Option>
                <Option value="mobile">手机号</Option>
                <Option value="tel">电话号码</Option>
                <Option value="mail">邮箱</Option>
                <Option value="number">其他数字</Option>
            </Select>
        </div>
    </>
}

export default Pattern