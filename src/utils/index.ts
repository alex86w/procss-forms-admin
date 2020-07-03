import { generate } from 'shortid';
import { FormType } from '@/services/constants';
import { FormItems } from '@/services/interface/forms.interface';

export function generateFormItem(
  key: string,
  title: string,
  parentId?: string,
) {
 console.log(parentId);
  const data: FormItems = { id: generate(), type: key, title, parentId };
  if (
    key === FormType[FormType.checks] ||
    key === FormType[FormType.radios] ||
    key === FormType[FormType.select] ||
    key === FormType[FormType.selectCheck]
  ) {
    data['items'] = [
      {
        label: '选项1',
        value: '选项1',
      },
      {
        label: '选项2',
        value: '选项2',
      },
      {
        label: '选项3',
        value: '选项3',
      },
    ];
  }
 console.log(data);
  return data;
}
