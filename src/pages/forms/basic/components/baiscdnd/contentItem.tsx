import SingleTitle from './singleTitle';
import { ContentBaseProps } from './contentItemBase';
import React from 'react';


interface Props extends ContentBaseProps {
    contentKey: any
}

const ContentItem = (props: Props) => {
    switch (props.contentKey) {
        case SingTitleKey:
            return <SingleTitle  {...props} />
        default:
            return <div />
    }
}

export const SingTitleKey = "SingTitle"

export default ContentItem;