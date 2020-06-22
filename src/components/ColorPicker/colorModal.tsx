import React, { useState } from 'react'
//@ts-ignore
import { ChromePicker } from 'react-color'
import './index.less';

interface Props {
    onChange: (value: any) => void,
    color?: string;
    visible: boolean;
    onClose: () => void
}
function ColorModal({ onChange, color, visible, onClose }: Props) {

    return (
        <div className='color-pikcer' style={{ width: '0px', height: '0px' }}>
            {visible ?
                <div className='popover'>
                    <div className='cover' onClick={onClose} />
                    <ChromePicker color={color} onChange={(v: any) => onChange(v.hex)} />
                </div> : null}
        </div>
    )
}

export default ColorModal
