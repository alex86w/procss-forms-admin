import Title from './title';
import { Divider } from 'antd';
import Descirption from './description';
import Pattern from './pattern';
import Verify from './verify';
import SimpleDefault from './simpleDefaut';
import FiledPermission from './filedPermission';
import VerifyOne from './verifyOne';
import VerifyNumber from './verifyNumber';
import DateDefault from './dateDefault';
import FiledPermissionOne from './filedPermissionOne';
import DividerType from './dividerType';
import { FormType } from '@/services/constants';
import RadiosForms from './radiosForms';
import Layout from './layout';
import ChecksForms from './checks';
import Images from './images';
import ChildrenTableFiled from './ChildrenTableFiled';

const ContentObj: any = {
  singText: [
    Title,
    Divider,
    Descirption,
    Divider,
    Pattern,
    Divider,
    SimpleDefault,
    Divider,
    Verify,
    Divider,
    FiledPermission,
  ],
  mutileText: [
    Title,
    Divider,
    Descirption,
    Divider,
    SimpleDefault,
    Divider,
    VerifyOne,
    Divider,
    FiledPermission,
  ],
  numberText: [
    Title,
    Divider,
    Descirption,
    Divider,
    SimpleDefault,
    Divider,
    VerifyNumber,
    Divider,
    FiledPermission,
  ],
  inputDate: [
    Title,
    Divider,
    Descirption,
    Divider,
    DateDefault,
    Divider,
    VerifyOne,
    Divider,
    FiledPermission,
  ],
  divider: [
    Title,
    Divider,
    Descirption,
    Divider,
    DividerType,
    Divider,
    FiledPermissionOne,
  ],
};

ContentObj[FormType[FormType.radios]] = [
  Title,
  Divider,
  Descirption,
  Divider,
  RadiosForms,
  Divider,
  Layout,
  Divider,
  VerifyOne,
  Divider,
  FiledPermission,
];
ContentObj[FormType[FormType.checks]] = [
  Title,
  Divider,
  Descirption,
  Divider,
  ChecksForms,
  Divider,
  Layout,
  Divider,
  VerifyOne,
  Divider,
  FiledPermission,
];

ContentObj[FormType[FormType.select]] = [
  Title,
  Divider,
  Descirption,
  Divider,
  RadiosForms,
  Divider,
  VerifyOne,
  Divider,
  FiledPermission,
];

ContentObj[FormType[FormType.selectCheck]] = [
  Title,
  Divider,
  Descirption,
  Divider,
  ChecksForms,
  Divider,
  VerifyOne,
  Divider,
  FiledPermission,
];
ContentObj[FormType[FormType.image]] = [
  Title,
  Divider,
  Descirption,
  Divider,
  Images,
  Divider,
  FiledPermission,
];
ContentObj[FormType[FormType.attchment]] = [
  Title,
  Divider,
  Descirption,
  Divider,
  Verify,
  Divider,
  FiledPermission,
];

ContentObj[FormType[FormType.signName]] = [
  Title,
  Divider,
  Descirption,
  Divider,
  VerifyOne,
  Divider,
  FiledPermission,
];

ContentObj[FormType[FormType.ChildrenTable]] = [
  Title,
  Divider,
  Descirption,
  Divider,
  ChildrenTableFiled,
  Divider,
  FiledPermission,
];

export default ContentObj;
