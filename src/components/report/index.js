import React from "react"
import Chart from "./chart/index"
import DataTable from "./datatable/index"
import {Tag} from "antd"
import styles from "./style.css"


export default function Report({data, onLegendChange}) {
    return (
        <div>
            {
                data.hasError && <Tag className={styles.tag}>服务器开小差了，请重新查询</Tag>
            }
            {
                data.hasNullData && <Tag className={styles.tag}>找不到您要的数据，请更改查询条件</Tag>
            }
            {
                data.hasChart && <Chart option={data} onLegendChange={onLegendChange}/>
            }
            {
                data.hasTable && <DataTable tableData={data.tableData}/>
            }
        </div>
    )
}
