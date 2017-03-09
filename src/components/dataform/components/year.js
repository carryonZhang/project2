import React, {PropTypes} from 'react';
import moment from 'moment';
import {Form, Select} from 'antd';

const Option = Select.Option;

const DateComponent = ({form, data, layout}) => {

    const current = moment().year();

    const options = {
        initialValue: data.defaultValue || current,
        rules: [
            {
                required: false,
            }
        ]
    };

    const Month = [];

    for (let i = current - 10; i < current + 10; i++) {
        Month.push(<Option value={"" + i}>{i}</Option>)
    }

    return (
        <Form.Item label={data.fieldShowName} {...layout}>
            {form.getFieldDecorator(data.fieldLabel, options)(
                <Select style={{width: '100%'}}>
                    {Month}
                </Select>
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
