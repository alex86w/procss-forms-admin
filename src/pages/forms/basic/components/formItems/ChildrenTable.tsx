import React from 'react'
import ContentBase, { ContentBaseProps } from './contentItemBase'
import ContentItem from './contentItem'
import { FormType } from '@/services/constants'
import useModal from 'antd/lib/modal/useModal'
import { useModel } from 'umi'
import { useDrop } from 'react-dnd'

function None() {
    return <div style={{ border: '1px solid #d9d9d9', display: 'flex', alignItems: 'center' }}>
        {/* 上 右 下 左 */}
        <span style={{ margin: '0 10px 0 10px' }}>
            请在右侧点击添加字段
         </span>
    </div>
}

function First() {
    return <div style={{ border: '1px solid #d9d9d9', width: '30px', minHeight: '70px', flexShrink: 0 }}>
        <div style={{ height: '33px', borderBottom: '1px solid #d9d9d9' }}>
        </div>
        <div style={{ display: 'flex', minHeight: '37px', justifyContent: 'center', alignItems: 'center', }}>
            <span>1</span>
        </div>
    </div>
}

const ChildrenTable: React.FC<ContentBaseProps> = (props) => {
    const { items = [] } = props.item
    const { setSelect, selectItem } = useModel('forms')
    const [, drop] = useDrop({
        accept: ['subform'],
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    });
    return (
        <ContentBase {...props}>
            <div ref={drop} className='subform-contaienr'>
                <First />
                {items.length === 0 && <None />}
                {items.map(it => <ContentItem
                    key={it.id}
                    contentKey={it.type}
                    onClick={() => setSelect(it.parentId, it.id)}
                    selectCahceId={selectItem.id}
                    item={it}
                />)}
            </div>
        </ContentBase>
    )
}

export default ChildrenTable
