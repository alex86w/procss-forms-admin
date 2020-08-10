import React, { useState } from 'react'
import update from 'immutability-helper'
import { PlusOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import './index.less'
import { strEmpty } from '@/utils/request';
import isEqual from 'lodash/isEqual'
import { findDOMNode } from 'react-dom'

function beforeUpload(file: any) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

function getBase64(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

interface Props {
    value?: any
    onChange?: (v: any) => void,
    length: number,
    enable?: boolean,
    onlyCamera?: boolean
}

class PicturesWall extends React.Component<Props> {

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };

    handleCancel = () => this.setState({ previewVisible: false });

    handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };
    upload: Upload | null = null;

    static getDerivedStateFromProps(props: any, state: any) {
        if (!isEqual(props.value, state.fileList)) {
            return { fileList: props.value || [] }
        }
        return state;
    }

    handleChange = ({ fileList }: any) => {
        if (!this.props.enable) {
            return;
        }
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (file.response) {
                const { success, message } = file.response
                if (success)
                    fileList.splice(i, 1, { uid: message.id, status: 'done', url: `/api/file/get/${message.id}` })
            }
        }
        this.setState({ fileList });
        //@ts-ignore
        this.props.onChange && this.props.onChange(fileList)
    }

    componentDidMount() {
        try {
            if (this.props.onlyCamera) {
                const emls = document.getElementsByClassName('ant-upload')[1]
                emls.getElementsByTagName('input')[0].setAttribute('capture', '')
            }
        } catch (error) {

        }
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const { length, enable } = this.props;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action="/api/file/add"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    accept="image/*"
                    ref={ref => this.upload = ref}
                >
                    {(fileList.length >= length || !enable) ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}
export default PicturesWall
