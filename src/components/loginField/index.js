import React, {PropTypes} from 'react'
import cx from 'classnames';
import {Form, Icon, Input, Button, Checkbox} from 'antd';
const FormItem = Form.Item;
import styles from './style.css';

const LoginField = ({className, form, onSubmit}) => (
  <div className={cx(styles.wrapper, className || {})}>
    <Form onSubmit={e => {
      e.preventDefault();

      form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }} className="login-form">
      <FormItem>
        {form.getFieldDecorator('userName', {
          rules: [
            {required: true, message: '请输入手机号码'},
            {pattern: /^1(\d{10})$/, message: '请输入正确的手机号码'},
          ],
        })(
          <Input addonBefore={<Icon type="user"/>} placeholder="请输入您的手机号"/>
        )}
      </FormItem>
      <FormItem>
        {form.getFieldDecorator('password', {
          rules: [
            {required: true, message: '请输入密码'}
          ],
        })(
          <Input addonBefore={<Icon type="lock"/>} type="password" placeholder="密码"/>
        )}
      </FormItem>
      <FormItem>
        {form.getFieldDecorator('remember', {
          valuePropName: 'checked',
          initialValue: true,
        })(
          <Checkbox>记住密码</Checkbox>
        )}
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </FormItem>
    </Form>
  </div>
);

LoginField.propsType = {
  form: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};


export default Form.create()(LoginField)
