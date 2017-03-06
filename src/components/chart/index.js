import React, {Component} from 'react'
import Grid from "./Grid"
import Legend from "./Legend"

export default function Chart({option, onLegendChange}) {
    return (
        <div>
            <Grid option={option}/>
            {
                Object.getOwnPropertyNames(option.legend).length > 0 ?
                    <Legend legendSelected={option.legend.selected} onLegendChange={onLegendChange}/> :
                    ""
            }
        </div>
    )
}
