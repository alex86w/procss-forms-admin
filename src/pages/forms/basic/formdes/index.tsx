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


//@ts-ignore
const SELECT: FormItems = { id: '' };
const FiledTitle = ({ title }: any) => <div style={{ width: '100%', margin: '5px', fontSize: '16px', fontWeight: 'bold', }}>
  {title}
</div>
import { generate } from 'shortid';
import { ITEMs } from '../_layout';

export const ContentContext = createContext({
  moveItems: (dId: any, hId: any) => { },
  addItems: (data: any) => { },
  contentItems: ITEMs,
  moveVirBox: (toId: any) => { },
  deleById: (id: any) => { },
  selectItem: SELECT,
  setSelect: (data: any) => { },
  copyItem: (id: any) => { },
  deleItem: (id: any) => { },
  updateItem: (value: any, key: string) => { },
});
interface Props {
  formItems: Array<FormItems>,
  setFormItmes: Dispatch<SetStateAction<any>>
}

const FormsDes: React.FC<Props> = ({ formItems: contentItems, setFormItmes: setItmes }) => {

  const [selectItem, setSelectItem] = useState(SELECT);
  const [virBoxIndex, setVirBoxIndex] = useState(0);

  const [attr, $attr] = useState({});

  function moveItems(dId: any, hId: any) {
    const dIndex = contentItems.findIndex(it => it.id === dId);
    const hIndex = contentItems.findIndex(it => it.id == hId);
    setItmes(
      update(contentItems, {
        $splice: [
          [dIndex, 1],
          [hIndex, 0, contentItems[dIndex]],
        ],
      }),
    );
  }

  function addItems(data: any) {
    if (data.id !== VIRKEY) {
      setItmes(
        update(contentItems, {
          $splice: [[virBoxIndex, 0, data]],
        }),
      );
    } else {
      setItmes(
        update(contentItems, {
          $push: [data],
        }),
      );
    }
  }
  function moveVirBox(toId: any) {
    const idIndex = contentItems.findIndex(x => x.id === VIRKEY);
    const toIdIndex = contentItems.findIndex(x => x.id === toId);
    if (idIndex >= 0) {
      setItmes(
        update(contentItems, {
          //@ts-ignore
          $splice: [
            [idIndex, 1],
            [toIdIndex, 0, contentItems[idIndex]],
          ],
        }),
      );
    } else {
      setItmes(
        update(contentItems, {
          //@ts-ignore
          $push: [[{ id: VIRKEY }]],
        }),
      );
    }
  }
  function deleById(id: any) {
    const delteIndex = contentItems.findIndex(x => x.id == id);
    if (id === selectItem.id) {
      setSelectItem(SELECT);
    }
    if (delteIndex >= 0) {
      id === VIRKEY && setVirBoxIndex(delteIndex);
      setItmes(update(contentItems, { $splice: [[delteIndex, 1]] }));
    }
  }

  function copyItem(id: any) {
    const index = contentItems.findIndex(x => x.id == id);
    const copy = { ...contentItems[index], id: generate() };
    setItmes(
      update(contentItems, {
        //@ts-ignore
        $splice: [[index, 0, copy]],
      }),
    );
  }

  function deleItem(id: any) {
    const index = contentItems.findIndex(x => x.id == id);
    if (id === selectItem.id) {
      console.log(id, selectItem);
      setSelectItem(SELECT);
    }
    setItmes(
      update(contentItems, {
        $splice: [[index, 1]],
      }),
    );
  }

  function setSelect(id: any) {
    //@ts-ignore
    setSelectItem(contentItems.find(x => x.id == id));
  }
  function updateItem(value: any, key: string) {
    const index = contentItems.findIndex(x => x.id === selectItem.id);
    const temp: any = { ...selectItem };
    temp[key] = value;
    setItmes(
      update(contentItems, {
        $splice: [[index, 1, temp]],
      }),
    );
    setSelectItem(temp);
  }
  const filedAttr = selectItem.type && ContentObj[selectItem.type] && ContentObj[selectItem.type];
  return (
    <ContentContext.Provider
      value={{ updateItem, selectItem, setSelect, copyItem, deleItem, moveVirBox, addItems, contentItems, deleById, moveItems, }}
    >
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
              <DndTile type='attchment' title='附件' icon={<CopyOutlined />} />
              <DndTile type='signName' title='手写签名' icon={<EditOutlined />} />
              <FiledTitle title='部门成员字段' />
              <DndTile type='memberRadio' title='成员单选' icon={<UserAddOutlined />} />
              <DndTile type='memberSelect' title='成员多选' icon={<UsergroupAddOutlined />} />
              <DndTile type='depRadio' title='部门单选' icon={<CheckCircleOutlined />} />
              <DndTile type='depSelect' title='部门多选' icon={<OrderedListOutlined />} />
            </div>
          </Sider>
          <Content style={{ backgroundColor: 'white', height: '88vh', overflowY: 'scroll' }}>
            <FormContent />
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
              <TabPane key="tab_atrr" tab="表单属性">
                <Formattr attr={attr} $attr={$attr} />
              </TabPane>
            </Tabs>
          </Sider>
        </Layout>
      </DndProvider>
    </ContentContext.Provider>
  );
};
//@ts-ignore
FormsDes.title = "基础设置--表单设置"
export default FormsDes;
