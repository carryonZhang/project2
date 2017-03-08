/**
 * Created by long-mac on 2017/2/24.
 */
import React, {Component} from 'react';
import {Table} from 'antd';
import styles from "./style.css"

export default function DataTable({dataSource, columns}) {
    return (
        <div className={styles.dataTable}>
            <Table
                dataSource={dataSource}
                columns={columns}
                scroll={{x: 10000, y: 500}}
                pagination={{defaultPageSize: 10, }}
                bordered
            />
        </div>
    )
}
