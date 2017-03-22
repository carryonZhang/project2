/**
 * Created by long-mac on 2017/2/24.
 */
import React from 'react';
import {Table} from 'antd';
import styles from "./style.css"

export default function DataTable({tableData}) {
    const {dataSource, columns, hasCut} = tableData;
    const xLength = 200 * columns.length;
    const footer = hasCut ? "数据量过大，请导出到excel查看所有数据" : " ";
    return (
        <div className={styles.dataTable}>
            <Table
                dataSource={dataSource}
                columns={columns}
                scroll={{x:xLength, y: 500}}
                pagination={{defaultPageSize: 20, }}
                bordered
                footer = {hasCut =>{return footer;}}
            />
        </div>
    )
}
