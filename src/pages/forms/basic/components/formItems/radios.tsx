import React, { useContext, useEffect } from 'react'
import ContentBase, { ContentBaseProps } from './contentItemBase'
import { Radio } from 'antd';
import { ContentContext } from '../../formdes'
function FormRadios(props: ContentBaseProps) {

    const { item } = props
    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };
    return (
        <ContentBase {...props}>
            <Radio.Group >
                {
                    item.items?.map((it, index) => <Radio
                        value={index}
                        key={index}
                        checked={it.checked}
                        style={item.layout !== 'horizontal' && radioStyle || {}}
                    >
                        {it.value}
                    </Radio>)}
            </Radio.Group >
        </ContentBase>
    )
}

export default FormRadios
