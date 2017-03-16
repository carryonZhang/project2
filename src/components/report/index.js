import React from "react"
import Chart from "./chart/index"
import DataTable from "./datatable/index"

export default function Report({data, onLegendChange}) {
    const tableData = data.tableData;
    const hasTable = tableData && Object.keys(tableData) > 0;
    // debugger
    return (
        <div>
            {
                data.hasError && "服务器开小差了，请重新查询"}
            {
                data.hasNullData && "找不到您要的数据，请更改查询条件"
            }
            {
                data.hasChart && <Chart option={data} onLegendChange={onLegendChange}/>
            }
            {
                hasTable && <DataTable dataSource={tableData.dataSource} columns={tableData.columns}/>
            }
        </div>

    )
}
