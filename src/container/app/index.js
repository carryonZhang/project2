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

let loadingHide = null;

const mapStateToProps = (state) => {

    switch (state.global.type) {
        case 'loading':
            if (loadingHide) {
                return;
            }
            loadingHide = message.loading('加载中', 0);
            setTimeout(() => {
                loadingHide();
                loadingHide = null;
            }, 5000); // 5 秒后自动移除
            break;

        case 'loadingHide':
            loadingHide = null;
            return message.destroy();

        case 'error':
        case 'success':
            return message[state.global.type](state.global.message);

        default:
            return state;
    }

    return {}
};

export default connect(mapStateToProps)(App)
