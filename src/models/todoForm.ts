import { useEffect, useState } from 'react';
import { getTodoForms, getTodoHistory, getFinishDetail } from '@/services/form';
import { useModel } from 'umi';
import { Response } from '@/services/base';
const Init: {
  data?: any;
  todoId?: string;
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
    if (status === '1') {
      result = await getTodoForms(todoid);
      console.log(result)
    } else if (status === '2') {
      result = await getTodoHistory(todoid);
      console.log(result)
    } else if (location.pathname.indexOf('mobile') >= 0 && finishid) {
      result = await getFinishDetail(finishid);
      console.log(result)
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
