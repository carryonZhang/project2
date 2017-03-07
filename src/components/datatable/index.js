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
                scroll={{x: 1500, y: 300}}
                bordered
            />
        </div>

    )
}
