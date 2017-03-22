import React , {Component} from 'react';
import styles from './style.css';

class Header extends Component {

	render (){

		const title = this.props.title;

		return (
			<div className={styles.wrapper}>
				{title}
				<div className={styles.arrow}></div>
			</div>
		)
	}

}

export default Header;