//
import React, { useState } from 'react';
import { Table, Button } from 'antd';
import { ColumnProps } from 'antd/lib/table';
import { connect } from 'umi';
import { ConnectFC } from './ConnectFC';
import { FormModal } from './component/FormModal';
import { Visitype } from './user';
import { history } from 'umi';

const FormPage = function (props: any) {
  const {
    list,
    dispatch,
    formStatus,
    loading: { effects },
    queryParams: { size, page, total },
  } = props;
  const [visitype, $visitype] = useState<Visitype>(null);
  const [record, $record] = useState<any>({});
  const columns: ColumnProps<any>[] = [
    { dataIndex: 'name', key: 'name', title: '名称' },
    {
      dataIndex: 'type', key: 'type', title: '类型', render: (v) => {
        return ((formStatus || []).find((it: any) => it.value === v) || {}).name
      }
    },
    {
      title: '操作',
      key: 'operation',
      render: (value, record) => (
        <>
          {/* <Button type="danger" onClick={() => dispatch({
            type: 'form/remove',
            payload: record.id
          })}>删除业务</Button> */}
          &nbsp;&nbsp;
          <Button onClick={() => { $visitype('modify'); $record(record) }}>修改业务</Button>
          &nbsp;&nbsp;
          <Button onClick={() => history.replace({ pathname: `/forms/basic/formdes`, query: { formid: record.id } })}>进入业务</Button>
        </>
      ),
      align: 'right',
    },
  ];
  const modalProps = { visitype, $visitype, record, dispatch, formStatus };
  return (
    <>
      <Button style={{ margin: '10px 0' }} onClick={() => $visitype('create')}>新建</Button>
      <Table
        columns={columns}
        dataSource={list || []}
        rowKey="id"
        loading={effects['form/query']}
        pagination={{
          current: page + 1,
          total: total,
          pageSize: size,
          onChange: v =>
            dispatch({ type: 'user/query', payload: { page: v - 1 } }),
        }} />
      <FormModal  {...modalProps} />
    </>
  );
};

const ConnectForm = connect(({ form, loading }: { [key: string]: any }) => ({
  ...form,
  loading,
}))(FormPage) as ConnectFC;
ConnectForm.title = '流程管理';
ConnectForm.icon = 'Appstore';
ConnectForm.sort = 3;

export default ConnectForm;
