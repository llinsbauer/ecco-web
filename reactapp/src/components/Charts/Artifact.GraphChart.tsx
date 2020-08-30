import * as React from "react";
import * as Echarts from "echarts";
import {useEffect, useState} from "react";
import { CommunicationService } from "../../services/CommunicationService";
import {EChartOption} from "echarts";
import {ArtefactgraphResponse} from "../../Domain/Model/Backend/ChartArtefactgraph/ArtefactgraphResponse";
import {ArtefactgraphFilter} from "../../Domain/Model/Backend/ChartArtefactgraph/ArtefactgraphFilter";

interface ArtifactGraphProperties {
    maxChildCountLimit: number
}

export const ArtifactGraphChart : React.FC<ArtifactGraphProperties> = ({maxChildCountLimit}) => {

    const CHARTID = "artifactGraph";

    const [nodeList, setNodeList] = useState([]);
    const [edgeList, setEdgeList] = useState([]);
    const [isChartInit, setIsChartInit] = useState<boolean>(false);

    const artefactGraphfilter = new ArtefactgraphFilter();
    artefactGraphfilter.maxChildCount = maxChildCountLimit;

    useEffect(() => {
        CommunicationService.getInstance().getArtifactgraph(artefactGraphfilter).then((value: ArtefactgraphResponse) => {
            setNodeList(value.data.artefactgraphNodeList);
            setEdgeList(value.data.artefactgraphEdgeList);
        });
        document.getElementById(CHARTID).style.height = "800px";
    }, [maxChildCountLimit]);

    useEffect(() => {
        showArtefactGraph();
    }, [nodeList, edgeList]);

    function showArtefactGraph() {
        let myGraphChart = Echarts.init(document.getElementById(CHARTID) as HTMLDivElement);
        nodeList.forEach((node) => {
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

    const callbackForECharts = (params : any) => {
        if (params.componentType === 'series') {
            if (params.seriesType === 'graph') {
                if (params.dataType === 'node') {
                    console.log(params);
                }
            }
        }
    }

    return (
        <button onClick={showArtefactGraph} className={"btn btn-primary"}>
            Show Artefact Graph
        </button>
    );
}
