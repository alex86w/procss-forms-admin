import Title from './title';
import { Divider } from 'antd';
import Descirption from './description';
import Pattern from './pattern';
import Verify from './verify';
import SimpleDefault from './simpleDefaut';
import FiledPermission from './filedPermission';

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
  mutileText: [Title, Divider, Descirption],
  numberText: [Title, Divider, Descirption],
};

export default ContentObj;
