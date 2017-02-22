import React, {PropTypes} from 'react'
import {connect} from 'react-redux';
import { Modal, Button } from 'antd';
function info() {
  Modal.info({
    title: 'This is a notification message',
    content: (
      <div>
        <p>some messages...some messages...</p>
        <p>some messages...some messages...</p>
      </div>
    ),
    onOk() {},
  });
}

const Login = ({errorMessage}) => (
  <div>
    Login
    <Button onClick={info}>Info</Button>
  </div>
);

Login.propsType = {
  errorMessage: PropTypes.string
};

const mapStateToProps = (state) => ({
  errorMessage: ''
});

const mapDispatchToProps = (dispatch) => ({
  onClickLogin: (event) => {

  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)
