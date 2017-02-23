/**
 * 登录页面
 *
 * 该页面相当于 Redux Container
 */
import React, {PropTypes} from 'react'
import {connect} from 'react-redux';

import LoginField from '../../components/loginField';
import styles from './style.css';

import * as action from './action';


const Login = ({form, errorMessage, onSubmit}) => (
  <div className={styles.wrapper}>
    <LoginField className={styles.loginField} onSubmit={onSubmit}/>
  </div>
);

Login.propsType = {
  errorMessage: PropTypes.string
};

const mapStateToProps = (state) => ({
  errorMessage: ''
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (formData) => {
    dispatch(action.login(formData));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)
