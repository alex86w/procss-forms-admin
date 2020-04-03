import { useEffect, useState } from 'react';
import { getTodoForms, getTodoHistory, getFinishDetail } from '@/services/form';
import { useModel } from 'umi';
import { Response } from '@/services/base';
const Init: {
  data?: any;
  todoId?: string;
  formDataId?: string;
  node?: {
    suggest: string;
    handWritten: string;
    submit: string;
  };
  status?: string;
} = {};

export default () => {
  // console.log('create todos model');
  const [todos, setTodos] = useState(Init);
  const { mergeForms } = useModel('forms');

  async function asyncFetch(location: any) {
    const { todoid, status, finishid } = location.query || {};

    setTodos(Init);
    let result: Response<any> = { success: false };
    if (todoid && status === '1') {
      /** 代办事项*/
      result = await getTodoForms(todoid);
      console.log(result);
    } else if (todoid && status === '2') {
      /**我处理的 抄送我的*/
      result = await getTodoHistory(todoid);
    } else if (location.pathname.indexOf('mobile') >= 0 && finishid) {
      /**我发起的 完成事项 */
      result = await getFinishDetail(finishid);
    }
    if (result.success) {
      result.data.form && mergeForms(result.data.form);
      delete result.form;
      setTodos(result.data);
    }
  }

  function clearTodoForms() {
    setTodos(Init);
  }

  return {
    todos,
    clearTodoForms,
    asyncFetch,
  };
};
