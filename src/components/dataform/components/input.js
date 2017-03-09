import React, {PropTypes} from 'react';
import {Form, Input, Select} from 'antd';

const InputComponent = ({form, data, layout}) => {

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
            {
                form.getFieldDecorator(data.fieldLabel, options)(
                    <Input placeholder={data.showDescription || ''}/>
                )
            }
        </Form.Item>

    )
};

InputComponent.propTypes = {
    form: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
};

export default InputComponent;
