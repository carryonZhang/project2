import React from 'react'
import Grid from "./Grid"
import Legend from "./Legend"

const Chart = ({option, onLegendChange}) => (
    <div>
        <Grid option={option}/>
        {
            Object.keys(option.legend).length &&
            <Legend legendSelected={option.legend.selected} onLegendChange={onLegendChange}/>
        }
    </div>
);

export default Chart;
