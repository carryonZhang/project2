import React, {Component} from 'react';
import * as bridge from '../../utils/bridge';
import styles from './style.css';

class Welcome extends Component {

	render (){
		
		const query= bridge.getQueryObject();
		const {userName} = query;

		return (
			<div className={styles.wrapper}>
				<p className={styles.user_name}><span className={styles.hi}>Hi, </span>{userName}</p>
				<p className={styles.welc}>welcome</p>
				<p className={styles.disc}>欢迎使用<span className={styles.erweihuo}>二维火商家管理系统，</span>请尽情使用吧！</p>
			</div>
		)
	}
}

export default Welcome;



