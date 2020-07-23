import React from 'react';
import { DateFilter, InputFilter, SelectFilter } from '@/components/MutilpFilter/select';
export const methodSelect = [
  { label: '存在任意一个', key: 'overlap' }
];
export const methodText = [
  { label: '等于', key: 'eq' }
];
export const methodNumber = [
  { label: '大于', key: 'gt' },
  { label: '小于', key: 'lt' },
  { label: '大于等于', key: 'gte' },
  { label: '小于等于', key: 'lte' },
];
export const notRq = [
  { label: '为空', key: 'null' },
  { label: '不为空', key: 'notNull' }
];
export const renderFilter = (item: any) => {
  switch (item.type) {
    case 'inputDate':
      return <DateFilter methods={item.required ? methodNumber : methodNumber.concat(notRq)} />;
    case 'mutileText':
    case 'singText':
      return <InputFilter methods={item.required ? methodText : methodText.concat(notRq)} />;
    case 'select':
    case 'radios':
      return <SelectFilter methods={item.required ? methodSelect : methodSelect.concat(notRq)} opts={item.items} {...{ mode: item.type === 'radio' ? undefined : 'multiple' }} />;
    case "numberText":
      return <InputFilter methods={item.required ? methodNumber : methodNumber.concat(notRq)} />;
    default:
      return <></>;
  }
};
