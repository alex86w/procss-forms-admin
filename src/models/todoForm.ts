import { useEffect, useState } from 'react';
import { getTodoForms } from '@/services/form';
import { useModel } from 'umi';

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
    const { todoid } = location.query || {};
    if (!todoid || todoid === todos.todoId) {
      return;
    }
    const result = await getTodoForms(todoid);
    console.log('todo,id', result);
    if (result.success) {
      result.data.form && mergeForms(result.data.form);
      delete result.form;
      setTodos(result.data);
    }
  }
  console.log(todos)
  return {
    todos,
    asyncFetch,
  };
};
