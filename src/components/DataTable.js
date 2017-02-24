/**
 * Created by long-mac on 2017/2/24.
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Table} from 'antd';


export default class DataTable extends Component {
  constructor(props){
    super(props);
    this.state =  {
      columns:  [
        {
          title: '日期', width: 100, key: 'time', dataIndex: 'time', fixed: 'left'
        },
        {
          title: '门店名称', width: 150, dataIndex: 'name', key: 'name'
        },
        {
          title: 'Column 1', width: 150, dataIndex: 'address', key: '1'
        },
        {
          title: 'Column 2', width: 150, dataIndex: 'address', key: '2'
        },
        {
          title: 'Column 3', width: 150, dataIndex: 'address', key: '3'
        },
        {
          title: 'Column 4', width: 150, dataIndex: 'address', key: '4'
        },
        {
          title: 'Column 5', width: 150, dataIndex: 'address', key: '5'
        }
      ],
      data: []
    }
  }
  render(){
    let columns = this.state.columns;
    let data = this.state.data;
    for (let i = 1; i < 36; i++) {
      data.push({
        key: i,
        time: `2017-02-${i}`,
        name: `老娘舅`,
        address: `London Park no. ${i}`
      })
    }
    return <Table columns={columns} dataSource={data} scroll={{x: 1500, y: 300}} />
  }
}


// ReactDOM.render(<Table columns="columns" dataSource={data} scroll={{x: 1500, y: 300}}></Table>, )