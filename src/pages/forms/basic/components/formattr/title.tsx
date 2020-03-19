import { Input } from "antd"
import React, { useContext } from 'react'
import { ContentContext } from '../../formdes'
import './attr.css'
const Title: React.FC = () => {
    const { selectItem, updateItem } = useContext(ContentContext)
    return (
        <>
            <span className="title">标题</span>
            <Input value={selectItem.title} onChange={e => updateItem(e.target.value, 'title')} />
        </>
    )
}

export default Title;