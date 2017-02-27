/**
 * Created by long-mac on 2017/2/25.
 */
import React, {Component} from 'react';
import {Form, DatePicker, Input, Button, Menu, Col, Row, Select} from 'antd';
import styles from './dataform.css';

const layoutProps = {horizontal: true};
const FormItem  = Form.Item;
const formItemLayout = {
  labelCol: {span: 4},
  wrapperCol: {span: 10}
};
const buttonItemLayout  = {
  wrapperCol: {span: 14, offset: 1}
};
const Option  = Select.Option;

export default class DataForm extends Component {
  constructor(props){
    super(props);
    // this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSelectChange(value) {
    console.log(`selected ${value}`);
  }

  render(){
    const menu =  (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item key="1">Menu Item 1</Menu.Item>
          <Menu.Item key="2">Menu Item 2</Menu.Item>
          <Menu.Item key="3">Menu Item 3</Menu.Item>
        </Menu>
    );
    return  (
        <Form className={styles.dataform}>
          <Row>
            <Col span={8}>
              <FormItem label="店铺名称"
                  {...formItemLayout}
              >

              <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select a person"
                  optionFilterProp="children"
                  onChange={this.handleSelectChange}
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
              </Select>

              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="开始日期"
                  {...formItemLayout}
              >
                <DatePicker
                    showTime
                    format="YYYY-MM-DD"
                    placeholder="选择时间"
                />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="结束日期"
                  {...formItemLayout}
              >
                <DatePicker
                    showTime
                    format="YYYY-MM-DD"
                    placeholder="选择时间"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <FormItem label="班次"
                  {...formItemLayout}
              >
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select a person"
                    placeholder="Select a person"
                    optionFilterProp="children"
                    onChange={this.handleSelectChange}
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="tom">Tom</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem label="查询条件"
                  {...formItemLayout}
              >
                <Input placeholder="default size" />
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem {...buttonItemLayout}>
                <Button type="danger">查询</Button>
                <span className={styles.separate}></span>
                <Button type="danger">导出Excel</Button>
              </FormItem>

            </Col>
          </Row>
        </Form>
    );

  }
}