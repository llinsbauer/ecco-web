import * as React from "react";
import * as echarts from "echarts";
export const ArtefactTreeEchart : React.FC = () => {

    function setEchart() {
        let myChart = echarts.init(document.getElementById("d3treeStructure") as HTMLDivElement)
        const option = {
            title: {
                text: 'ECharts entry example'
            },
            tooltip: {},
            legend: {
                data: ['Sales']
            },
            xAxis: {
                data: ['shirt', 'cardign', 'chiffon shirt', 'pants', 'heels', 'socks']
            },
            yAxis: {},
            series: [
                {
                    name: 'Sales',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }
            ]
        }
        myChart.setOption(option)
    }

    return (
        <button onClick={setEchart}>
            Setze das Echart hierein...
        </button>
    );

};