export default interface Forms {
  id?: string;
  type?: string;
  name?: string;
  items: Array<FormItems>;
  hasCache?: boolean;
  theme: Theme;
  tabs?: [FormTabs];
  mobileLayout?: 'compact' | 'normal';
  pcLayout?: 'normal' | 'grid-2';
  validators?: Array<any>;
  /**不可见字段赋值 */
  submitRule?: number;
  status?: string;
  assetsFrom?: boolean;
}

export interface FormItems {
  id: string;
  type?: string;
  /**lable  */
  title?: string;
  description?: string;
  lineWidth?: number;
  /**可编辑 */
  enable?: boolean;
  /**可见 */
  visible?: boolean;
  allowBlank?: boolean;
  rely?: null;
  /**默认值 */
  value?: string;
  /**格式 校验 */
  regex?: string;
  /** 不允许充值 */
  noRepeat?: boolean;
  /**必填 */
  required?: boolean;
  /**扫码输入 */
  scan?: Scan;
  ank?: false;
  allowDecimals?: boolean;
  maxNumber?: number;
  minNumber?: number;
  defaultValue?: string;
  /**....this will add */
  onlyInteger?: boolean;
  dateFormat?: string;
  items?: Array<any | FormItems>;
  layout?: string;
  onlyOneImage?: boolean;
  onlyCamera?: boolean;
  autoCompress?: boolean;
  tabId?: string;
  parentId?: string;
}

export interface Scan {
  editable: boolean;
  type: 'barCode' | 'qrCode';
}

export interface Theme {
  mode?: string;
  system?: string;
  custom: ThemeCustom;
}
export interface ThemeCustom {
  title?: {
    textAlign?: string;
    fontSize?: number;
    fontStyle?: string;
    fontWeight?: string;
    color?: string;
  };
  background?: { mode?: 'color' | 'image'; color?: string; image?: string };
  banner?: {
    mode?: 'image' | 'color';
    image?: string;
    color?: string;
  };
  submit_btn?: { backgroundColor?: string };
}

export interface FormTabs {
  title: string;
  tabId: string;
}

export interface FormEvents {}

export interface FormDatas {}
