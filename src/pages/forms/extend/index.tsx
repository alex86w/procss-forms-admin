//@ts-nocheck
import React from 'react';
import {
  PageHeader,
  Button,
  Descriptions,
  Tag,
  Tabs,
  Divider,
  Radio,
} from 'antd';
import {
  TagOutlined,
  CommentOutlined,
  BellOutlined,
  LinkOutlined,
  CheckCircleOutlined,
  PrinterOutlined,
  BulbOutlined,
  CloudUploadOutlined,
} from '@ant-design/icons';
import './index.less';
const { TabPane } = Tabs;

export default class Extension extends React.Component<any> {
  //@ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      value: 1,
    };
  }
  //@ts-ignore
  radioChange = e => {
    this.setState(
      {
        value: e.target.value,
      },
      () =>console.log(this.state),
    );
  };
  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      paddingLeft: '24px',
    };
    return (
      <div className="extension">
        <div className="extension-content">
          <Tabs defaultActiveKey="1" onChange={() => null} tabPosition="left">
            <TabPane
              tab={
                <div>
                  <TagOutlined />
                  数据标题
                </div>
              }
              key="1"
            >
              <PageHeader
                className="gpline"
                title="数据标题"
                subTitle={
                  <div>
                    数据标题用于快速辨识一条数据，适用于数据表格首列标题、关联数据、数据详情页等功能场景中{' '}
                    <a>帮助文档</a>
                  </div>
                }
              />
              <Radio.Group
                onChange={this.radioChange}
                value={this.state.value}
                style={{ paddingTop: '22px' }}
              >
                <Radio style={radioStyle} value={1}>
                  第一个字段的值
                </Radio>
                <Radio style={radioStyle} value={2}>
                  自定义标题
                </Radio>
              </Radio.Group>
              <Divider />
              <Button style={{ marginLeft: 24 }} type="primary">
                保存设置
              </Button>
            </TabPane>
            <TabPane
              tab={
                <div>
                  <CommentOutlined />
                  数据评论
                </div>
              }
              key="2"
            >
              <PageHeader
                className="gpline"
                title="数据评论"
                subTitle={
                  <div>
                    开启后可在单条数据详情页中查看并添加评论 <a>帮助文档</a>
                  </div>
                }
              />
            </TabPane>
            <TabPane
              tab={
                <div>
                  <BellOutlined />
                  推送提醒
                </div>
              }
              key="3"
            >
              <PageHeader
                className="gpline"
                title="推送提醒"
                subTitle={
                  <div>
                    通过设置推送提醒可以到期查看提醒内容 <a>帮助文档</a>
                  </div>
                }
              />
            </TabPane>
            <TabPane
              tab={
                <div>
                  <LinkOutlined />
                  公开链接
                </div>
              }
              key="4"
            >
              <PageHeader
                className="gpline"
                title="公开链接"
                subTitle={
                  <div>
                    通过公开链接，无需登录即可访问业务和数据 <a>帮助文档</a>
                  </div>
                }
              />
            </TabPane>
            <TabPane
              tab={
                <div>
                  <CheckCircleOutlined />
                  提交提示
                </div>
              }
              key="5"
            >
              <PageHeader
                className="gpline"
                title="提交提示"
                subTitle={
                  <div>
                    自定义业务提交成功后的提示内容 <a>帮助文档</a>
                  </div>
                }
              />
            </TabPane>
            <TabPane
              tab={
                <div>
                  <PrinterOutlined />
                  打印模板
                </div>
              }
              key="6"
            >
              <PageHeader
                className="gpline"
                title="打印模板"
                subTitle={
                  <div>
                    打印业务时将按照使用中的模板格式打印 <a>帮助文档</a>
                  </div>
                }
              />
            </TabPane>
            <TabPane
              tab={
                <div>
                  <BulbOutlined />
                  智能助手
                </div>
              }
              key="7"
            >
              <PageHeader
                className="gpline"
                title="智能助手"
                subTitle={
                  <div>
                    当前业务数据发生变动后，自动在其他业务中新增、修改、删除数据{' '}
                    <a>帮助文档</a>
                  </div>
                }
              />
            </TabPane>
            <TabPane
              tab={
                <div>
                  <CloudUploadOutlined />
                  数据推送
                </div>
              }
              key="8"
            >
              <PageHeader
                className="gpline"
                title="数据推送"
                subTitle={
                  <div>
                    数据推送可将业务数据推送至您指定的服务器 <a>帮助文档</a>
                  </div>
                }
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}
