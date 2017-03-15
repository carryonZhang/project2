/**
 * Created by long-mac on 2017/2/24.
 */
import React from 'react';
import {Table} from 'antd';
import styles from "./style.css"

export default function DataTable({dataSource, columns, footer}) {
    const xLength = 150 * columns.length;
    return (
        <div className={styles.dataTable}>
            <Table
                dataSource={dataSource}
                columns={columns}
                scroll={{x:xLength, y: 500}}
                pagination={{defaultPageSize: 20, }}
                bordered

            />
        </div>
    )
}
{/*footer = {() => {return "this is header"}}*/}
