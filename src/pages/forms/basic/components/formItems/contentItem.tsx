import SingleText from './singleText';
import { ContentBaseProps } from './contentItemBase';
import React from 'react';
import MutileText from './mutileText';
import NumberText from './numerText';
import InputDate from './inputDate';

interface Props extends ContentBaseProps {
  contentKey: any;
}

const ContentItem = (props: Props) => {
  console.log(props);
  switch (props.contentKey) {
    case 'singText':
      return <SingleText {...props} />;
    case 'mutileText':
      return <MutileText {...props} />;
    case 'numberText':
      return <NumberText {...props} />;
    case 'inputDate':
      return <InputDate {...props} />;
    default:
      return <div />;
  }
};

export default ContentItem;
