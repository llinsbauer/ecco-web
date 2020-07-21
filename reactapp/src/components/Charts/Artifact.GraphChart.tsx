import * as React from "react";
import * as Echarts from "echarts";
import {useEffect, useState} from "react";
import { CommunicationService } from "../../services/CommunicationService";
import {EChartOption} from "echarts";
import {ArtefactgraphResponse} from "../../Domain/Model/Backend/ChartArtefactgraph/ArtefactgraphResponse";

export const ArtifactGraphChart : React.FC = () => {

    const CHARTID = "artifactGraph";

    const [nodeList, setNodeList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);

    useEffect(() => {
        CommunicationService.getInstance().getArtifactgraph().then((value: ArtefactgraphResponse) => {
            console.log(value);
            setNodeList(value.data.artefactgraphNodeList);
            setEdgeList(value.data.artefactgraphEdgeList);
        });
        document.getElementById(CHARTID).style.height = "800px";
    }, []);

    function showArtefactGraph() {
        let myGraphChart = Echarts.init(document.getElementById(CHARTID) as HTMLDivElement);
        nodeList.forEach((node) => {
            node.symbolSize = 20;
            node.label = {
                show: true,
                position: "inside",
                distance: 20,
                fontSize: 14
            }
        })
        let options : EChartOption = {
            title: {
                text: "Artefact Graph",
                subtext: "Complete Content Of the Repository",
                top: 'bottom',
                left: 'right'
            },
            animationDuration: 1500,
            animationEasingUpdate: 'quinticInOut',
            series : [
                {
                    name: "Artefact Graph",
                    type: "graph",
                    layout: "force",
                    data: nodeList,
                    links: edgeList,
                    roam: true,
                    focusNodeAdjacency: true,
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 1,
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                    },
                    label: {
                        formatter: '{b}'
                    },
                    lineStyle: {
                        color: 'source',
                        curveness: 0.3
                    }
                }
            ]
        }

        myGraphChart.setOption(options);
    }

    return (
        <button onClick={showArtefactGraph} className={"btn btn-primary"}>
            Show Artefact Graph
        </button>
    );
}