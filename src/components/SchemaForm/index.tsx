import React, { Component } from 'react';
import { Form } from 'antd'
import { FormInstance } from 'antd/lib/form';

interface FormItemSchema {
    key:string;
    value:string|Array<string>|any;
    label:string;

}


interface SchemaFormProps {
    formRef?: FormInstance;

}
interface SchemaFormState {

}


export class SchemaForm extends Component<SchemaFormProps, SchemaFormState> {
    formRef: FormInstance | undefined;
    constructor(props: SchemaFormProps) {
        super(props);
        if (!props.formRef) {
            try {
                throw new Error('properties formRef in SchemaForm is required.')
            } catch (error) {
            }
        }
        this.formRef = props.formRef;
    }

    renderItem = function () {

    }

    filterGroup = function () {

    }


    render(){
        return <Form>
            {}
        </Form>
    }


}