import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {message, Button} from 'antd';

const success = (text) => {
  message.success(text);
};

const error = (text) => {
  message.error(text);
};

const warning = (text) => {
  message.warning(text);
};

const App = ({children}) => (
  <div>
    {children}
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
      return loadingHide();

    case 'error':
    case 'success':
      return message[state.global.type](state.global.message);

  }

  return {}
};


export default connect(mapStateToProps)(App)
