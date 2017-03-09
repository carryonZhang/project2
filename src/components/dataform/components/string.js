import React, {Component, PropTypes} from 'react';
import {Form, Input} from 'antd';

const formRule = [
    {
        required: false,
        type: 'string',
        message: '请选择月份'
    }
];

const DateComponent = ({form, data, layout}) => (
    <Form.Item label={data.fieldShowName} {...layout}>
        {form.getFieldDecorator(data.fieldLabel, {rules: formRule})(
            <Input initialValue={data.defaultValue}
                   placeholder={data.shortDescription || ''}
                   style={{width: '100%'}}/>
        )}
    </Form.Item>
);

DateComponent.propTypes = {
    form: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
};

export default DateComponent;
