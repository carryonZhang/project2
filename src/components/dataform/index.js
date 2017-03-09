/* eslint-disable */
import React, {Component} from 'react';
import {Form, DatePicker, Input, Button, Col, Row, Select} from 'antd';
import styles from './style.css';
import * as action from '../../action';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18}
};
const buttonItemLayout = {
    wrapperCol: {offset: 1}
};
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;


class DataForm extends Component {
    constructor(props) {
        super(props);
    }

    genOptions(options) {
        let ops = [];
        for (let i = 0, len = options.length; i < len; i++) {
            ops.push(
                <Option value={options[i].left} key={i}>{options[i].right}</Option>
            )
        }
        return ops;
    }

    getXls(antd_form, reportId, getExcel) {
        antd_form.validateFields((err, values) => {
            if (!err) {
                getExcel(reportId, values)
            }
        })
    }

    fetchUnionSelect(targetId, reportId, value) {
        const find = this.props.conditions.filter(i => i.chainedFieldPos == targetId);

        for (let i = 0; i <= find.length - 1; i++) {
            if (find[i].hasOwnProperty('lovEntity')) {
                this.props.onFetchUnionSelect(find[i].lovEntity.lovQueryId, value, reportId);
            }
        }
    }

    queryType(antd_form, querys, reportId, getExcel, buttonState) {
        let controls = [];
        let _this = this;
        const {getFieldDecorator} = antd_form;

        querys.forEach(function (query) {
            if (query.useLov == 'Y') {
                controls.push(
                    <Col span={8}>
                        <FormItem
                            label={query.fieldShowName}
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator(query.fieldLabel, {rules: [{required: false}]})(
                                    <Select
                                        notFoundContent="没有数据"
                                        showSearch
                                        onSelect={_this.fetchUnionSelect.bind(_this, query.chainedPosValue, reportId)}
                                        style={{width: '100%'}}
                                        optionFilterProp="children"
                                        placeholder={query.showDescription ? query.shortDescription : ''}
                                        initialValue={query.defaultValue}
                                        filterOption={(input, option) => {
                                            return option.props.children.indexOf(input) >= 0;
                                        }}
                                    >
                                        {
                                            query.lovEntity && _this.genOptions(query.lovEntity.values)
                                        }
                                    </Select>
                                )
                            }

                        </FormItem>
                    </Col>
                )
            } else if (query.fieldDataType === 'DATE') {
                controls.push(
                    <Col span={8}>
                        <FormItem label={query.fieldShowName}
                                  {...formItemLayout}
                        >
                            {

                                getFieldDecorator(query.fieldLabel, {
                                    rules: [
                                        {required: true, type: 'object', message: '请选择日期'}
                                    ]
                                })(
                                    <DatePicker placeholder="选择日期" style={{width: '100%'}}/>
                                )
                            }

                        </FormItem>
                    </Col>
                )
            } else if (query.fieldDataType === 'MONTH') {
                controls.push(
                    <Col span={8}>
                        <FormItem label={query.fieldShowName}
                                  {...formItemLayout}
                        >
                            {
                                getFieldDecorator(query.fieldLabel, {
                                    rules: [
                                        {required: true, type: 'object', message: '请选择月份'}
                                    ]
                                })(
                                    <MonthPicker format="YYYY-MM" placeholder="选择月份" style={{width: '100%'}}/>
                                )
                            }
                        </FormItem>
                    </Col>
                )

            } else if (query.fieldDataType === 'STRING') {
                controls.push(
                    <Col span={8}>
                        <FormItem label={query.fieldShowName}
                                  {...formItemLayout}
                        >
                            {
                                getFieldDecorator(query.fieldLabel, {
                                    rules: [
                                        {required: false}
                                    ]
                                })(
                                    <Input initialValue={query.defaultValue}
                                           style={{width: '100%'}}
                                           placeholder={query.shortDescription || ''}/>
                                )
                            }
                        </FormItem>
                    </Col>
                )
            }
        });
        controls.push(
            <Col span={8} offset={16}>
                <FormItem {...buttonItemLayout}>
                    <div className={styles.pullRight}>
                        <Button type="primary"
                                htmlType="submit"
                                loading={buttonState.submit}
                                className={styles.shadowButton}>查询</Button>
                        <span className={styles.separate}/>
                        <Button loading={buttonState.export} onClick={e => {
                            this.getXls(antd_form, reportId, getExcel)
                        }}>
                            导出Excel
                        </Button>
                    </div>
                </FormItem>
            </Col>
        );
        return controls;
    }

    render() {
        const onSubmit = this.props.onSubmit;
        const reportId = this.props.reportId;
        const antd_form = this.props.form;
        const conditions = this.props.conditions;
        const getExcel = this.props.getExcel;
        const buttonState = this.props.buttonState;

        return (
            <Form className={styles.dataform} onSubmit={(e) => {
                e.preventDefault();
                antd_form.validateFields((err, values) => {
                    if (err) {
                        return;
                    }

                    const vKey = Object.keys(values);

                    for (let i = 0; i <= vKey.length; i++) {
                        if (values.hasOwnProperty(vKey[i])) {
                            if ('object' == typeof values[vKey[i]]) {
                                values[vKey[i]] = values[vKey[i]].format('YYYY-MM-DD HH:mm:ss');
                            }
                        }
                    }

                    onSubmit(reportId, values);
                });
            }}
            >
                <Row>
                    {this.queryType(antd_form, conditions, reportId, getExcel, buttonState)}
                </Row>
            </Form>
        );
    }
}
const WrapForm = Form.create()(DataForm);
export default WrapForm;
