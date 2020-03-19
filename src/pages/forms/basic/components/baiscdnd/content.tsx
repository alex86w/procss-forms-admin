import { useDrop } from "react-dnd"
import React, { useEffect, useContext } from 'react'
import ContentItem from '../formItems/contentItem'

import { ContentContext } from '../formdes'
interface ContentProps {

}

const VirBox = () => <div style={{ width: '98%', height: '40px', margin: '10px', border: '1px dashed green' }} />
export const VIRKEY = 'virKey';
//** 通过props 传递出去的回调 无法获取sate 或者 函数内部变量值的改变 -- 闭包特性？？  */
let boxIndex: number;
const FormContent: React.FC<ContentProps> = () => {


    const { contentItems: items, addItems, deleById, selectItem, setSelect } = useContext(ContentContext)
    const [{ isOver }, drop] = useDrop({
        accept: ["title", "contentItem"],
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        hover: ({ type }, monitor) => {
            if (type === 'title' && items.findIndex(it => it.id === VIRKEY) < 0) {
                addItems({ id: VIRKEY })
            }
        }
    })

    useEffect(() => {
        if (!isOver) {
            const index = items.findIndex(it => it.id === VIRKEY);
            if (index >= 0) {
                deleById(VIRKEY);
            }
        }
    }, [isOver])

    return <div ref={drop} style={{ width: '100%', minHeight: '80vh' }}>
        {items.map((it, index) => it.id !== VIRKEY && <ContentItem
            key={it.id}
            contentKey={it.type}
            id={it.id}
            title={it.title}
            onClick={setSelect}
            selectCahceId={selectItem.id}
            description={it.description}
        /> || <VirBox key={it.id} />)}
    </div>
}

export default FormContent