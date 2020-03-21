import React, { useContext, useEffect } from 'react'
import { ContentContext } from '../../formdes'
import { Select } from 'antd'

function Layout() {
    const { selectItem, updateItem } = useContext(ContentContext)
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
