import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {message} from 'antd';

const App = ({children}) => (
    <div>
        {React.Children.toArray(children)}
    </div>
);

App.propTypes = {
    children: PropTypes.node
};


const mapStateToProps = (state) => {

    switch (state.global.type) {
        case 'loading':
            let loadingHide = message.loading('加载中', 0);
            setTimeout(loadingHide, 5000); // 5 秒后自动移除  1
            break;

        case 'loadingHide':
            message.destroy();
            break;

        case 'error':
        case 'success':
            message[state.global.type](state.global.message);
            break;

        default:
            break;
    }

    return {}
};


export default connect(mapStateToProps)(App)
