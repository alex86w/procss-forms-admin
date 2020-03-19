import Title from './title';
import { Divider } from 'antd';
import Descirption from './description';
import Pattern from './pattern';
import Verify from './verify';
import SimpleDefault from './simpleDefaut';
import FiledPermission from './filedPermission';
import VerifyOne from './verifyOne';

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
  numberText: [Title, Divider, Descirption],
};

export default ContentObj;
