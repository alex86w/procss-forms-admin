import { useEffect } from 'react';
import { getTodoForms } from '@/services/form';

export default () => {
  useEffect(() => {
    const asycFect = async () => {
      const result = await getTodoForms('');
      console.log(result);
    };
  }, []);
};
