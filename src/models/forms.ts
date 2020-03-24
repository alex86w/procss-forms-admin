import { useState, useEffect } from 'react';
import Forms, {
  FormItems,
  FormTabs,
} from '@/services/interface/forms.interface';
import update from 'immutability-helper';
import { VIRKEY } from '@/pages/forms/basic/components/baiscdnd/content';
import generate from 'shortid';
import { history } from 'umi';
import { modify, querFormDeail } from '@/services/form';

import { notification } from 'antd';
//@ts-ignore
const SELECT: FormItems = { id: '' };
export const FORMS: Forms = { items: [] };
const VIRBOX: { index: number; tabId?: string } = { index: 0 };
export default () => {
  const [forms, setForms] = useState(FORMS);
  const [selectItem, setSelectItem] = useState(SELECT);
  const [virBox, setVirBox] = useState(VIRBOX);
  useEffect(() => {
    //@ts-ignore
    const formId = history.location.query && history.location.query.formid;
    console.log(history.location, formId);
    if (formId && formId !== forms.id) {
      const asyncFetch = async () => {
        const result = await querFormDeail(formId);
        console.log(result);
        if (result.success) {
          setForms(result.data);
        }
      };
      asyncFetch();
    }
  }, [history.location.pathname]);
  return {
    formItems: forms.items,
    forms,
    selectItem,
    virBoxIndex: virBox.index,
    saveForm: async () => {
      const result = await modify(forms);
      if (result.success) {
        notification.success({ message: '保存成功' });
      } else {
        notification.error({ message: '操作吧' });
      }
    },
    updaFomrs(key: any, value: any) {
      const updateKeyValue: any = {};
      updateKeyValue[key] = { $set: value };
      setForms(update(forms, updateKeyValue));
    },

    deleteTabs(index: number) {
      setForms(
        update(forms, {
          tabs: { $splice: [[index, 0]] },
        }),
      );
    },

    addTabs(value: FormTabs) {
      setForms(
        update(forms, {
          tabs: { $push: [value] },
        }),
      );
    },
    moveItems(dId: any, hId: any, tabId?: string) {
      const dIndex = forms.items.findIndex(it => it.id === dId);
      const hIndex = forms.items.findIndex(it => it.id == hId);
      setForms(
        update(forms, {
          items: {
            $splice: [
              [dIndex, 1],
              [hIndex, 0, { ...forms.items[dIndex], tabId }],
            ],
          },
        }),
      );
    },

    addItems(data: any, tabId?: string) {
      data['tabId'] = tabId || virBox.tabId;
      if (data.id !== VIRKEY) {
        setForms(
          update(forms, {
            items: { $splice: [[virBox.index, 0, data]] },
          }),
        );
      } else {
        setForms(
          update(forms, {
            items: { $push: [data] },
          }),
        );
      }
    },

    moveVirBox(toId: any, tabId?: string) {
      console.log('moveVirBox');
      const idIndex = forms.items.findIndex(x => x.id === VIRKEY);
      const toIdIndex = forms.items.findIndex(x => x.id === toId);
      if (idIndex >= 0) {
        setForms(
          update(forms, {
            items: {
              $splice: [
                [idIndex, 1],
                [toIdIndex, 0, { ...forms.items[idIndex], tabId }],
              ],
            },
          }),
        );
      } else {
        setForms(
          update(forms, {
            items: {
              //@ts-ignore
              $push: [{ id: VIRKEY, tabId }],
            },
          }),
        );
      }
    },

    updateTabId(id: any, tabId?: string) {
      const index = forms.items.findIndex(x => x.id === id);
      index >= 0 &&
        setForms(
          update(forms, {
            items: {
              $splice: [[index, 1, { ...forms.items[index], tabId }]],
            },
          }),
        );
    },

    deleById(id: any) {
      const delteIndex = forms.items.findIndex(x => x.id == id);
      if (id === selectItem.id) {
        setSelectItem(SELECT);
      }
      if (delteIndex >= 0) {
        id === VIRKEY &&
          setVirBox({
            index: delteIndex,
            tabId: forms.items[delteIndex].tabId,
          });
        setForms(update(forms, { items: { $splice: [[delteIndex, 1]] } }));
      }
    },

    copyItem(id: any) {
      const index = forms.items.findIndex(x => x.id == id);
      const copy = { ...forms.items[index], id: generate() };
      setForms(
        update(forms, {
          items: {
            $splice: [[index, 0, copy]],
          },
        }),
      );
    },

    deleItem(id: any) {
      const index = forms.items.findIndex(x => x.id == id);
      if (id === selectItem.id) {
        console.log(id, selectItem);
        setSelectItem(SELECT);
      }
      setForms(
        update(forms, {
          items: {
            $splice: [[index, 1]],
          },
        }),
      );
    },
    setSelect(id: any) {
      //@ts-ignore
      setSelectItem(forms.items.find(x => x.id == id));
    },
    updateItem(value: any, key: string) {
      const index = forms.items.findIndex(x => x.id === selectItem.id);
      const temp: any = { ...selectItem };
      temp[key] = value;
      setForms(
        update(forms, {
          items: {
            $splice: [[index, 1, temp]],
          },
        }),
      );
      setSelectItem(temp);
    },
  };
};
