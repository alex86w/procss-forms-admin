import { Layout, Tabs } from 'antd';
import React, {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  FileTextOutlined,
  NumberOutlined,
  FieldTimeOutlined,
  MinusOutlined,
  RadiusBottomleftOutlined,
  CheckCircleOutlined,
  CheckSquareOutlined,
  CopyOutlined,
  FundOutlined,
  EditOutlined,
  OrderedListOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  TableOutlined,
} from '@ant-design/icons';
import DndTile from '../components/baiscdnd/dndTile';
import Html5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import './index.css';
import FormContent, { VIRKEY } from '../components/baiscdnd/content';
import update from 'immutability-helper';
import { FormItems } from '@/services/interface/forms.interface';
import ContentObj from '../components/formattr/filedData';
import { Formattr } from '../components/letterattr';
import { FormType } from '@/services/constants'
const { Sider, Content } = Layout;
const { TabPane } = Tabs;
import { useModel } from 'umi';

//@ts-ignore
const SELECT: FormItems = { id: '' };
const FiledTitle = ({ title }: any) => <div style={{ width: '100%', margin: '5px', fontSize: '16px', fontWeight: 'bold', }}>
  {title}
</div>

interface Props {

}

const FormsDes: React.FC<Props> = (

) => {


  const { selectItem, forms: { tabs } } = useModel('forms')


  const filedAttr = selectItem.type && ContentObj[selectItem.type] && ContentObj[selectItem.type];
  return (

    <DndProvider backend={Html5Backend}>
      <Layout style={{ padding: 0, marginTop: 0 }}>
        <Sider
          width={220}
          theme="light"
          style={{ border: '1px solid #f5f5f5' }}
        >
          <div className="sliderContent">
            <FiledTitle title='基础字段' />
            <DndTile type={FormType[FormType.singText]} title="单行文本" icon={<FileTextOutlined />} />
            <DndTile type='mutileText' title="多行文本" icon={<FileTextOutlined />} />
            <DndTile type="numberText" title="数字" icon={<NumberOutlined />} />
            <DndTile type="inputDate" title="日期" icon={<FieldTimeOutlined />} />
            <DndTile type="divider" title="分割线" icon={<MinusOutlined />} />
            <DndTile type='radios' title='单选按钮组' icon={<CheckCircleOutlined />} />
            <DndTile type='checks' title='复选框组' icon={<CheckSquareOutlined />} />
            <DndTile type='select' title='下拉框' icon={<CheckSquareOutlined />} />
            <DndTile type='selectCheck' title='下拉复选框' icon={<CopyOutlined />} />
            <FiledTitle title='增强字段' />
            <DndTile type='image' title='图片' icon={<FundOutlined />} />
            {/* <DndTile type='attchment' title='附件' icon={<CopyOutlined />} /> */}
            <DndTile type='signName' title='手写签名' icon={<EditOutlined />} />
            <DndTile type={FormType[FormType.ChildrenTable]} title='子表单' icon={<TableOutlined />} />
            {/* <FiledTitle title='部门成员字段' />
            <DndTile type='memberRadio' title='成员单选' icon={<UserAddOutlined />} />
            <DndTile type='memberSelect' title='成员多选' icon={<UsergroupAddOutlined />} />
            <DndTile type='depRadio' title='部门单选' icon={<CheckCircleOutlined />} />
            <DndTile type='depSelect' title='部门多选' icon={<OrderedListOutlined />} /> */}
          </div>
        </Sider>
        <Content style={{ backgroundColor: 'white', height: '88vh', overflowY: 'scroll' }}>
          <FormContent />
          {tabs && tabs.length > 0 && <Tabs defaultActiveKey={"1"}>
            {tabs?.map((it, index) =>
              (< TabPane tab={it.title} key={it.tabId} >
                <FormContent tabId={it.tabId} />
              </TabPane>)
            )}
          </Tabs>}
        </Content>
        <Sider width={280} theme="light" style={{ border: '1px solid #f5f5f5', height: '88vh', overflowY: 'scroll' }} >
          <Tabs tabBarStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <TabPane key="filed_atrr" tab="字段属性" style={{ padding: '10px' }}
            >
              <div>
                {filedAttr && filedAttr.map((It: any, index: number) => (
                  <It key={index} />
                ))}
              </div>
            </TabPane>
            <TabPane key="tab_atrr" tab="业务属性">
              <Formattr />
            </TabPane>
          </Tabs>
        </Sider>
      </Layout>
    </DndProvider >
  );
};
//@ts-ignore
FormsDes.title = "基础设置--业务设置"
export default FormsDes;
