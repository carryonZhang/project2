import React, {PropTypes} from 'react'
import {connect} from 'react-redux';

import Header from '../../components/header';
import Main from '../../components/updown/main';


import styles from './style.css';

import * as action from '../../action';


const UpdownContainer = (state) => (
    <div className={styles.wrapper}>
        <div className={styles.wrapper}>
            <Header title={state.title}/>
            <Main state={state} />
        </div>
    </div>
);

const mapStateToProps = (state) => ({
    title: state.updown.title || '商品导入导出',
    txt: state.updown.txt || '未选择任何文件'
});

const mapDispatchToProps = (dispatch) => ({
    dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdownContainer)
