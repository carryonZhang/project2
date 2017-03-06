import React, {Component} from 'react';
import * as action from '../../action';
import Header from '../header';
import Main from './main'
import styles from './style.css';

class UpdownComponent extends Component {

    render () {
        
        const title = this.props.title;

        return (

            <div className={styles.wrapper}>
                <Header title={title}/>
                <Main />
            </div>
        )

    }
}
export default UpdownComponent;

