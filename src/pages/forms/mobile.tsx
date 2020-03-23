import React from 'react'
import { FormItems } from '@/services/interface/forms.interface'
import { useModel } from 'umi'

const Mobile = (props: any) => {
    const { formItems } = useModel('forms')
    console.log('mobile11', formItems)
    return (
        <div>
            mobile
        </div>
    )
}

export default Mobile

