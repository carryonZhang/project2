import React , {Component} from 'react';
import { Modal } from 'antd';

class ModalComponent extends React.Component {

  constructor (props){
    super(props);
    this.state = {
      visible: false
    }
  }

  componentDidMount (){

    const info = this.props.importInfo;
  
    if(info){

      this.setState({
        visible: true
      })

    }
    
  }

  onCancel (e){

    e.preventDefault();

    this.setState({
      visible: false
    })

  }

  render() {

    const info = this.props.importInfo;

    if(!info) {
      return null
    }

    const {failCnt, messages, successCnt, totalCnt} = info;

    return (
      <div>
        <Modal title="导入信息" visible={this.state.visible} footer={null} onCancel={e=>{this.onCancel(e)}}>
          <p>失败条数：{failCnt}</p>
          <p>导入失败列表</p>
          <p>成功条数：{successCnt}</p>
          <p>总条数：{totalCnt}</p>
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;