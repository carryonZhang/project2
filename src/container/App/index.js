import React, {PropTypes} from 'react'
import styles from './style.css'

const App = ({children}) => (
    <div className={styles.wrapper}>{children}</div>
);

App.propTypes = {
    children: PropTypes.node
};

export default App;