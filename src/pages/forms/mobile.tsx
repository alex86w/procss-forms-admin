import React, { useEffect, useState } from 'react'
import { useModel } from 'umi'
import { InputItem, ListView, List } from 'antd-mobile'
import { FormItems } from '@/services/interface/forms.interface'
// import 'antd-mobile/antd-mobile.css'
//@ts-ignore
const datasoure = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const Mobile = (props: any) => {
    const { formItems } = useModel('forms')
    const [ds, setDs] = useState(datasoure);
    useEffect(() => {
        setDs(ds.cloneWithRows(formItems))
    }, [formItems])
    console.log('Mobile')
    function renderRow(formItem: FormItems) {
        console.log(formItem)
        return <div >
            <span>{formItem.title}</span>
            <InputItem></InputItem>
        </div>
    }
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ListView style={{width:'100vh',height:'100vh'}} renderHeader={() => <span>31231</span>} dataSource={ds} renderRow={renderRow} />
        </div>
    )
}

export default Mobile