import { useDrop } from "react-dnd"
import React, { useEffect, useContext, useState } from 'react'
import ContentItem from '../formItems/contentItem'
import { useModel } from 'umi';



interface ContentProps {
    tabId?: string;
}

const VirBox = () => <div style={{ width: '98%', height: '40px', margin: '10px', border: '1px dashed green' }} />
export const VIRKEY = 'virKey';
const FormContent: React.FC<ContentProps> = ({ tabId }) => {

    const { selectItem, setSelect, } = useModel('forms')
    const TIMER: any = null;
    const { formItems: items, addItems, deleById, updateTabId } = useModel(
        'forms',
    );
    const [timer, setTimer] = useState(TIMER);

    const [{ isOver }, drop] = useDrop({
        accept: ['title', 'contentItem'],
        collect: monitor => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        //@ts-ignore
        // hover: ({ type, id }, monitor) => {
        //     !timer &&
        //         setTimer(

        //             setTimeout(() => {
        //                 const item = items.find(x => x.id === (id || VIRKEY))
        //                 if (item?.id !== VIRKEY && type === 'title') {
        //                    console.log('addItems', tabId)
        //                     addItems({ id: VIRKEY, tabId });
        //                 } else if (item?.tabId !== tabId) {
        //                    console.log('updateTabId')
        //                     updateTabId(item?.id, tabId);
        //                 }
        //                 setTimer(null);
        //             }, 100),
        //         );
        // },
    });

    // useEffect(() => {
    //     if (!isOver) {
    //         const index = items.findIndex(it => it.id === VIRKEY);
    //         if (index >= 0) {
    //             deleById(VIRKEY);
    //         }
    //     }
    // }, [isOver]);

    return <div ref={drop} style={{ width: '100%', minHeight: '20vh', }}>
        {items.filter(it => it.tabId === tabId).map(it => it.id !== VIRKEY && <ContentItem
            key={it.id}
            contentKey={it.type}
            onClick={setSelect}
            selectCahceId={selectItem.id}
            item={it}
            tabId={tabId}
        /> || <VirBox key={it.id} />)}

    </div>
}

export default FormContent