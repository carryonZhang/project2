import React, {PropTypes} from 'react';
import {Form, Input, Select} from 'antd';

const Option = Select.Option;

let value = null;

const SelectComponent = ({form, data, layout, onFetchUnionSelect}) => {

    const props = {
        showSearch: true,
        notFoundContent: '没有数据',
        onSelect: onFetchUnionSelect,
        optionFilterProp: 'children',
        placeholder: data.showDescription || '请选择' + data.fieldLabel,
        filterOption: (input, option) => {
            return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        }
    };

    const options = {
        initialValue: data.defaultValue, // || (data.lovEntity && data.lovEntity.values.length > 0 ? data.lovEntity.values[0].right : ''),
        rules: [
            {
                required: false,
                type: 'string',
            }
        ]
    };

    value = options.initialValue;

    // if(data.new){
    //     form.resetFields([[data.fieldLabel]])
    // }

    // form.setFieldsValue({
    //     [data.fieldLabel]: options.initialValue
    // });

    return (
        <Form.Item label={data.fieldShowName} {...layout}>
            {
                form.getFieldDecorator(data.fieldLabel, options)(
                    <Select style={{width: '100%'}} {...props}>
                        {
                            data.lovEntity && data.lovEntity.values.map((e, i) => (
                                <Option key={`${data.lovEntity.lovQueryId}:${i}`} value={e.left}>{e.right}</Option>
                            ))
                        }
                    </Select>
                )
            }
        </Form.Item>
    )
};

SelectComponent.propTypes = {
    form: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
};

export default SelectComponent;
