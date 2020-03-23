import React, { useContext, useEffect } from 'react'

import { Select } from 'antd'
import { useModel } from 'umi'

function Layout() {
    const { selectItem, updateItem } = useModel('forms')
    useEffect(() => {
        if (!selectItem.layout) {
            updateItem('vertical', 'layout')
        }
    }, [selectItem.id])

    return (
        <div>
            <span className='title'>排列方式</span>
            <Select defaultValue='vertical' value={selectItem.layout} onChange={v => updateItem(v, 'layout')} style={{ width: '100%' }}>
                <Select.Option value='vertical'>
                    纵向排列
                </Select.Option>
                <Select.Option value='horizontal'>
                    横向排列
                 </Select.Option>
            </Select>
        </div>

    )
}

export default Layout
