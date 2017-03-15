import React, {PropTypes} from 'react';
import moment from 'moment';
import {Form, DatePicker} from 'antd';

const DateComponent = ({form, data, layout}) => {

    const options = {
        // initialValue: moment(data.defaultValue || moment(), 'YYYY-MM-DD'),  // TODO 默认值会引起 Date 字段不更新 @yama
        rules: [
            {
                required: false,
                type: 'object',
                message: '请选择日期'
            }
        ]
    };

    return (
        <Form.Item label={data.fieldShowName} {...layout}>
            {form.getFieldDecorator(data.fieldLabel, options)(
                <DatePicker placeholder="请选择日期" format="YYYY-MM-DD" style={{width: '100%'}}/>
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
