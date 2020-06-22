import { Input } from "antd"
import React, { useContext } from 'react'

import './attr.css'
import { useModel } from 'umi'
const Title: React.FC = () => {
    const { selectItem, updateItem } = useModel('forms')
    return (
        <>
            <span className="title">标题</span>
            <Input value={selectItem.title} onChange={e => updateItem(e.target.value, 'title')} />
        </>
    )
}

export default Title;