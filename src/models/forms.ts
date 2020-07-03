import { useState } from 'react';
import Forms, {
  FormItems,
  FormTabs,
} from '@/services/interface/forms.interface';
import update from 'immutability-helper';
import { VIRKEY } from '@/pages/forms/basic/components/baiscdnd/content';
import generate from 'shortid';
import { modify, querFormDeail, querSubmitFormDeail } from '@/services/form';
import { Response } from '@/services/base';
import { notification } from 'antd';

//@ts-ignore
const SELECT: FormItems = { id: '' };
export const InitForm: Forms = {
  items: [],
  theme: {
    custom: {
      background: { mode: 'color', color: '#f5f7fa' },
      banner: { mode: 'color', color: 'white' },
      submit_btn: { backgroundColor: 'white' },
      title: {},
    },
  },
};
const VIRBOX: { index: number; tabId?: string } = { index: 0 };
export default () => {
  const [forms, setForms] = useState(InitForm);
  const [selectIdx, $selectIdx] = useState([] as Array<number>);
  const [virBox, setVirBox] = useState(VIRBOX);
  const [loading, $loading] = useState(false);
  const [filedValues, $filedValues] = useState({} as any);
  const selectItem =
    selectIdx[1] >= 0
      ? forms.items[selectIdx[0]].items![selectIdx[1]]
      : selectIdx[0] >= 0
      ? forms.items[selectIdx[0]]
      : SELECT || SELECT;
  async function asyncFetch(location: any) {
    if (loading) return;
    $loading(true);
    const { formid, tosubid, finishid } = location.query || {};

    let result: Response<Forms> = { success: false };
    if (location.pathname.indexOf('forms') >= 0 && formid) {
      result = await querFormDeail(formid);
    }
    if (location.pathname.indexOf('mobile') >= 0 && tosubid) {
      result = await querSubmitFormDeail(tosubid);
    }
    if (result.success) {
      result.data && mergeForms(result.data);
    }
    $loading(false);
  }

  function mergeForms(data: Forms) {
    !data.items && (data.items = InitForm.items);
    !data.theme && (data.theme = InitForm.theme);
    // $filedValues({});
    //console.log('mergeForms', data);
    setForms(data);
  }

  return {
    filedValues,
    $filedValues,
    formItems: forms.items,
    mergeForms,
    asyncFetch,
    forms,
    selectItem,
    virBoxIndex: virBox.index,
    loading,
    updateTabsTab(value: string, index: number) {
      setForms(
        update(forms, {
          tabs: {
            //@ts-ignore
            $splice: [[index, 1, { ...forms.tabs[index], title: value }]],
          },
        }),
      );
    },
    saveForm: async () => {
      $loading(true);
      const result = await modify(forms);
      if (result.success) {
        notification.success({ message: '保存成功' });
      } else {
        notification.error({ message: '操作吧' });
      }
      $loading(false);
    },
    updaFomrs(key: any, value: any) {
      const updateKeyValue: any = {};
      updateKeyValue[key] = { $set: value };
      setForms(update(forms, updateKeyValue));
    },

    updateFormsDeep(obj: any) {
      setForms(update(forms, obj));
    },

    deleteTabs(index: number) {
      setForms(
        update(forms, {
          tabs: { $splice: [[index, 1]] },
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
      $selectIdx([hIndex]);
    },
    moveSubFormsItems(dId: string, hId: string, pid: String) {
      const pIdx = forms.items.findIndex(x => x.id === pid);
      const dIndex = forms.items[pIdx].items!.findIndex(it => it.id === dId);
      const hIndex = forms.items[pIdx].items!.findIndex(it => it.id == hId);
      setForms(
        update(forms, {
          items: {
            [pIdx]: {
              items: {
                $splice: [
                  [dIndex, 1],
                  [hIndex, 0, forms.items[pIdx].items![dIndex]],
                ],
              },
            },
          },
        }),
      );
      $selectIdx([pIdx, hIndex]);
    },
    addItems(data: any, tabId?: string) {
      setForms(
        update(forms, {
          items: { $push: [data] },
        }),
      );
    },

    moveVirBox(toId: any, tabId?: string) {
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
              $push: [{ id: VIRKEY, tabId }],
            },
          }),
        );
      }
      $selectIdx([toIdIndex]);
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
      if (delteIndex === selectIdx[0]) {
        $selectIdx([]);
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

    deleteSelect() {
      if (selectIdx[1] >= 0) {
        setForms(
          update(forms, {
            items: {
              [selectIdx[0]]: { items: { $splice: [[selectIdx[1], 1]] } },
            },
          }),
        );
      } else if (selectIdx[0] >= 0) {
        setForms(update(forms, { items: { $splice: [[selectIdx[0], 1]] } }));
      }
      $selectIdx([]);
    },
    copySelect() {
      const id = generate();
      if (selectIdx[1] >= 0) {
        setForms(
          update(forms, {
            items: {
              [selectIdx[0]]: {
                items: {
                  $push: [
                    {
                      ...forms.items[selectIdx[0]].items![selectIdx[1]],
                      id,
                    },
                  ],
                },
              },
            },
          }),
        );
      } else if (selectIdx[0] >= 0) {
        setForms(
          update(forms, {
            items: { $push: [{ ...forms.items[selectIdx[0]], id }] },
          }),
        );
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
      if (index === selectIdx[0]) {
        $selectIdx([]);
      }
      setForms(
        update(forms, {
          items: {
            $splice: [[index, 1]],
          },
        }),
      );
    },
    setSelect(id: any, cId?: string) {
      const pIdx = forms.items.findIndex(x => x.id === id);
      if (cId) {
        const cIdx = forms.items[pIdx].items!.findIndex(x => x.id === cId);
        $selectIdx([pIdx, cIdx]);
      } else $selectIdx([pIdx]);
    },

    updateItem(value: any, key: string) {
      const [pIdx, cIdx] = selectIdx;
      if (cIdx >= 0) {
        setForms(
          update(forms, {
            items: {
              [pIdx]: { items: { [cIdx]: { [key]: { $set: value } } } },
            },
          }),
        );
      } else if (pIdx >= 0) {
        setForms(
          update(forms, {
            items: {
              [pIdx]: { [key]: { $set: value } },
            },
          }),
        );
      }
    },

    addSubItem(item: FormItems) {
      selectIdx[0] >= 0 &&
        setForms(
          update(forms, {
            items: {
              [selectIdx[0]]: {
                items: items => update(items || [], { $push: [item] }),
              },
            },
          }),
        );
    },
  };
};
