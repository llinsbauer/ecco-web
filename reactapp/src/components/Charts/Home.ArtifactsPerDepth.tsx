import * as React from "react";
import * as Echarts from "echarts";
import { EChartOption } from "echarts";
import {useEffect, useState} from "react";
import {CommunicationService} from "../../services/CommunicationService";
import {ArtifactsPerDepthResponse} from "../../Domain/Model/Backend/ChartArtifactsPerDepth/ArtifactsPerDepthResponse";
import {NumberArtifactsPerDepth} from "../../Domain/Model/Backend/ChartArtifactsPerDepth/NumberArtifactsPerDepth";

export const ArtifactsPerDepth : React.FC = () => {

    const [artifactsPerDeptList, setArtifactsPerDepthList] = useState<NumberArtifactsPerDepth[]>([]);

    useEffect(() => {
        CommunicationService.getInstance().getNumberOfArtifactsPerDepth().then((listOfNumberOfArtifactsPerDepth: ArtifactsPerDepthResponse) => {
            setArtifactsPerDepthList(listOfNumberOfArtifactsPerDepth.data);
        });
    }, [])
    const CHARTID = "artifactsperdepth";

    function setArtifactsPerDepthLineChart() {
        let xAxisData : number[] = [];
        let yAxisData : number[] = [];
        artifactsPerDeptList.forEach((artifactsPerDepth: NumberArtifactsPerDepth) => {
            xAxisData.push(artifactsPerDepth.depth);
            yAxisData.push(artifactsPerDepth.numberOfArtifacts);
        });
        document.getElementById(CHARTID).style.height = "400px";

        let myLineChart = Echarts.init(document.getElementById(CHARTID) as HTMLDivElement);

        let options: EChartOption = {
            title: {
                text: 'Artifacts per Depth',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>Depth {b} : {c} Artifacts'
            },
            legend: {
                left: 'left',
                data: [
                    'artifactsperdepth'
                ]
            },
            xAxis: {
                type: 'category',
                data: xAxisData,
                name: 'Depth',
                splitLine: {
                    show: true
                },
            },
            yAxis: {
                type: 'value',
                name: 'Number of Artifacts',
                minorTick: {
                    show: true
                },
                minorSplitLine: {
                    show: true
                }
            },
            series: [{
                name: 'Number of Artifacts',
                data: yAxisData,
                type: 'line',
            }]
        };

        myLineChart.setOption(options);
    }

    return (
        <button className={"btn btn-primary"} onClick={setArtifactsPerDepthLineChart}>
            Show Artifacts per Depth Chart
        </button>
    );
}