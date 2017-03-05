/**
 * Created by long-mac on 2017/2/25.
 */
import React, {Component} from 'react';
import {Form, DatePicker, Input, Button, Col, Row, Select} from 'antd';
import styles from './style.css';

const FormItem  = Form.Item;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 10}
};
const buttonItemLayout  = {
  wrapperCol: {span: 14, offset: 1}
};
const Option  = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
class DataForm extends Component {
  constructor(props){
    super(props);
  }
  handleSelectChange(value) {
    console.log(`selected ${value}`);
  }

  genOptions(options) {
    let ops = [];
    for(let i=0, len = options.length; i < len; i++) {
      ops.push(
          <Option value={options[i].left} key={i}>{options[i].right}</Option>
      )
    }
    return ops;
  }

  queryType(antd_form, querys) {
    let form = [];
    let _this = this;
    const { getFieldDecorator, getFieldsError, getFieldError } = antd_form;
    console.log('queryType中的查询条件', querys);
    querys.forEach(function(query) {
      // console.log('控件类型', query.fieldDataType);
      if(query.useLov === 'Y') {
        form.push(
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
                        style={{ width: 200 }}
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
        )
      }else if(query.fieldDataType === 'DATE') {
        form.push(
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
        )
      }else if(query.fieldDataType === 'MONTH') {
        form.push(
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
        )

      }else if(query.fieldDataType === 'STRING') {
        form.push(
            <FormItem label={query.fieldShowName}
                  {...formItemLayout}
              >
              {
                getFieldDecorator('input', {
                  rules: [
                    {required: false}
                  ]
                })(
                    <Input initialValue={query.defaultValue} placeholder={query.shortDescription} />
                )
              }

            </FormItem>
        )
      }
    });
    form.push(
        <FormItem {...buttonItemLayout}>
          <Button type="danger" htmlType="submit">查询</Button>
          <span className={styles.separate}></span>
          <Button type="danger">导出Excel</Button>
        </FormItem>
    );
    // console.log('queryType中生成的控件列表', form);
    return form;
  }

  // colQuery(conditions){
  //   for(let j = 0; j < 3; j++){
  //     <Col span={8}>
  //
  //     </Col>
  //   }
  // }
  
  generateQuerys(antd_form){
    let conditions = this.props.conditions;
    // let rows = conditions.length / 3 + (conditions.length % 3 !== 0 ? 1 : 0);
    // for(let i = 0; i < rows; i++){
    //   return (
    //       <Row>
    //         {colQuery(conditions)}
    //       </Row>
    //   )
    // }
    // console.log('dataform组件中接收到的查询条件', this.props.conditions);
    return this.queryType(antd_form, conditions);
  }

  render(){
    const onSubmit = this.props.onSubmit;
    const reportId = this.props.reportId;
    const antd_form = this.props.form;
    return  (
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
          {this.generateQuerys(antd_form)}
        </Form>
    );
  }
}
const WrapForm = Form.create()(DataForm);
export default WrapForm;
