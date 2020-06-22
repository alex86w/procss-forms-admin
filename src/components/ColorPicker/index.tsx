import React, { useState } from 'react'
//@ts-ignore
import { ChromePicker } from 'react-color'
import './index.less';
import update from 'immutability-helper'

interface Props {
    onChange: (value: any) => void,
    color?: string
}
function ColorPicker({ onChange, color }: Props) {
    const [visible, setSate] = useState(false)
    function handleClose() {
        setSate(false)
    }
    function handleClick() {
        setSate(true)
    }
    function handleChange(color: any) {
        onChange && onChange(color.hex)
    }
    return (
        <div className="color-pikcer">
            <div className="watch " onClick={handleClick}>
                <div className='color' style={{ backgroundColor: color }} />
            </div>
            {visible ?
                <div className='popover'>
                    <div className='cover' onClick={handleClose} />
                    <ChromePicker color={color} onChange={handleChange} />
                </div> : null}
        </div>
    )
}

export default ColorPicker
