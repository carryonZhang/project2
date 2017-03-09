import React, {Component, PropTypes} from 'react';
import {Form, DatePicker} from 'antd';

const formRule = [
    {
        required: false,
        type: 'object',
        message: '请选择日期'
    }
];

const DateComponent = ({form, data, layout}) => (
    <Form.Item label={data.fieldShowName} {...layout}>
        {form.getFieldDecorator(data.fieldLabel, {rules: formRule})(
            <DatePicker placeholder="请选择日期" style={{width: '100%'}}/>
        )}
    </Form.Item>
);

DateComponent.propTypes = {
    form: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
};

export default DateComponent;
