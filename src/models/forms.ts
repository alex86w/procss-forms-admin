import { useState } from 'react';
import Forms, { FormItems } from '@/services/interface/forms.interface';
import update from 'immutability-helper';
import { VIRKEY } from '@/pages/forms/basic/components/baiscdnd/content';
import generate from 'shortid';
//@ts-ignore
const SELECT: FormItems = { id: '' };
export const FORMS: Forms = { items: [] };

export default () => {
  const [forms, setForms] = useState(FORMS);
  const [selectItem, setSelectItem] = useState(SELECT);
  const [virBoxIndex, setVirBoxIndex] = useState(0);
  console.log(forms);
  return {
    formItems: forms.items,
    forms,
    selectItem,
    virBoxIndex,
    updaFomrs(key: any, value: any) {
      const updateKeyValue: any = {};
      updateKeyValue[key] = { $set: value };
      setForms(update(forms, updateKeyValue));
    },
    moveItems(dId: any, hId: any) {
      const dIndex = forms.items.findIndex(it => it.id === dId);
      const hIndex = forms.items.findIndex(it => it.id == hId);
      setForms(
        update(forms, {
          items: {
            $splice: [
              [dIndex, 1],
              [hIndex, 0, forms.items[dIndex]],
            ],
          },
        }),
      );
    },

    addItems(data: any) {
      if (data.id !== VIRKEY) {
        setForms(
          update(forms, {
            items: { $splice: [[virBoxIndex, 0, data]] },
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
    moveVirBox(toId: any) {
      const idIndex = forms.items.findIndex(x => x.id === VIRKEY);
      const toIdIndex = forms.items.findIndex(x => x.id === toId);
      if (idIndex >= 0) {
        setForms(
          update(forms, {
            items: {
              $splice: [
                [idIndex, 1],
                [toIdIndex, 0, forms.items[idIndex]],
              ],
            },
          }),
        );
      } else {
        setForms(
          update(forms, {
            items: {
              //@ts-ignore
              $push: [[{ id: VIRKEY }]],
            },
          }),
        );
      }
    },
    deleById(id: any) {
      const delteIndex = forms.items.findIndex(x => x.id == id);
      if (id === selectItem.id) {
        setSelectItem(SELECT);
      }
      if (delteIndex >= 0) {
        id === VIRKEY && setVirBoxIndex(delteIndex);
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
