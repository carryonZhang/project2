
import React, {PropTypes} from 'react'
import {connect} from 'react-redux';

import UpdownComponent from '../../components/updown'

import styles from './style.css';

import * as action from '../../action';


const UpdownContainer = (state) => (
	<div className={styles.wrapper}>
		<UpdownComponent title={state.title} state={state}/>
	</div>
);

const mapStateToProps = (state) => ({
  title: '商品导入导出',
  txt: '未选择任何文件'
});

// const mapDispatchToProps = (dispatch) => ({
//   onSubmit: (formData) => {
//     dispatch(action.login(formData));
//   }
// });

export default connect(mapStateToProps,null)(UpdownContainer)
