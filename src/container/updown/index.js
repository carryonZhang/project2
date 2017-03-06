
import React, {PropTypes} from 'react'
import {connect} from 'react-redux';

import UpdownComponent from '../../components/updown'

import styles from './style.css';

import * as action from '../../action';


const UpdownContainer = ({}) => (
	<div className={styles.wrapper}>
		<UpdownComponent />
	</div>
);

// const mapStateToProps = (state) => ({
//   errorMessage: ''
// });

// const mapDispatchToProps = (dispatch) => ({
//   onSubmit: (formData) => {
//     dispatch(action.login(formData));
//   }
// });

export default connect(null,null)(UpdownContainer)
