import React, {
  useContext,
  useState,
  useEffect,
  useMemo,
  Component,
} from 'react';
import {
  Table,
  Input,
  Pagination,
  Tooltip,
  Button,
  Select,
  InputNumber,
  DatePicker,
  Checkbox,
  Divider,
  Popover,
  List,
  Row,
  Col,
  Empty,
} from 'antd';
import { Form, Icon } from '@ant-design/compatible';
import 'antd/lib/form/style';
import 'antd/lib/table/style';
import 'antd/lib/input/style';
import 'antd/lib/pagination/style';
import 'antd/lib/tooltip/style';
import 'antd/lib/icon/style';
import 'antd/lib/select/style';
import 'antd/lib/input-number/style';
import 'antd/lib/date-picker/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/divider/style';
import 'antd/lib/popover/style';
import 'antd/lib/list/style';
import moment from 'moment';
import { Resizable } from 'react-resizable';
import _ from 'lodash';
import styles from './index.less';
import locale from './locales';

const { RangePicker } = DatePicker;
const EditableContext = React.createContext();
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

function updateChangedData(changedData, item, rowKey = 'id') {
  let result = [];
  const idx = changedData.findIndex(d => item[rowKey] === d[rowKey]);
  const older = changedData.find(d => item[rowKey] === d[rowKey]);
  if (item.isDelete) {
    if (older && (older.isNew || !older.isUpdate)) {
      result = [...changedData.slice(0, idx), ...changedData.slice(idx + 1)];
    } else if (older && older.isDelete && older.isUpdate) {
      result = changedData.map(d => {
        if (item[rowKey] === d[rowKey]) {
          return { ...d, isDelete: false };
        }
        return d;
      });
    } else if (older && !older.isDelete) {
      result = changedData.map(d => {
        if (item[rowKey] === d[rowKey]) {
          return { ...d, isDelete: true };
        }
        return d;
      });
    } else {
      result = [...changedData, { ...item, isDelete: true }];
    }
  } else {
    if (idx > -1) {
      result = changedData.map(d => {
        if (item[rowKey] === d[rowKey]) {
          return { ...d, ...item };
        }
        return d;
      });
    } else {
      result = [...changedData, item];
    }
  }
  return result;
}
function exportCSV(payload) {
  const { name, header, data } = payload;
  if (payload && data.length > 0) {
    let str = header.map(h => h.title).join(',') + '\n';
    str += data
      .map(d => header.map(h => _.get(d, [h.dataIndex])).join(','))
      .join('\n');
    const blob = new Blob(['\ufeff' + str], {
      type: 'text/csv;charset=utf-8;',
    });
    const filename = `${name}.csv`;
    let link = document.createElement('a');
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

function flatCols(columns) {
  return columns.flatMap(col =>
    'children' in col ? flatCols(col.children) : col,
  );
}

function initChildCols(col, idx, editingKey, rowKey) {
  if (col.children) {
    return {
      ...col,
      children: col.children.map((child, i) => {
        return initChildCols(child, idx + '' + i, editingKey, rowKey);
      }),
    };
  } else if (!col.editable) {
    return col;
  } else {
    return {
      ...col,
      onCell: record => ({
        record,
        editor: col.editor,
        editing: record[rowKey] === editingKey,
        dataIndex: col.dataIndex,
        title: col.title,
      }),
      onHeaderCell: col => ({
        width: col.width,
        index: idx,
      }),
    };
  }
}

function isFixedHeader(children) {
  return !!children.find(c => !!c.props.fixed);
}

const EditableHWrapper = ({ className, children }) => {
  const {
    filter,
    filterVisible,
    setFilter,
    columns,
    handleTableChange,
    showSelector,
  } = useContext(EditableContext);
  const flatColumns = useMemo(() => flatCols(columns), [columns]);
  return (
    <thead className={className}>
      {children}
      {!isFixedHeader(children) && filterVisible && (
        <tr className={styles.antETableFilter}>
          {showSelector && <th key={`filterSelector`} />}
          {flatColumns
            .map((col, idx) => {
              const { editor = {}, align = 'left' } = col;
              if (col.dataIndex)
                return (
                  <th
                    key={`filter${idx}`}
                    style={{ padding: 5, textAlign: align }}
                  >
                    {getFilterInput(
                      editor,
                      filter[col.dataIndex],
                      value => setFilter({ ...filter, [col.dataIndex]: value }),
                      handleTableChange,
                    )}
                  </th>
                );
              else return undefined;
            })
            .filter(a => a !== undefined)}
        </tr>
      )}
    </thead>
  );
};

const getFilterInput = (editor, value, onChange, onSearch) => {
  const { type = 'text', options = [] } = editor;
  switch (type) {
    case 'number':
      return (
        <InputNumber
          value={value}
          onChange={value => onChange(value)}
          onKeyPress={e =>
            e.nativeEvent.key === 'Enter' ? onSearch({ currentPage: 1 }) : null
          }
        />
      );
    case 'select':
      return (
        <Select
          style={{ width: '100%' }}
          value={value}
          onChange={value => onChange(value)}
        >
          {options.map(o => (
            <Select.Option key={o.key} value={o.key}>
              {o.value}
            </Select.Option>
          ))}
        </Select>
      );
    case 'datetime':
      return (
        <RangePicker
          style={{ width: '100%' }}
          showTime
          format={dateFormat}
          value={value}
          onChange={dates => onChange(dates)}
        />
      );
    case 'checkbox':
      return (
        <Checkbox checked={value} onChange={e => onChange(e.target.checked)} />
      );
    case 'text':
      return (
        <Input
          value={value}
          onChange={e => onChange(e.target.value.trim())}
          onKeyPress={e =>
            e.nativeEvent.key === 'Enter' ? onSearch({ currentPage: 1 }) : null
          }
        />
      );
    default:
      return (
        <Input
          value={value}
          onChange={e => onChange(e.target.value.trim())}
          onKeyPress={e =>
            e.nativeEvent.key === 'Enter' ? onSearch({ currentPage: 1 }) : null
          }
        />
      );
  }
};

const ResizeableCell = props => {
  const { columns, setColumns } = useContext(EditableContext);
  const { index, width, ...restProps } = props;
  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      onResize={(e, { size }) => {
        const nextColumns = [...columns];
        nextColumns[index] = {
          ...nextColumns[index],
          width: size.width,
        };
        setColumns(nextColumns);
        e.stopPropagation();
      }}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};

const EditableRow = props => {
  const { changedData, selectedRowKeys, rowKey } = useContext(EditableContext);
  const key = props['data-row-key'];
  const isDelete = changedData.find(d => key === d[rowKey] && d.isDelete);
  let style = isDelete
    ? { textDecoration: 'line-through', ...props.style }
    : props.style;
  const selected = selectedRowKeys.find(i => key === i);
  if (selected) {
    style = {
      ...style,
      fontWeight: 800,
    };
  }
  return <tr {...props} style={style} />;
};

const EditableCell = ({
  editor = { type: 'text' },
  editing,
  dataIndex,
  title,
  record,
  index,
  children,
  ...restProps
}) => {
  const { form } = useContext(EditableContext);
  const rules = [];
  if (editor.required) {
    rules.push({ required: editor.required, message: `${title}必填.` });
  }
  if (editor.validator) {
    rules.push({
      validator: (rule, value, callback) =>
        editor.validator(rule, value, callback, record),
    });
  }
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item style={{ margin: '-12px -4px' }}>
          {form.getFieldDecorator(dataIndex, {
            rules: rules,
            initialValue:
              editor.type === 'datetime'
                ? moment(_.get(record, dataIndex), dateFormat)
                : _.get(record, dataIndex),
            valuePropName: editor.type === 'checkbox' ? 'checked' : 'value',
          })(getInput(editor))}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const getInput = editor => {
  const { type = 'text', options = [] } = editor;
  switch (type) {
    case 'number':
      return <InputNumber />;
    case 'select':
      return (
        <Select style={{ width: '100%' }}>
          {options.map(o => (
            <Select.Option key={o.key} value={o.key}>
              {o.value}
            </Select.Option>
          ))}
        </Select>
      );
    case 'datetime':
      return <DatePicker showTime format={dateFormat} />;
    case 'checkbox':
      return <Checkbox />;
    case 'text':
      return <Input />;
    default:
      return <Input />;
  }
};

const defaultArr = [];

const EditableTable = ({
  form,
  bordered = false,
  lang = 'zh',
  rowKey = 'id',
  title = '',
  style = null,
  newRowKeyPrefix = 'new_',
  cols = defaultArr,
  allCols = [],
  data = [],
  changedData = defaultArr,
  loading = false,
  currentPage = 1,
  pageSize = 10,
  total = 0,
  scroll = { x: null },
  multiSelect = true,
  showToolbar = true,
  showAddBtn = true,
  showOpBtn = true,
  showSelectRecord = true,
  showSelector: defaultShowSelecor = false,
  showTopPager = true,
  showBottomPager = false,
  buttons,
  canEdit = () => true,
  canRemove = () => true,
  onAdd = () => ({}),
  onFetch = () => {},
  onChangedDataUpdate = () => {},
  onDownload,
  onSelectRow = () => {},
  ...rest
}) => {
  const [showSelector, setShowSelector] = useState(defaultShowSelecor);
  const [editingKey, setEditingKey] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [filter, setFilter] = useState({});
  const [sorter, setSorter] = useState({});
  const [pager, setPager] = useState({ currentPage, pageSize });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [columnSeq, setColumnSeq] = useState(
    cols.map((c, idx) => ({ ...c, idx, visible: true })),
  );
  const [allColumnSeq, setAllColumnSeq] = useState([]);
  const [columns, setColumns] = useState(allCols);
  const [columnsPopVisible, setColumnsPopVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [addData, setAddData] = useState([]);

  const i18n = locale[lang && lang.toLowerCase()];
  const updateData = data
    .filter(d => !!d)
    .map(d => {
      const updater = changedData.find(s => d[rowKey] === s[rowKey]);
      if (updater) {
        return { ...d, ...updater };
      }
      return d;
    });
  const newData = changedData.filter(s => s.isNew);
  const dataSource = addData.concat(newData, updateData);

  const handleTableChange = (p, f, s) => {
    let current = pager.currentPage;
    let size = pager.pageSize;
    let filters = filter;
    let sorters = sorter;
    if (p && p.currentPage) {
      current = p.currentPage;
      size = p.pageSize || pager.pageSize;
      setPager({ currentPage: current, pageSize: size });
    }
    if (!_.isEmpty(f)) {
      if (f.clear) {
        setFilter({});
        filters = {};
      } else {
        filters = { ...filter, ...f };
        setFilter(f);
      }
    }
    if (!_.isEmpty(s)) {
      sorters = { [s.field]: s.order };
      setSorter(sorters);
    }
    filters = _.pickBy(filters, value => !_.isUndefined(value) && value !== '');
    sorters = _.pickBy(sorters, value => !_.isUndefined(value) && value !== '');
    onFetch({ currentPage: current, pageSize: size }, filters, sorters);
  };

  let rowSelection = {
    selectedRowKeys,
    type: multiSelect ? 'checkbox' : 'radio',
    onChange: (keys, rows) => setSelectedRowKeys(keys),
    onSelect: (record, selected, rows, e) => onSelectRow(rows),
    onSelectAll: (selected, rows, changeRows) => onSelectRow(rows),
  };

  if (!showSelector) {
    rowSelection = undefined;
  }

  const handleAdd = () => {
    let newObj = onAdd();
    let key = _.uniqueId(newRowKeyPrefix);
    if (newObj) {
      newObj.isNew = true;
      if (newObj[rowKey]) key = newObj[rowKey];
      else newObj[rowKey] = key;
    } else {
      newObj = { [rowKey]: key, isNew: true };
    }
    setAddData([...addData, newObj]);
    setEditingKey(key);
  };

  const handleRemove = item => {
    const result = updateChangedData(
      changedData,
      { ...item, isDelete: true },
      rowKey,
    );
    onChangedDataUpdate(result);
    if (item.isNew) setEditingKey('');
  };

  const handleEditOk = record => {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const updateRow = _.pickBy(row, value => !_.isUndefined(value));
      for (let key in updateRow) {
        if (moment.isMoment(updateRow[key])) {
          updateRow[key] = updateRow[key].format(dateFormat);
        }
      }
      const updateData = changedData;
      if (record.isNew && !record.isUpdate) {
        updateData.push(record);
        setAddData([]);
      }
      const result = updateChangedData(
        updateData,
        { [rowKey]: record[rowKey], ...updateRow, isUpdate: true },
        rowKey,
      );
      onChangedDataUpdate(result);
      setEditingKey('');
    });
  };

  const handleDownload = () => {
    let allData = data;
    if (onDownload) {
      allData = onDownload(filter, sorter);
    }
    exportCSV({ name: 'table', header: flatCols(columnSeq), data: allData });
  };

  const getColumns = () => {
    let cols1 = columnSeq
      .map(c => {
        if (c.visible) {
          return c;
        }
      })
      .filter(c => c !== undefined);
    if (showOpBtn) {
      cols1 = cols1.concat({
        title: i18n['op'],
        align: 'center',
        fixed: scroll && scroll.x ? 'right' : null,
        width: 100,
        render: (text, record) => {
          const editing = record[rowKey] === editingKey;
          return (
            <>
              {canEdit(record) &&
                (editing ? (
                  <>
                    <Tooltip title={i18n['ok']}>
                      <Icon
                        type="check"
                        onClick={e => {
                          handleEditOk(record);
                          e.stopPropagation();
                        }}
                        style={{ marginRight: 8 }}
                      />
                    </Tooltip>
                    {(!record.isNew || record.isUpdate) && (
                      <Tooltip title={i18n['cancel']}>
                        <Icon
                          type="close"
                          onClick={e => {
                            setEditingKey('');
                            e.stopPropagation();
                          }}
                        />
                      </Tooltip>
                    )}
                  </>
                ) : (
                  <a
                    disabled={editingKey !== ''}
                    onClick={e => {
                      setEditingKey(record[rowKey]);
                      e.stopPropagation();
                    }}
                  >
                    <Tooltip title={i18n['edit']}>
                      <Icon type="edit" style={{ color: '#666' }} />
                    </Tooltip>
                  </a>
                ))}
              {canEdit(record) && canRemove(record) && record[rowKey] && (
                <Divider type="vertical" />
              )}
              {canRemove(record) && (record[rowKey] || !canEdit(record)) && (
                <Tooltip
                  title={record.isDelete ? i18n['undelete'] : i18n['delete']}
                >
                  <Icon
                    type="delete"
                    theme={record.isDelete ? 'filled' : 'outlined'}
                    style={{ cursor: 'pointer' }}
                    onClick={e => {
                      handleRemove(record);
                      e.stopPropagation();
                    }}
                  />
                </Tooltip>
              )}
            </>
          );
        },
      });
    }
    return cols1.map((col, idx) => initChildCols(col, idx, editingKey, rowKey));
  };
  useEffect(() => {
    setColumnSeq(cols.map((c, idx) => ({ ...c, idx, visible: true })));
    if (!allCols || allCols.length === 0) {
      setAllColumnSeq(cols);
    } else {
      setAllColumnSeq(allCols);
    }
  }, [cols]);
  useEffect(() => {
    setColumns(getColumns());
  }, [editingKey, changedData, columnSeq]);
  useEffect(() => setPager({ currentPage, pageSize }), [currentPage, pageSize]);

  const footer = () => (
    <Row>
      <Col
        span={showSelectRecord ? 2 : 0}
        style={{ alignText: 'left', whiteSpace: 'nowrap' }}
      >
        {showSelectRecord && (
          <Checkbox onClick={e => setShowSelector(e.target.checked)}>
            {i18n['select']}
          </Checkbox>
        )}
      </Col>
      <Col span={showSelectRecord ? 22 : 24}>
        {!buttons && !showBottomPager && !showAddBtn ? null : (
          <div className={styles.antETableBottomBar}>
            {!showBottomPager && <div />}
            <div>
              {showAddBtn && (
                <Button
                  icon="plus"
                  size="small"
                  onClick={handleAdd}
                  style={{ marginRight: 8 }}
                >
                  {i18n['add']}
                </Button>
              )}
              {buttons}
            </div>
            {showBottomPager && (
              <Pagination
                showSizeChanger
                showQuickJumper
                position="bottom"
                size="small"
                pageSizeOptions={['5', '10', '20', '30', '40']}
                showTotal={(t, range) => {
                  return `${i18n['total.prefix']} ${t} ${i18n['total.suffix']}`;
                }}
                onChange={(current, size) =>
                  handleTableChange({ currentPage: current, pageSize: size })
                }
                onShowSizeChange={(current, size) =>
                  handleTableChange({ currentPage: current, pageSize: size })
                }
                current={pager.currentPage}
                pageSize={pager.pageSize}
                total={total}
              />
            )}
          </div>
        )}
      </Col>
    </Row>
  );

  const components = {
    header: {
      wrapper: EditableHWrapper,
      cell: ResizeableCell,
    },
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columnsFilter = (
    <List
      bordered={true}
      size="small"
      dataSource={allColumnSeq}
      renderItem={(item, idx) => (
        <List.Item>
          <Checkbox
            checked={
              !!columnSeq.find(c => c.dataIndex === item.dataIndex && c.visible)
            }
            onChange={e => {
              if (e.target.checked) {
                let flag = true;
                setColumnSeq(
                  columnSeq.map(c => {
                    if (c.dataIndex === item.dataIndex) {
                      flag = false;
                      c.visible = true;
                    }
                    return c;
                  }),
                );
                if (flag) {
                  // Make sure to insert it in the current position
                  let insertIdx = 0;
                  const tempCols = columnSeq.map(c => {
                    if (c.idx < idx) {
                      insertIdx = c.idx;
                    } else {
                      c.idx++;
                    }
                    return c;
                  });
                  setColumnSeq([
                    ...tempCols.slice(0, insertIdx + 1),
                    { ...item, idx, visible: true },
                    ...tempCols.slice(insertIdx + 1),
                  ]);
                }
              } else {
                setColumnSeq(
                  columnSeq.map(c => {
                    if (c.dataIndex === item.dataIndex) {
                      c.visible = false;
                    }
                    return c;
                  }),
                );
              }
            }}
          >
            {item.title}
          </Checkbox>
        </List.Item>
      )}
    />
  );
  return (
    <EditableContext.Provider
      value={{
        form,
        rowKey,
        changedData,
        filter,
        filterVisible,
        setFilter,
        selectedRowKeys,
        showSelector,
        columns,
        setColumns,
        handleTableChange,
      }}
    >
      <div className={styles.antETable} style={style}>
        <div className={styles.antETableHeader}>
          <div className={styles.antETableTitleContainer}>
            <div className={styles.antETableTitle}>{title}</div>
            {title && <Divider type="vertical" style={{ marginTop: 7 }} />}
            <div className={styles.antETableToolbar}>
              {showToolbar && (
                <>
                  <Tooltip
                    title={
                      filterVisible
                        ? i18n['filter.collapse']
                        : i18n['filter.expand']
                    }
                  >
                    <Icon
                      type="filter"
                      theme={filterVisible ? 'filled' : 'outlined'}
                      onClick={() => setFilterVisible(!filterVisible)}
                    />
                  </Tooltip>
                  <Tooltip title={i18n['filter.clear']}>
                    <Icon
                      type="rest"
                      theme="filled"
                      style={{
                        cursor: _.isEmpty(filter) ? 'default' : 'pointer',
                        color: _.isEmpty(filter) ? '#ddd' : '#666',
                      }}
                      onClick={() => {
                        if (!_.isEmpty(filter)) {
                          form.resetFields();
                          handleTableChange(
                            { currentPage: 1 },
                            { clear: true },
                          );
                        }
                      }}
                    />
                  </Tooltip>
                  <Tooltip title={i18n['search']}>
                    <Icon
                      type="search"
                      onClick={() => handleTableChange({ currentPage: 1 })}
                    />
                  </Tooltip>
                  <Tooltip title={i18n['columns']}>
                    <Popover
                      placement="bottom"
                      content={columnsFilter}
                      trigger="click"
                      visible={columnsPopVisible}
                      onVisibleChange={visible => setColumnsPopVisible(visible)}
                    >
                      <Icon type="unordered-list" />
                    </Popover>
                  </Tooltip>
                </>
              )}
              {showTopPager && (
                <>
                  {showToolbar && (
                    <Divider type="vertical" style={{ marginTop: 7 }} />
                  )}
                  <Pagination
                    simple
                    defaultCurrent={1}
                    total={total}
                    current={pager.currentPage}
                    pageSize={pager.pageSize}
                    onChange={(current, size) =>
                      handleTableChange({
                        currentPage: current,
                        pageSize: size,
                      })
                    }
                    style={{ display: 'inline-block', marginRight: 4 }}
                  />
                  <div>{`${i18n['total.prefix']} ${total} ${i18n['total.suffix']}`}</div>
                </>
              )}
            </div>
          </div>
          <div className={styles.antETableToolbarRight}>
            <Tooltip title={i18n['download']}>
              <Icon type="download" onClick={() => handleDownload()} />
            </Tooltip>
            <Tooltip title={i18n[collapsed ? 'expand' : 'collapse']}>
              <Icon
                type={collapsed ? 'column-height' : 'vertical-align-middle'}
                onClick={() => setCollapsed(!collapsed)}
              />
            </Tooltip>
          </div>
        </div>
        {!collapsed && (
          <Table
            locale={{ emptyText: <Empty description={i18n['empty']} /> }}
            bordered={bordered}
            size="middle"
            rowKey={rowKey}
            rowSelection={rowSelection}
            footer={footer}
            pagination={false}
            loading={loading}
            components={components}
            columns={columns}
            dataSource={dataSource}
            onChange={(p, f, s) => handleTableChange(p, f, s)}
            onRow={record => ({
              onClick: event => {
                if (!showSelector && record[rowKey] !== editingKey) {
                  if (!selectedRowKeys.find(k => k === record[rowKey])) {
                    setSelectedRowKeys([record[rowKey]]);
                  }
                  onSelectRow([record]);
                }
              },
            })}
            scroll={scroll}
            {...rest}
          />
        )}
      </div>
    </EditableContext.Provider>
  );
};

const ETableHOC = ETableComponent => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentPage: 1,
      };
      this.resetTable = () => {
        this.setState({ currentPage: 0 });
        this.setState({ currentPage: 1 });
      };
    }
    render() {
      return (
        <ETableComponent {...this.props} currentPage={this.state.currentPage} />
      );
    }
  };
};

export default ETableHOC(Form.create()(EditableTable));
