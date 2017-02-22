import React, {PropTypes} from 'react'
import {connect} from 'react-redux';

import styles from './style.css';

import LoginField from '../../components/loginField';


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
  onSubmit: (event) => {
    console.log(event)
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login)
