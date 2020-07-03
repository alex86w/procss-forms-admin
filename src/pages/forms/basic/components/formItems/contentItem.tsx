import SingleText from './singleText';
import { ContentBaseProps } from './contentItemBase';
import React from 'react';
import MutileText from './mutileText';
import NumberText from './numerText';
import InputDate from './inputDate';
import DividerTitle from './divider';
import { FormType } from '@/services/constants';
import FormRadios from './radios';
import CheckboxForms from './checks';
import SelectForm from './select';
import SelectChecksForms from './selectChecks ';
import ImageForm from './image';
import FileForm from './file';
import SignName from './signName';
import ChildrenTable from './ChildrenTable';

interface Props extends ContentBaseProps {
    contentKey: any;
}

const ContentItem = (props: Props) => {

    switch (props.contentKey) {
        case 'singText':
            return <SingleText {...props} />;
        case 'mutileText':
            return <MutileText {...props} />;
        case 'numberText':
            return <NumberText {...props} />;
        case 'inputDate':
            return <InputDate {...props} />;
        case 'divider':
            return <DividerTitle {...props} />;
        case FormType[FormType.radios]:
            return <FormRadios {...props} />;
        case FormType[FormType.checks]:
            return <CheckboxForms {...props} />;
        case FormType[FormType.select]:
            return <SelectForm {...props} />
        case FormType[FormType.selectCheck]:
            return <SelectChecksForms {...props} />
        case FormType[FormType.image]:
            return <ImageForm {...props} />
        case FormType[FormType.attchment]:
            return <FileForm {...props} />
        case FormType[FormType.signName]:
            return <SignName {...props} />
        case FormType[FormType.ChildrenTable]:
            return <ChildrenTable {...props} />
        default:
            return <div />;
    }
};

export default ContentItem;
