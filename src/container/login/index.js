import React, {PropTypes} from 'react'
import {connect} from 'react-redux';

const Login = ({errorMessage}) => (
  <div>Login</div>
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
