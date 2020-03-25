import { Input, Select, DatePicker, InputNumber } from 'antd';
import React from 'react';
import styles from './index.less';
import moment from 'moment';
import { Divider } from './DefaultDetail';
const primaryConditions = [
    { key: 'equal', label: '等于' },
    { key: 'notEqual', label: '不等于' },
    { key: 'null', label: '为空' },
    { key: 'notNull', label: '不为空' }
];
const secondPrimaryConditions = [
    ...primaryConditions,
    { key: 'include', label: '包含' },
    { key: 'exclude', label: '不包含' },
];
/***
 * conditions [等于，不等于，包含，不包含，为空，不为空]
 * type='time'|'number' [范围]
 */
export const DrawsConditions = function ({ conditions = [], model, dispatch }) {
    return (<>
        {conditions.map(item => {
            switch (item.type) {
                case 'singText':
                case 'mutileText':
                    return <div key={item.title + item.itemId}>
                        <Divider />
                        <div style={{ width: '100%' }}>
                            <div className={styles.condFont}>
                                <span>{item.title} </span>{' '}
                                <Select size="small" placeholder="选择条件" onChange={v => dispatch({ type: 'conditionsrules', payload: { itemId: item.itemId, conditionsRule: v } })} value={item.conditionsRule}>
                                    {secondPrimaryConditions.map(opt => <Select.Option key={opt.key} value={opt.key}>{opt.label}</Select.Option>)}
                                </Select>
                            </div>
                            {item.conditionsRule !== 'null' && item.conditionsRule !== "notNull" && <Input style={{ width: '100%' }} value={item.conditionsValue} onChange={e => dispatch({ type: 'conditionsrules', payload: { itemId: item.itemId, conditionsValue: e.target.value } })} />}
                        </div>
                    </div>;
                case 'select':
                case 'checks':
                case 'radios':
                case 'selectCheck':
                    return <div key={item.title + item.itemId}>
                        <Divider />
                        <div style={{ width: '100%' }}>
                            <div className={styles.condFont}>
                                <span>{item.title} </span>{' '}
                                <Select size="small" placeholder="选择条件" onChange={v => dispatch({ type: 'conditionsrules', payload: { itemId: item.itemId, conditionsRule: v } })} value={item.conditionsRule}>
                                    {primaryConditions.map(opt => <Select.Option key={opt.key} value={opt.key}>{opt.label}</Select.Option>)}
                                </Select>
                            </div>
                            {item.conditionsRule !== 'null' && item.conditionsRule !== "notNull" && <Select style={{ width: "100%" }} onChange={value => dispatch({ type: 'conditionsrules', payload: { itemId: item.itemId, conditionsValue: value } })} value={item.conditionsValue}>
                                {(item.list || []).map((it, index) => <Select.Option key={it.label + index} value={JSON.stringify(it)}>{it.label}</Select.Option>)}
                            </Select>}
                        </div>
                    </div>;
                case 'numberText':
                    return <div key={item.title + item.itemId}>
                        <Divider />
                        <div style={{ width: '100%' }}>
                            <div className={styles.condFont}>
                                <span>{item.title} </span>{' '}
                                <Select size="small" placeholder="选择条件" onChange={v => dispatch({ type: 'conditionsrules', payload: { itemId: item.itemId, conditionsRule: v } })} value={item.conditionsRule}>
                                    {secondPrimaryConditions.map(opt => <Select.Option key={opt.key} value={opt.key}>{opt.label}</Select.Option>)}
                                </Select>
                            </div>
                            {item.conditionsRule !== 'null' && item.conditionsRule !== "notNull" && <InputNumber style={{ width: '100%' }} value={item.conditionsValue} onChange={value => dispatch({ type: 'conditionsrules', payload: { itemId: item.itemId, conditionsValue: value } })} />}
                        </div>
                    </div>;
                case 'inputDate':
                    return <div key={item.title + item.itemId}>
                        <Divider />
                        <div style={{ width: '100%' }}>
                            <div className={styles.condFont}>
                                <span>{item.title} </span>{' '}
                                <Select size="small" placeholder="选择条件" onChange={v => dispatch({ type: 'conditionsrules', payload: { itemId: item.itemId, conditionsRule: v } })} value={item.conditionsRule}>
                                    {secondPrimaryConditions.map(opt => <Select.Option key={opt.key} value={opt.key}>{opt.label}</Select.Option>)}
                                </Select>
                            </div>
                            {console.log(moment(item.conditionsValue, 'YYYY-MM-DD'))}
                            {item.conditionsRule !== 'null' && item.conditionsRule !== "notNull" && <DatePicker style={{ width: '100%' }} value={item.conditionsValue ? moment(item.conditionsValue, 'YYYY-MM-DD') : null} onChange={value => { console.log(value); dispatch({ type: 'conditionsrules', payload: { itemId: item.itemId, conditionsValue: moment(value).format('YYYY-MM-DD') } }); }} format={["YYYY-MM-DD"]} />}
                        </div>
                    </div>;
                default:
                    return <div key={item.itemId} />;
            }
        })}
    </>);
};