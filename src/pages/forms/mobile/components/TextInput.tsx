import React from 'react'
import { Input } from 'antd'
import MobileItemProps from './mobileItem.interface'

function TextInput({ formItems }: MobileItemProps) {
    return (
        <div className="item_warper">
            <span className="item_title">{formItems.title}</span>
            <Input className="item_inputbox other_item" />
        </div>
    )
}

export default TextInput
