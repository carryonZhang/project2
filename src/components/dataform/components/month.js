import React, {PropTypes} from 'react';
import moment from 'moment';
import {Form, DatePicker} from 'antd';

const MonthPicker = DatePicker.MonthPicker;

const MonthComponent = ({form, data, layout}) => {

    const options = {
        initialValue: data.defaultValue ? moment(data.defaultValue, 'YYYY-MM') : '',
        rules: [
            {
                required: false,
                type: 'object',
                message: '请选择月份'
            }
        ]
    };

    return (
        <Form.Item label={data.fieldShowName} {...layout}>
            {form.getFieldDecorator(data.fieldLabel, options)(
                <MonthPicker format="YYYY-MM" placeholder="请选择月份" style={{width: '100%'}}/>
            )}
        </Form.Item>
    )
};

MonthComponent.propTypes = {
    form: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
};

export default MonthComponent;
