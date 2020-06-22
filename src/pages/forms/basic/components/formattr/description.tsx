import React, { useContext, useEffect, useState } from 'react'
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import './attr.css';
import { useModel } from 'umi';
const Descirption = () => {
    const { selectItem, updateItem } = useModel('forms')
    let [editor, setEditor] = useState(null);
    useEffect(() => {
        let temp = BraftEditor.createEditorState(selectItem.description || "")
        setEditor(temp)
    }, [selectItem.id])
    return (
        <>
            <span className="title">描述信息</span>
            <BraftEditor
                value={editor}
                onChange={v => { setEditor(v); updateItem(v.toHTML(), 'description') }}

                controls={['italic', 'underline', 'media', 'bold', 'font-size']}
                style={{ border: "1px solid #d9d9d9", height: 200 }}
            />
        </>
    )
}

export default Descirption;
