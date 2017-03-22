import React, {PropTypes} from 'react';
import {Form, InputNumber} from 'antd';


const DateComponent = ({form, data, layout}) => {

    const options = {
        initialValue: data.defaultValue,
        rules: [
            {
                required: false,
                type: 'string',
            }
        ]
    };

    return (
        <Form.Item label={data.fieldShowName} {...layout}>
            {form.getFieldDecorator(data.fieldLabel, options)(
                <InputNumber min={+data.min || -Infinity} max={+data.max || Infinity} style={{width: '100%'}}/>
            )}
        </Form.Item>
    )
};

DateComponent.propTypes = {
    form: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
};

export default DateComponent;
