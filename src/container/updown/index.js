import React, {Component}from 'react';
import {connect} from 'react-redux';

import * as bridge from '../../utils/bridge';

import Header from '../../components/header';
import Main from '../../components/updown/main';
import InitData from './init';

import * as action from '../../action';

import styles from './style.css';


class UpdownContainer extends Component {


    componentWillMount() {

    	const query = bridge.getParamsObject();
        const {dispatch, params} = this.props;
	
		const data = InitData(params.pageType, query);

        dispatch(action.initData(data));

    }

    render() {

        const { data, dispatch} = this.props;
		
        return (
            <div className={styles.wrapper}>
                <div className={styles.wrapper}>
                    <Header title={data.title}/>
                    <Main data={data} dispatch= {dispatch} />
                </div>
            </div>
        )

    }

}

const mapStateToProps = (state) => ({
    data: state.updown
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdownContainer)
