import React , {Component}from 'react';
import {connect} from 'react-redux';

import Header from '../../components/header';
import Main from '../../components/updown/main';
import InitData from './init';

import * as action from '../../action';

import styles from './style.css';


class UpdownContainer extends Component {


	componentDidMount (){
		const { dispatch } = this.props;
		dispatch(action.initData());

	}

	render (){

		const state = this.props;

		return (
		    <div className={styles.wrapper}>
		        <div className={styles.wrapper}>
		            <Header title={state.title}/>
		            <Main state={state} />
		        </div>
		    </div>
		)

	}

}

const mapStateToProps = (state) => ({
    title: state.updown.title || '商品导入导出',
    txt: state.updown.txt || '请上传excel文件'
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdownContainer)
