/**
 * Created by long-mac on 2017/2/25.
 */
import React, {Component} from 'react';
import {Form, DatePicker, Input, Button, Col, Row, Select} from 'antd';
import styles from './style.css';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 10}
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

    queryType(antd_form, querys) {
        let controls = [];
        let _this = this;
        const {getFieldDecorator, getFieldsError, getFieldError} = antd_form;
        console.log('queryType中的查询条件', querys);
        querys.forEach(function (query) {
            // console.log('控件类型', query.fieldDataType);
            if (query.useLov === 'Y') {
                controls.push(
                    <Col span={8}>
                        <FormItem
                            label={query.fieldShowName}
                            {...formItemLayout}
                        >
                            {
                                getFieldDecorator('shopName', {
                                    rules: [
                                        {required: false}
                                    ]
                                })
                                (
                                    <Select
                                        showSearch
                                        style={{width: 200}}
                                        optionFilterProp="children"
                                        placeholder={query.showDescription ? query.shortDescription : ''}
                                        initialValue={query.defaultValue}
                                        filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    >
                                        {
                                            _this.genOptions(query.lovEntity.values)
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

                                getFieldDecorator('date-picker', {
                                    rules: [
                                        {required: true, type: 'object', message: 'Please select time!'}
                                    ]
                                })(
                                    <DatePicker
                                        showTime
                                        placeholder="选择时间"
                                    />
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
                                getFieldDecorator('month-picker', {
                                    rules: [
                                        {required: true, type: 'object', message: 'Please select time!'}
                                    ]
                                })(
                                    <MonthPicker />
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
                                getFieldDecorator('input', {
                                    rules: [
                                        {required: false}
                                    ]
                                })(
                                    <Input initialValue={query.defaultValue} placeholder={query.shortDescription}/>
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
                    <Button type="danger" htmlType="submit">查询</Button>
                    <span className={styles.separate}></span>
                    <Button type="danger">导出Excel</Button>
                </FormItem>
            </Col>
        );
        // console.log('queryType中生成的控件列表', form);
        return controls;
    }

    render() {
        const onSubmit = this.props.onSubmit;
        const reportId = this.props.reportId;
        const antd_form = this.props.form;
        const conditions = this.props.conditions;
        return (
            <Form className={styles.dataform}
                  onSubmit={(e) => {
                      e.preventDefault();

                      antd_form.validateFields((err, values) => {
                          console.log('报表id', reportId);
                          console.log('发送的表单值', values);
                          if (!err) {
                              onSubmit(reportId, values);
                          }
                      });
                  }}
            >
                <Row>
                    {this.queryType(antd_form, conditions)}
                </Row>
            </Form>
        );
    }
}
const WrapForm = Form.create()(DataForm);
export default WrapForm;
