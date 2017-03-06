
import React, {PropTypes} from 'react'
import {connect} from 'react-redux';

import UpdownComponent from '../../components/updown'

import styles from './style.css';

import * as action from '../../action';


const UpdownContainer = (state) => (
	<div className={styles.wrapper}>
		<UpdownComponent title={state.title}/>
	</div>
);

const mapStateToProps = (state) => ({
  title: '商品导入导出'
});

// const mapDispatchToProps = (dispatch) => ({
//   onSubmit: (formData) => {
//     dispatch(action.login(formData));
//   }
// });

export default connect(mapStateToProps,null)(UpdownContainer)
