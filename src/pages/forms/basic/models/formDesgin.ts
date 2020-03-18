import { Effect, Subscription } from 'dva';
import update from 'immutability-helper';
export interface FormDesignSate {
  contentItems: Array<any>;
}

export interface FormDesignModelType {
  namespace: string;
  state: FormDesignSate;
  effects: {
    query: Effect;
  };
  reducers: {};
  subscriptions: { setup: Subscription };
}

const FormDesignModel: FormDesignModelType = {
  namespace: 'formDesgin',

  state: {
    contentItems: [],
  },
  effects: {
    query() {},
  },
  reducers: {
    moveItems(state: FormDesignSate, { payload: { dId, hId } }: any) {
      //console.log(dId, hId);
      const contentItems = [...state.contentItems];
      const dIndex = contentItems.findIndex(it => it.id === dId);
      const hIndex = contentItems.findIndex(it => it.id === hId);
      update(contentItems, {
        $splice: [
          [dIndex, 1],
          [hIndex, 0, contentItems[dIndex]],
        ],
      });

      return { ...state, contentItems };
    },

    addItems(state: FormDesignSate, { payload: { data } }: any) {
      console.log(data);
      const contentItems = [...state.contentItems, data];
      return { ...state, contentItems };
    },
    moveById(state: FormDesignSate, { payload: { id, toId } }: any) {
      const items = [...state.contentItems];
      const idIndex = items.findIndex(x => x.id === id);
      const toIdIndex = items.findIndex(x => x.id === toId);
      if (idIndex >= 0) {
        items.splice(idIndex, 1);
        items.splice(toIdIndex, 0, { id });
      } else {
        items.push({ id });
      }
      return { ...state, contentItems: items };
    },
    deleById(state: FormDesignSate, { payload: { id } }: any) {
      const contentItems = [...state.contentItems];
      const delteIndex = contentItems.findIndex(x => x.id == id);
      contentItems.splice(delteIndex, 1);
      return { ...state, contentItems };
    },
  },
  subscriptions: {
    setup() {},
  },
};

export default FormDesignModel;
