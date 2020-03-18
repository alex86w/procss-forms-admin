import React, { useContext } from 'react'
import BraftEditor from 'braft-editor';
import { ContentContext } from '../formdes';
import 'braft-editor/dist/index.css'
import './attr.css'
const Descirption = () => {
    const { selectItem, updateItem } = useContext(ContentContext)
    return (
        <>
            <span className="title">描述信息</span>
            <BraftEditor
                value={selectItem.description}
                onChange={v => updateItem(v, 'description')}
                controls={['italic', 'underline', 'media', 'bold', 'font-size']}
                style={{ border: "1px solid #f0f8ff", height: 200 }}
            />
        </>
    )
}

export default Descirption;